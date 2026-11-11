import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Modal from '../../components/common/Modal/Modal';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { useApp } from '../../context/AppContext';
import {
  IconCircles,
  IconClock,
  IconLocation
} from '../../components/common/Icons';
import styles from './MyCirclesPage.module.css';

export default function MyCirclesPage() {
  const { circles, handleLeaveCircle } = useApp();
  const [leaveTarget, setLeaveTarget] = useState(null);

  const joinedCircles = circles.filter(c => c.isJoined);

  function confirmLeave() {
    if (leaveTarget) {
      handleLeaveCircle(leaveTarget.id);
      setLeaveTarget(null);
    }
  }

  return (
    <div className={styles.page}>
      <SectionHeader
        title="My Study Circles"
        subtitle="Manage your active cohort memberships and check upcoming study sessions."
        action={
          <Link to="/app/explore">
            <Button variant="primary">
              Explore More Circles
            </Button>
          </Link>
        }
      />

      {/* Tabs / Filter Summary */}
      <div className={styles.tabsStrip}>
        <div className={styles.tabActive}>
          <span>Active Memberships ({joinedCircles.length})</span>
        </div>
      </div>

      {joinedCircles.length === 0 ? (
        <EmptyState
          icon={<IconCircles size={36} />}
          title="You have not joined any study circles yet"
          description="Browse the directory to discover compatible study circles matching your topics and free schedule."
          action={
            <Link to="/app/explore">
              <Button variant="primary">Browse Study Circles</Button>
            </Link>
          }
        />
      ) : (
        <div className={styles.circlesList}>
          {joinedCircles.map(circle => (
            <Card key={circle.id} padding="lg" className={styles.circleRowCard}>
              <div className={styles.rowMain}>
                <div className={styles.topMeta}>
                  <Badge variant="teal" size="sm">Active Member</Badge>
                  <span className={styles.subjectText}>{circle.subject}</span>
                </div>

                <h3 className={styles.title}>
                  <Link to={`/app/circles/${circle.id}`} className={styles.titleLink}>
                    {circle.title}
                  </Link>
                </h3>
                <p className={styles.description}>{circle.description}</p>

                <div className={styles.detailsRow}>
                  <span className={styles.detailItem}>
                    <IconClock size={15} />
                    {circle.meetingTime}
                  </span>
                  <span className={styles.detailItem}>
                    <IconLocation size={15} />
                    {circle.modality}
                  </span>
                  <span className={styles.detailItem}>
                    <strong>{circle.membersCount}</strong> of {circle.maxCapacity} members
                  </span>
                </div>
              </div>

              <div className={styles.rowActions}>
                <Link to={`/app/circles/${circle.id}`}>
                  <Button variant="primary" size="md">
                    Open Circle
                  </Button>
                </Link>
                {!circle.isHostedByMe && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={styles.leaveBtn}
                    onClick={() => setLeaveTarget(circle)}
                  >
                    Leave
                  </Button>
                )}
                {circle.isHostedByMe && (
                  <Link to={`/app/host/manage/${circle.id}`}>
                    <Button variant="outline" size="sm">
                      Manage Host Settings
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Leave Confirmation Dialog */}
      <Modal
        isOpen={Boolean(leaveTarget)}
        onClose={() => setLeaveTarget(null)}
        title="Confirm Leaving Study Circle"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setLeaveTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmLeave}>
              Yes, Leave Circle
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          Are you sure you want to leave <strong>{leaveTarget?.title}</strong>? You will forfeit your seat and need to reapply if the circle becomes full.
        </p>
      </Modal>
    </div>
  );
}
