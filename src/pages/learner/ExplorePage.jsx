import React, { useState, useMemo } from 'react';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Select/Select';
import Button from '../../components/common/Button/Button';
import CircleCard from '../../components/circles/CircleCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { useApp } from '../../context/AppContext';
import {
  IconSearch,
  IconCircles,
  IconClose
} from '../../components/common/Icons';
import {
  DEMO_CATEGORIES,
  DEMO_STUDY_STYLES,
  DEMO_MODALITIES,
  DEMO_CAPACITIES
} from '../../data/demoData';
import styles from './ExplorePage.module.css';

export default function ExplorePage() {
  const { circles, setSelectedCircleForCompat } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');
  const [selectedStyle, setSelectedStyle] = useState('All Study Styles');
  const [selectedModality, setSelectedModality] = useState('All Modalities');
  const [selectedCapacity, setSelectedCapacity] = useState('Any Capacity');
  const [selectedDay, setSelectedDay] = useState('All Days');
  const [selectedCapacityStatus, setSelectedCapacityStatus] = useState('All Circles');
  const [sortBy, setSortBy] = useState('compat'); // 'compat' | 'members' | 'title'

  // Filter circles
  const filteredCircles = useMemo(() => {
    return circles.filter(c => {
      // Search term (title, subject, description, tags, charter)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = c.title?.toLowerCase().includes(term);
        const matchesSubject = c.subject?.toLowerCase().includes(term);
        const matchesDesc = c.description?.toLowerCase().includes(term);
        const matchesCharter = c.charter?.toLowerCase().includes(term);
        const matchesTags = c.tags?.some(t => t.toLowerCase().includes(term));
        if (!matchesTitle && !matchesSubject && !matchesDesc && !matchesCharter && !matchesTags) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All Subjects' && c.category !== selectedCategory) {
        return false;
      }

      // Study style
      if (selectedStyle !== 'All Study Styles' && c.studyStyle !== selectedStyle) {
        return false;
      }

      // Modality
      if (selectedModality !== 'All Modalities' && c.modality !== selectedModality) {
        return false;
      }

      // Capacity Range
      if (selectedCapacity === 'Micro (2–4)' && c.maxCapacity > 4) return false;
      if (selectedCapacity === 'Standard (5–8)' && (c.maxCapacity < 5 || c.maxCapacity > 8)) return false;
      if (selectedCapacity === 'Large (8+)' && c.maxCapacity < 8) return false;

      // Meeting Day
      if (selectedDay !== 'All Days') {
        const dayPrefix = selectedDay.substring(0, 3).toLowerCase();
        const matchesScheduleDay = c.schedule?.days?.some(d => d.toLowerCase().startsWith(dayPrefix));
        const matchesMeetingTime = c.meetingTime?.toLowerCase().includes(dayPrefix);
        if (!matchesScheduleDay && !matchesMeetingTime) {
          return false;
        }
      }

      // Capacity Status (Open vs Full)
      if (selectedCapacityStatus === 'Available Seats Only' && c.membersCount >= c.maxCapacity) {
        return false;
      }
      if (selectedCapacityStatus === 'Full Cohorts' && c.membersCount < c.maxCapacity) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'compat') {
        return (b.compatibility?.overallScore || 0) - (a.compatibility?.overallScore || 0);
      }
      if (sortBy === 'members') {
        return b.membersCount - a.membersCount;
      }
      return a.title.localeCompare(b.title);
    });
  }, [
    circles,
    searchTerm,
    selectedCategory,
    selectedStyle,
    selectedModality,
    selectedCapacity,
    selectedDay,
    selectedCapacityStatus,
    sortBy
  ]);

  function handleResetFilters() {
    setSearchTerm('');
    setSelectedCategory('All Subjects');
    setSelectedStyle('All Study Styles');
    setSelectedModality('All Modalities');
    setSelectedCapacity('Any Capacity');
    setSelectedDay('All Days');
    setSelectedCapacityStatus('All Circles');
    setSortBy('compat');
  }

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== 'All Subjects' ||
    selectedStyle !== 'All Study Styles' ||
    selectedModality !== 'All Modalities' ||
    selectedCapacity !== 'Any Capacity' ||
    selectedDay !== 'All Days' ||
    selectedCapacityStatus !== 'All Circles';

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Explore Study Circles"
        subtitle="Discover verified cohorts matching your subjects, free schedule, and preferred study styles."
        action={
          hasActiveFilters ? (
            <Button
              variant="outline"
              size="sm"
              iconLeft={<IconClose size={14} />}
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          ) : null
        }
      />

      {/* Search & Main Filter Bar */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchInputWrapper}>
          <Input
            placeholder="Search by topic, syllabus, or keyword (e.g. Algorithms, HCI, Raft)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            iconLeft={<IconSearch size={18} />}
          />
        </div>

        <div className={styles.sortSelectWrapper}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: 'Sort by: Highest Compatibility', value: 'compat' },
              { label: 'Sort by: Most Members', value: 'members' },
              { label: 'Sort by: Circle Title (A–Z)', value: 'title' }
            ]}
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className={styles.categoryPillsBar} role="tablist" aria-label="Subject Categories">
        {DEMO_CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat}
            className={`${styles.catPill} ${selectedCategory === cat ? styles.catPillActive : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Dropdowns Grid */}
      <div className={styles.filterControlsGrid}>
        <Select
          label="Study Style"
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          options={DEMO_STUDY_STYLES}
        />

        <Select
          label="Modality"
          value={selectedModality}
          onChange={(e) => setSelectedModality(e.target.value)}
          options={DEMO_MODALITIES}
        />

        <Select
          label="Cohort Size"
          value={selectedCapacity}
          onChange={(e) => setSelectedCapacity(e.target.value)}
          options={DEMO_CAPACITIES}
        />

        <Select
          label="Meeting Day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          options={[
            'All Days',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ]}
        />

        <Select
          label="Capacity Status"
          value={selectedCapacityStatus}
          onChange={(e) => setSelectedCapacityStatus(e.target.value)}
          options={[
            'All Circles',
            'Available Seats Only',
            'Full Cohorts'
          ]}
        />
      </div>

      {/* Results Header Count */}
      <div className={styles.resultsMeta}>
        <span className={styles.resultsCount}>
          Showing <strong>{filteredCircles.length}</strong> study circles
        </span>
        {hasActiveFilters && (
          <span className={styles.filteredLabel}>• Active filters applied</span>
        )}
      </div>

      {/* Circles Grid */}
      {filteredCircles.length === 0 ? (
        <EmptyState
          icon={<IconCircles size={36} />}
          title="No study circles match your filters"
          description="Try broadening your subject keywords, clearing specific study styles, or resetting filters."
          action={
            <Button variant="primary" onClick={handleResetFilters}>
              Reset All Filters
            </Button>
          }
        />
      ) : (
        <div className={styles.circlesGrid}>
          {filteredCircles.map(circle => (
            <CircleCard
              key={circle.id}
              circle={circle}
              onInspectCompatibility={(c) => setSelectedCircleForCompat(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
