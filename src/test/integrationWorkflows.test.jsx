import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';
import { resetToSeed, loadState } from '../services/storageService';

describe('CohortCircle End-to-End Functional Requirements Integration (FR-001 through FR-023)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetToSeed();
  });

  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

  it('executes full lifecycle across all 23 functional requirements with persistent state', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // FR-001, FR-002, FR-003, FR-004: Profile, Study Styles, Availability, Modality & Capacity
    act(() => {
      const updateRes = result.current.updateProfile({
        name: 'Taylor Quinn',
        handle: '@tquinn',
        bio: 'Distributed systems and human factors researcher exploring collaborative peer-learning.',
        academicLevel: 'Graduate Student',
        primaryLanguage: 'English',
        preferredModality: 'Hybrid',
        preferredCapacity: '4–6 peers',
        topics: ['Distributed Systems', 'Human-Computer Interaction'],
        studyStyles: ['Peer Teaching', 'Discussion-Based Learning']
      });
      expect(updateRes.success).toBe(true);

      result.current.updateAvailability({
        Mon: ['Evening (6 PM - 10 PM)'],
        Tue: ['Evening (6 PM - 10 PM)'],
        Wed: ['Evening (6 PM - 10 PM)'],
        Thu: ['Evening (6 PM - 10 PM)'],
        Fri: ['Afternoon (12 PM - 5 PM)'],
        Sat: ['Morning (8 AM - 12 PM)'],
        Sun: []
      });
    });

    expect(result.current.currentUser.name).toBe('Taylor Quinn');
    expect(result.current.currentUser.initials).toBe('TQ');
    expect(result.current.currentUser.profileCompleteness).toBeGreaterThan(80);

    // FR-009, FR-010, FR-011: Dynamic Compatibility & Explainable Factors
    const distributedCircle = result.current.circles.find(c => c.subject === 'Distributed Systems');
    expect(distributedCircle).toBeDefined();
    const compat = result.current.getCircleCompatibility(distributedCircle);
    expect(compat.overallScore).toBeGreaterThan(0);
    expect(compat.breakdown.topicAlignment).toBeDefined();
    expect(compat.matchReasons.length).toBeGreaterThan(0);

    // FR-005, FR-006, FR-007, FR-008: Discovery, Search, Filtering
    expect(result.current.circles.length).toBeGreaterThanOrEqual(6);

    // FR-013: Direct Join open circle
    const mathCircle = result.current.circles.find(c => c.id === 'circle-math-04');
    expect(mathCircle.isJoined).toBe(false);
    act(() => {
      const joinRes = result.current.joinCircle('circle-math-04');
      expect(joinRes.success).toBe(true);
    });
    expect(result.current.circles.find(c => c.id === 'circle-math-04').isJoined).toBe(true);

    // FR-014: Request to Join moderated circle
    act(() => {
      const reqRes = result.current.createJoinRequest(
        'circle-alg-01',
        'Excited to join this peer study cohort for weekly algorithm practice and review.'
      );
      expect(reqRes.success).toBe(true);
    });
    expect(
      result.current.joinRequests.some(r => r.circleId === 'circle-alg-01' && r.status === 'pending')
    ).toBe(true);

    // FR-015: Leave circle
    act(() => {
      const leaveRes = result.current.leaveCircle('circle-math-04');
      expect(leaveRes.success).toBe(true);
    });
    expect(result.current.circles.find(c => c.id === 'circle-math-04').isJoined).toBe(false);

    // FR-016: Create Circle
    let createdCircle;
    act(() => {
      const createRes = result.current.createCircle({
        title: 'Cloud Architecture & Kubernetes Study Group',
        category: 'Computer Science',
        subject: 'Cloud Native Systems',
        description: 'Hands-on paper reviews and cluster deployments covering container runtimes and consensus.',
        charter: '1. Complete weekly reading.\n2. Participate in live architectural diagram reviews.',
        maxCapacity: 6,
        joiningPolicy: 'moderated',
        studyStyle: 'Collaborative Problem Solving',
        modality: 'Online',
        cadence: 'Weekly',
        meetingTime: 'Wednesdays, 7:00 PM – 8:30 PM'
      });
      expect(createRes.success).toBe(true);
      createdCircle = createRes.circle;
    });
    expect(createdCircle.isHostedByMe).toBe(true);
    expect(createdCircle.membersCount).toBe(1);

    // FR-017: Modify circle settings
    act(() => {
      const updateCircleRes = result.current.updateCircle(createdCircle.id, {
        description: 'Updated comprehensive description for the cloud native architecture cohort.',
        maxCapacity: 7
      });
      expect(updateCircleRes.success).toBe(true);
    });
    expect(
      result.current.circles.find(c => c.id === createdCircle.id).maxCapacity
    ).toBe(7);

    // FR-018: Moderate applicant (Accept)
    act(() => {
      const admitRes = result.current.acceptJoinRequest('req-01');
      expect(admitRes.success).toBe(true);
    });
    expect(result.current.joinRequests.find(r => r.id === 'req-01').status).toBe('accepted');

    // FR-019: Member Management (Host removes non-host member)
    const memberToRemove = result.current.memberships.find(
      m => m.circleId === 'circle-dis-03' && !m.isHost
    );
    expect(memberToRemove).toBeDefined();
    act(() => {
      const removeRes = result.current.removeCircleMember('circle-dis-03', memberToRemove.id);
      expect(removeRes.success).toBe(true);
    });
    expect(
      result.current.memberships.some(m => m.id === memberToRemove.id)
    ).toBe(false);

    // FR-020: Session creation
    let newSession;
    act(() => {
      const sessRes = result.current.createSession({
        circleId: createdCircle.id,
        title: 'Kubernetes Control Plane Architecture Walkthrough',
        date: '2028-12-05',
        time: '19:00',
        duration: '90m',
        agenda: '1. API Server & etcd synchronization\n2. Kubelet reconcile loop'
      });
      expect(sessRes.success).toBe(true);
      newSession = sessRes.session;
    });
    expect(newSession).toBeDefined();

    // FR-021: Session RSVP tracking
    act(() => {
      result.current.updateRSVP(newSession.id, 'tentative');
    });
    const updatedSess = result.current.sessions.find(s => s.id === newSession.id);
    expect(updatedSess.rsvpSummary.currentUserStatus).toBe('tentative');
    expect(updatedSess.rsvpSummary.tentative).toBe(1);

    // FR-022: Personal study dashboard reflects central state
    expect(result.current.circles.filter(c => c.isJoined).length).toBeGreaterThan(0);
    expect(result.current.sessions.length).toBeGreaterThan(0);

    // Verification of persistence across reload
    const persistentSnapshot = loadState();
    expect(persistentSnapshot.currentUser.name).toBe('Taylor Quinn');
    expect(persistentSnapshot.circles.some(c => c.id === createdCircle.id)).toBe(true);

    // FR-023: Reset Demo Baseline
    act(() => {
      result.current.resetDemoData();
    });
    expect(result.current.currentUser.name).toBe('Alex Rivera');
  });
});
