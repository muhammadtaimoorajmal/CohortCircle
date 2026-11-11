import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar/PublicNavbar';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import { IconArrowRight } from '../../components/common/Icons';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <PublicNavbar />

      <main className={styles.main}>
        {/* Header */}
        <section className={styles.headerSection}>
          <div className={styles.container}>
            <Badge variant="primary" size="md">
              About the Platform
            </Badge>
            <h1 className={styles.title}>
              Engineering Human-Centered <br />
              <span className={styles.gradientText}>Collaborative Learning</span>
            </h1>
            <p className={styles.lead}>
              CohortCircle is an open-source platform created to solve the structural failure modes of modern study groups: coordination friction, mismatched expectations, and unexplainable group formation.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className={styles.principlesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Core Architectural Principles</h2>
            <div className={styles.principlesGrid}>
              <Card padding="lg" className={styles.principleCard}>
                <div className={styles.principleIcon}>01</div>
                <h3 className={styles.principleTitle}>Explainable Matching</h3>
                <p className={styles.principleText}>
                  Zero black-box machine learning or engagement-maximizing algorithms. Every match percentage is derived from transparent, rule-based weights across subject alignment, availability overlap, and study habits.
                </p>
              </Card>

              <Card padding="lg" className={styles.principleCard}>
                <div className={styles.principleIcon}>02</div>
                <h3 className={styles.principleTitle}>Privacy by Design</h3>
                <p className={styles.principleText}>
                  We do not harvest behavioral telemetry or sell student data. Research data is rigorously de-identified, and all local testing data is isolated from public version control.
                </p>
              </Card>

              <Card padding="lg" className={styles.principleCard}>
                <div className={styles.principleIcon}>03</div>
                <h3 className={styles.principleTitle}>Universal Accessibility</h3>
                <p className={styles.principleText}>
                  Built to meet WCAG 2.2 Level AA accessibility standards, featuring high contrast text, complete keyboard traversability, semantic ARIA landmarks, and robust screen-reader support.
                </p>
              </Card>

              <Card padding="lg" className={styles.principleCard}>
                <div className={styles.principleIcon}>04</div>
                <h3 className={styles.principleTitle}>Structured Accountability</h3>
                <p className={styles.principleText}>
                  Study circles are not open chatrooms. They are micro-cohorts with explicit charters, bounded capacities (2–8 members), time-stamped agendas, and reciprocal RSVP commitments.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Governance & Maintainer */}
        <section className={styles.governanceSection}>
          <div className={styles.container}>
            <div className={styles.govCard}>
              <h2 className={styles.govTitle}>Open Source Project Governance</h2>
              <p className={styles.govText}>
                CohortCircle is developed as an independent, public open-source project licensed under the permissive MIT License. It adheres to an empirical 10-module engineering lifecycle spanning formative research, conceptual design, low-fidelity prototyping, and high-fidelity production development.
              </p>
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Project Lead & Maintainer</span>
                  <span className={styles.metaVal}>Muhammad Taimoor Ajmal</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Repository</span>
                  <span className={styles.metaVal}>muhammadtaimoorajmal/CohortCircle</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>License</span>
                  <span className={styles.metaVal}>MIT License (Free & Open Source)</span>
                </div>
              </div>
              <div className={styles.govActions}>
                <Link to="/app/dashboard">
                  <Button variant="primary" iconRight={<IconArrowRight size={16} />}>
                    Launch Application
                  </Button>
                </Link>
                <a href="https://github.com/muhammadtaimoorajmal/CohortCircle" target="_blank" rel="noreferrer">
                  <Button variant="outline">
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
