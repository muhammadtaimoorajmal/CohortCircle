import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import Avatar from '../../components/common/Avatar/Avatar';
import Modal from '../../components/common/Modal/Modal';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Select/Select';
import { useApp } from '../../context/AppContext';
import {
  IconCheck,
  IconPlus,
  IconChevronLeft
} from '../../components/common/Icons';
import styles from './ManageCirclePage.module.css';

export default function ManageCirclePage() {
  const { circleId } = useParams();
  const {
    circles,
    memberships,
    joinRequests,
    acceptJoinRequest,
    rejectJoinRequest,
    removeCircleMember,
    updateCircle,
    currentUser
  } = useApp();

  const circle = circles.find(c => c.id === circleId) || circles.find(c => c.isHostedByMe) || circles[0];

  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'applicants' | 'settings'
  const [removeMemberTarget, setRemoveMemberTarget] = useState(null);
  const [declineTarget, setDeclineTarget] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null); // { type: 'success' | 'error', text }

  // Authoritative Central Roster & Scoped Queue
  const circleMembers = memberships.filter(m => m.circleId === circle?.id);
  const circleApplicants = joinRequests.filter(r => r.circleId === circle?.id && r.status === 'pending');

  // Settings form state
  const [editTitle, setEditTitle] = useState(circle?.title || '');
  const [editSubject, setEditSubject] = useState(circle?.subject || '');
  const [editDescription, setEditDescription] = useState(circle?.description || '');
  const [editCharter, setEditCharter] = useState(circle?.charter || '');
  const [editMeetingTime, setEditMeetingTime] = useState(circle?.meetingTime || '');
  const [editModality, setEditModality] = useState(circle?.modality || 'Online');
  const [editJoiningPolicy, setEditJoiningPolicy] = useState(circle?.joiningPolicy || 'moderated');
  const [editMaxCapacity, setEditMaxCapacity] = useState(circle?.maxCapacity || 6);
  const [settingsErrors, setSettingsErrors] = useState({});

  useEffect(() => {
    if (circle) {
      setEditTitle(circle.title || '');
      setEditSubject(circle.subject || '');
      setEditDescription(circle.description || '');
      setEditCharter(circle.charter || '');
      setEditMeetingTime(circle.meetingTime || '');
      setEditModality(circle.modality || 'Online');
      setEditJoiningPolicy(circle.joiningPolicy || 'moderated');
      setEditMaxCapacity(circle.maxCapacity || 6);
    }
  }, [circle]);

  if (!circle) {
    return (
      <div className={styles.page}>
        <div className={styles.topNav}>
          <Link to="/app/host" className={styles.backLink}>
            <IconChevronLeft size={16} />
            <span>Back to Host Facilitation Console</span>
          </Link>
        </div>
        <Card padding="lg" style={{ textAlign: 'center', margin: '48px auto', maxWidth: '600px' }}>
          <h2>No Hosted Circles Found</h2>
          <p style={{ margin: '12px 0 24px', color: 'var(--color-text-secondary, #94a3b8)' }}>
            You do not currently host this study circle.
          </p>
          <Link to="/app/host">
            <Button variant="primary">Return to Host Console</Button>
          </Link>
        </Card>
      </div>
    );
  }

  function handleAcceptApplicant(reqId) {
    const res = acceptJoinRequest(reqId);
    if (res.success) {
      setFeedbackMessage({ type: 'success', text: 'Applicant admitted to the circle!' });
      setTimeout(() => setFeedbackMessage(null), 3500);
    } else {
      setFeedbackMessage({ type: 'error', text: res.error || 'Failed to admit applicant' });
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  }

  function confirmDeclineApplicant() {
    if (declineTarget) {
      rejectJoinRequest(declineTarget.id);
      setDeclineTarget(null);
      setFeedbackMessage({ type: 'success', text: 'Applicant request declined.' });
      setTimeout(() => setFeedbackMessage(null), 3500);
    }
  }

  function confirmRemoveMember() {
    if (removeMemberTarget) {
      const res = removeCircleMember(circle.id, removeMemberTarget.id);
      if (res.success) {
        setRemoveMemberTarget(null);
        setFeedbackMessage({ type: 'success', text: 'Member removed from circle roster.' });
        setTimeout(() => setFeedbackMessage(null), 3500);
      } else {
        setFeedbackMessage({ type: 'error', text: res.error || 'Failed to remove member' });
        setTimeout(() => setFeedbackMessage(null), 4000);
      }
    }
  }

  function handleSaveSettings(e) {
    e?.preventDefault();
    setSettingsErrors({});

    const res = updateCircle(circle.id, {
      title: editTitle,
      subject: editSubject,
      description: editDescription,
      charter: editCharter,
      meetingTime: editMeetingTime,
      modality: editModality,
      joiningPolicy: editJoiningPolicy,
      maxCapacity: Number(editMaxCapacity)
    });

    if (res.success) {
      setFeedbackMessage({ type: 'success', text: 'Circle settings saved successfully!' });
      setTimeout(() => setFeedbackMessage(null), 3500);
    } else {
      setSettingsErrors(res.errors || { general: res.error });
      setFeedbackMessage({ type: 'error', text: res.error || 'Please correct the form errors' });
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  }

  return (
    <div className={styles.page}>
      {/* Top back navigation */}
      <div className={styles.topNav}>
        <Link to="/app/host" className={styles.backLink}>
          <IconChevronLeft size={16} />
          <span>Back to Host Facilitation Console</span>
        </Link>
      </div>

      {feedbackMessage && (
        <div
          role="status"
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            backgroundColor: feedbackMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${feedbackMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
            color: feedbackMessage.type === 'success' ? '#10b981' : '#ef4444',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <IconCheck size={16} />
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Circle Header Card */}
      <Card padding="lg" className={styles.headerCard}>
        <div className={styles.headerTop}>
          <div className={styles.badgeRow}>
            <Badge variant="teal" size="sm">Host Management Console</Badge>
            <span className={styles.subjectText}>{circle.subject}</span>
          </div>
          <Link to={`/app/sessions?circleId=${circle.id}`}>
            <Button variant="primary" size="sm" iconLeft={<IconPlus size={14} />}>
              Schedule Study Session
            </Button>
          </Link>
        </div>

        <h1 className={styles.circleTitle}>{circle.title}</h1>
        <p className={styles.circleMeta}>
          {circle.meetingTime} • {circle.modality} • {circleMembers.length} of {circle.maxCapacity} members
        </p>

        {/* Tab Navigation */}
        <div className={styles.tabsStrip} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'members'}
            className={`${styles.tabBtn} ${activeTab === 'members' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('members')}
          >
            Cohort Members ({circleMembers.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'applicants'}
            className={`${styles.tabBtn} ${activeTab === 'applicants' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('applicants')}
          >
            Admission Queue ({circleApplicants.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'settings'}
            className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Circle Settings & Policy
          </button>
        </div>
      </Card>

      {/* Tab 1: Cohort Members Roster */}
      {activeTab === 'members' && (
        <Card padding="lg" className={styles.tabContentCard}>
          <div className={styles.contentHeader}>
            <h2 className={styles.tabSectionTitle}>Cohort Membership Roster</h2>
            <span className={styles.capacityMeta}>
              Remaining Seats: <strong>{Math.max(0, circle.maxCapacity - circleMembers.length)}</strong>
            </span>
          </div>

          <div className={styles.membersTable}>
            {circleMembers.map(member => (
              <div key={member.id} className={styles.memberRow}>
                <div className={styles.memberInfo}>
                  <Avatar name={member.name} initials={member.initials} color={member.avatarColor} size="md" />
                  <div className={styles.memberMeta}>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberHandle}>{member.handle}</span>
                  </div>
                </div>

                <div className={styles.memberRole}>
                  <Badge variant={member.isHost ? 'primary' : 'neutral'} size="sm">
                    {member.role || (member.isHost ? 'Facilitator' : 'Contributor')}
                  </Badge>
                </div>

                <div className={styles.memberActions}>
                  {!member.isHost && member.userId !== currentUser.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={styles.removeBtn}
                      onClick={() => setRemoveMemberTarget(member)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 2: Admission Queue */}
      {activeTab === 'applicants' && (
        <Card padding="lg" className={styles.tabContentCard}>
          <h2 className={styles.tabSectionTitle}>Pending Applications ({circleApplicants.length})</h2>
          {circleApplicants.length === 0 ? (
            <p className={styles.emptyNotice}>No pending membership requests for this circle.</p>
          ) : (
            <div className={styles.applicantsGrid}>
              {circleApplicants.map(req => (
                <Card key={req.id} padding="md" className={styles.applicantCard}>
                  <div className={styles.applicantTop}>
                    <Avatar name={req.applicant?.name} initials={req.applicant?.initials} size="md" />
                    <div className={styles.applicantMeta}>
                      <span className={styles.applicantName}>{req.applicant?.name}</span>
                      <span className={styles.applicantHandle}>{req.applicant?.handle}</span>
                    </div>
                    <Badge variant="teal" size="sm">{req.applicant?.compatibilityScore || 85}% Match</Badge>
                  </div>

                  <p className={styles.applicantNote}>"{req.introNote}"</p>

                  <div className={styles.applicantActions}>
                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft={<IconCheck size={14} />}
                      onClick={() => handleAcceptApplicant(req.id)}
                    >
                      Admit to Circle
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
        </Card>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <Card padding="lg" className={styles.tabContentCard}>
          <h2 className={styles.tabSectionTitle}>Circle Settings & Facilitation Rules</h2>
          {Object.keys(settingsErrors).length > 0 && (
            <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px' }} role="alert">
              {Object.values(settingsErrors).map((e, i) => (
                <div key={i}>• {e}</div>
              ))}
            </div>
          )}
          <form onSubmit={handleSaveSettings} className={styles.settingsForm}>
            <Input
              label="Circle Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <Input
              label="Syllabus / Course Subject"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="settings-desc" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text-secondary, #94a3b8)' }}>
                Description & Core Objectives
              </label>
              <textarea
                id="settings-desc"
                rows={3}
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--color-bg-secondary, rgba(255,255,255,0.03))',
                  border: '1px solid var(--color-border, #334155)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary, #f8fafc)',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="settings-charter" style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text-secondary, #94a3b8)' }}>
                Reciprocal Circle Charter
              </label>
              <textarea
                id="settings-charter"
                rows={3}
                style={{
                  padding: '10px 12px',
                  backgroundColor: 'var(--color-bg-secondary, rgba(255,255,255,0.03))',
                  border: '1px solid var(--color-border, #334155)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary, #f8fafc)',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                value={editCharter}
                onChange={(e) => setEditCharter(e.target.value)}
              />
            </div>

            <Input
              label="Meeting Window & Cadence"
              value={editMeetingTime}
              onChange={(e) => setEditMeetingTime(e.target.value)}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <Select
                label="Meeting Modality"
                value={editModality}
                onChange={(e) => setEditModality(e.target.value)}
                options={['Online', 'In-Person', 'Hybrid']}
              />

              <Select
                label="Joining Policy"
                value={editJoiningPolicy}
                onChange={(e) => setEditJoiningPolicy(e.target.value)}
                options={[
                  { label: 'Moderated Admission', value: 'moderated' },
                  { label: 'Open Enrollment', value: 'open' },
                  { label: 'Closed (No new members)', value: 'closed' }
                ]}
              />

              <Input
                label={`Cohort Capacity Cap (Min. ${circleMembers.length})`}
                type="number"
                min={circleMembers.length}
                max={24}
                value={editMaxCapacity}
                onChange={(e) => setEditMaxCapacity(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary">
              Save Circle Settings
            </Button>
          </form>
        </Card>
      )}

      {/* Remove Member Confirmation Modal */}
      <Modal
        isOpen={Boolean(removeMemberTarget)}
        onClose={() => setRemoveMemberTarget(null)}
        title="Remove Member from Circle"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setRemoveMemberTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRemoveMember}>
              Confirm Removal
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          Are you sure you want to remove <strong>{removeMemberTarget?.name}</strong> from this circle? Their seat will become available to new applicants.
        </p>
      </Modal>

      {/* Decline Applicant Confirmation Modal */}
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
            <Button variant="danger" onClick={confirmDeclineApplicant}>
              Confirm Decline
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          Decline admission for <strong>{declineTarget?.applicant?.name}</strong>? They will be removed from this circle's review queue.
        </p>
      </Modal>
    </div>
  );
}
