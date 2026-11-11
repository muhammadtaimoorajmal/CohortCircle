import React, { createContext, useContext, useState } from 'react';
import {
  DEMO_CURRENT_USER,
  DEMO_CIRCLES,
  DEMO_SESSIONS,
  DEMO_PENDING_REQUESTS
} from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEMO_CURRENT_USER);
  const [circles, setCircles] = useState(DEMO_CIRCLES);
  const [sessions, setSessions] = useState(DEMO_SESSIONS);
  const [pendingRequests, setPendingRequests] = useState(DEMO_PENDING_REQUESTS);
  const [activeRole, setActiveRole] = useState(DEMO_CURRENT_USER.role); // 'learner' | 'host'
  const [selectedCircleForCompat, setSelectedCircleForCompat] = useState(null);

  // Quick Action Handlers for realistic demonstration
  function switchRole(role) {
    setActiveRole(role);
  }

  function handleRSVP(sessionId, newStatus) {
    setSessions(prev =>
      prev.map(s => {
        if (s.id !== sessionId) return s;
        const currentStatus = s.rsvpSummary?.currentUserStatus;
        let deltaAttending = 0;
        let deltaTentative = 0;
        let deltaDeclined = 0;

        if (currentStatus === 'attending') deltaAttending--;
        else if (currentStatus === 'tentative') deltaTentative--;
        else if (currentStatus === 'declined') deltaDeclined--;

        if (newStatus === 'attending') deltaAttending++;
        else if (newStatus === 'tentative') deltaTentative++;
        else if (newStatus === 'declined') deltaDeclined++;

        return {
          ...s,
          rsvpSummary: {
            ...s.rsvpSummary,
            currentUserStatus: newStatus,
            attending: Math.max(0, (s.rsvpSummary?.attending || 0) + deltaAttending),
            tentative: Math.max(0, (s.rsvpSummary?.tentative || 0) + deltaTentative),
            declined: Math.max(0, (s.rsvpSummary?.declined || 0) + deltaDeclined)
          }
        };
      })
    );
  }

  function handleJoinCircle(circleId, _introNote = '') {
    setCircles(prev =>
      prev.map(c => {
        if (c.id !== circleId) return c;
        if (c.joiningPolicy === 'open') {
          return {
            ...c,
            isJoined: true,
            membersCount: c.membersCount + 1
          };
        }
        return c;
      })
    );
  }

  function handleLeaveCircle(circleId) {
    setCircles(prev =>
      prev.map(c => {
        if (c.id !== circleId) return c;
        return {
          ...c,
          isJoined: false,
          membersCount: Math.max(1, c.membersCount - 1)
        };
      })
    );
  }

  function handleCreateCircle(newCircle) {
    setCircles(prev => [newCircle, ...prev]);
  }

  function handleScheduleSession(newSession) {
    setSessions(prev => [newSession, ...prev]);
  }

  function handleApplicantAction(requestId, action) {
    // action: 'accept' | 'decline'
    const targetReq = pendingRequests.find(r => r.id === requestId);
    if (!targetReq) return;

    setPendingRequests(prev => prev.filter(r => r.id !== requestId));

    if (action === 'accept') {
      setCircles(prev =>
        prev.map(c => {
          if (c.id !== targetReq.circleId) return c;
          return {
            ...c,
            membersCount: c.membersCount + 1
          };
        })
      );
    }
  }

  function resetDemoData() {
    setCurrentUser(DEMO_CURRENT_USER);
    setCircles(DEMO_CIRCLES);
    setSessions(DEMO_SESSIONS);
    setPendingRequests(DEMO_PENDING_REQUESTS);
    setActiveRole('learner');
  }

  const value = {
    currentUser,
    setCurrentUser,
    circles,
    sessions,
    pendingRequests,
    activeRole,
    switchRole,
    handleRSVP,
    handleJoinCircle,
    handleLeaveCircle,
    handleCreateCircle,
    handleScheduleSession,
    handleApplicantAction,
    resetDemoData,
    selectedCircleForCompat,
    setSelectedCircleForCompat
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
