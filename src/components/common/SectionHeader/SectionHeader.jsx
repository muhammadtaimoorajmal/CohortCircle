import React from 'react';
import styles from './SectionHeader.module.css';

export default function SectionHeader({
  title,
  subtitle,
  action,
  badge,
  className = ''
}) {
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.titles}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
