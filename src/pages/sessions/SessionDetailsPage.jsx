import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';
import Avatar from '../../components/common/Avatar/Avatar';
import RSVPControl from '../../components/sessions/RSVPControl';
import { useApp } from '../../context/AppContext';
import {
  IconClock,
  IconLocation,
  IconChevronLeft,
  IconUsers
} from '../../components/common/Icons';
import styles from './SessionDetailsPage.module.css';

export default function SessionDetailsPage() {
  const { sessionId } = useParams();
  const { sessions, updateRSVP } = useApp();

  const session = sessions.find(s => s.id === sessionId);

  if (!session) {
    return (
      <div className={styles.page}>
        <div className={styles.topNav}>
          <Link to="/app/sessions" className={styles.backLink}>
            <IconChevronLeft size={16} />
            <span>Back to All Sessions</span>
          </Link>
        </div>
        <Card padding="lg" style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px' }}>
          <h2>Study Session Not Found</h2>
          <p style={{ margin: '12px 0 24px', color: 'var(--color-text-secondary, #94a3b8)' }}>
            The requested session could not be located in your schedule.
          </p>
          <Link to="/app/sessions">
            <Button variant="primary">Return to Sessions</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const {
    id,
    circleId,
    circleTitle,
    title,
    date,
    time,
    duration,
    modality,
    locationOrLink,
    hostName,
    agenda = [],
    rsvpSummary,
    attendees = []
  } = session;

  return (
    <div className={styles.page}>
      {/* Back nav */}
      <div className={styles.topNav}>
        <Link to="/app/sessions" className={styles.backLink}>
          <IconChevronLeft size={16} />
          <span>Back to All Sessions</span>
        </Link>
      </div>

      {/* Main Session Banner Card */}
      <Card padding="lg" className={styles.heroCard}>
        <div className={styles.heroTop}>
          <div className={styles.circleLinkBox}>
            <Link to={`/app/circles/${circleId}`} className={styles.circleLink}>
              {circleTitle}
            </Link>
          </div>
          <Badge variant="teal" size="md">
            Scheduled Session
          </Badge>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.hostLine}>Facilitated by <strong>{hostName}</strong></p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <IconClock size={18} className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>Date & Time</span>
              <span className={styles.metaVal}>{date} at {time} ({duration})</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <IconLocation size={18} className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>Modality & Access</span>
              <span className={styles.metaVal}>{modality} • {locationOrLink}</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <IconUsers size={18} className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>Attendance</span>
              <span className={styles.metaVal}>{rsvpSummary?.attending || attendees.length} Confirmed</span>
            </div>
          </div>
        </div>

        {/* User RSVP Action */}
        <div className={styles.rsvpRow}>
          <span className={styles.rsvpPrompt}>Your Attendance Status:</span>
          <RSVPControl
            initialStatus={rsvpSummary?.currentUserStatus || 'attending'}
            onStatusChange={(newStatus) => updateRSVP(id, newStatus)}
          />
        </div>
      </Card>

      {/* 2-Column Details: Left Agenda, Right Attendees */}
      <div className={styles.contentGrid}>
        {/* Left: Agenda */}
        <div className={styles.leftCol}>
          <Card padding="lg" className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Structured Session Agenda</h2>
            <p className={styles.sectionSub}>
              Timed breakdown agreed upon by the cohort to keep discussions focused.
            </p>

            <div className={styles.agendaTimeline}>
              {agenda.map((item, idx) => (
                <div key={idx} className={styles.agendaItem}>
                  <div className={styles.timeBadge}>{item.time}</div>
                  <div className={styles.agendaText}>{item.item}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Attendees Roster */}
        <div className={styles.rightCol}>
          <Card padding="lg" className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Attendee Roster</h2>
            <div className={styles.attendeesList}>
              {attendees.map((attendee, idx) => (
                <div key={idx} className={styles.attendeeRow}>
                  <div className={styles.attendeeInfo}>
                    <Avatar name={attendee.name} initials={attendee.initials} size="sm" />
                    <div className={styles.attendeeMeta}>
                      <span className={styles.attendeeName}>{attendee.name}</span>
                      <span className={styles.attendeeHandle}>{attendee.handle}</span>
                    </div>
                  </div>
                  <Badge
                    variant={attendee.status === 'attending' ? 'teal' : attendee.status === 'tentative' ? 'warning' : 'neutral'}
                    size="sm"
                  >
                    {attendee.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
