import React from 'react';
import { Link } from 'react-router-dom';
import { IconLogo } from '../../common/Icons';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <IconLogo size={28} />
              <span className={styles.brandName}>CohortCircle</span>
            </div>
            <p className={styles.tagline}>
              Find your people. Learn together. An open-source collaborative learning platform built on explainable compatibility.
            </p>
            <div className={styles.licensePill}>
              <span>MIT Licensed Open Source Software</span>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Platform</h4>
              <Link to="/app/explore" className={styles.footerLink}>Explore Circles</Link>
              <Link to="/app/dashboard" className={styles.footerLink}>Learner Dashboard</Link>
              <Link to="/app/host" className={styles.footerLink}>Host Facilitation</Link>
              <Link to="/app/sessions" className={styles.footerLink}>Study Sessions</Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Documentation</h4>
              <Link to="/about" className={styles.footerLink}>About Project</Link>
              <a href="https://github.com/muhammadtaimoorajmal/CohortCircle" target="_blank" rel="noreferrer" className={styles.footerLink}>
                GitHub Repository
              </a>
              <Link to="/app/settings" className={styles.footerLink}>Demo Data Console</Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Principles</h4>
              <span className={styles.principleItem}>• Explainable Matching</span>
              <span className={styles.principleItem}>• WCAG 2.2 AA Accessibility</span>
              <span className={styles.principleItem}>• Privacy by Design</span>
              <span className={styles.principleItem}>• Structured Accountability</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; 2026 Muhammad Taimoor Ajmal. All rights reserved under the MIT License.
          </p>
          <div className={styles.bottomLinks}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>Demonstration Environment Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
