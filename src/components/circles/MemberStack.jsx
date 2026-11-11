import React from 'react';
import Avatar from '../common/Avatar/Avatar';
import styles from './MemberStack.module.css';

export default function MemberStack({ count = 4, max = 6, showText = true, className = '' }) {
  // Generate initials for the avatars based on count
  const dummyNames = ['Alex Rivera', 'Elena Rostova', 'Marcus Chen', 'Sara Takahashi', 'Jordan Blake'];
  const visible = dummyNames.slice(0, Math.min(count, 3));

  return (
    <div className={`${styles.stackContainer} ${className}`}>
      <div className={styles.avatars} aria-label={`${count} of ${max} members`}>
        {visible.map((name, i) => (
          <Avatar
            key={i}
            name={name}
            size="xs"
            className={styles.stackedAvatar}
            style={{ zIndex: 10 - i }}
          />
        ))}
      </div>
      {showText && (
        <span className={styles.text}>
          <strong className={styles.current}>{count}</strong>
          <span className={styles.slash}>/</span>
          <span className={styles.max}>{max}</span> peers
        </span>
      )}
    </div>
  );
}
