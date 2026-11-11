import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar/PublicNavbar';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import CircleCard from '../../components/circles/CircleCard';
import Badge from '../../components/common/Badge/Badge';
import {
  IconArrowRight,
  IconCheck,
  IconSparkles
} from '../../components/common/Icons';
import { DEMO_CIRCLES } from '../../data/demoData';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const featuredCircles = DEMO_CIRCLES.slice(0, 3);

  return (
    <div className={styles.landingContainer}>
      <PublicNavbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Badge variant="teal" size="md" icon={<IconSparkles size={14} />}>
              Open Source Peer Learning
            </Badge>
          </div>
          <h1 className={styles.heroTitle}>
            Find your people. <br />
            <span className={styles.gradientText}>Learn together.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            CohortCircle is an open-source collaborative learning platform. Discover compatible study circles, align learning objectives and schedules, and participate in structured, accountable study sessions.
          </p>

          <div className={styles.heroActions}>
            <Link to="/app/explore">
              <Button size="lg" variant="primary" iconRight={<IconArrowRight size={18} />}>
                Explore Study Circles
              </Button>
            </Link>
            <Link to="/app/dashboard">
              <Button size="lg" variant="outline">
                Open Demo Workspace
              </Button>
            </Link>
          </div>

          <div className={styles.heroTrustBar}>
            <span className={styles.trustItem}>
              <IconCheck size={16} className={styles.trustIcon} /> Rule-Based Compatibility
            </span>
            <span className={styles.trustItem}>
              <IconCheck size={16} className={styles.trustIcon} /> Zero Opaque Algorithms
            </span>
            <span className={styles.trustItem}>
              <IconCheck size={16} className={styles.trustIcon} /> WCAG 2.2 AA Accessible
            </span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>TRANSPARENT METHODOLOGY</span>
            <h2 className={styles.sectionTitle}>How CohortCircle Works</h2>
            <p className={styles.sectionDesc}>
              Move past chaotic group chats and inactive bulletin boards. Experience a structured four-stage peer learning journey.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>01</div>
              <h3 className={styles.stepTitle}>Define Your Study Profile</h3>
              <p className={styles.stepText}>
                Specify your syllabus topics, recurring weekly availability windows (7x3 grid), and preferred study styles like silent co-working or live problem solving.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNum}>02</div>
              <h3 className={styles.stepTitle}>Explainable Matching</h3>
              <p className={styles.stepText}>
                Browse circles ranked by deterministic overlap in subject matter, free calendar slots, and learning modality. Inspect clear percentage breakdowns.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNum}>03</div>
              <h3 className={styles.stepTitle}>Structured Group Charters</h3>
              <p className={styles.stepText}>
                Every study circle establishes a clear charter, maximum capacity limits (2–8 members), and defined attendance expectations before you join.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNum}>04</div>
              <h3 className={styles.stepTitle}>Timed Agendas & RSVPs</h3>
              <p className={styles.stepText}>
                Organize productive sessions with time-stamped agendas, 1-click RSVP coordination, and reciprocal accountability routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Distinctive Comparison / Differentiator */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.diffBox}>
            <div className={styles.diffLeft}>
              <span className={styles.sectionEyebrow}>THE COHORTCIRCLE ADVANTAGE</span>
              <h2 className={styles.diffHeading}>Why Informal Study Groups Fail</h2>
              <p className={styles.diffSub}>
                Most informal study groups disband within two weeks due to scheduling friction, mismatched pacing, and social loafing. CohortCircle solves these structural failure modes.
              </p>
              <ul className={styles.diffList}>
                <li>
                  <strong>Transparent Compatibility:</strong> Know why a group fits before committing time.
                </li>
                <li>
                  <strong>Capped Capacities:</strong> Micro-cohorts (4–6 peers) prevent free-riding and ensure everyone contributes.
                </li>
                <li>
                  <strong>Reciprocal Charters:</strong> Agreed-upon norms eliminate ambiguity and foster mutual respect.
                </li>
              </ul>
            </div>
            <div className={styles.diffRight}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>5x</div>
                <div className={styles.metricLabel}>Higher Session Follow-Through</div>
                <p className={styles.metricDesc}>With pre-scheduled agendas and committed RSVPs.</p>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>100%</div>
                <div className={styles.metricLabel}>Explainable Matching</div>
                <p className={styles.metricDesc}>Zero black-box recommendations or data harvesting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Circles Preview */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>ACTIVE COHORTS</span>
            <h2 className={styles.sectionTitle}>Featured Study Circles</h2>
            <p className={styles.sectionDesc}>
              Discover circles created by independent learners and peer facilitators.
            </p>
          </div>

          <div className={styles.circlesGrid}>
            {featuredCircles.map(circle => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </div>

          <div className={styles.centerAction}>
            <Link to="/app/explore">
              <Button variant="primary" size="lg" iconRight={<IconArrowRight size={18} />}>
                View All Study Circles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to elevate your learning?</h2>
            <p className={styles.ctaSubtitle}>
              Join an open-source community dedicated to serious, structured, collaborative study.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/app/explore">
                <Button variant="primary" size="lg">
                  Explore Circles Now
                </Button>
              </Link>
              <Link to="/app/host/create">
                <Button variant="secondary" size="lg">
                  Start Your Own Circle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
