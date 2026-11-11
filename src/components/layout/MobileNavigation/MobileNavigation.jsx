import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconDashboard,
  IconExplore,
  IconCircles,
  IconSessions,
  IconHost,
  IconClose,
  IconProfile,
  IconPlus,
  IconSettings,
  IconLogo
} from '../../common/Icons';
import Avatar from '../../common/Avatar/Avatar';
import Badge from '../../common/Badge/Badge';
import styles from './MobileNavigation.module.css';

export default function MobileNavigation({
  isOpen = false,
  onClose,
  activeRole = 'learner',
  onRoleSwitch,
  currentUser
}) {
  return (
    <>
      {/* Bottom Fixed Navigation Bar */}
      <nav className={styles.bottomBar} aria-label="Mobile Navigation Bar">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.bottomActive : ''}`}
        >
          <IconDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/app/explore"
          className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.bottomActive : ''}`}
        >
          <IconExplore size={20} />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/app/my-circles"
          className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.bottomActive : ''}`}
        >
          <IconCircles size={20} />
          <span>Circles</span>
        </NavLink>

        <NavLink
          to="/app/sessions"
          className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.bottomActive : ''}`}
        >
          <IconSessions size={20} />
          <span>Sessions</span>
        </NavLink>

        <NavLink
          to="/app/host"
          className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.bottomActive : ''}`}
        >
          <IconHost size={20} />
          <span>Host</span>
        </NavLink>
      </nav>

      {/* Slide-over Drawer for full navigation */}
      {isOpen && (
        <div className={styles.drawerOverlay} onClick={onClose} role="presentation">
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <div className={styles.drawerBrand}>
                <IconLogo size={28} />
                <span className={styles.brandTitle}>CohortCircle</span>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close menu"
              >
                <IconClose size={20} />
              </button>
            </div>

            {/* Role switch in drawer */}
            <div className={styles.drawerRoleBox}>
              <div className={styles.roleHeader}>
                <span className={styles.roleLabel}>Active Workspace</span>
                <Badge variant={activeRole === 'host' ? 'teal' : 'primary'} size="sm">
                  {activeRole === 'host' ? 'Host' : 'Learner'}
                </Badge>
              </div>
              <div className={styles.roleToggleGroup}>
                <button
                  type="button"
                  className={`${styles.roleToggleBtn} ${activeRole === 'learner' ? styles.activeRole : ''}`}
                  onClick={() => {
                    onRoleSwitch?.('learner');
                  }}
                >
                  Learner Mode
                </button>
                <button
                  type="button"
                  className={`${styles.roleToggleBtn} ${activeRole === 'host' ? styles.activeRole : ''}`}
                  onClick={() => {
                    onRoleSwitch?.('host');
                  }}
                >
                  Host Mode
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <div className={styles.drawerNav}>
              <NavLink to="/app/dashboard" className={styles.drawerLink} onClick={onClose}>
                <IconDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/app/explore" className={styles.drawerLink} onClick={onClose}>
                <IconExplore size={18} />
                <span>Explore Circles</span>
              </NavLink>
              <NavLink to="/app/my-circles" className={styles.drawerLink} onClick={onClose}>
                <IconCircles size={18} />
                <span>My Circles</span>
              </NavLink>
              <NavLink to="/app/sessions" className={styles.drawerLink} onClick={onClose}>
                <IconSessions size={18} />
                <span>Sessions</span>
              </NavLink>
              <NavLink to="/app/profile" className={styles.drawerLink} onClick={onClose}>
                <IconProfile size={18} />
                <span>Learner Profile</span>
              </NavLink>
              <div className={styles.drawerDivider} />
              <NavLink to="/app/host" className={styles.drawerLink} onClick={onClose}>
                <IconHost size={18} />
                <span>Host Dashboard</span>
              </NavLink>
              <NavLink to="/app/host/create" className={styles.drawerLink} onClick={onClose}>
                <IconPlus size={18} />
                <span>Create Study Circle</span>
              </NavLink>
              <div className={styles.drawerDivider} />
              <NavLink to="/app/settings" className={styles.drawerLink} onClick={onClose}>
                <IconSettings size={18} />
                <span>Settings & Demo Data</span>
              </NavLink>
            </div>

            {/* User card in drawer footer */}
            <div className={styles.drawerFooter}>
              <div className={styles.drawerUser}>
                <Avatar
                  name={currentUser?.name || 'Alex Rivera'}
                  initials={currentUser?.initials || 'AR'}
                  color={currentUser?.avatarColor || '#4f46e5'}
                  size="sm"
                />
                <div className={styles.drawerUserInfo}>
                  <span className={styles.drawerUserName}>{currentUser?.name || 'Alex Rivera'}</span>
                  <span className={styles.drawerUserRole}>{currentUser?.handle || '@arivera'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
