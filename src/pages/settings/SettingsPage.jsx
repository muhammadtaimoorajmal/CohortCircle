import React, { useState } from 'react';
import SectionHeader from '../../components/common/SectionHeader/SectionHeader';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import Modal from '../../components/common/Modal/Modal';
import { useApp } from '../../context/AppContext';
import {
  IconCheck,
  IconInfo
} from '../../components/common/Icons';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { resetDemoData } = useApp();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  function confirmReset() {
    resetDemoData();
    setResetModalOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3500);
  }

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Settings & Demonstration Workspace"
        subtitle="Manage interface preferences, review accessibility configurations, and administer local test data."
      />

      {resetSuccess && (
        <div className={styles.alertSuccess} role="status">
          <IconCheck size={18} />
          <span>Demonstration catalog, sessions, and profile have been reset to default seeds!</span>
        </div>
      )}

      <div className={styles.settingsGrid}>
        {/* Left Column: Preferences */}
        <div className={styles.leftCol}>
          {/* Accessibility Settings */}
          <Card padding="lg" className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Accessibility & Display</h2>
              <Badge variant="teal" size="sm">WCAG 2.2 AA</Badge>
            </div>
            <p className={styles.cardSub}>
              CohortCircle targets WCAG 2.2 Level AA guidelines for digital inclusion.
            </p>

            <div className={styles.toggleRow}>
              <div>
                <span className={styles.toggleLabel}>High Contrast Mode</span>
                <span className={styles.toggleDesc}>Enforces high contrast (minimum 7:1) across text and interface cards.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${highContrast ? styles.toggleOn : ''}`}
                onClick={() => setHighContrast(!highContrast)}
                aria-pressed={highContrast}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            <div className={styles.infoBox}>
              <IconInfo size={16} className={styles.infoIcon} />
              <span>Reduced-motion is automatically detected from your operating system preferences.</span>
            </div>
          </Card>

          {/* Notifications / Communication */}
          <Card padding="lg" className={styles.card}>
            <h2 className={styles.cardTitle}>Session & RSVP Alerts</h2>
            <p className={styles.cardSub}>
              Configure how you receive cohort updates and agenda reminders.
            </p>

            <div className={styles.toggleRow}>
              <div>
                <span className={styles.toggleLabel}>Session Reminders (24h before)</span>
                <span className={styles.toggleDesc}>Receive an agenda checklist 24 hours prior to scheduled study times.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${sessionReminders ? styles.toggleOn : ''}`}
                onClick={() => setSessionReminders(!sessionReminders)}
                aria-pressed={sessionReminders}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            <div className={styles.toggleRow}>
              <div>
                <span className={styles.toggleLabel}>Admission Queue Updates</span>
                <span className={styles.toggleDesc}>Notifications when applicants request to join your hosted study circles.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${emailNotifications ? styles.toggleOn : ''}`}
                onClick={() => setEmailNotifications(!emailNotifications)}
                aria-pressed={emailNotifications}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column: Demo Environment Disclosure & Controls */}
        <div className={styles.rightCol}>
          <Card padding="lg" className={styles.demoCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Local Demonstration Environment</h2>
              <Badge variant="primary" size="sm">Prototype Stage</Badge>
            </div>

            <div className={styles.disclosureContent}>
              <p className={styles.disclosureText}>
                <strong>Notice:</strong> This application is running as a client-side high-fidelity React prototype. All demonstration data (circles, applicants, study sessions, profile details) is maintained in-memory.
              </p>
              <ul className={styles.disclosureList}>
                <li>• No real student identities or contact records are collected or stored.</li>
                <li>• Compatibility percentages are calculated via explainable rule-based weights.</li>
                <li>• Full persistent local database and sync will be established in Module 08.</li>
              </ul>
            </div>

            <div className={styles.demoActions}>
              <h3 className={styles.actionTitle}>Demo State Management</h3>
              <p className={styles.actionDesc}>
                If you have modified circles, changed applicant statuses, or scheduled sessions and want to restore the initial test seed:
              </p>
              <Button
                variant="outline"
                className={styles.resetBtn}
                onClick={() => setResetModalOpen(true)}
              >
                Restore Initial Demo Data
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Restore Initial Demo Data?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmReset}>
              Yes, Restore Data
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          This will reset all circles, session RSVPs, pending applicants, and your learner profile back to their initial factory demonstration state.
        </p>
      </Modal>
    </div>
  );
}
