import React from 'react';
import styles from './Badge.module.css';

export default function Badge({
  children,
  variant = 'neutral', // 'neutral' | 'primary' | 'teal' | 'success' | 'warning' | 'danger'
  size = 'md', // 'sm' | 'md'
  icon,
  className = '',
  ...rest
}) {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </span>
  );
}
