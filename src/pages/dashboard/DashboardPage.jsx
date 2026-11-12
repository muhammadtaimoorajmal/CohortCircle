import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import CircleCard from '../../components/circles/CircleCard';
import SessionCard from '../../components/sessions/SessionCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { useApp } from '../../context/AppContext';
import {
  IconExplore,
  IconArrowRight,
  IconSparkles,
  IconPlus,
  IconCircles,
  IconCheck
} from '../../components/common/Icons';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const {
    currentUser,
    circles,
    memberships,
    sessions,
    pendingRequests,
    updateRSVP,
    setSelectedCircleForCompat
  } = useApp();

  const joinedCircles = circles.filter(c => c.isJoined);
  const suggestedCircles = circles
    .filter(c => !c.isJoined && c.joiningPolicy !== 'closed')
    .sort((a, b) => (b.compatibility?.overallScore || 0) - (a.compatibility?.overallScore || 0));

  const upcomingSessions = sessions.filter(s => s.status !== 'cancelled').slice(0, 3);
  const peerCount = memberships.filter(
    m => joinedCircles.some(c => c.id === m.circleId) && m.userId !== currentUser.id
  ).length;

  return (
    <div className={styles.page}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.welcomeLeft}>
          <h1 className={styles.greeting}>Welcome back, {currentUser.name}!</h1>
          <p className={styles.tagline}>
            You have <strong className={styles.highlight}>{upcomingSessions.length} upcoming study sessions</strong> this week across {joinedCircles.length} active circles.
          </p>
        </div>

        <div className={styles.welcomeRight}>
          <Link to="/app/explore">
            <Button variant="primary" iconLeft={<IconExplore size={16} />}>
              Find New Circles
            </Button>
          </Link>
          <Link to="/app/host/create">
            <Button variant="outline" iconLeft={<IconPlus size={16} />}>
              Create Circle
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Health Bar / Stats Strip */}
      <div className={styles.statsStrip}>
        <Card padding="md" className={styles.statCard}>
          <div className={styles.statTop}>
            <span className={styles.statLabel}>Profile Completeness</span>
            <span className={styles.statVal}>{currentUser.profileCompleteness}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${currentUser.profileCompleteness}%` }}
            />
          </div>
          <span className={styles.statSub}>High matching accuracy enabled</span>
        </Card>

        <Card padding="md" className={styles.statCard}>
          <span className={styles.statLabel}>Active Circles</span>
          <span className={styles.statNumber}>{joinedCircles.length}</span>
          <span className={styles.statSub}>Collaborating with ~{peerCount || (joinedCircles.length * 3)} peers</span>
        </Card>

        <Card padding="md" className={styles.statCard}>
          <span className={styles.statLabel}>Study Hours Logged</span>
          <span className={styles.statNumber}>{currentUser.stats?.hoursLearned || 28}h</span>
          <span className={styles.statSub}>4-week active study streak</span>
        </Card>

        <Card padding="md" className={styles.statCard}>
          <span className={styles.statLabel}>Pending Requests</span>
          <span className={styles.statNumber}>{pendingRequests.length}</span>
          <span className={styles.statSub}>Applicants awaiting your review</span>
        </Card>
      </div>

      {/* Main Grid: Left (Circles & Suggestions), Right (Upcoming Sessions & Quick Actions) */}
      <div className={styles.layoutGrid}>
        {/* Left Column: Active & Suggested Circles */}
        <div className={styles.leftCol}>
          {/* Active Circles Section */}
          <section className={styles.section}>
            <SectionHeader
              title="My Active Circles"
              subtitle="Study cohorts you are actively participating in"
              action={
                <Link to="/app/my-circles">
                  <Button variant="ghost" size="sm" iconRight={<IconArrowRight size={14} />}>
                    View All ({joinedCircles.length})
                  </Button>
                </Link>
              }
            />

            {joinedCircles.length === 0 ? (
              <EmptyState
                icon={<IconCircles size={32} />}
                title="No joined circles yet"
                description="Explore open study circles matching your topics and preferred format."
                action={
                  <Link to="/app/explore">
                    <Button variant="primary">Explore Circles</Button>
                  </Link>
                }
              />
            ) : (
              <div className={styles.circlesGrid}>
                {joinedCircles.map(circle => (
                  <CircleCard
                    key={circle.id}
                    circle={circle}
                    onInspectCompatibility={(c) => setSelectedCircleForCompat(c)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Suggested Circles Section */}
          <section className={styles.section}>
            <SectionHeader
              title="Recommended for You"
              subtitle="Circles with 80%+ compatibility based on your study style and availability"
              badge={
                <Badge variant="teal" size="sm" icon={<IconSparkles size={12} />}>
                  Rule-Based Matches
                </Badge>
              }
              action={
                <Link to="/app/explore">
                  <Button variant="ghost" size="sm" iconRight={<IconArrowRight size={14} />}>
                    Browse Directory
                  </Button>
                </Link>
              }
            />

            <div className={styles.circlesGrid}>
              {suggestedCircles.slice(0, 2).map(circle => (
                <CircleCard
                  key={circle.id}
                  circle={circle}
                  onInspectCompatibility={(c) => setSelectedCircleForCompat(c)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Upcoming Sessions & Agenda */}
        <div className={styles.rightCol}>
          <section className={styles.section}>
            <SectionHeader
              title="Upcoming Sessions"
              subtitle="Your scheduled study dates"
              action={
                <Link to="/app/sessions">
                  <Button variant="ghost" size="sm" iconRight={<IconArrowRight size={14} />}>
                    Calendar
                  </Button>
                </Link>
              }
            />

            <div className={styles.sessionsList}>
              {upcomingSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onRSVPChange={updateRSVP}
                />
              ))}
            </div>
          </section>

          {/* Quick Study Checklist */}
          <Card padding="md" className={styles.checklistCard}>
            <h3 className={styles.checklistTitle}>Study Preparation</h3>
            <ul className={styles.checkList}>
              <li className={styles.checkItem}>
                <IconCheck size={16} className={styles.checkIcon} />
                <span>Review Dijkstra graph notes for Algorithms circle</span>
              </li>
              <li className={styles.checkItem}>
                <IconCheck size={16} className={styles.checkIcon} />
                <span>Submit RSVP status for Thursday Design Critique</span>
              </li>
              <li className={styles.checkItem}>
                <IconCheck size={16} className={styles.checkIcon} />
                <span>Read Raft paper Section 5.3 before Saturday</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
