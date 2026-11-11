import React from 'react';
import styles from './Select.module.css';

export default function Select({
  id,
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  required = false,
  className = '',
  ...rest
}) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = selectId && error ? `${selectId}-error` : undefined;
  const helperId = selectId && helperText ? `${selectId}-helper` : undefined;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={`${styles.selectContainer} ${error ? styles.hasError : ''}`}>
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={styles.select}
          aria-invalid={Boolean(error)}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          required={required}
          {...rest}
        >
          {options.map((opt, idx) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={idx} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {error && (
        <p id={errorId} className={styles.errorText} role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}
