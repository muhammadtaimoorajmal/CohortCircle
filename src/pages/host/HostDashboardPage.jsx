import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Avatar from '../../components/common/Avatar/Avatar';
import Modal from '../../components/common/Modal/Modal';
import SessionCard from '../../components/sessions/SessionCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { useApp } from '../../context/AppContext';
import {
  IconPlus,
  IconUsers,
  IconCheck,
  IconClock,
  IconChevronRight
} from '../../components/common/Icons';
import styles from './HostDashboardPage.module.css';

export default function HostDashboardPage() {
  const {
    circles,
    sessions,
    pendingRequests,
    handleApplicantAction,
    handleRSVP
  } = useApp();

  const [declineTarget, setDeclineTarget] = useState(null);

  const hostedCircles = circles.filter(c => c.isHostedByMe);
  const hostedSessions = sessions.filter(s => s.hostName?.includes('Alex Rivera') || s.hostName?.includes('You'));

  function confirmDecline() {
    if (declineTarget) {
      handleApplicantAction(declineTarget.id, 'decline');
      setDeclineTarget(null);
    }
  }

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Host Facilitation Console"
        subtitle="Manage your hosted cohorts, review applicant admission queues, and schedule group sessions."
        action={
          <div className={styles.topActions}>
            <Link to="/app/host/create">
              <Button variant="primary" iconLeft={<IconPlus size={16} />}>
                Create Study Circle
              </Button>
            </Link>
            <Link to="/app/sessions">
              <Button variant="outline" iconLeft={<IconClock size={16} />}>
                Schedule Session
              </Button>
            </Link>
          </div>
        }
      />

      {/* Host Metrics Bar */}
      <div className={styles.metricsGrid}>
        <Card padding="md" className={styles.metricCard}>
          <span className={styles.metricLabel}>Hosted Circles</span>
          <span className={styles.metricVal}>{hostedCircles.length}</span>
          <span className={styles.metricSub}>Active facilitation</span>
        </Card>

        <Card padding="md" className={styles.metricCard}>
          <span className={styles.metricLabel}>Total Members</span>
          <span className={styles.metricVal}>
            {hostedCircles.reduce((sum, c) => sum + c.membersCount, 0)}
          </span>
          <span className={styles.metricSub}>Across all your cohorts</span>
        </Card>

        <Card padding="md" className={styles.metricCard}>
          <span className={styles.metricLabel}>Pending Applicants</span>
          <span className={styles.metricVal}>{pendingRequests.length}</span>
          <span className={styles.metricSub}>Require admission review</span>
        </Card>

        <Card padding="md" className={styles.metricCard}>
          <span className={styles.metricLabel}>Scheduled Sessions</span>
          <span className={styles.metricVal}>{hostedSessions.length}</span>
          <span className={styles.metricSub}>Next on Saturday 10:00 AM</span>
        </Card>
      </div>

      <div className={styles.layoutGrid}>
        {/* Left Column: Hosted Circles & Management */}
        <div className={styles.leftCol}>
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Your Hosted Cohorts</h2>
            {hostedCircles.length === 0 ? (
              <EmptyState
                icon={<IconUsers size={32} />}
                title="You have not created any circles yet"
                description="Become a peer facilitator and launch a focused study cohort."
                action={
                  <Link to="/app/host/create">
                    <Button variant="primary">Create First Circle</Button>
                  </Link>
                }
              />
            ) : (
              <div className={styles.circlesList}>
                {hostedCircles.map(c => (
                  <Card key={c.id} padding="lg" className={styles.hostedCard}>
                    <div className={styles.hostedHeader}>
                      <div>
                        <Badge variant="teal" size="sm">Host Owner</Badge>
                        <h3 className={styles.hostedTitle}>{c.title}</h3>
                        <p className={styles.hostedSub}>{c.subject} • {c.meetingTime}</p>
                      </div>
                      <Link to={`/app/host/manage/${c.id}`}>
                        <Button variant="outline" size="sm" iconRight={<IconChevronRight size={14} />}>
                          Manage Roster & Settings
                        </Button>
                      </Link>
                    </div>

                    <div className={styles.hostedStats}>
                      <span className={styles.statItem}>
                        <strong>{c.membersCount}</strong> of {c.maxCapacity} members
                      </span>
                      <span className={styles.statItem}>
                        Policy: <strong>{c.joiningPolicy}</strong>
                      </span>
                      <span className={styles.statItem}>
                        Modality: <strong>{c.modality}</strong>
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Hosted Sessions */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Sessions You Are Facilitating</h2>
            <div className={styles.sessionsList}>
              {hostedSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onRSVPChange={handleRSVP}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Pending Applicants Queue */}
        <div className={styles.rightCol}>
          <section className={styles.section}>
            <div className={styles.queueHeader}>
              <h2 className={styles.sectionHeading}>Pending Admissions</h2>
              <Badge variant={pendingRequests.length > 0 ? 'primary' : 'neutral'} size="sm">
                {pendingRequests.length} Waiting
              </Badge>
            </div>

            {pendingRequests.length === 0 ? (
              <Card padding="md" className={styles.emptyCard}>
                <p className={styles.emptyText}>All applicant requests have been reviewed.</p>
              </Card>
            ) : (
              <div className={styles.applicantsList}>
                {pendingRequests.map(req => (
                  <Card key={req.id} padding="md" className={styles.applicantCard}>
                    <div className={styles.applicantHeader}>
                      <Avatar
                        name={req.applicant.name}
                        initials={req.applicant.initials}
                        color={req.applicant.avatarColor}
                        size="md"
                      />
                      <div className={styles.applicantMeta}>
                        <h4 className={styles.applicantName}>{req.applicant.name}</h4>
                        <span className={styles.applicantHandle}>
                          {req.applicant.handle} • {req.applicant.academicLevel}
                        </span>
                      </div>
                      <Badge variant="teal" size="sm">
                        {req.applicant.compatibilityScore}% Match
                      </Badge>
                    </div>

                    <div className={styles.circleTarget}>
                      <span>Applied to: <strong>{req.circleTitle}</strong></span>
                      <span className={styles.requestedAt}>{req.requestedAt}</span>
                    </div>

                    <div className={styles.introNoteBox}>
                      <p className={styles.introNote}>"{req.introNote}"</p>
                    </div>

                    <div className={styles.applicantActions}>
                      <Button
                        variant="primary"
                        size="sm"
                        iconLeft={<IconCheck size={14} />}
                        onClick={() => handleApplicantAction(req.id, 'accept')}
                      >
                        Accept & Admit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={styles.declineBtn}
                        onClick={() => setDeclineTarget(req)}
                      >
                        Decline
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Decline Confirmation Modal - Addresses UX-002 */}
      <Modal
        isOpen={Boolean(declineTarget)}
        onClose={() => setDeclineTarget(null)}
        title="Confirm Applicant Decline"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeclineTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDecline}>
              Confirm Decline
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          Are you sure you want to decline the membership application from <strong>{declineTarget?.applicant.name}</strong> for {declineTarget?.circleTitle}? This action will remove the applicant from your queue.
        </p>
      </Modal>
    </div>
  );
}
