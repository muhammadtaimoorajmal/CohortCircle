import { describe, it, expect } from 'vitest';
import {
  computeCompatibility,
  computeTopicScore,
  computeScheduleScore,
  computeStudyStyleScore,
  computeModalityScore,
  computeCapacityScore
} from '../services/compatibilityService';

describe('CompatibilityService (Deterministic Matching Engine)', () => {
  const sampleUser = {
    id: 'usr-tester',
    topics: ['Algorithms & Data Structures', 'Human-Computer Interaction'],
    studyStyles: ['Collaborative Problem Solving'],
    preferredModality: 'Online',
    preferredCapacity: '4–6 peers',
    availability: {
      Mon: ['Evening (6 PM - 10 PM)'],
      Tue: ['Evening (6 PM - 10 PM)'],
      Wed: [],
      Thu: ['Evening (6 PM - 10 PM)'],
      Fri: [],
      Sat: [],
      Sun: []
    }
  };

  const sampleCircle = {
    id: 'c-test-01',
    title: 'Advanced Algorithms Cohort',
    subject: 'Algorithms & Data Structures',
    studyStyle: 'Collaborative Problem Solving',
    modality: 'Online',
    maxCapacity: 6,
    membersCount: 3,
    joiningPolicy: 'open',
    schedule: {
      days: ['Tue', 'Thu'],
      timeSlot: 'Evening (6 PM - 10 PM)'
    }
  };

  it('computes 100% topic score for direct subject alignment', () => {
    const res = computeTopicScore(sampleUser.topics, sampleCircle);
    expect(res.score).toBe(100);
    expect(res.reason).toContain('Algorithms & Data Structures');
  });

  it('computes 100% schedule score when all circle meeting days match availability', () => {
    const res = computeScheduleScore(sampleUser.availability, sampleCircle);
    expect(res.score).toBe(100);
    expect(res.reason).toContain('free availability');
  });

  it('computes reduced schedule score when meeting times conflict', () => {
    const conflictingCircle = {
      ...sampleCircle,
      schedule: {
        days: ['Sun'],
        timeSlot: 'Morning (8 AM - 12 PM)'
      }
    };
    const res = computeScheduleScore(sampleUser.availability, conflictingCircle);
    expect(res.score).toBeLessThan(60);
    expect(res.reason).toContain('conflicts');
  });

  it('computes exact 100% style score for matching study style', () => {
    const res = computeStudyStyleScore(sampleUser.studyStyles, 'Collaborative Problem Solving');
    expect(res.score).toBe(100);
  });

  it('computes complementary score for adjacent study styles', () => {
    const res = computeStudyStyleScore(['Collaborative Problem Solving'], 'Discussion-Based Learning');
    expect(res.score).toBe(80);
  });

  it('computes modality score with hybrid flexibility', () => {
    expect(computeModalityScore('Online', 'Online').score).toBe(100);
    expect(computeModalityScore('Hybrid', 'Online').score).toBe(92);
    expect(computeModalityScore('Online', 'In-Person').score).toBe(40);
  });

  it('computes capacity score according to group size bracket', () => {
    expect(computeCapacityScore('4–6 peers', 5).score).toBe(100);
    expect(computeCapacityScore('4–6 peers', 6).score).toBe(100);
    expect(computeCapacityScore('2–4 peers', 8).score).toBeLessThan(80);
  });

  it('computes deterministic weighted overall score', () => {
    const res = computeCompatibility(sampleCircle, sampleUser);
    // Topic: 100 (35) + Sched: 100 (25) + Style: 100 (20) + Modality: 100 (10) + Cap: 100 (10) = 100
    expect(res.overallScore).toBe(100);
    expect(res.breakdown.topicAlignment).toBe(100);
    expect(res.breakdown.scheduleOverlap).toBe(100);
    expect(res.matchReasons.length).toBeGreaterThan(0);
  });

  it('changing user availability or topics deterministically alters score', () => {
    const modifiedUser = {
      ...sampleUser,
      topics: ['Ancient History', 'Creative Writing'],
      availability: { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] }
    };
    const res = computeCompatibility(sampleCircle, modifiedUser);
    expect(res.overallScore).toBeLessThan(65);
  });

  it('creator / host of circle is always evaluated with 100% score', () => {
    const hostedCircle = {
      ...sampleCircle,
      host: { id: sampleUser.id }
    };
    const res = computeCompatibility(hostedCircle, sampleUser);
    expect(res.overallScore).toBe(100);
    expect(res.matchReasons).toContain('You are the creator and host of this study circle');
  });
});
