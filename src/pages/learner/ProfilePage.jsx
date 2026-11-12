import React, { useState } from 'react';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Select/Select';
import Badge from '../../components/common/Badge/Badge';
import Avatar from '../../components/common/Avatar/Avatar';
import { useApp } from '../../context/AppContext';
import {
  IconCheck,
  IconClose
} from '../../components/common/Icons';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { currentUser, updateProfile, updateAvailability } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [handle, setHandle] = useState(currentUser.handle || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [academicLevel, setAcademicLevel] = useState(currentUser.academicLevel || 'Undergraduate Senior');
  const [language, setLanguage] = useState(currentUser.primaryLanguage || 'English');
  const [modality, setModality] = useState(currentUser.preferredModality || 'Online');
  const [capacity, setCapacity] = useState(currentUser.preferredCapacity || '4–6 peers');
  const [topics, setTopics] = useState(currentUser.topics || []);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [stylesList, setStylesList] = useState(currentUser.studyStyles || []);
  const [availability, setAvailability] = useState(
    currentUser.availability || { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] }
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeSlots = ['Morning (8 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (6 PM - 10 PM)'];

  const allStudyStyles = [
    'Collaborative Problem Solving',
    'Discussion-Based Learning',
    'Silent Co-Study',
    'Peer Teaching',
    'Examination Preparation'
  ];

  function toggleSlot(day, slot) {
    setAvailability(prev => {
      const currentDaySlots = prev[day] || [];
      const exists = currentDaySlots.includes(slot);
      return {
        ...prev,
        [day]: exists
          ? currentDaySlots.filter(s => s !== slot)
          : [...currentDaySlots, slot]
      };
    });
  }

  function handleSetAllWeekdays() {
    setAvailability(prev => ({
      ...prev,
      Mon: ['Evening (6 PM - 10 PM)'],
      Tue: ['Evening (6 PM - 10 PM)'],
      Wed: ['Evening (6 PM - 10 PM)'],
      Thu: ['Evening (6 PM - 10 PM)'],
      Fri: ['Evening (6 PM - 10 PM)']
    }));
  }

  function handleClearAllSlots() {
    setAvailability({
      Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
    });
  }

  function toggleStyle(st) {
    setStylesList(prev =>
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
  }

  function handleAddTopic() {
    if (newTopicInput.trim() && !topics.includes(newTopicInput.trim())) {
      setTopics([...topics, newTopicInput.trim()]);
      setNewTopicInput('');
    }
  }

  function handleRemoveTopic(topicToRemove) {
    setTopics(topics.filter(t => t !== topicToRemove));
  }

  function handleSaveProfile(e) {
    e?.preventDefault();
    const result = updateProfile({
      name,
      handle,
      bio,
      academicLevel,
      primaryLanguage: language,
      preferredModality: modality,
      preferredCapacity: capacity,
      topics,
      studyStyles: stylesList,
      availability
    });

    if (result && !result.success) {
      setFormErrors(result.errors || {});
      return;
    }

    updateAvailability(availability);
    setFormErrors({});
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Learner Profile & Preferences"
        subtitle="Manage your learning identity, subjects, weekly availability, and study preferences."
        action={
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        }
      />

      {savedSuccess && (
        <div className={styles.alertSuccess} role="status">
          <IconCheck size={18} />
          <span>Your learning profile and availability have been successfully updated!</span>
        </div>
      )}

      {Object.keys(formErrors).length > 0 && (
        <div className={styles.alertError || styles.alertSuccess} role="alert" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: '#ef4444', marginBottom: '16px', padding: '12px 16px', borderRadius: '8px', border: '1px solid' }}>
          <strong>Please fix the following:</strong>
          <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
            {Object.values(formErrors).map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className={styles.profileLayout}>
        {/* Left Column: Identity & Topics */}
        <div className={styles.leftCol}>
          {/* Identity Card */}
          <Card padding="lg" className={styles.card}>
            <div className={styles.avatarHeader}>
              <Avatar
                name={name}
                initials={currentUser.initials}
                color={currentUser.avatarColor}
                size="xl"
              />
              <div className={styles.avatarMeta}>
                <h3 className={styles.avatarName}>{name}</h3>
                <span className={styles.avatarHandle}>{handle}</span>
                <Badge variant="teal" size="sm">Rule-Based Profile Active</Badge>
              </div>
            </div>

            <div className={styles.formFields}>
              <Input
                label="Full Display Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Community Handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
              />

              <Select
                label="Academic / Learning Stage"
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
                options={[
                  'Undergraduate Lower-Division',
                  'Undergraduate Senior',
                  'Graduate Student',
                  'Independent Self-Learner',
                  'Career Transitioning'
                ]}
              />

              <Select
                label="Primary Study Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={[
                  'English',
                  'Spanish',
                  'Mandarin',
                  'French',
                  'German',
                  'Japanese',
                  'Other'
                ]}
              />

              <div className={styles.textareaGroup}>
                <label htmlFor="bio-input" className={styles.label}>
                  Personal Learning Bio
                </label>
                <textarea
                  id="bio-input"
                  rows={3}
                  className={styles.textarea}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Topics & Subjects */}
          <Card padding="lg" className={styles.card}>
            <h3 className={styles.cardHeading}>Syllabus & Focus Subjects</h3>
            <p className={styles.cardSub}>
              CohortCircle matches you with study circles covering these specific topics.
            </p>

            <div className={styles.topicsTagList}>
              {topics.map(t => (
                <span key={t} className={styles.topicTag}>
                  {t}
                  <button
                    type="button"
                    className={styles.removeTagBtn}
                    onClick={() => handleRemoveTopic(t)}
                    aria-label={`Remove topic ${t}`}
                  >
                    <IconClose size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className={styles.addTopicRow}>
              <Input
                placeholder="Add topic (e.g. Linear Algebra, Raft Consensus)..."
                value={newTopicInput}
                onChange={(e) => setNewTopicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTopic();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={handleAddTopic}>
                Add
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Availability Grid & Formats */}
        <div className={styles.rightCol}>
          {/* Availability Grid (7x3) */}
          <Card padding="lg" className={styles.card}>
            <div className={styles.gridHeaderRow}>
              <div>
                <h3 className={styles.cardHeading}>Weekly Availability Matrix</h3>
                <p className={styles.cardSub}>
                  Toggle the recurring blocks when you are free to meet for study sessions.
                </p>
              </div>

              <div className={styles.presetButtons}>
                <button
                  type="button"
                  className={styles.presetBtn}
                  onClick={handleSetAllWeekdays}
                >
                  All Weekdays (6–10 PM)
                </button>
                <button
                  type="button"
                  className={styles.presetBtn}
                  onClick={handleClearAllSlots}
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className={styles.gridWrapper}>
              <table className={styles.matrixTable} aria-label="Availability Grid">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Morning (8–12)</th>
                    <th>Afternoon (12–5)</th>
                    <th>Evening (6–10)</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map(day => (
                    <tr key={day}>
                      <td className={styles.dayLabel}>{day}</td>
                      {timeSlots.map(slot => {
                        const isSelected = availability[day]?.includes(slot);
                        return (
                          <td key={slot} className={styles.cellTd}>
                            <button
                              type="button"
                              className={`${styles.slotBtn} ${isSelected ? styles.slotSelected : ''}`}
                              onClick={() => toggleSlot(day, slot)}
                              aria-pressed={isSelected}
                            >
                              {isSelected ? 'FREE' : '—'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.matrixLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendFree} /> Available for study
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendBusy} /> Busy / Unavailable
              </span>
            </div>
          </Card>

          {/* Study Styles & Format Preferences */}
          <Card padding="lg" className={styles.card}>
            <h3 className={styles.cardHeading}>Preferred Study Styles</h3>
            <p className={styles.cardSub}>
              Select the collaborative learning formats where you do your best work.
            </p>

            <div className={styles.stylePillsGrid}>
              {allStudyStyles.map(st => {
                const isChecked = stylesList.includes(st);
                return (
                  <button
                    key={st}
                    type="button"
                    className={`${styles.styleSelectPill} ${isChecked ? styles.styleSelected : ''}`}
                    onClick={() => toggleStyle(st)}
                    aria-pressed={isChecked}
                  >
                    <IconCheck size={14} className={styles.checkIcon} />
                    <span>{st}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.preferencesRow}>
              <Select
                label="Preferred Modality"
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                options={['Online', 'In-Person', 'Hybrid']}
              />
              <Select
                label="Preferred Cohort Size"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                options={['2–4 peers (Micro)', '4–6 peers (Standard)', '6–8 peers (Collaborative)']}
              />
            </div>

            {/* Secondary Save Button at base of right column (addressing UX-012) */}
            <div className={styles.bottomSaveRow}>
              <Button type="submit" variant="primary" size="md">
                Save Profile & Preferences
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
