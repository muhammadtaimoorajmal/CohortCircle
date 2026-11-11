import React from 'react';
import styles from './Avatar.module.css';

export default function Avatar({
  name = 'User',
  initials,
  color,
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  ...rest
}) {
  const displayInitials = initials || name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  
  // Deterministic color from name if color not provided
  const colors = ['#4f46e5', '#0d9488', '#6366f1', '#059669', '#d97706', '#dc2626', '#7c3aed', '#2563eb'];
  const bg = color || colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${className}`}
      style={{ backgroundColor: bg }}
      title={name}
      aria-label={name}
      {...rest}
    >
      <span className={styles.initials}>{displayInitials}</span>
    </div>
  );
}
