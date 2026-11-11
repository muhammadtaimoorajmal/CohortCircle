import React, { useState } from 'react';
import { IconCheck } from '../common/Icons';
import styles from './RSVPControl.module.css';

export default function RSVPControl({
  initialStatus = 'attending', // 'attending' | 'tentative' | 'declined'
  onStatusChange,
  className = ''
}) {
  const [status, setStatus] = useState(initialStatus);

  function handleSelect(newStatus) {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  }

  return (
    <div className={`${styles.control} ${className}`} role="group" aria-label="RSVP Status Selection">
      <button
        type="button"
        className={`${styles.button} ${status === 'attending' ? styles.activeAttending : ''}`}
        onClick={() => handleSelect('attending')}
        aria-pressed={status === 'attending'}
      >
        {status === 'attending' && <IconCheck size={14} className={styles.icon} />}
        <span>Attending</span>
      </button>

      <button
        type="button"
        className={`${styles.button} ${status === 'tentative' ? styles.activeTentative : ''}`}
        onClick={() => handleSelect('tentative')}
        aria-pressed={status === 'tentative'}
      >
        <span>Tentative</span>
      </button>

      <button
        type="button"
        className={`${styles.button} ${status === 'declined' ? styles.activeDeclined : ''}`}
        onClick={() => handleSelect('declined')}
        aria-pressed={status === 'declined'}
      >
        <span>Decline</span>
      </button>
    </div>
  );
}
