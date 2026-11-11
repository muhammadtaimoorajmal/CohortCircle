import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import AppRouter from '../app/AppRouter';

function renderWithRouter(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </MemoryRouter>
  );
}

describe('CohortCircle React Application Foundation', () => {
  it('renders the public landing page with product branding and CTAs', () => {
    renderWithRouter('/');
    expect(screen.getAllByText(/Find your people/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Learn together/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Explore/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Open Demo Workspace/i })[0]).toBeInTheDocument();
  });

  it('renders the public about page', () => {
    renderWithRouter('/about');
    expect(screen.getByText(/About the Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Architectural Principles/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Source Project Governance/i)).toBeInTheDocument();
  });

  it('renders the learner dashboard with welcome area and stats', () => {
    renderWithRouter('/app/dashboard');
    expect(screen.getByText(/Welcome back, Alex Rivera!/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile Completeness/i)).toBeInTheDocument();
    expect(screen.getByText(/My Active Circles/i)).toBeInTheDocument();
  });

  it('renders the explore circles page with search and category filters', () => {
    renderWithRouter('/app/explore');
    expect(screen.getAllByText(/Explore Study Circles/i)[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by topic, syllabus, or keyword/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Computer Science/i })).toBeInTheDocument();
  });

  it('renders circle details page with charter, format and host info', () => {
    renderWithRouter('/app/circles/circle-alg-01');
    expect(screen.getByRole('heading', { level: 1, name: /Algorithms & LeetCode Problem Solvers/i })).toBeInTheDocument();
    expect(screen.getByText(/Circle Charter & Expectations/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Circle Facilitator/i)[0]).toBeInTheDocument();
  });

  it('renders my circles page with active memberships', () => {
    renderWithRouter('/app/my-circles');
    expect(screen.getAllByText(/My Study Circles/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Active Memberships/i)).toBeInTheDocument();
  });

  it('renders learner profile page with availability matrix', () => {
    renderWithRouter('/app/profile');
    expect(screen.getAllByText(/Learner Profile/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Weekly Availability Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/All Weekdays \(6–10 PM\)/i)).toBeInTheDocument();
  });

  it('renders host dashboard with admission queue', () => {
    renderWithRouter('/app/host');
    expect(screen.getAllByText(/Host Facilitation Console/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Your Hosted Cohorts/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Pending Admissions/i)[0]).toBeInTheDocument();
  });

  it('renders create circle multi-step wizard', () => {
    renderWithRouter('/app/host/create');
    expect(screen.getAllByText(/Create a New Study Circle/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Basics & Topics/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue to Step 2/i })).toBeInTheDocument();
  });

  it('renders study sessions timetable', () => {
    renderWithRouter('/app/sessions');
    expect(screen.getAllByText(/Study Sessions/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schedule New Session/i })).toBeInTheDocument();
  });

  it('renders settings and demo data console', () => {
    renderWithRouter('/app/settings');
    expect(screen.getAllByText(/Settings/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Local Demonstration Environment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Restore Initial Demo Data/i })).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderWithRouter('/non-existent-route-xyz');
    expect(screen.getByText(/404 — Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return to Dashboard/i })).toBeInTheDocument();
  });
});
