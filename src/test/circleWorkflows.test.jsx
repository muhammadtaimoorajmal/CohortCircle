import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';
import { resetToSeed } from '../services/storageService';

describe('Circle Workflows & Business Logic (FR-012 to FR-019)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetToSeed();
  });

  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

  it('direct join succeeds for an open circle and increments member count', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // circle-math-04 is open and currentUser is not a member initially
    const targetCircle = result.current.circles.find(c => c.id === 'circle-math-04');
    expect(targetCircle.isJoined).toBe(false);
    const initialCount = targetCircle.membersCount;

    act(() => {
      const res = result.current.joinCircle('circle-math-04');
      expect(res.success).toBe(true);
    });

    const updatedCircle = result.current.circles.find(c => c.id === 'circle-math-04');
    expect(updatedCircle.isJoined).toBe(true);
    expect(updatedCircle.membersCount).toBe(initialCount + 1);

    // Duplicate join is prevented
    act(() => {
      const res = result.current.joinCircle('circle-math-04');
      expect(res.success).toBe(false);
      expect(res.error).toContain('already a member');
    });
  });

  it('moderated circle requires introductory note and creates pending JoinRequest', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // Try joining without note or with too short note
    act(() => {
      const shortRes = result.current.createJoinRequest('circle-alg-01', 'Too short');
      expect(shortRes.success).toBe(false);
    });

    // Valid join request
    act(() => {
      const validRes = result.current.createJoinRequest(
        'circle-alg-01',
        'Hello! I would love to participate in weekly graph algorithm problem-solving sprints.'
      );
      expect(validRes.success).toBe(true);
    });

    expect(
      result.current.joinRequests.some(
        r => r.circleId === 'circle-alg-01' && r.status === 'pending'
      )
    ).toBe(true);

    // Duplicate pending application is prevented
    act(() => {
      const dupRes = result.current.createJoinRequest(
        'circle-alg-01',
        'Second attempt note with more than fifteen characters'
      );
      expect(dupRes.success).toBe(false);
      expect(dupRes.error).toContain('already have a pending application');
    });
  });

  it('closed circle cannot be joined or requested', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // circle-writ-06 has closed policy
    act(() => {
      const resJoin = result.current.joinCircle('circle-writ-06');
      expect(resJoin.success).toBe(false);

      const resReq = result.current.createJoinRequest('circle-writ-06', 'Please let me into this closed group!');
      expect(resReq.success).toBe(false);
      expect(resReq.error).toContain('closed');
    });
  });

  it('leaving a circle removes membership, decrements count, and reconciles RSVPs', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // circle-des-02 is joined by currentUser
    const initialCircle = result.current.circles.find(c => c.id === 'circle-des-02');
    expect(initialCircle.isJoined).toBe(true);
    const initialMembers = initialCircle.membersCount;

    act(() => {
      const res = result.current.leaveCircle('circle-des-02');
      expect(res.success).toBe(true);
    });

    const leftCircle = result.current.circles.find(c => c.id === 'circle-des-02');
    expect(leftCircle.isJoined).toBe(false);
    expect(leftCircle.membersCount).toBe(initialMembers - 1);
  });

  it('host cannot leave their own circle without ownership transfer', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // circle-dis-03 is hosted by Alex Rivera (currentUser)
    act(() => {
      const res = result.current.leaveCircle('circle-dis-03');
      expect(res.success).toBe(false);
      expect(res.error).toContain('host');
    });
  });

  it('host applicant acceptance adds exactly one member and marks request accepted', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // req-01 is for circle-dis-03
    const targetReq = result.current.joinRequests.find(r => r.id === 'req-01');
    expect(targetReq.status).toBe('pending');

    const circleBefore = result.current.circles.find(c => c.id === 'circle-dis-03');
    const initialCount = circleBefore.membersCount;

    act(() => {
      const res = result.current.acceptJoinRequest('req-01');
      expect(res.success).toBe(true);
    });

    const updatedReq = result.current.joinRequests.find(r => r.id === 'req-01');
    expect(updatedReq.status).toBe('accepted');

    const circleAfter = result.current.circles.find(c => c.id === 'circle-dis-03');
    expect(circleAfter.membersCount).toBe(initialCount + 1);

    const isMemberNow = result.current.memberships.some(
      m => m.circleId === 'circle-dis-03' && m.name === targetReq.applicant.name
    );
    expect(isMemberNow).toBe(true);
  });

  it('host applicant rejection updates request status without altering member count', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    const circleBefore = result.current.circles.find(c => c.id === 'circle-dis-03');
    const initialCount = circleBefore.membersCount;

    act(() => {
      const res = result.current.rejectJoinRequest('req-02');
      expect(res.success).toBe(true);
    });

    const updatedReq = result.current.joinRequests.find(r => r.id === 'req-02');
    expect(updatedReq.status).toBe('rejected');

    const circleAfter = result.current.circles.find(c => c.id === 'circle-dis-03');
    expect(circleAfter.membersCount).toBe(initialCount);
  });

  it('removing a member frees capacity and protects host from removal', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    // Host cannot be removed
    const hostMember = result.current.memberships.find(m => m.circleId === 'circle-dis-03' && m.isHost);
    act(() => {
      const res = result.current.removeCircleMember('circle-dis-03', hostMember.id);
      expect(res.success).toBe(false);
      expect(res.error).toContain('host');
    });

    // Non-host member can be removed
    const regularMember = result.current.memberships.find(m => m.circleId === 'circle-dis-03' && !m.isHost);
    const circleBefore = result.current.circles.find(c => c.id === 'circle-dis-03');

    act(() => {
      const res = result.current.removeCircleMember('circle-dis-03', regularMember.id);
      expect(res.success).toBe(true);
    });

    const circleAfter = result.current.circles.find(c => c.id === 'circle-dis-03');
    expect(circleAfter.membersCount).toBe(circleBefore.membersCount - 1);
  });

  it('creating a circle adds host membership and establishes valid domain entity', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    let createdCircle;
    act(() => {
      const res = result.current.createCircle({
        title: 'Quantum Computing Study Cohort',
        subject: 'Quantum Algorithms',
        description: 'Collaborative analysis of quantum circuit models, Shor algorithm, and quantum teleportation protocols.',
        charter: '1. Complete assigned paper readings.\n2. Participate actively in circuit simulations.',
        maxCapacity: 5,
        studyStyle: 'Discussion-Based Learning',
        modality: 'Online',
        cadence: 'Weekly',
        meetingTime: 'Thursdays, 5:00 PM – 6:30 PM',
        meetingDay: 'Thu',
        meetingTimeSlot: 'Evening (6 PM - 10 PM)'
      });
      expect(res.success).toBe(true);
      createdCircle = res.circle;
    });

    expect(createdCircle).toBeDefined();
    expect(createdCircle.isHostedByMe).toBe(true);
    expect(createdCircle.membersCount).toBe(1);

    const membershipExists = result.current.memberships.some(
      m => m.circleId === createdCircle.id && m.isHost && m.userId === result.current.currentUser.id
    );
    expect(membershipExists).toBe(true);
  });
});
