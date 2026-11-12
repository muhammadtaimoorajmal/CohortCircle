import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  loadState,
  saveState,
  resetToSeed,
  clearState as clearLocalStorage,
  deepClone,
  STORAGE_KEY
} from '../services/storageService';
import { computeCompatibility } from '../services/compatibilityService';
import { validateCircleData, validateSessionData, validateJoinRequest, validateProfile } from '../services/validationService';
import { generateId, generateInitials } from '../utils/idUtils';
import { calculateProfileCompleteness } from '../utils/profileUtils';
import { DEFAULT_SETTINGS } from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Load versioned initial state from localStorage or seed fallback
  const [appState, setAppState] = useState(() => loadState());

  const currentUser = appState.currentUser;
  const circles = appState.circles;
  const memberships = appState.memberships;
  const joinRequests = appState.joinRequests;
  const sessions = appState.sessions;
  const activeRole = appState.activeRole;
  const settings = appState.settings;

  const [selectedCircleForCompat, setSelectedCircleForCompat] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    saveState(appState);
  }, [appState]);

  // Apply High Contrast mode to root element
  useEffect(() => {
    if (settings?.highContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
    }
  }, [settings?.highContrast]);

  // Support cross-tab storage changes
  useEffect(() => {
    function handleStorageEvent(e) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          if (fresh && fresh.currentUser) {
            setAppState(fresh);
          }
        } catch {
          // Ignore invalid parse from foreign tab
        }
      }
    }
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  // Compute dynamic compatibility for any circle
  const getCircleCompatibility = useCallback(
    (circle) => {
      return computeCompatibility(circle, currentUser);
    },
    [currentUser]
  );

  // Reconcile circles with dynamic compatibility scores
  const circlesWithCompatibility = useMemo(() => {
    return circles.map(c => {
      const isMember = memberships.some(m => m.circleId === c.id && m.userId === currentUser.id);
      const isHost = c.host?.id === currentUser.id;
      const compat = computeCompatibility({ ...c, isHostedByMe: isHost }, currentUser);
      const membersInCircle = memberships.filter(m => m.circleId === c.id);

      return {
        ...c,
        isJoined: isMember,
        isHostedByMe: isHost,
        membersCount: membersInCircle.length || c.membersCount,
        compatibility: compat
      };
    });
  }, [circles, memberships, currentUser]);

  // Role switching
  function switchRole(role) {
    setAppState(prev => ({
      ...prev,
      activeRole: role
    }));
  }

  // Profile update
  function updateProfile(updates) {
    const mergedUserCandidate = {
      ...currentUser,
      ...updates
    };
    const validation = validateProfile(mergedUserCandidate);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    setAppState(prev => {
      const mergedUser = {
        ...prev.currentUser,
        ...updates
      };
      if (updates.name) {
        mergedUser.initials = generateInitials(updates.name);
      }
      mergedUser.profileCompleteness = calculateProfileCompleteness(mergedUser);

      // Reconcile name/handle in memberships and hosted circles
      const updatedMemberships = prev.memberships.map(m => {
        if (m.userId === mergedUser.id) {
          return {
            ...m,
            name: mergedUser.name,
            handle: mergedUser.handle,
            initials: mergedUser.initials
          };
        }
        return m;
      });

      const updatedCircles = prev.circles.map(c => {
        if (c.host?.id === mergedUser.id) {
          return {
            ...c,
            host: {
              ...c.host,
              name: mergedUser.name,
              handle: mergedUser.handle,
              initials: mergedUser.initials
            }
          };
        }
        return c;
      });

      return {
        ...prev,
        currentUser: mergedUser,
        memberships: updatedMemberships,
        circles: updatedCircles
      };
    });

    return { success: true };
  }

  // Availability matrix update
  function updateAvailability(availabilityMatrix) {
    setAppState(prev => {
      const updatedUser = {
        ...prev.currentUser,
        availability: availabilityMatrix
      };
      updatedUser.profileCompleteness = calculateProfileCompleteness(updatedUser);
      return {
        ...prev,
        currentUser: updatedUser
      };
    });
  }

  // Preferences update
  function updatePreferences(prefUpdates) {
    setAppState(prev => {
      const updatedUser = {
        ...prev.currentUser,
        ...prefUpdates
      };
      updatedUser.profileCompleteness = calculateProfileCompleteness(updatedUser);
      return {
        ...prev,
        currentUser: updatedUser
      };
    });
  }

  // Join circle (Direct join for open circle)
  function joinCircle(circleId) {
    const targetCircle = circlesWithCompatibility.find(c => c.id === circleId);
    if (!targetCircle) return { success: false, error: 'Circle not found' };

    if (targetCircle.joiningPolicy !== 'open') {
      return { success: false, error: 'This circle requires moderated application' };
    }

    const currentMembers = memberships.filter(m => m.circleId === circleId);
    const alreadyMember = currentMembers.some(m => m.userId === currentUser.id);
    if (alreadyMember) {
      return { success: false, error: 'You are already a member of this circle' };
    }

    if (currentMembers.length >= targetCircle.maxCapacity) {
      return { success: false, error: 'This circle has reached maximum capacity' };
    }

    const newMembership = {
      id: generateId('mem'),
      circleId,
      userId: currentUser.id,
      name: currentUser.name,
      handle: currentUser.handle,
      initials: currentUser.initials,
      avatarColor: currentUser.avatarColor,
      role: 'Active Contributor',
      isHost: false,
      joinedAt: new Date().toISOString()
    };

    setAppState(prev => ({
      ...prev,
      memberships: [...prev.memberships, newMembership],
      circles: prev.circles.map(c => {
        if (c.id !== circleId) return c;
        return {
          ...c,
          isJoined: true,
          membersCount: c.membersCount + 1
        };
      })
    }));

    return { success: true };
  }

  // Create Join Request (for moderated circle)
  function createJoinRequest(circleId, introNote) {
    const targetCircle = circlesWithCompatibility.find(c => c.id === circleId);
    if (!targetCircle) return { success: false, error: 'Circle not found' };

    if (targetCircle.joiningPolicy === 'closed') {
      return { success: false, error: 'This circle has closed admissions' };
    }

    const noteValidation = validateJoinRequest(introNote);
    if (!noteValidation.isValid) {
      return { success: false, error: noteValidation.errors.introNote };
    }

    const existingPending = joinRequests.some(
      r => r.circleId === circleId && r.applicant?.handle === currentUser.handle && r.status === 'pending'
    );
    if (existingPending) {
      return { success: false, error: 'You already have a pending application for this circle' };
    }

    const newRequest = {
      id: generateId('req'),
      circleId,
      circleTitle: targetCircle.title,
      applicant: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        initials: currentUser.initials,
        avatarColor: currentUser.avatarColor,
        academicLevel: currentUser.academicLevel,
        compatibilityScore: targetCircle.compatibility?.overallScore || 85
      },
      requestedAt: 'Just now',
      introNote: introNote.trim(),
      status: 'pending'
    };

    setAppState(prev => ({
      ...prev,
      joinRequests: [newRequest, ...prev.joinRequests]
    }));

    return { success: true };
  }

  // Leave Circle
  function leaveCircle(circleId) {
    const targetCircle = circles.find(c => c.id === circleId);
    if (targetCircle?.host?.id === currentUser.id) {
      return { success: false, error: 'Circle hosts cannot leave their hosted group without transferring ownership' };
    }

    setAppState(prev => {
      const remainingMemberships = prev.memberships.filter(
        m => !(m.circleId === circleId && m.userId === currentUser.id)
      );

      const updatedCircles = prev.circles.map(c => {
        if (c.id !== circleId) return c;
        return {
          ...c,
          isJoined: false,
          membersCount: Math.max(1, c.membersCount - 1)
        };
      });

      // Reconcile upcoming session RSVPs for this circle
      const updatedSessions = prev.sessions.map(s => {
        if (s.circleId !== circleId) return s;
        const newAttendees = (s.attendees || []).filter(a => a.handle !== currentUser.handle);
        const attendingCount = newAttendees.filter(a => a.status === 'attending').length;
        const tentativeCount = newAttendees.filter(a => a.status === 'tentative').length;
        const declinedCount = newAttendees.filter(a => a.status === 'declined').length;

        return {
          ...s,
          attendees: newAttendees,
          rsvpSummary: {
            attending: attendingCount,
            tentative: tentativeCount,
            declined: declinedCount,
            currentUserStatus: 'declined'
          }
        };
      });

      return {
        ...prev,
        memberships: remainingMemberships,
        circles: updatedCircles,
        sessions: updatedSessions
      };
    });

    return { success: true };
  }

  // Create Circle (Host Wizard)
  function createCircle(circleData) {
    const validation = validateCircleData(circleData, 1);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const circleId = generateId('circle');
    const newCircle = {
      id: circleId,
      title: circleData.title.trim(),
      slug: circleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: circleData.category || 'Computer Science',
      subject: circleData.subject.trim(),
      description: circleData.description.trim(),
      charter: circleData.charter.trim(),
      host: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        initials: currentUser.initials,
        avatarColor: currentUser.avatarColor,
        role: 'Circle Facilitator'
      },
      membersCount: 1,
      maxCapacity: Number(circleData.maxCapacity),
      joiningPolicy: circleData.joiningPolicy || 'moderated',
      studyStyle: circleData.studyStyle || 'Collaborative Problem Solving',
      modality: circleData.modality || 'Online',
      cadence: circleData.cadence || 'Weekly',
      meetingTime: circleData.meetingTime.trim(),
      schedule: circleData.schedule || {
        days: circleData.meetingDay ? [circleData.meetingDay] : ['Tue'],
        timeSlot: circleData.meetingTimeSlot || 'Evening (6 PM - 10 PM)'
      },
      tags: circleData.tags || [circleData.subject, circleData.category, circleData.modality],
      isJoined: true,
      isHostedByMe: true
    };

    const hostMembership = {
      id: generateId('mem'),
      circleId,
      userId: currentUser.id,
      name: currentUser.name,
      handle: currentUser.handle,
      initials: currentUser.initials,
      avatarColor: currentUser.avatarColor,
      role: 'Circle Facilitator (You)',
      isHost: true,
      joinedAt: new Date().toISOString()
    };

    setAppState(prev => ({
      ...prev,
      circles: [newCircle, ...prev.circles],
      memberships: [...prev.memberships, hostMembership]
    }));

    return { success: true, circle: newCircle };
  }

  // Update Circle Settings (Host only)
  function updateCircle(circleId, updates) {
    const targetCircle = circles.find(c => c.id === circleId);
    if (!targetCircle) return { success: false, error: 'Circle not found' };
    if (targetCircle.host?.id !== currentUser.id) {
      return { success: false, error: 'Only the circle host may update settings' };
    }

    const currentMemberCount = memberships.filter(m => m.circleId === circleId).length;
    const validation = validateCircleData({ ...targetCircle, ...updates }, currentMemberCount);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    setAppState(prev => ({
      ...prev,
      circles: prev.circles.map(c => {
        if (c.id !== circleId) return c;
        return {
          ...c,
          ...updates,
          maxCapacity: updates.maxCapacity ? Number(updates.maxCapacity) : c.maxCapacity
        };
      })
    }));

    return { success: true };
  }

  // Accept Join Request
  function acceptJoinRequest(requestId) {
    const req = joinRequests.find(r => r.id === requestId);
    if (!req) return { success: false, error: 'Request not found' };

    const circle = circles.find(c => c.id === req.circleId);
    if (!circle) return { success: false, error: 'Circle not found' };

    const currentMembers = memberships.filter(m => m.circleId === req.circleId);
    if (currentMembers.length >= circle.maxCapacity) {
      return { success: false, error: 'Circle is already at maximum capacity' };
    }

    const newMemberId = req.applicant?.id || generateId('usr');
    const newMembership = {
      id: generateId('mem'),
      circleId: req.circleId,
      userId: newMemberId,
      name: req.applicant.name,
      handle: req.applicant.handle,
      initials: req.applicant.initials || generateInitials(req.applicant.name),
      avatarColor: req.applicant.avatarColor || '#6366f1',
      role: 'Active Contributor',
      isHost: false,
      joinedAt: new Date().toISOString()
    };

    setAppState(prev => ({
      ...prev,
      joinRequests: prev.joinRequests.map(r => (r.id === requestId ? { ...r, status: 'accepted' } : r)),
      memberships: [...prev.memberships, newMembership],
      circles: prev.circles.map(c => {
        if (c.id !== req.circleId) return c;
        return {
          ...c,
          membersCount: c.membersCount + 1,
          isJoined: newMemberId === currentUser.id ? true : c.isJoined
        };
      })
    }));

    return { success: true };
  }

  // Reject Join Request
  function rejectJoinRequest(requestId) {
    setAppState(prev => ({
      ...prev,
      joinRequests: prev.joinRequests.map(r => (r.id === requestId ? { ...r, status: 'rejected' } : r))
    }));
    return { success: true };
  }

  // Remove Circle Member (Host action)
  function removeCircleMember(circleId, memberId) {
    const targetMember = memberships.find(m => m.id === memberId && m.circleId === circleId);
    if (!targetMember) return { success: false, error: 'Member not found' };
    if (targetMember.isHost || targetMember.userId === currentUser.id) {
      return { success: false, error: 'Cannot remove the circle host' };
    }

    setAppState(prev => {
      const updatedMemberships = prev.memberships.filter(m => m.id !== memberId);
      const updatedCircles = prev.circles.map(c => {
        if (c.id !== circleId) return c;
        return {
          ...c,
          membersCount: Math.max(1, c.membersCount - 1)
        };
      });

      // Remove from upcoming session attendees
      const updatedSessions = prev.sessions.map(s => {
        if (s.circleId !== circleId) return s;
        const remainingAttendees = (s.attendees || []).filter(a => a.handle !== targetMember.handle);
        return {
          ...s,
          attendees: remainingAttendees,
          rsvpSummary: {
            attending: remainingAttendees.filter(a => a.status === 'attending').length,
            tentative: remainingAttendees.filter(a => a.status === 'tentative').length,
            declined: remainingAttendees.filter(a => a.status === 'declined').length,
            currentUserStatus: s.rsvpSummary?.currentUserStatus || 'attending'
          }
        };
      });

      return {
        ...prev,
        memberships: updatedMemberships,
        circles: updatedCircles,
        sessions: updatedSessions
      };
    });

    return { success: true };
  }

  // Schedule Study Session
  function createSession(sessionData) {
    const validation = validateSessionData(sessionData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const targetCircle = circles.find(c => c.id === sessionData.circleId);
    if (!targetCircle) return { success: false, error: 'Target circle not found' };

    const parsedAgenda = Array.isArray(sessionData.agenda)
      ? sessionData.agenda
      : String(sessionData.agenda || '')
          .split('\n')
          .filter(Boolean)
          .map(line => ({ time: 'Agenda Item', item: line.trim() }));

    const newSession = {
      id: generateId('sess'),
      circleId: targetCircle.id,
      circleTitle: targetCircle.title,
      title: sessionData.title.trim(),
      date: sessionData.date,
      time: sessionData.time,
      duration: sessionData.duration || '90m',
      modality: sessionData.modality || targetCircle.modality || 'Online',
      locationOrLink: sessionData.locationOrLink || 'https://meet.cohortcircle.org/session-live',
      hostName: currentUser.name,
      status: 'scheduled',
      agenda: parsedAgenda,
      rsvpSummary: {
        attending: 1,
        tentative: 0,
        declined: 0,
        currentUserStatus: 'attending'
      },
      attendees: [
        {
          name: currentUser.name,
          handle: currentUser.handle,
          initials: currentUser.initials,
          status: 'attending'
        }
      ]
    };

    setAppState(prev => ({
      ...prev,
      sessions: [newSession, ...prev.sessions]
    }));

    return { success: true, session: newSession };
  }

  // Update RSVP status for a session
  function updateRSVP(sessionId, newStatus) {
    setAppState(prev => {
      const updatedSessions = prev.sessions.map(s => {
        if (s.id !== sessionId) return s;

        const attendees = Array.isArray(s.attendees) ? [...s.attendees] : [];
        const existingIndex = attendees.findIndex(a => a.handle === currentUser.handle);

        if (existingIndex >= 0) {
          attendees[existingIndex] = {
            ...attendees[existingIndex],
            status: newStatus
          };
        } else {
          attendees.push({
            name: currentUser.name,
            handle: currentUser.handle,
            initials: currentUser.initials,
            status: newStatus
          });
        }

        const attendingCount = attendees.filter(a => a.status === 'attending').length;
        const tentativeCount = attendees.filter(a => a.status === 'tentative').length;
        const declinedCount = attendees.filter(a => a.status === 'declined').length;

        return {
          ...s,
          attendees,
          rsvpSummary: {
            attending: attendingCount,
            tentative: tentativeCount,
            declined: declinedCount,
            currentUserStatus: newStatus
          }
        };
      });

      return {
        ...prev,
        sessions: updatedSessions
      };
    });
  }

  // Update Settings
  function updateSettings(newSettings) {
    setAppState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings
      }
    }));
  }

  // Reset to seed
  function resetDemoData() {
    const seed = resetToSeed();
    setAppState(seed);
  }

  // Clear local data (safe empty baseline)
  function clearLocalData() {
    clearLocalStorage();
    setAppState({
      version: 1,
      currentUser: {
        id: 'usr-empty',
        name: 'New Learner',
        handle: '@learner',
        initials: 'NL',
        role: 'learner',
        bio: '',
        academicLevel: 'Independent Self-Learner',
        topics: [],
        studyStyles: [],
        availability: { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] },
        preferredModality: 'Online',
        preferredCapacity: '4–6 peers',
        profileCompleteness: 15,
        stats: { circlesJoined: 0, sessionsAttended: 0, hoursLearned: 0, activeStreakWeeks: 0 }
      },
      circles: [],
      memberships: [],
      joinRequests: [],
      sessions: [],
      activeRole: 'learner',
      settings: deepClone(DEFAULT_SETTINGS),
      lastUpdated: new Date().toISOString()
    });
  }

  // Backward-compatible handlers for existing components
  const handleRSVP = (sessionId, status) => updateRSVP(sessionId, status);
  const handleJoinCircle = (circleId, note) => {
    const circle = circles.find(c => c.id === circleId);
    if (circle?.joiningPolicy === 'moderated') {
      return createJoinRequest(circleId, note);
    }
    return joinCircle(circleId);
  };
  const handleLeaveCircle = (circleId) => leaveCircle(circleId);
  const handleCreateCircle = (circleData) => createCircle(circleData);
  const handleScheduleSession = (sessionData) => createSession(sessionData);
  const handleApplicantAction = (requestId, action) => {
    if (action === 'accept') return acceptJoinRequest(requestId);
    if (action === 'decline' || action === 'reject') return rejectJoinRequest(requestId);
  };

  const pendingRequests = joinRequests.filter(r => r.status === 'pending');

  const value = {
    currentUser,
    setCurrentUser: (updater) => {
      if (typeof updater === 'function') {
        const next = updater(currentUser);
        updateProfile(next);
      } else {
        updateProfile(updater);
      }
    },
    circles: circlesWithCompatibility,
    rawCircles: circles,
    memberships,
    joinRequests,
    pendingRequests,
    sessions,
    activeRole,
    settings,
    selectedCircleForCompat,
    setSelectedCircleForCompat,

    // Central actions
    updateProfile,
    updateAvailability,
    updatePreferences,
    switchRole,
    joinCircle,
    createJoinRequest,
    leaveCircle,
    createCircle,
    updateCircle,
    acceptJoinRequest,
    rejectJoinRequest,
    removeCircleMember,
    createSession,
    updateRSVP,
    updateSettings,
    resetDemoData,
    clearLocalData,
    getCircleCompatibility,

    // Backward compatibility delegates
    handleRSVP,
    handleJoinCircle,
    handleLeaveCircle,
    handleCreateCircle,
    handleScheduleSession,
    handleApplicantAction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
