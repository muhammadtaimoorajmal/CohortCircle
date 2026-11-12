/**
 * CohortCircle Input Validation Service
 * Validates domain objects, input sanitization, and URL security.
 */

import { isDateInPast } from '../utils/dateUtils';

export function isSafeUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return false;
  }
  return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/');
}

export function validateProfile(data) {
  const errors = {};
  if (!data.name || !data.name.trim()) {
    errors.name = 'Full display name is required';
  } else if (data.name.trim().length > 70) {
    errors.name = 'Display name cannot exceed 70 characters';
  }

  if (!data.handle || !data.handle.trim()) {
    errors.handle = 'Community handle is required';
  } else if (!/^[A-Za-z0-9_@.-]{2,30}$/.test(data.handle.trim())) {
    errors.handle = 'Handle must be 2-30 characters with no spaces or special symbols';
  }

  if (data.bio && data.bio.length > 500) {
    errors.bio = 'Bio cannot exceed 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCircleData(data, currentMemberCount = 1) {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = 'Circle title is required';
  } else if (data.title.trim().length < 3 || data.title.trim().length > 100) {
    errors.title = 'Title must be between 3 and 100 characters';
  }

  if (!data.subject || !data.subject.trim()) {
    errors.subject = 'Subject or syllabus area is required';
  }

  if (!data.description || data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  } else if (data.description.length > 800) {
    errors.description = 'Description cannot exceed 800 characters';
  }

  if (!data.charter || data.charter.trim().length < 20) {
    errors.charter = 'Circle charter must be at least 20 characters';
  }

  const capacity = Number(data.maxCapacity);
  if (isNaN(capacity) || capacity < 2 || capacity > 24) {
    errors.maxCapacity = 'Capacity must be between 2 and 24 members';
  } else if (capacity < currentMemberCount) {
    errors.maxCapacity = `Capacity cannot be less than current membership (${currentMemberCount} members)`;
  }

  if (!data.meetingTime || !data.meetingTime.trim()) {
    errors.meetingTime = 'Meeting schedule is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateJoinRequest(introNote) {
  const errors = {};
  if (!introNote || introNote.trim().length < 15) {
    errors.introNote = 'Please write an introductory note of at least 15 characters';
  } else if (introNote.trim().length > 600) {
    errors.introNote = 'Introductory note cannot exceed 600 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateSessionData(data) {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = 'Session title is required';
  }

  if (!data.circleId) {
    errors.circleId = 'Target study circle must be selected';
  }

  if (!data.date) {
    errors.date = 'Session date is required';
  } else if (isDateInPast(data.date)) {
    errors.date = 'Session date cannot be scheduled in the past';
  }

  if (!data.time) {
    errors.time = 'Session time is required';
  }

  if (!data.agenda || (Array.isArray(data.agenda) && data.agenda.length === 0)) {
    errors.agenda = 'At least one agenda topic or sprint goal is required';
  }

  if (data.locationOrLink && !isSafeUrl(data.locationOrLink)) {
    errors.locationOrLink = 'Meeting link must be a safe http:// or https:// URL';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
