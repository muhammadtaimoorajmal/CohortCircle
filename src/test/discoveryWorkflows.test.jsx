import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import ExplorePage from '../pages/learner/ExplorePage';
import { resetToSeed } from '../services/storageService';

describe('Discovery, Search & Multi-Criteria Filtering (FR-005 to FR-011)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetToSeed();
  });

  const renderExplore = () => {
    return render(
      <MemoryRouter>
        <AppProvider>
          <ExplorePage />
        </AppProvider>
      </MemoryRouter>
    );
  };

  it('renders directory with all active study circles and metadata', () => {
    renderExplore();
    expect(screen.getByText(/Explore Study Circles/i)).toBeInTheDocument();
    expect(screen.getByText(/Algorithms & LeetCode Problem Solvers/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Design & HCI Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Distributed Systems & Cloud Architecture/i)).toBeInTheDocument();
  });

  it('filters directory by search query in real-time across title, subject, and tags', () => {
    renderExplore();
    const searchInput = screen.getByPlaceholderText(/Search by topic/i);

    // Search for "Algorithms"
    fireEvent.change(searchInput, { target: { value: 'Algorithms' } });
    expect(screen.getByText(/Algorithms & LeetCode Problem Solvers/i)).toBeInTheDocument();
    expect(screen.queryByText(/Language Exchange & Cultural Dialogue/i)).not.toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText(/Language Exchange & Cultural Dialogue/i)).toBeInTheDocument();
  });

  it('filters by category tab pill and refines displayed circles', () => {
    renderExplore();
    const mathCategoryPill = screen.getByRole('tab', { name: 'Mathematics' });
    fireEvent.click(mathCategoryPill);

    expect(screen.getByText(/Mathematics Practice & Proof Analysis/i)).toBeInTheDocument();
    expect(screen.queryByText(/Product Design & HCI Studio/i)).not.toBeInTheDocument();
  });

  it('applies multiple filters simultaneously using logical AND', () => {
    renderExplore();

    const modalitySelect = screen.getByLabelText(/Modality/i);
    fireEvent.change(modalitySelect, { target: { value: 'In-Person' } });

    // In-person circle (Mathematics) should remain visible
    expect(screen.getByText(/Mathematics Practice & Proof Analysis/i)).toBeInTheDocument();
    // Online circles should be filtered out
    expect(screen.queryByText(/Algorithms & LeetCode Problem Solvers/i)).not.toBeInTheDocument();
  });

  it('reset filters button restores all circles to the default unfiltered state', () => {
    renderExplore();
    const searchInput = screen.getByPlaceholderText(/Search by topic/i);
    fireEvent.change(searchInput, { target: { value: 'Distributed' } });

    expect(screen.queryByText(/Mathematics Practice & Proof Analysis/i)).not.toBeInTheDocument();

    // Reset button should now be visible
    const resetBtn = screen.getByRole('button', { name: /Reset Filters/i });
    fireEvent.click(resetBtn);

    // Full catalog restored
    expect(screen.getByText(/Mathematics Practice & Proof Analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Design & HCI Studio/i)).toBeInTheDocument();
  });
});
