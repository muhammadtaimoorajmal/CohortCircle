import React from 'react';
import styles from './StudyStyleBadge.module.css';

export default function StudyStyleBadge({ styleName = 'Collaborative Problem Solving', className = '' }) {
  // Visual variations depending on style
  let variant = 'default';
  if (styleName.includes('Silent')) variant = 'silent';
  else if (styleName.includes('Collaborative')) variant = 'collab';
  else if (styleName.includes('Discussion')) variant = 'discussion';
  else if (styleName.includes('Peer Teaching')) variant = 'teaching';
  else if (styleName.includes('Exam')) variant = 'exam';

  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.name}>{styleName}</span>
    </span>
  );
}
