import React from 'react';
import styles from './Card.module.css';

export default function Card({
  children,
  header,
  footer,
  padding = 'md', // 'none' | 'sm' | 'md' | 'lg'
  hoverable = false,
  bordered = true,
  className = '',
  onClick,
  ...rest
}) {
  const cardClasses = [
    styles.card,
    styles[`pad-${padding}`],
    hoverable ? styles.hoverable : '',
    bordered ? styles.bordered : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...rest}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
