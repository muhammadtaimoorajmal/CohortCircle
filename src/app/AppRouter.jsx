import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './AppShell';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import AboutPage from '../pages/public/AboutPage';

// Authenticated / App Pages
import DashboardPage from '../pages/dashboard/DashboardPage';
import ExplorePage from '../pages/learner/ExplorePage';
import CircleDetailsPage from '../pages/learner/CircleDetailsPage';
import MyCirclesPage from '../pages/learner/MyCirclesPage';
import ProfilePage from '../pages/learner/ProfilePage';
import HostDashboardPage from '../pages/host/HostDashboardPage';
import CreateCirclePage from '../pages/host/CreateCirclePage';
import ManageCirclePage from '../pages/host/ManageCirclePage';
import SessionsPage from '../pages/sessions/SessionsPage';
import SessionDetailsPage from '../pages/sessions/SessionDetailsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Marketing Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Authenticated / In-App Workspace Routes */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="circles/:circleId" element={<CircleDetailsPage />} />
        <Route path="my-circles" element={<MyCirclesPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Host Facilitation Routes */}
        <Route path="host" element={<HostDashboardPage />} />
        <Route path="host/create" element={<CreateCirclePage />} />
        <Route path="host/manage/:circleId" element={<ManageCirclePage />} />

        {/* Study Sessions Routes */}
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="sessions/:sessionId" element={<SessionDetailsPage />} />

        {/* Settings & Demo Data */}
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
