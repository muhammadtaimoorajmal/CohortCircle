import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';
import { resetToSeed, loadState } from '../services/storageService';
import { calculateProfileCompleteness } from '../utils/profileUtils';

describe('Learner Profile & Availability Workflows (FR-001 to FR-004)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetToSeed();
  });

  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

  it('updates display name, handle, bio, academic level, and primary language', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      const res = result.current.updateProfile({
        name: 'Morgan Reese',
        handle: '@mreese',
        bio: 'Graduate researcher in human factors, ergonomics, and distributed collaborative systems.',
        academicLevel: 'Graduate Student',
        primaryLanguage: 'French'
      });
      expect(res.success).toBe(true);
    });

    expect(result.current.currentUser.name).toBe('Morgan Reese');
    expect(result.current.currentUser.handle).toBe('@mreese');
    expect(result.current.currentUser.initials).toBe('MR');
    expect(result.current.currentUser.primaryLanguage).toBe('French');

    // Name and handle update reflected in hosted circle records
    const hosted = result.current.circles.find(c => c.isHostedByMe);
    expect(hosted.host.name).toBe('Morgan Reese');
    expect(hosted.host.handle).toBe('@mreese');

    // Persisted to storage
    const stored = loadState();
    expect(stored.currentUser.name).toBe('Morgan Reese');
  });

  it('updates topics and study styles and reflects them in compatibility calculation', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const circleBefore = result.current.circles.find(c => c.id === 'circle-math-04');
    const scoreBefore = circleBefore.compatibility.overallScore;

    act(() => {
      result.current.updateProfile({
        topics: ['Discrete Mathematics & Linear Algebra', 'Proof Analysis'],
        studyStyles: ['Silent Co-Study'],
        preferredModality: 'In-Person'
      });
    });

    const circleAfter = result.current.circles.find(c => c.id === 'circle-math-04');
    expect(circleAfter.compatibility.overallScore).toBeGreaterThanOrEqual(scoreBefore);
    expect(circleAfter.compatibility.breakdown.studyStyleMatch).toBe(100);
  });

  it('updates 7x3 weekly availability matrix and persists after remount', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const newMatrix = {
      Mon: ['Morning (8 AM - 12 PM)'],
      Tue: ['Afternoon (12 PM - 5 PM)'],
      Wed: ['Evening (6 PM - 10 PM)'],
      Thu: [],
      Fri: ['Evening (6 PM - 10 PM)'],
      Sat: ['Morning (8 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)'],
      Sun: []
    };

    act(() => {
      result.current.updateAvailability(newMatrix);
    });

    expect(result.current.currentUser.availability.Mon).toEqual(['Morning (8 AM - 12 PM)']);
    expect(result.current.currentUser.availability.Thu).toEqual([]);

    const loaded = loadState();
    expect(loaded.currentUser.availability.Mon).toEqual(['Morning (8 AM - 12 PM)']);
  });

  it('dynamically computes profile completeness based on user details', () => {
    const emptyUser = {
      name: '',
      handle: '',
      bio: '',
      academicLevel: '',
      topics: [],
      studyStyles: [],
      availability: {}
    };
    expect(calculateProfileCompleteness(emptyUser)).toBe(0);

    const fullUser = {
      name: 'Taylor Rivera',
      handle: '@trivera',
      bio: 'Enthusiastic computer science senior preparing for graduate studies.',
      academicLevel: 'Undergraduate Senior',
      topics: ['Algorithms', 'HCI'],
      studyStyles: ['Collaborative Problem Solving'],
      availability: {
        Mon: ['Evening (6 PM - 10 PM)'],
        Tue: ['Evening (6 PM - 10 PM)'],
        Wed: ['Evening (6 PM - 10 PM)']
      }
    };
    expect(calculateProfileCompleteness(fullUser)).toBe(100);
  });
});
