import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card/Card';
import Button from '../common/Button/Button';
import RSVPControl from './RSVPControl';
import Avatar from '../common/Avatar/Avatar';
import { IconLocation, IconChevronRight } from '../common/Icons';
import styles from './SessionCard.module.css';

export default function SessionCard({
  session,
  showRSVP = true,
  onRSVPChange,
  className = ''
}) {
  const {
    id,
    circleId,
    circleTitle,
    title,
    date,
    time,
    duration,
    modality,
    rsvpSummary,
    attendees = []
  } = session;

  return (
    <Card className={`${styles.card} ${className}`} padding="md">
      <div className={styles.topRow}>
        <div className={styles.dateBadge}>
          <span className={styles.dateText}>{date}</span>
          <span className={styles.timeText}>{time} ({duration})</span>
        </div>
        <div className={styles.metaBadge}>
          <IconLocation size={14} />
          <span>{modality}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.circleLink}>
          <Link to={`/app/circles/${circleId}`}>
            {circleTitle}
          </Link>
        </div>
        <h3 className={styles.title}>
          <Link to={`/app/sessions/${id}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.attendeesArea}>
          <div className={styles.avatarStack}>
            {attendees.slice(0, 3).map((a, i) => (
              <Avatar
                key={i}
                name={a.name}
                initials={a.initials}
                size="xs"
                className={styles.stackedAvatar}
                style={{ zIndex: 10 - i }}
              />
            ))}
          </div>
          <span className={styles.attendeeCount}>
            {rsvpSummary?.attending || attendees.length} attending
          </span>
        </div>

        <div className={styles.actionArea}>
          {showRSVP && (
            <RSVPControl
              initialStatus={rsvpSummary?.currentUserStatus || 'attending'}
              onStatusChange={(status) => onRSVPChange?.(id, status)}
            />
          )}
          <Link to={`/app/sessions/${id}`}>
            <Button size="sm" variant="ghost" iconRight={<IconChevronRight size={14} />}>
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
