import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconLogo, IconMenu, IconClose, IconArrowRight } from '../../common/Icons';
import Button from '../../common/Button/Button';
import styles from './PublicNavbar.module.css';

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar} aria-label="Main Public Navigation">
      <div className={styles.container}>
        {/* Brand */}
        <Link to="/" className={styles.brand}>
          <IconLogo size={32} />
          <span className={styles.brandName}>CohortCircle</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}>
            Home
          </NavLink>
          <a href="#how-it-works" className={styles.link}>
            How It Works
          </a>
          <NavLink to="/app/explore" className={styles.link}>
            Explore Circles
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}>
            About
          </NavLink>
        </div>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <Link to="/app/dashboard">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/app/dashboard">
            <Button variant="primary" size="sm" iconRight={<IconArrowRight size={14} />}>
              Open Demo Workspace
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <NavLink to="/" end className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <a href="#how-it-works" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            How It Works
          </a>
          <NavLink to="/app/explore" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Explore Circles
          </NavLink>
          <NavLink to="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            About
          </NavLink>
          <div className={styles.mobileActions}>
            <Link to="/app/dashboard" onClick={() => setMobileOpen(false)} style={{ width: '100%' }}>
              <Button variant="primary" fullWidth>
                Open Demo Workspace
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
