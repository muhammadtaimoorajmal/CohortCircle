import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Select/Select';
import SessionCard from '../../components/sessions/SessionCard';
import { useApp } from '../../context/AppContext';
import { IconPlus } from '../../components/common/Icons';
import { getTodayString, isDateInPast } from '../../utils/dateUtils';
import styles from './SessionsPage.module.css';

export default function SessionsPage() {
  const [searchParams] = useSearchParams();
  const circleIdParam = searchParams.get('circleId');

  const {
    sessions,
    circles,
    createSession,
    updateRSVP
  } = useApp();

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  // Scheduler Form State
  const defaultCircle = circles.find(c => c.id === circleIdParam) || circles.find(c => c.isHostedByMe) || circles[0];
  const [selectedCircleId, setSelectedCircleId] = useState(defaultCircle?.id || '');
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('18:00');
  const [duration, setDuration] = useState('90m');
  const [modality, setModality] = useState('Online');
  const [meetingLocation, setMeetingLocation] = useState('https://meet.cohortcircle.org/session-live');
  const [agendaNotes, setAgendaNotes] = useState(
    '1. Check-in & review previous objectives (15m)\n2. Collaborative sprint / paper deconstruction (50m)\n3. Debrief & schedule next session (25m)'
  );
  const [errors, setErrors] = useState({});

  // Auto-open modal if circleId query param passed (e.g. from manage circle)
  useEffect(() => {
    if (circleIdParam) {
      setSelectedCircleId(circleIdParam);
      setScheduleModalOpen(true);
    }
  }, [circleIdParam]);

  const todayStr = getTodayString();

  function validateScheduler() {
    const errs = {};
    if (!sessionTitle.trim()) errs.title = 'Session title is required';
    if (!sessionDate) errs.date = 'Session date is required';
    else if (isDateInPast(sessionDate)) errs.date = 'Session date cannot be scheduled in the past';
    if (!sessionTime) errs.time = 'Session time is required';
    if (!agendaNotes.trim()) errs.agenda = 'Please provide at least one agenda topic';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleCreateSession(e) {
    e.preventDefault();
    if (!validateScheduler()) return;

    const res = createSession({
      circleId: selectedCircleId || circles[0]?.id,
      title: sessionTitle,
      date: sessionDate,
      time: sessionTime,
      duration,
      modality,
      locationOrLink: meetingLocation,
      agenda: agendaNotes
    });

    if (res.success) {
      setScheduleModalOpen(false);
      setSessionTitle('');
      setSessionDate('');
      setErrors({});
    } else if (res.errors) {
      setErrors(res.errors);
    }
  }

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Study Sessions & Timetables"
        subtitle="View scheduled study sessions across your cohorts, confirm your RSVPs, and coordinate meeting agendas."
        action={
          <Button
            variant="primary"
            iconLeft={<IconPlus size={16} />}
            onClick={() => setScheduleModalOpen(true)}
          >
            Schedule New Session
          </Button>
        }
      />

      {/* Sessions Grid */}
      <div className={styles.sessionsGrid}>
        {sessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            onRSVPChange={updateRSVP}
          />
        ))}
      </div>

      {/* Visual Session Scheduler Modal */}
      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule Study Session"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateSession}>
              Confirm & Publish Session
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSession} className={styles.schedulerForm}>
          {/* Circle Selector */}
          <Select
            label="Target Study Circle"
            value={selectedCircleId}
            onChange={(e) => setSelectedCircleId(e.target.value)}
            options={circles.map(c => ({ label: `${c.title} (${c.subject})`, value: c.id }))}
          />

          <Input
            label="Session Topic / Title"
            placeholder="e.g. Graph Traversal Algorithms & Whiteboard Sprints"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            error={errors.title}
            required
          />

          <div className={styles.twoCol}>
            <Input
              type="date"
              label="Session Date"
              value={sessionDate}
              min={todayStr} // UX-003: Prevent past dates
              onChange={(e) => setSessionDate(e.target.value)}
              error={errors.date}
              required
            />

            <Input
              type="time"
              label="Start Time"
              value={sessionTime}
              onChange={(e) => setSessionTime(e.target.value)}
              error={errors.time}
              required
            />
          </div>

          <div className={styles.twoCol}>
            <Select
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              options={['45m (Sprint)', '60m (Standard)', '90m (Deep-Dive)', '120m (Workshop)']}
            />

            <Select
              label="Modality"
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              options={['Online', 'In-Person', 'Hybrid']}
            />
          </div>

          <Input
            label="Virtual Meeting Link or In-Person Location"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
            placeholder="e.g. https://meet.cohortcircle.org/session-name"
          />

          <div className={styles.textareaGroup}>
            <label htmlFor="agenda-notes" className={styles.label}>
              Timed Agenda & Breakdown
            </label>
            <textarea
              id="agenda-notes"
              rows={4}
              className={styles.textarea}
              value={agendaNotes}
              onChange={(e) => setAgendaNotes(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
