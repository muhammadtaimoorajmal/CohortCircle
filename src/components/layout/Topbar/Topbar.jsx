import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconSearch, IconMenu, IconHost, IconProfile } from '../../common/Icons';
import Avatar from '../../common/Avatar/Avatar';
import Badge from '../../common/Badge/Badge';
import styles from './Topbar.module.css';

export default function Topbar({
  onToggleMobileMenu,
  activeRole = 'learner',
  onRoleSwitch,
  currentUser
}) {
  const location = useLocation();

  // Determine contextual title
  function getContextTitle() {
    const path = location.pathname;
    if (path.includes('/app/dashboard')) return 'Learner Dashboard';
    if (path.includes('/app/explore')) return 'Explore Study Circles';
    if (path.includes('/app/my-circles')) return 'My Study Circles';
    if (path.includes('/app/sessions')) return 'Study Sessions';
    if (path.includes('/app/profile')) return 'Learner Profile';
    if (path.includes('/app/host/create')) return 'Create New Circle';
    if (path.includes('/app/host/manage')) return 'Manage Circle';
    if (path.includes('/app/host')) return 'Host Facilitation Console';
    if (path.includes('/app/settings')) return 'Settings & Demonstration Data';
    if (path.includes('/app/circles')) return 'Circle Details';
    return 'CohortCircle Workspace';
  }

  return (
    <header className={styles.topbar} aria-label="Main Application Header">
      <div className={styles.left}>
        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={onToggleMobileMenu}
          aria-label="Open mobile navigation menu"
        >
          <IconMenu size={22} />
        </button>

        <div className={styles.contextArea}>
          <h1 className={styles.pageTitle}>{getContextTitle()}</h1>
        </div>
      </div>

      <div className={styles.right}>
        {/* Search quick link */}
        <Link to="/app/explore" className={styles.searchLink} title="Search circles">
          <IconSearch size={16} />
          <span className={styles.searchPlaceholder}>Search subjects, styles, topics...</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </Link>

        {/* Quick Role Toggle in Topbar */}
        <div className={styles.roleToggle}>
          <button
            type="button"
            className={`${styles.rolePill} ${activeRole === 'learner' ? styles.roleActive : ''}`}
            onClick={() => onRoleSwitch?.('learner')}
            title="Switch to Learner Workspace"
          >
            <IconProfile size={14} />
            <span>Learner</span>
          </button>
          <button
            type="button"
            className={`${styles.rolePill} ${activeRole === 'host' ? styles.roleActive : ''}`}
            onClick={() => onRoleSwitch?.('host')}
            title="Switch to Host Workspace"
          >
            <IconHost size={14} />
            <span>Host</span>
          </button>
        </div>

        {/* Demo Mode Badge */}
        <div className={styles.demoBadge}>
          <Badge variant="neutral" size="sm">
            Demo Mode
          </Badge>
        </div>

        {/* User Avatar */}
        <Link to="/app/profile" className={styles.avatarLink} aria-label="View user profile">
          <Avatar
            name={currentUser?.name || 'Alex Rivera'}
            initials={currentUser?.initials || 'AR'}
            color={currentUser?.avatarColor || '#4f46e5'}
            size="sm"
          />
        </Link>
      </div>
    </header>
  );
}
