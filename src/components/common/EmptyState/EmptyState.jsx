import React from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = ''
}) {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
