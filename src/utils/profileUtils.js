/**
 * CohortCircle Profile Utilities
 * Dynamic calculation of profile completeness and health metrics.
 */

export function calculateProfileCompleteness(user) {
  if (!user) return 0;
  let score = 0;

  if (user.name && user.name.trim().length > 1) score += 15;
  if (user.handle && user.handle.trim().length > 1) score += 10;
  if (user.bio && user.bio.trim().length >= 15) score += 15;
  if (user.academicLevel && user.academicLevel.trim().length > 0) score += 10;

  const topicsCount = Array.isArray(user.topics) ? user.topics.length : 0;
  if (topicsCount >= 2) score += 20;
  else if (topicsCount === 1) score += 10;

  const stylesCount = Array.isArray(user.studyStyles) ? user.studyStyles.length : 0;
  if (stylesCount >= 1) score += 15;

  let totalSlots = 0;
  if (user.availability && typeof user.availability === 'object') {
    Object.values(user.availability).forEach(slots => {
      if (Array.isArray(slots)) totalSlots += slots.length;
    });
  }
  if (totalSlots >= 3) score += 15;
  else if (totalSlots > 0) score += 10;

  return Math.min(100, Math.max(0, score));
}
