import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';
import Avatar from '../../components/common/Avatar/Avatar';
import Modal from '../../components/common/Modal/Modal';
import CompatibilityIndicator from '../../components/circles/CompatibilityIndicator';
import StudyStyleBadge from '../../components/circles/StudyStyleBadge';
import { useApp } from '../../context/AppContext';
import {
  IconClock,
  IconLocation,
  IconUsers,
  IconCheck,
  IconChevronLeft
} from '../../components/common/Icons';
import styles from './CircleDetailsPage.module.css';

export default function CircleDetailsPage() {
  const { circleId } = useParams();
  const { circles, handleJoinCircle, handleLeaveCircle } = useApp();

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [introNote, setIntroNote] = useState('');
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  const circle = circles.find(c => c.id === circleId) || circles[0];
  const {
    id,
    title,
    subject,
    category,
    description,
    charter,
    host,
    membersCount,
    maxCapacity,
    joiningPolicy,
    studyStyle,
    modality,
    cadence,
    meetingTime,
    compatibility,
    tags = [],
    isJoined,
    isHostedByMe
  } = circle;

  const isFull = membersCount >= maxCapacity;

  function submitJoin() {
    handleJoinCircle(id, introNote);
    setJoinModalOpen(false);
    setJoinedSuccess(true);
    setTimeout(() => setJoinedSuccess(false), 4000);
  }

  function submitLeave() {
    handleLeaveCircle(id);
    setLeaveModalOpen(false);
  }

  return (
    <div className={styles.page}>
      {/* Back button */}
      <div className={styles.topNav}>
        <Link to="/app/explore" className={styles.backLink}>
          <IconChevronLeft size={16} />
          <span>Back to Explore Circles</span>
        </Link>
      </div>

      {joinedSuccess && (
        <div className={styles.alertSuccess} role="status">
          <IconCheck size={18} />
          <span>You have successfully joined <strong>{title}</strong>!</span>
        </div>
      )}

      {/* Main Hero Header */}
      <div className={styles.heroCard}>
        <div className={styles.heroTopRow}>
          <div className={styles.subjectGroup}>
            <span className={styles.categoryBadge}>{category}</span>
            <span className={styles.subjectText}>{subject}</span>
          </div>

          <div className={styles.statusBadges}>
            {compatibility && (
              <CompatibilityIndicator score={compatibility.overallScore} size="lg" />
            )}
            <Badge
              variant={joiningPolicy === 'open' ? 'teal' : joiningPolicy === 'moderated' ? 'primary' : 'neutral'}
              size="md"
            >
              {joiningPolicy === 'open' ? 'Open Enrollment' : joiningPolicy === 'moderated' ? 'Moderated Admission' : 'Closed Cohort'}
            </Badge>
          </div>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.metaStrip}>
          <div className={styles.metaItem}>
            <IconClock size={16} className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>Schedule & Cadence</span>
              <span className={styles.metaVal}>{meetingTime} ({cadence})</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <IconLocation size={16} className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>Location & Modality</span>
              <span className={styles.metaVal}>{modality}</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <IconUsers size={16} className={styles.metaIcon} />
            <div>
              <span className={styles.metaLabel}>Cohort Capacity</span>
              <span className={styles.metaVal}>{membersCount} of {maxCapacity} peers</span>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className={styles.ctaRow}>
          {isHostedByMe ? (
            <Link to={`/app/host/manage/${id}`}>
              <Button variant="primary" size="lg">
                Manage Circle & Roster
              </Button>
            </Link>
          ) : isJoined ? (
            <div className={styles.joinedActions}>
              <Badge variant="teal" size="md">
                ✓ Active Member
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setLeaveModalOpen(true)}>
                Leave Circle
              </Button>
            </div>
          ) : isFull ? (
            <Button variant="ghost" size="lg" disabled>
              Cohort Full (Capacity Reached)
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setJoinModalOpen(true)}
            >
              {joiningPolicy === 'open' ? 'Join Study Circle' : 'Request to Join Circle'}
            </Button>
          )}
        </div>
      </div>

      {/* 2-Column Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Column: Charter, Objectives, Format */}
        <div className={styles.leftCol}>
          {/* Group Charter Card */}
          <Card padding="lg" className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Circle Charter & Expectations</h2>
            <p className={styles.charterSub}>
              Members agree to honor these expectations to maintain group accountability.
            </p>
            <div className={styles.charterContent}>
              {charter?.split('\n').map((rule, idx) => (
                <div key={idx} className={styles.charterRule}>
                  <span className={styles.ruleDot}>•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Study Format & Method */}
          <Card padding="lg" className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Learning Format & Style</h2>
            <div className={styles.styleBox}>
              <StudyStyleBadge styleName={studyStyle} />
              <p className={styles.styleDesc}>
                This circle utilizes <strong>{studyStyle}</strong>. Sessions emphasize active discussion, peer explanation of core concepts, and structured collaborative sprints.
              </p>
            </div>

            <div className={styles.tagsContainer}>
              <h3 className={styles.tagsTitle}>Syllabus Focus Topics</h3>
              <div className={styles.tagsList}>
                {tags.map(t => (
                  <span key={t} className={styles.tagPill}>{t}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Compatibility Breakdown & Host Card */}
        <div className={styles.rightCol}>
          {/* Host Card */}
          <Card padding="lg" className={styles.hostCard}>
            <h3 className={styles.sideHeading}>Circle Facilitator</h3>
            <div className={styles.hostInfo}>
              <Avatar
                name={host.name}
                initials={host.initials}
                color={host.avatarColor}
                size="lg"
              />
              <div className={styles.hostDetails}>
                <span className={styles.hostName}>{host.name}</span>
                <span className={styles.hostHandle}>{host.handle}</span>
                <Badge variant="neutral" size="sm">{host.role}</Badge>
              </div>
            </div>
            <p className={styles.hostBio}>
              Facilitator responsible for posting weekly problem sets, tracking session RSVPs, and guiding group discussions.
            </p>
          </Card>

          {/* Compatibility Breakdown Card */}
          {compatibility && (
            <Card padding="lg" className={styles.compatCard}>
              <div className={styles.compatHeader}>
                <h3 className={styles.sideHeading}>Why This Circle Fits You</h3>
                <span className={styles.compatBadge}>{compatibility.overallScore}%</span>
              </div>

              <div className={styles.factorsList}>
                {Object.entries(compatibility.breakdown).map(([factor, score]) => (
                  <div key={factor} className={styles.factorItem}>
                    <div className={styles.factorRow}>
                      <span className={styles.factorLabel}>
                        {factor === 'topicAlignment' ? 'Topics' :
                         factor === 'scheduleOverlap' ? 'Schedule' :
                         factor === 'studyStyleMatch' ? 'Study Style' :
                         factor === 'modalityFit' ? 'Modality' : 'Cohort Size'}
                      </span>
                      <span className={styles.factorScore}>{score}%</span>
                    </div>
                    <div className={styles.progressBg}>
                      <div className={styles.progressFill} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.reasonsList}>
                {compatibility.matchReasons?.map((reason, idx) => (
                  <div key={idx} className={styles.reasonRow}>
                    <IconCheck size={14} className={styles.reasonIcon} />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Join Request Modal */}
      <Modal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        title={joiningPolicy === 'open' ? 'Join Study Circle' : 'Request to Join Study Circle'}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setJoinModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={submitJoin}>
              {joiningPolicy === 'open' ? 'Confirm & Join' : 'Submit Join Request'}
            </Button>
          </>
        }
      >
        <div className={styles.modalBody}>
          <p className={styles.modalSub}>
            You are applying to join <strong>{title}</strong>.
          </p>

          {joiningPolicy === 'moderated' && (
            <div className={styles.noteField}>
              <label htmlFor="intro-note" className={styles.fieldLabel}>
                Brief Introduction & Study Goals (Min. 15 characters)
              </label>
              <textarea
                id="intro-note"
                rows={4}
                className={styles.textarea}
                placeholder="Introduce yourself, mention what you hope to work on, and confirm your availability..."
                value={introNote}
                onChange={(e) => setIntroNote(e.target.value)}
              />
              <span className={styles.charCount}>{introNote.length} characters</span>
            </div>
          )}

          <div className={styles.charterAgreement}>
            <IconCheck size={16} className={styles.agreeIcon} />
            <span>I agree to abide by the circle charter and commit to attending scheduled study dates.</span>
          </div>
        </div>
      </Modal>

      {/* Leave Circle Modal */}
      <Modal
        isOpen={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title="Leave Study Circle"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setLeaveModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={submitLeave}>
              Confirm Leave
            </Button>
          </>
        }
      >
        <p className={styles.leaveText}>
          Are you sure you want to leave <strong>{title}</strong>? Your seat will be reopened to other learners in the directory.
        </p>
      </Modal>
    </div>
  );
}
