import React from 'react';
import styles from './Input.module.css';

export default function Input({
  id,
  label,
  error,
  helperText,
  iconLeft,
  iconRight,
  type = 'text',
  className = '',
  required = false,
  ...rest
}) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = inputId && error ? `${inputId}-error` : undefined;
  const helperId = inputId && helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={`${styles.inputContainer} ${error ? styles.hasError : ''}`}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          className={styles.input}
          aria-invalid={Boolean(error)}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          required={required}
          {...rest}
        />
        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
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
