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
  const { settings, updateSettings, resetDemoData, clearLocalData } = useApp();

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const highContrast = Boolean(settings?.highContrast);
  const sessionReminders = settings?.sessionReminders ?? true;
  const admissionQueueUpdates = settings?.admissionQueueUpdates ?? true;

  function toggleHighContrast() {
    updateSettings({ highContrast: !highContrast });
  }

  function toggleSessionReminders() {
    updateSettings({ sessionReminders: !sessionReminders });
  }

  function toggleAdmissionQueueUpdates() {
    updateSettings({ admissionQueueUpdates: !admissionQueueUpdates });
  }

  function confirmReset() {
    resetDemoData();
    setResetModalOpen(false);
    setFeedbackMessage('Demonstration catalog, sessions, and profile have been reset to default baseline seeds!');
    setTimeout(() => setFeedbackMessage(null), 3500);
  }

  function confirmClear() {
    clearLocalData();
    setClearModalOpen(false);
    setFeedbackMessage('Local state cleared. Application initialized with safe empty baseline.');
    setTimeout(() => setFeedbackMessage(null), 3500);
  }

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Settings & Demonstration Workspace"
        subtitle="Manage interface preferences, review accessibility configurations, and administer local test data."
      />

      {feedbackMessage && (
        <div className={styles.alertSuccess} role="status">
          <IconCheck size={18} />
          <span>{feedbackMessage}</span>
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
              CohortCircle targets WCAG 2.2 Level AA guidelines for digital inclusion and contrast.
            </p>

            <div className={styles.toggleRow}>
              <div>
                <span className={styles.toggleLabel}>High Contrast Mode</span>
                <span className={styles.toggleDesc}>Increases visual borders and text contrast across application surfaces.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${highContrast ? styles.toggleOn : ''}`}
                onClick={toggleHighContrast}
                aria-pressed={highContrast}
                aria-label="Toggle High Contrast Mode"
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            <div className={styles.infoBox}>
              <IconInfo size={16} className={styles.infoIcon} />
              <span>Reduced-motion is automatically detected from your operating system preferences.</span>
            </div>
          </Card>

          {/* Notifications / In-App Reminders */}
          <Card padding="lg" className={styles.card}>
            <h2 className={styles.cardTitle}>In-App Alerts & Reminders</h2>
            <p className={styles.cardSub}>
              Configure local in-app dashboard indicators and agenda reminders (no external email server).
            </p>

            <div className={styles.toggleRow}>
              <div>
                <span className={styles.toggleLabel}>Session Reminders (24h before)</span>
                <span className={styles.toggleDesc}>Highlight upcoming study sessions prominently in your dashboard.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${sessionReminders ? styles.toggleOn : ''}`}
                onClick={toggleSessionReminders}
                aria-pressed={sessionReminders}
                aria-label="Toggle Session Reminders"
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            <div className={styles.toggleRow}>
              <div>
                <span className={styles.toggleLabel}>Admission Queue Badge Alerts</span>
                <span className={styles.toggleDesc}>Display alert count on host console when new applicants request to join.</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${admissionQueueUpdates ? styles.toggleOn : ''}`}
                onClick={toggleAdmissionQueueUpdates}
                aria-pressed={admissionQueueUpdates}
                aria-label="Toggle Admission Queue Alerts"
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
              <Badge variant="primary" size="sm">Persistent Local Store</Badge>
            </div>

            <div className={styles.disclosureContent}>
              <p className={styles.disclosureText}>
                <strong>Data Architecture:</strong> CohortCircle operates as a client-side, local-first demonstration platform. All application state (circles, rosters, applicants, sessions, profile preferences) is stored persistently in your browser's localStorage under a versioned schema.
              </p>
              <ul className={styles.disclosureList}>
                <li>• No real student identities or contact records are collected or transmitted.</li>
                <li>• Compatibility scores are calculated deterministically using a transparent 5-factor rule model.</li>
                <li>• Data changes survive full browser reloads and tab navigation.</li>
                <li>• Single-browser scope: no multi-user cloud backend or remote synchronization is attached.</li>
              </ul>
            </div>

            <div className={styles.demoActions}>
              <h3 className={styles.actionTitle}>State Administration</h3>
              <p className={styles.actionDesc}>
                Restore the baseline demonstration dataset or clear local browser storage:
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                <Button
                  variant="outline"
                  className={styles.resetBtn}
                  onClick={() => setResetModalOpen(true)}
                >
                  Restore Initial Demo Data
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setClearModalOpen(true)}
                  style={{ color: '#ef4444' }}
                >
                  Clear Local State
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Restore Initial Demo Baseline?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmReset}>
              Yes, Restore Baseline
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          This will restore all demo circles, session RSVPs, pending applicants, and your learner profile back to their initial factory demonstration seeds.
        </p>
      </Modal>

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        title="Clear Local Application Data?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setClearModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmClear}>
              Confirm Clear
            </Button>
          </>
        }
      >
        <p className={styles.modalText}>
          This will reset browser localStorage and start with a clean empty workspace. You can restore the demonstration baseline at any time.
        </p>
      </Modal>
    </div>
  );
}
