import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  IconLogo,
  IconDashboard,
  IconExplore,
  IconCircles,
  IconSessions,
  IconProfile,
  IconHost,
  IconPlus,
  IconSettings,
  IconChevronLeft,
  IconChevronRight
} from '../../common/Icons';
import Avatar from '../../common/Avatar/Avatar';
import Badge from '../../common/Badge/Badge';
import styles from './Sidebar.module.css';

export default function Sidebar({
  isCollapsed = false,
  onToggleCollapse,
  activeRole = 'learner', // 'learner' | 'host'
  onRoleSwitch,
  currentUser
}) {
  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
      aria-label="Application Sidebar Navigation"
    >
      {/* Brand Header */}
      <div className={styles.brand}>
        <Link to="/" className={styles.brandLink}>
          <IconLogo size={32} />
          {!isCollapsed && (
            <div className={styles.brandText}>
              <span className={styles.brandName}>CohortCircle</span>
              <span className={styles.brandTagline}>Learn together</span>
            </div>
          )}
        </Link>
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
        </button>
      </div>

      {/* Role Switcher Pill */}
      {!isCollapsed && (
        <div className={styles.roleSwitcherBox}>
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
              onClick={() => onRoleSwitch?.('learner')}
            >
              Learner
            </button>
            <button
              type="button"
              className={`${styles.roleToggleBtn} ${activeRole === 'host' ? styles.activeRole : ''}`}
              onClick={() => onRoleSwitch?.('host')}
            >
              Host
            </button>
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <nav className={styles.nav}>
        {/* Main Learner Navigation */}
        <div className={styles.sectionTitle}>
          {!isCollapsed ? 'LEARNING' : '•'}
        </div>
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="Dashboard"
        >
          <IconDashboard size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/app/explore"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="Explore Circles"
        >
          <IconExplore size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Explore Circles</span>}
        </NavLink>

        <NavLink
          to="/app/my-circles"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="My Circles"
        >
          <IconCircles size={18} className={styles.navIcon} />
          {!isCollapsed && <span>My Circles</span>}
        </NavLink>

        <NavLink
          to="/app/sessions"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="Study Sessions"
        >
          <IconSessions size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Sessions</span>}
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="My Profile"
        >
          <IconProfile size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Learner Profile</span>}
        </NavLink>

        {/* Host Section */}
        <div className={styles.sectionTitle}>
          {!isCollapsed ? 'FACILITATION' : '•'}
        </div>
        <NavLink
          to="/app/host"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="Host Dashboard"
        >
          <IconHost size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Host Dashboard</span>}
        </NavLink>

        <NavLink
          to="/app/host/create"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="Create New Circle"
        >
          <IconPlus size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Create Circle</span>}
        </NavLink>

        {/* System & Settings */}
        <div className={styles.sectionTitle}>
          {!isCollapsed ? 'SYSTEM' : '•'}
        </div>
        <NavLink
          to="/app/settings"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
          title="Settings & Demo Data"
        >
          <IconSettings size={18} className={styles.navIcon} />
          {!isCollapsed && <span>Settings & Demo</span>}
        </NavLink>
      </nav>

      {/* Footer User Profile */}
      <div className={styles.footer}>
        <Link to="/app/profile" className={styles.userCard} title="View Profile">
          <Avatar
            name={currentUser?.name || 'Alex Rivera'}
            initials={currentUser?.initials || 'AR'}
            color={currentUser?.avatarColor || '#4f46e5'}
            size="sm"
          />
          {!isCollapsed && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser?.name || 'Alex Rivera'}</span>
              <span className={styles.userRole}>{currentUser?.academicLevel || 'Learner'}</span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
