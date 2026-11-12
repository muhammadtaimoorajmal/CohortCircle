import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';
import { resetToSeed } from '../services/storageService';

describe('Study Session Workflows & RSVP Integrity (FR-020 to FR-021)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetToSeed();
  });

  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

  it('host can schedule a future session and link it to the selected circle', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    let createdSession;
    act(() => {
      const res = result.current.createSession({
        circleId: 'circle-dis-03',
        title: 'Byzantine Fault Tolerance & Raft Comparative Seminar',
        date: '2028-11-20',
        time: '14:00',
        duration: '90m',
        modality: 'Online',
        locationOrLink: 'https://meet.cohortcircle.org/bft-live',
        agenda: '1. Paper review (30m)\n2. State machine replication discussion (45m)\n3. Wrap up (15m)'
      });
      expect(res.success).toBe(true);
      createdSession = res.session;
    });

    expect(createdSession).toBeDefined();
    expect(createdSession.circleId).toBe('circle-dis-03');
    expect(createdSession.rsvpSummary.attending).toBe(1);
    expect(createdSession.attendees.length).toBe(1);
    expect(createdSession.attendees[0].name).toBe(result.current.currentUser.name);

    // Persisted in sessions list
    expect(result.current.sessions.some(s => s.id === createdSession.id)).toBe(true);
  });

  it('rejects scheduling a session in the past', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      const res = result.current.createSession({
        circleId: 'circle-dis-03',
        title: 'Past Seminar',
        date: '2020-01-01',
        time: '10:00',
        agenda: 'Past agenda'
      });
      expect(res.success).toBe(false);
      expect(res.errors.date).toContain('past');
    });
  });

  it('updating RSVP changes user status and keeps attendee records synchronized', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const targetSessionId = 'sess-alg-01';
    const sessionBefore = result.current.sessions.find(s => s.id === targetSessionId);
    expect(sessionBefore.rsvpSummary.currentUserStatus).toBe('attending');

    // Change to tentative
    act(() => {
      result.current.updateRSVP(targetSessionId, 'tentative');
    });

    const sessionAfterTentative = result.current.sessions.find(s => s.id === targetSessionId);
    expect(sessionAfterTentative.rsvpSummary.currentUserStatus).toBe('tentative');

    const attendeeRecord = sessionAfterTentative.attendees.find(
      a => a.handle === result.current.currentUser.handle
    );
    expect(attendeeRecord.status).toBe('tentative');

    // Verify aggregate counts match attendee records
    const attendingCount = sessionAfterTentative.attendees.filter(a => a.status === 'attending').length;
    const tentativeCount = sessionAfterTentative.attendees.filter(a => a.status === 'tentative').length;
    expect(sessionAfterTentative.rsvpSummary.attending).toBe(attendingCount);
    expect(sessionAfterTentative.rsvpSummary.tentative).toBe(tentativeCount);
  });

  it('repeated RSVP status changes do not double-count or duplicate attendee records', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const targetSessionId = 'sess-des-01';
    const initialAttendeesCount = result.current.sessions.find(s => s.id === targetSessionId).attendees.length;

    act(() => {
      result.current.updateRSVP(targetSessionId, 'declined');
      result.current.updateRSVP(targetSessionId, 'tentative');
      result.current.updateRSVP(targetSessionId, 'attending');
      result.current.updateRSVP(targetSessionId, 'attending');
    });

    const sessionFinal = result.current.sessions.find(s => s.id === targetSessionId);
    expect(sessionFinal.attendees.length).toBe(initialAttendeesCount);
    expect(sessionFinal.rsvpSummary.currentUserStatus).toBe('attending');

    const occurrences = sessionFinal.attendees.filter(
      a => a.handle === result.current.currentUser.handle
    ).length;
    expect(occurrences).toBe(1);
  });
});
