/**
 * CohortCircle Deterministic Compatibility Engine
 *
 * Implements a transparent, explainable 5-factor weighted scoring formula:
 * - Topic Alignment: 35%
 * - Schedule Overlap: 25%
 * - Study Style Fit: 20%
 * - Modality Fit:    10%
 * - Capacity Fit:    10%
 *
 * Total Score = Math.round(Topic*0.35 + Schedule*0.25 + Style*0.20 + Modality*0.10 + Capacity*0.10)
 */

function tokenize(str) {
  if (!str || typeof str !== 'string') return [];
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !['and', 'for', 'the', 'with', 'prep'].includes(token));
}

export function computeTopicScore(userTopics = [], circle = {}) {
  if (!userTopics || userTopics.length === 0) return { score: 50, reasons: [] };

  const circleText = [
    circle.title || '',
    circle.subject || '',
    circle.category || '',
    circle.description || '',
    ...(circle.tags || [])
  ].join(' ').toLowerCase();

  let maxTopicScore = 20;
  const reasons = [];

  userTopics.forEach(topic => {
    const topicLower = topic.toLowerCase();

    // Exact subject match
    if (circle.subject && circle.subject.toLowerCase() === topicLower) {
      maxTopicScore = 100;
      reasons.push(`Direct subject alignment on ${circle.subject}`);
      return;
    }

    // Direct tag match
    if (circle.tags && circle.tags.some(t => t.toLowerCase() === topicLower)) {
      maxTopicScore = Math.max(maxTopicScore, 95);
      reasons.push(`Direct syllabus topic match with ${topic}`);
      return;
    }

    // Substring match in circle title/subject
    if (circle.title?.toLowerCase().includes(topicLower) || circle.subject?.toLowerCase().includes(topicLower)) {
      maxTopicScore = Math.max(maxTopicScore, 90);
      reasons.push(`Strong focus on ${topic}`);
      return;
    }

    // Token overlap
    const topicTokens = tokenize(topic);
    const circleTokens = tokenize(circleText);
    const common = topicTokens.filter(t => circleTokens.includes(t));

    if (common.length >= 2) {
      maxTopicScore = Math.max(maxTopicScore, 85);
      reasons.push(`Related syllabus coverage for ${topic}`);
    } else if (common.length === 1) {
      maxTopicScore = Math.max(maxTopicScore, 70);
      reasons.push(`Shared foundational interest in ${common[0]}`);
    }
  });

  return {
    score: maxTopicScore,
    reason: reasons[0] || 'Broad academic domain overlap'
  };
}

export function computeScheduleScore(userAvailability = {}, circle = {}) {
  const schedule = circle.schedule || {};
  const meetingDays = schedule.days || [];
  const timeSlot = schedule.timeSlot;

  // If circle has no structured schedule, parse days from meetingTime string
  let targetDays = meetingDays;
  if (targetDays.length === 0 && circle.meetingTime) {
    const mt = circle.meetingTime.toLowerCase();
    if (mt.includes('mon')) targetDays.push('Mon');
    if (mt.includes('tue')) targetDays.push('Tue');
    if (mt.includes('wed')) targetDays.push('Wed');
    if (mt.includes('thu')) targetDays.push('Thu');
    if (mt.includes('fri')) targetDays.push('Fri');
    if (mt.includes('sat')) targetDays.push('Sat');
    if (mt.includes('sun')) targetDays.push('Sun');
  }

  // Parse timeSlot from meetingTime if missing
  let targetSlot = timeSlot;
  if (!targetSlot && circle.meetingTime) {
    const mt = circle.meetingTime.toLowerCase();
    if (mt.includes('pm') && (mt.includes('6:') || mt.includes('7:') || mt.includes('8:') || mt.includes('5:'))) {
      targetSlot = 'Evening (6 PM - 10 PM)';
    } else if (mt.includes('12:') || mt.includes('2:') || mt.includes('3:') || mt.includes('4:')) {
      targetSlot = 'Afternoon (12 PM - 5 PM)';
    } else {
      targetSlot = 'Morning (8 AM - 12 PM)';
    }
  }

  if (targetDays.length === 0) {
    return { score: 75, reason: 'Flexible meeting arrangements' };
  }

  // Check how many of the targetDays are free in user's availability
  let matchCount = 0;
  const matchedDays = [];

  targetDays.forEach(day => {
    const daySlots = userAvailability[day] || [];
    if (targetSlot && daySlots.includes(targetSlot)) {
      matchCount += 1;
      matchedDays.push(day);
    } else if (daySlots.length > 0) {
      // Free during that day but different slot
      matchCount += 0.5;
    }
  });

  const ratio = matchCount / targetDays.length;
  let score;
  let reason;

  if (ratio >= 0.9) {
    score = 100;
    reason = `Overlaps with your ${matchedDays.join(' & ')} free availability`;
  } else if (ratio >= 0.5) {
    score = 80;
    reason = `Partial schedule overlap with your open study windows`;
  } else if (ratio > 0) {
    score = 60;
    reason = `Minor schedule overlap; may require adjusting study slots`;
  } else {
    score = 30;
    reason = `Meeting schedule conflicts with your current availability`;
  }

  return { score, reason };
}

