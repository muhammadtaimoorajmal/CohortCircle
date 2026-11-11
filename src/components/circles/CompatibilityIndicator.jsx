import React from 'react';
import { IconSparkles } from '../common/Icons';
import styles from './CompatibilityIndicator.module.css';

export default function CompatibilityIndicator({
  score = 85,
  size = 'md', // 'sm' | 'md' | 'lg'
  showLabel = true,
  onClick,
  className = ''
}) {
  let tier = 'high';
  if (score < 70) tier = 'low';
  else if (score < 85) tier = 'medium';

  const containerClasses = [
    styles.indicator,
    styles[size],
    styles[tier],
    onClick ? styles.clickable : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      onClick={onClick}
      role={onClick ? 'button' : 'status'}
      tabIndex={onClick ? 0 : undefined}
      title={`${score}% compatibility match based on subjects, availability, and study style`}
      aria-label={`${score}% compatibility score`}
    >
      <IconSparkles size={size === 'sm' ? 12 : 14} className={styles.icon} />
      <span className={styles.score}>{score}%</span>
      {showLabel && <span className={styles.label}>Match</span>}
    </div>
  );
}
