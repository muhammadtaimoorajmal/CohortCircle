import { describe, it, expect } from 'vitest';
import {
  validateProfile,
  validateCircleData,
  validateJoinRequest,
  validateSessionData,
  isSafeUrl
} from '../services/validationService';

describe('ValidationService (Input Security & Schema Integrity)', () => {
  it('validates profile fields accurately', () => {
    expect(validateProfile({ name: 'Valid User', handle: 'valid_user' }).isValid).toBe(true);
    expect(validateProfile({ name: '', handle: 'user' }).isValid).toBe(false);
    expect(validateProfile({ name: 'User', handle: 'invalid space handle' }).isValid).toBe(false);
  });

  it('validates circle fields and enforces minimum charter and description length', () => {
    const validCircle = {
      title: 'Full Stack Study Group',
      subject: 'Computer Science',
      description: 'A comprehensive study group covering modern web architectures and reactive paradigms.',
      charter: '1. Prepare weekly assignments.\n2. Respect diverse opinions and foster peer learning.',
      maxCapacity: 6,
      meetingTime: 'Tuesdays, 6:00 PM – 7:30 PM'
    };
    expect(validateCircleData(validCircle, 1).isValid).toBe(true);

    const tooShortDesc = { ...validCircle, description: 'Short' };
    expect(validateCircleData(tooShortDesc, 1).isValid).toBe(false);

    const tooSmallCapacity = { ...validCircle, maxCapacity: 2 };
    expect(validateCircleData(tooSmallCapacity, 4).isValid).toBe(false); // current members = 4
  });

  it('validates join request introductory note length', () => {
    expect(validateJoinRequest('Too short').isValid).toBe(false);
    expect(
      validateJoinRequest('Hello, I am eager to join this cohort to work on algorithm exercises together!').isValid
    ).toBe(true);
  });

  it('validates session fields and rejects past dates', () => {
    const validSession = {
      circleId: 'circle-01',
      title: 'Graph Traversal Workshop',
      date: '2029-12-01',
      time: '18:00',
      agenda: [{ time: '18:00', item: 'Check-in' }]
    };
    expect(validateSessionData(validSession).isValid).toBe(true);

    const pastSession = { ...validSession, date: '2020-01-01' };
    const pastRes = validateSessionData(pastSession);
    expect(pastRes.isValid).toBe(false);
    expect(pastRes.errors.date).toContain('past');
  });

  it('verifies URL safety and rejects unsafe javascript: protocols', () => {
    expect(isSafeUrl('https://meet.cohortcircle.org/session-live')).toBe(true);
    expect(isSafeUrl('http://localhost:3000')).toBe(true);
    expect(isSafeUrl('/app/sessions/1')).toBe(true);
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('data:text/html;base64,...')).toBe(false);
    expect(isSafeUrl('')).toBe(false);
  });
});