export function computeStudyStyleScore(userStyles = [], circleStyle = '') {
  if (!userStyles || userStyles.length === 0) {
    return { score: 60, reason: 'Open to standard peer-study formats' };
  }

  if (!circleStyle) {
    return { score: 70, reason: 'Flexible study format' };
  }

  if (userStyles.includes(circleStyle)) {
    return {
      score: 100,
      reason: `Matches your preferred ${circleStyle} format`
    };
  }

  // Complementary pairings
  const complementary = {
    'Collaborative Problem Solving': ['Discussion-Based Learning', 'Peer Teaching'],
    'Discussion-Based Learning': ['Collaborative Problem Solving', 'Peer Teaching'],
    'Peer Teaching': ['Collaborative Problem Solving', 'Discussion-Based Learning'],
    'Silent Co-Study': ['Examination Preparation'],
    'Examination Preparation': ['Silent Co-Study', 'Collaborative Problem Solving']
  };

  const matchesComplement = userStyles.some(s => complementary[circleStyle]?.includes(s));
  if (matchesComplement) {
    return {
      score: 80,
      reason: `Complementary to your ${userStyles[0]} study habit`
    };
  }

  return {
    score: 45,
    reason: `Different study style than your primary preference`
  };
}

export function computeModalityScore(userModality = 'Online', circleModality = 'Online') {
  if (!circleModality) return { score: 80, reason: 'Flexible modality' };

  if (userModality === circleModality) {
    return {
      score: 100,
      reason: `Exact match for ${circleModality} meeting format`
    };
  }

  if (userModality === 'Hybrid' || circleModality === 'Hybrid') {
    return {
      score: 92,
      reason: `High compatibility with hybrid study options`
    };
  }

  return {
    score: 40,
    reason: `Format mismatch (${userModality} preferred vs ${circleModality})`
  };
}

export function computeCapacityScore(userCapacityStr = '', circleMaxCapacity = 6) {
  let minPref = 4;
  let maxPref = 6;

  if (typeof userCapacityStr === 'string') {
    if (userCapacityStr.includes('2–4') || userCapacityStr.includes('Micro')) {
      minPref = 2;
      maxPref = 4;
    } else if (userCapacityStr.includes('4–6') || userCapacityStr.includes('Standard')) {
      minPref = 4;
      maxPref = 6;
    } else if (userCapacityStr.includes('6–8') || userCapacityStr.includes('Collaborative') || userCapacityStr.includes('Large')) {
      minPref = 6;
      maxPref = 10;
    }
  }

  if (circleMaxCapacity >= minPref && circleMaxCapacity <= maxPref) {
    return {
      score: 100,
      reason: `Cohort size (${circleMaxCapacity} peers) fits your target group size`
    };
  }

  const diff = Math.min(Math.abs(circleMaxCapacity - minPref), Math.abs(circleMaxCapacity - maxPref));
  if (diff <= 2) {
    return {
      score: 85,
      reason: `Cohort size (${circleMaxCapacity} peers) is near your preferred size`
    };
  }

  return {
    score: 60,
    reason: `Cohort size (${circleMaxCapacity} peers) differs from your preferred range`
  };
}

/**
 * Main Compatibility Calculator
 */
export function computeCompatibility(circle, user) {
  if (!circle) {
    return {
      overallScore: 0,
      breakdown: {
        topicAlignment: 0,
        scheduleOverlap: 0,
        studyStyleMatch: 0,
        modalityFit: 0,
        capacityFit: 0
      },
      matchReasons: []
    };
  }

  // Host shortcut: host is always 100% matched to their own cohort
  if (circle.isHostedByMe || (user && circle.host?.id === user.id)) {
    return {
      overallScore: 100,
      breakdown: {
        topicAlignment: 100,
        scheduleOverlap: 100,
        studyStyleMatch: 100,
        modalityFit: 100,
        capacityFit: 100
      },
      matchReasons: ['You are the creator and host of this study circle']
    };
  }

  const topic = computeTopicScore(user?.topics, circle);
  const schedule = computeScheduleScore(user?.availability, circle);
  const style = computeStudyStyleScore(user?.studyStyles, circle.studyStyle);
  const modality = computeModalityScore(user?.preferredModality, circle.modality);
  const capacity = computeCapacityScore(user?.preferredCapacity, circle.maxCapacity);

  // Transparent weighted formula
  const weighted =
    topic.score * 0.35 +
    schedule.score * 0.25 +
    style.score * 0.20 +
    modality.score * 0.10 +
    capacity.score * 0.10;

  let overallScore = Math.min(100, Math.max(0, Math.round(weighted)));

  const matchReasons = [
    topic.reason,
    schedule.reason,
    style.reason,
    modality.reason
  ].filter(Boolean);

  if (circle.membersCount >= circle.maxCapacity) {
    matchReasons.unshift('Note: This cohort is currently at maximum capacity');
  } else if (circle.joiningPolicy === 'closed') {
    matchReasons.unshift('Note: This circle currently has closed enrollment');
  }

  return {
    overallScore,
    breakdown: {
      topicAlignment: topic.score,
      scheduleOverlap: schedule.score,
      studyStyleMatch: style.score,
      modalityFit: modality.score,
      capacityFit: capacity.score
    },
    matchReasons
  };
}
