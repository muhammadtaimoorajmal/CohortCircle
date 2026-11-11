import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import Topbar from '../components/layout/Topbar/Topbar';
import MobileNavigation from '../components/layout/MobileNavigation/MobileNavigation';
import Modal from '../components/common/Modal/Modal';
import Button from '../components/common/Button/Button';
import { useApp } from '../context/AppContext';
import { IconCheck } from '../components/common/Icons';
import styles from './AppShell.module.css';

export default function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    activeRole,
    switchRole,
    currentUser,
    selectedCircleForCompat,
    setSelectedCircleForCompat
  } = useApp();

  return (
    <div className={styles.appContainer}>
      {/* Skip Navigation Link for WCAG Keyboard Navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeRole={activeRole}
        onRoleSwitch={switchRole}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        <Topbar
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          activeRole={activeRole}
          onRoleSwitch={switchRole}
          currentUser={currentUser}
        />

        <main id="main-content" className={styles.contentArea} tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer and Bottom Nav */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeRole={activeRole}
        onRoleSwitch={switchRole}
        currentUser={currentUser}
      />

      {/* Global Compatibility Breakdown Modal */}
      {selectedCircleForCompat && (
        <Modal
          isOpen={Boolean(selectedCircleForCompat)}
          onClose={() => setSelectedCircleForCompat(null)}
          title="Explainable Compatibility Breakdown"
          size="md"
          footer={
            <Button variant="primary" onClick={() => setSelectedCircleForCompat(null)}>
              Got It
            </Button>
          }
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHero}>
              <div className={styles.modalScoreCircle}>
                <span className={styles.modalScoreNumber}>
                  {selectedCircleForCompat.compatibility?.overallScore || 85}%
                </span>
                <span className={styles.modalScoreTag}>Match</span>
              </div>
              <div className={styles.modalHeroText}>
                <h3 className={styles.modalCircleTitle}>{selectedCircleForCompat.title}</h3>
                <p className={styles.modalCircleSub}>
                  Calculated against your active learning profile and schedule.
                </p>
              </div>
            </div>

            <div className={styles.breakdownSection}>
              <h4 className={styles.sectionHeading}>Compatibility Factors</h4>
              <div className={styles.factorsList}>
                {selectedCircleForCompat.compatibility?.breakdown &&
                  Object.entries(selectedCircleForCompat.compatibility.breakdown).map(([key, val]) => {
                    const factorLabels = {
                      topicAlignment: 'Topic & Syllabus Alignment',
                      scheduleOverlap: 'Weekly Schedule Overlap',
                      studyStyleMatch: 'Study Style & Format Match',
                      modalityFit: 'Location / Modality Match',
                      capacityFit: 'Group Size Preference'
                    };
                    return (
                      <div key={key} className={styles.factorItem}>
                        <div className={styles.factorRow}>
                          <span className={styles.factorName}>{factorLabels[key] || key}</span>
                          <span className={styles.factorValue}>{val}%</span>
                        </div>
                        <div className={styles.progressBarBg}>
                          <div
                            className={styles.progressBarFill}
                            style={{
                              width: `${val}%`,
                              backgroundColor: val >= 90 ? 'var(--color-teal-600)' : 'var(--color-primary-600)'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={styles.reasonsSection}>
              <h4 className={styles.sectionHeading}>Why this fits your goals</h4>
              <ul className={styles.reasonsList}>
                {selectedCircleForCompat.compatibility?.matchReasons?.map((reason, idx) => (
                  <li key={idx} className={styles.reasonItem}>
                    <IconCheck size={16} className={styles.reasonIcon} />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
