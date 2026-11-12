import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';
import Button from '../common/Button/Button';
import Avatar from '../common/Avatar/Avatar';
import CompatibilityIndicator from './CompatibilityIndicator';
import StudyStyleBadge from './StudyStyleBadge';
import MemberStack from './MemberStack';
import { IconClock, IconLocation, IconChevronRight } from '../common/Icons';
import styles from './CircleCard.module.css';

export default function CircleCard({
  circle,
  onInspectCompatibility,
  className = ''
}) {
  const {
    id,
    title,
    subject,
    description,
    host,
    membersCount,
    maxCapacity,
    joiningPolicy,
    studyStyle,
    modality,
    meetingTime,
    compatibility,
    isJoined,
    isHostedByMe
  } = circle;

  const isFull = membersCount >= maxCapacity;

  return (
    <Card hoverable className={`${styles.circleCard} ${className}`} padding="md">
      {/* Header meta */}
      <div className={styles.headerRow}>
        <div className={styles.subjectPill}>
          <span className={styles.subjectText}>{subject}</span>
        </div>
        <div className={styles.topRight}>
          {compatibility && (
            <CompatibilityIndicator
              score={compatibility.overallScore}
              size="sm"
              onClick={onInspectCompatibility ? () => onInspectCompatibility(circle) : undefined}
            />
          )}
          <Badge
            variant={joiningPolicy === 'open' ? 'teal' : joiningPolicy === 'moderated' ? 'primary' : 'neutral'}
            size="sm"
          >
            {joiningPolicy === 'open' ? 'Open' : joiningPolicy === 'moderated' ? 'Moderated' : 'Closed'}
          </Badge>
        </div>
      </div>

      {/* Main Title & Description */}
      <h3 className={styles.title}>
        <Link to={`/app/circles/${id}`} className={styles.titleLink}>
          {title}
        </Link>
      </h3>
      <p className={styles.description}>{description}</p>

      {/* Study Style & Logistics Badges */}
      <div className={styles.tagsRow}>
        <StudyStyleBadge styleName={studyStyle} />
        <span className={styles.metaItem}>
          <IconLocation size={14} className={styles.metaIcon} />
          {modality}
        </span>
        <span className={styles.metaItem}>
          <IconClock size={14} className={styles.metaIcon} />
          {(meetingTime || '').split(',')[0] || meetingTime}
        </span>
      </div>

      {/* Footer: Host, Members, Action */}
      <div className={styles.footerRow}>
        <div className={styles.hostAndMembers}>
          <div className={styles.hostInfo} title={`Hosted by ${host?.name || 'Facilitator'}`}>
            <Avatar name={host?.name} initials={host?.initials} color={host?.avatarColor} size="xs" />
            <span className={styles.hostName}>{host?.name}</span>
          </div>
          <span className={styles.divider}>•</span>
          <MemberStack count={membersCount} max={maxCapacity} />
        </div>

        <div className={styles.actionArea}>
          {isHostedByMe ? (
            <Link to={`/app/host/manage/${id}`}>
              <Button size="sm" variant="outline" iconRight={<IconChevronRight size={14} />}>
                Manage
              </Button>
            </Link>
          ) : isJoined ? (
            <Link to={`/app/circles/${id}`}>
              <Button size="sm" variant="secondary">
                View Workspace
              </Button>
            </Link>
          ) : isFull ? (
            <Button size="sm" variant="ghost" disabled>
              Full (Waitlist)
            </Button>
          ) : (
            <Link to={`/app/circles/${id}`}>
              <Button size="sm" variant={joiningPolicy === 'open' ? 'primary' : 'outline'}>
                {joiningPolicy === 'open' ? 'Join Circle' : 'View & Request'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
