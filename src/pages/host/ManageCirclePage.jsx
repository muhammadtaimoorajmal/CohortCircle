import React, { useState } from 'react';
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
    pendingRequests,
    handleApplicantAction,
    currentUser
  } = useApp();

  const circle = circles.find(c => c.id === circleId) || circles.find(c => c.isHostedByMe) || circles[0];

  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'applicants' | 'settings'
  const [removeMemberTarget, setRemoveMemberTarget] = useState(null);
  const [declineTarget, setDeclineTarget] = useState(null);

  // Circle members roster
  const [membersList, setMembersList] = useState([
    { id: 'usr-current', name: currentUser.name, handle: currentUser.handle, role: 'Circle Facilitator (You)', isHost: true },
    { id: 'usr-m-01', name: 'Priya Sharma', handle: '@psharma', role: 'Active Contributor', isHost: false },
    { id: 'usr-m-02', name: 'Daniel Kim', handle: '@dkim', role: 'Active Contributor', isHost: false },
    { id: 'usr-m-03', name: 'Nadia El-Baz', handle: '@nelbaz', role: 'Active Contributor', isHost: false }
  ]);

  const circleApplicants = pendingRequests.filter(r => r.circleId === circle.id || circle.isHostedByMe);

  function confirmRemoveMember() {
    if (removeMemberTarget) {
      setMembersList(prev => prev.filter(m => m.id !== removeMemberTarget.id));
      setRemoveMemberTarget(null);
    }
  }

  function confirmDeclineApplicant() {
    if (declineTarget) {
      handleApplicantAction(declineTarget.id, 'decline');
      setDeclineTarget(null);
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
          {circle.meetingTime} • {circle.modality} • {membersList.length} of {circle.maxCapacity} members
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
            Cohort Members ({membersList.length})
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
              Remaining Seats: <strong>{circle.maxCapacity - membersList.length}</strong>
            </span>
          </div>

          <div className={styles.membersTable}>
            {membersList.map(member => (
              <div key={member.id} className={styles.memberRow}>
                <div className={styles.memberInfo}>
                  <Avatar name={member.name} size="md" />
                  <div className={styles.memberMeta}>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberHandle}>{member.handle}</span>
                  </div>
                </div>

                <div className={styles.memberRole}>
                  <Badge variant={member.isHost ? 'primary' : 'neutral'} size="sm">
                    {member.role}
                  </Badge>
                </div>

                <div className={styles.memberActions}>
                  {!member.isHost && (
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
                    <Avatar name={req.applicant.name} initials={req.applicant.initials} size="md" />
                    <div className={styles.applicantMeta}>
                      <span className={styles.applicantName}>{req.applicant.name}</span>
                      <span className={styles.applicantHandle}>{req.applicant.handle}</span>
                    </div>
                    <Badge variant="teal" size="sm">{req.applicant.compatibilityScore}% Match</Badge>
                  </div>

                  <p className={styles.applicantNote}>"{req.introNote}"</p>

                  <div className={styles.applicantActions}>
                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft={<IconCheck size={14} />}
                      onClick={() => handleApplicantAction(req.id, 'accept')}
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
          <h2 className={styles.tabSectionTitle}>Circle Settings</h2>
          <div className={styles.settingsForm}>
            <Input label="Circle Title" defaultValue={circle.title} />
            <Input label="Meeting Window" defaultValue={circle.meetingTime} />
            <Select
              label="Joining Policy"
              defaultValue={circle.joiningPolicy}
              options={[
                { label: 'Moderated Admission', value: 'moderated' },
                { label: 'Open Enrollment', value: 'open' },
                { label: 'Closed (No new members)', value: 'closed' }
              ]}
            />
            <Button variant="primary">Save Circle Settings</Button>
          </div>
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

      {/* Decline Applicant Confirmation Modal - Addresses UX-002 */}
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
          Decline admission for <strong>{declineTarget?.applicant.name}</strong>? They will be removed from this circle's review queue.
        </p>
      </Modal>
    </div>
  );
}
