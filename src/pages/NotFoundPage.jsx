import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import { IconCircles, IconArrowRight } from '../components/common/Icons';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconCircle}>
          <IconCircles size={40} />
        </div>
        <h1 className={styles.title}>404 — Page Not Found</h1>
        <p className={styles.desc}>
          The study cohort, session, or link you are looking for does not exist or has been relocated.
        </p>
        <div className={styles.actions}>
          <Link to="/app/dashboard">
            <Button variant="primary" iconRight={<IconArrowRight size={16} />}>
              Return to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline">
              CohortCircle Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
