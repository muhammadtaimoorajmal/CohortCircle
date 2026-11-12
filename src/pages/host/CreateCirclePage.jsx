import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Select/Select';
import Modal from '../../components/common/Modal/Modal';
import { useApp } from '../../context/AppContext';
import {
  IconCheck,
  IconChevronRight,
  IconChevronLeft,
  IconClose,
  IconSparkles
} from '../../components/common/Icons';
import {
  DEMO_CATEGORIES,
  DEMO_STUDY_STYLES
} from '../../data/demoData';
import styles from './CreateCirclePage.module.css';

export default function CreateCirclePage() {
  const navigate = useNavigate();
  const { createCircle } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [charter, setCharter] = useState(
    '1. Prepare agreed readings or exercises before each session.\n2. Arrive punctually and actively engage in peer discussions.\n3. Provide constructive, kind, and evidence-grounded feedback.'
  );
  const [studyStyle, setStudyStyle] = useState('Collaborative Problem Solving');
  const [modality, setModality] = useState('Online');
  const [cadence, setCadence] = useState('Weekly');
  const [meetingDay, setMeetingDay] = useState('Tue');
  const [meetingTimeSlot, setMeetingTimeSlot] = useState('Evening (6 PM - 10 PM)');
  const [meetingTime, setMeetingTime] = useState('Tuesdays, 6:00 PM – 7:30 PM');
  const [maxCapacity, setMaxCapacity] = useState(6);
  const [joiningPolicy, setJoiningPolicy] = useState('moderated'); // 'open' | 'moderated'

  const [errors, setErrors] = useState({});

  const steps = [
    { num: 1, title: 'Basics & Topics' },
    { num: 2, title: 'Charter & Norms' },
    { num: 3, title: 'Logistics' },
    { num: 4, title: 'Capacity & Policy' }
  ];

  function validateStep(step) {
    const errs = {};
    if (step === 1) {
      if (!title.trim()) errs.title = 'Circle title is required';
      if (!subject.trim()) errs.subject = 'Subject or course name is required';
      if (!description.trim() || description.length < 20) {
        errs.description = 'Please provide a description of at least 20 characters';
      }
    } else if (step === 2) {
      if (!charter.trim() || charter.length < 20) {
        errs.charter = 'Please specify at least 2 or 3 charter rules';
      }
    } else if (step === 3) {
      if (!meetingTime.trim()) {
        errs.meetingTime = 'Meeting schedule is required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  }

  function handleBack() {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }

  function handleCancelAttempt() {
    // If user filled in title or description, protect against accidental cancellation (UX-001)
    if (title.trim() || description.trim()) {
      setCancelModalOpen(true);
    } else {
      navigate('/app/host');
    }
  }

  function handleConfirmCancel() {
    setCancelModalOpen(false);
    navigate('/app/host');
  }

  function handleSubmitCircle(e) {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const res = createCircle({
      title,
      category,
      subject,
      description,
      charter,
      studyStyle,
      modality,
      cadence,
      meetingTime,
      meetingDay,
      meetingTimeSlot,
      maxCapacity: Number(maxCapacity),
      joiningPolicy,
      schedule: {
        days: [meetingDay],
        timeSlot: meetingTimeSlot
      }
    });

    if (res.success && res.circle) {
      navigate(`/app/host/manage/${res.circle.id}`);
    } else if (res.errors) {
      setErrors(res.errors);
    } else {
      navigate('/app/host');
    }
  }

  return (
    <div className={styles.page}>
      {/* Top Header */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.pageTitle}>Create a New Study Circle</h1>
          <p className={styles.pageSubtitle}>
            Launch a focused collaborative learning cohort with defined objectives and a reciprocal charter.
          </p>
        </div>
        <Button variant="ghost" onClick={handleCancelAttempt} iconLeft={<IconClose size={16} />}>
          Cancel & Exit
        </Button>
      </div>

      {/* Progressive Step Stepper */}
      <div className={styles.stepperContainer} aria-label="Creation Progress">
        {steps.map((st, idx) => (
          <React.Fragment key={st.num}>
            <div className={`${styles.stepItem} ${currentStep === st.num ? styles.stepCurrent : currentStep > st.num ? styles.stepDone : ''}`}>
              <div className={styles.stepCircle}>
                {currentStep > st.num ? <IconCheck size={14} /> : st.num}
              </div>
              <span className={styles.stepLabel}>{st.title}</span>
            </div>
            {idx < steps.length - 1 && <div className={styles.stepConnector} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step Form Container */}
      <Card padding="lg" className={styles.formCard}>
        {/* Step 1: Basics */}
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Circle Basics & Syllabus</h2>
            <p className={styles.stepDesc}>
              Define what your study circle focuses on and what participants will learn.
            </p>

            <div className={styles.fieldGrid}>
              <Input
                label="Study Circle Title"
                placeholder="e.g. Distributed Systems Paper Reading & Implementation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
                required
              />

              <div className={styles.twoCol}>
                <Select
                  label="Academic Domain / Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={DEMO_CATEGORIES.filter(c => c !== 'All Subjects')}
                />
                <Input
                  label="Subject Focus / Course Syllabus"
                  placeholder="e.g. Cloud Computing & Raft Consensus"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  error={errors.subject}
                  required
                />
              </div>

              <div className={styles.textareaGroup}>
                <label htmlFor="circle-desc" className={styles.label}>
                  Circle Purpose & Description *
                </label>
                <textarea
                  id="circle-desc"
                  rows={4}
                  className={`${styles.textarea} ${errors.description ? styles.hasError : ''}`}
                  placeholder="Explain the focus, problem sets, and what a typical session looks like..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <span className={styles.errorText} role="alert">{errors.description}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Charter & Norms */}
        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Circle Charter & Expectations</h2>
            <p className={styles.stepDesc}>
              Clear group norms foster accountability, respect, and mutual follow-through.
            </p>

            <div className={styles.textareaGroup}>
              <label htmlFor="circle-charter" className={styles.label}>
                Reciprocal Group Rules & Preparation Standards *
              </label>
              <textarea
                id="circle-charter"
                rows={6}
                className={`${styles.textarea} ${errors.charter ? styles.hasError : ''}`}
                value={charter}
                onChange={(e) => setCharter(e.target.value)}
              />
              {errors.charter && (
                <span className={styles.errorText} role="alert">{errors.charter}</span>
              )}
            </div>

            <div className={styles.tipBox}>
              <IconSparkles size={16} className={styles.tipIcon} />
              <span>Tip: Effective charters outline required preparation time, camera expectations, and respectful debate norms.</span>
            </div>
          </div>
        )}

        {/* Step 3: Logistics */}
        {currentStep === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Meeting Logistics & Study Format</h2>
            <p className={styles.stepDesc}>
              Specify how and when your group convenes.
            </p>

            <div className={styles.fieldGrid}>
              <div className={styles.twoCol}>
                <Select
                  label="Primary Study Style"
                  value={studyStyle}
                  onChange={(e) => setStudyStyle(e.target.value)}
                  options={DEMO_STUDY_STYLES.filter(s => s !== 'All Study Styles')}
                />
                <Select
                  label="Meeting Modality"
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  options={['Online', 'In-Person', 'Hybrid']}
                />
              </div>

              <div className={styles.twoCol}>
                <Select
                  label="Session Frequency"
                  value={cadence}
                  onChange={(e) => setCadence(e.target.value)}
                  options={['Weekly', 'Bi-weekly', 'Twice a week']}
                />
                <Input
                  label="Meeting Time Window"
                  placeholder="e.g. Saturdays, 10:00 AM – 11:30 AM"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  error={errors.meetingTime}
                  required
                />
              </div>

              <div className={styles.twoCol}>
                <Select
                  label="Primary Meeting Day"
                  value={meetingDay}
                  onChange={(e) => setMeetingDay(e.target.value)}
                  options={[
                    { label: 'Monday (Mon)', value: 'Mon' },
                    { label: 'Tuesday (Tue)', value: 'Tue' },
                    { label: 'Wednesday (Wed)', value: 'Wed' },
                    { label: 'Thursday (Thu)', value: 'Thu' },
                    { label: 'Friday (Fri)', value: 'Fri' },
                    { label: 'Saturday (Sat)', value: 'Sat' },
                    { label: 'Sunday (Sun)', value: 'Sun' }
                  ]}
                />
                <Select
                  label="Time Slot Block"
                  value={meetingTimeSlot}
                  onChange={(e) => setMeetingTimeSlot(e.target.value)}
                  options={[
                    'Morning (8 AM - 12 PM)',
                    'Afternoon (12 PM - 5 PM)',
                    'Evening (6 PM - 10 PM)'
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Capacity & Policy */}
        {currentStep === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Cohort Capacity & Admission Policy</h2>
            <p className={styles.stepDesc}>
              Bounded group sizes prevent free-riding and maintain intimate collaboration.
            </p>

            <div className={styles.fieldGrid}>
              <div className={styles.twoCol}>
                <Select
                  label="Maximum Member Capacity (2–8 peers)"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  options={[
                    { label: '3 peers (Micro)', value: 3 },
                    { label: '4 peers (Intimate)', value: 4 },
                    { label: '5 peers (Focused)', value: 5 },
                    { label: '6 peers (Standard)', value: 6 },
                    { label: '8 peers (Max Collaborative)', value: 8 }
                  ]}
                />

                <Select
                  label="Admission & Joining Policy"
                  value={joiningPolicy}
                  onChange={(e) => setJoiningPolicy(e.target.value)}
                  options={[
                    { label: 'Moderated (Host reviews introductory notes)', value: 'moderated' },
                    { label: 'Open (Instant enrollment until full)', value: 'open' }
                  ]}
                />
              </div>

              {/* Review Summary Box */}
              <div className={styles.reviewBox}>
                <h3 className={styles.reviewHeading}>Review Circle Summary</h3>
                <div className={styles.reviewItem}>
                  <strong>Title:</strong> {title || 'Untitled Circle'}
                </div>
                <div className={styles.reviewItem}>
                  <strong>Subject:</strong> {subject} ({category})
                </div>
                <div className={styles.reviewItem}>
                  <strong>Format:</strong> {studyStyle} • {modality} • {meetingTime}
                </div>
                <div className={styles.reviewItem}>
                  <strong>Capacity & Policy:</strong> Up to {maxCapacity} members • {joiningPolicy} policy
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={styles.wizardFooter}>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              iconLeft={<IconChevronLeft size={16} />}
            >
              Back
            </Button>
          )}

          <div className={styles.rightNav}>
            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                iconRight={<IconChevronRight size={16} />}
              >
                Continue to Step {currentStep + 1}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmitCircle}
                iconLeft={<IconCheck size={16} />}
              >
                Create Circle & Launch
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Cancel Confirmation Dialog - Addresses UX-001 */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Discard Draft Circle?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCancelModalOpen(false)}>
              Keep Editing
            </Button>
            <Button variant="danger" onClick={handleConfirmCancel}>
              Discard & Exit
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          You have unsaved changes in this circle creation draft. If you exit now, your entered details will be lost.
        </p>
      </Modal>
    </div>
  );
}
