# Project Charter: CohortCircle

## 1. Executive Summary

* **Product Name:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Project Owner & Maintainer:** Muhammad Taimoor Ajmal
* **Repository:** [CohortCircle](https://github.com/muhammadtaimoorajmal/CohortCircle)
* **Initial Release Target:** Module 01 to 10 Lifecycle (Open-Source Client Prototype)

CohortCircle is an open-source collaborative learning platform dedicated to eliminating friction in discovering, joining, and maintaining high-functioning peer study groups. Rather than operating as an uncurated messaging space or an ad-hoc bulletin board, CohortCircle delivers transparent, compatibility-first discovery that aligns learners across learning topics, weekly availability, preferred study methodologies, group pacing, and collaborative modalities.

---

## 2. Problem Statement & Motivation

Peer collaboration is recognized across educational and cognitive research as an accelerator of comprehension, critical thinking, and academic persistence. In practice, however, learners experience substantial operational friction when attempting to form and sustain study groups:

1. **Fragmentation of Discovery:** Students rely on informal social media channels, campus hallways, or chaotic class-wide chat groups with zero structured filtering.
2. **Behavioral Mismatches:** Group members often possess fundamentally conflicting study expectations (e.g., quiet, focused accountability versus active debate and verbal problem breakdown).
3. **Coordination Fatigue:** Finding mutually available meeting slots across erratic academic, professional, and personal schedules consumes excessive energy and often causes groups to dissolve before their first session.
4. **Lack of Structure and Ownership:** Study groups frequently collapse due to undefined agendas, lack of facilitation tools, and absence of clear session goals.

CohortCircle directly addresses these pain points by offering structured profiles, rule-based compatibility scoring, transparent group expectations, and focused session coordination.

---

## 3. Core Product Identity & Value Proposition

### 3.1 Vision
To establish an accessible, intuitive, and community-driven ecosystem where every learner—regardless of educational institution or geographic location—can instantly connect with peers who share their academic ambition, study habits, and schedule.

### 3.2 Value Proposition
* **For Learners:** Discover high-compatibility study partners without endless scrolling or social awkwardness; view exact alignment on study formats and available hours before committing.
* **For Facilitators & Circle Hosts:** Launch purposeful learning circles with explicit charters, establish capacity limits, curate members based on shared goals, and schedule study sessions with clear agendas.
* **For Learning Communities:** Cultivate active, accountable, and supportive peer learning cultures that enhance learning outcomes and combat isolation.

---

## 4. Mandatory Project Principles

All design, architectural, and procedural decisions throughout the CohortCircle project lifecycle must strictly adhere to the following seven principles:

### Principle A — Generalized Product
CohortCircle is engineered as a standalone, generalizable open-source software product. It must remain valuable and applicable to university students and independent learners alike. The public-facing product, codebase, interface, and documentation must never display academic laboratory numbers, assignment codes, instructor names, course-specific grading criteria, or institutional constraints.

### Principle B — Real Usability
Every user-facing control, navigation path, interactive widget, and workflow must perform genuine, predictable, and functional work according to its stated intent. Decorative or faux buttons that simulate functionality without state updates or meaningful user feedback are strictly prohibited.

### Principle C — User-Centered Development
Feature definitions, interface layouts, and interaction patterns must stem from empirical user research and observable user needs. Architectural decisions will not be made based on unsupported assumptions or speculative desires.

### Principle D — Realistic Data Integrity
Research rigor and data integrity are non-negotiable. Participant identities, interview notes, survey responses, contextual observations, and usability test metrics must never be fabricated. Where demonstration or mock data is introduced for prototype demonstration, it must be explicitly labeled as sample data.

### Principle E — Universal Accessibility
The platform must meet or exceed WCAG 2.2 Level AA accessibility standards. Requirements include high contrast ratios (minimum 4.5:1 for standard text), complete keyboard navigability, semantic HTML landmark structures, visible focus indicators, accessible ARIA attributes, and readable, responsive typography across mobile and desktop displays.

### Principle F — Privacy and Psychological Safety
CohortCircle respects user autonomy and privacy by design. We minimize data collection, operate local-first storage for prototype testing, anonymize all research participant contributions, and never collect sensitive personal identifying information (PII) or financial records.

### Principle G — Engineering Maintainability & Transparency
Code and documentation must remain modular, readable, consistent, and strictly version-controlled. Architectural decisions, trade-offs, and open questions will be systematically logged in the project decision records.

---

## 5. Scope Boundaries

To ensure rapid delivery, high usability, and architectural integrity, the functional scope for the initial release is strictly delineated.

### 5.1 In Scope (Core Capabilities)
1. **Learner Study Profiles:** Individual configuration of subjects, experience levels, preferred study methods, availability blocks, format preferences, and language.
2. **Study Circle Discovery:** Directory browsing with real-time text search and multi-attribute filtering.
3. **Transparent Compatibility Index:** Deterministic, explainable matching calculations that highlight exact areas of alignment (subject, schedule, study method, group size).
4. **Detailed Circle Profiles:** Comprehensive group view detailing learning objectives, syllabus scope, host profile, expectations, and scheduled sessions.
5. **Study Circle Creation:** Host creation flow specifying title, domain, study format, meeting cadence, capacity limits, and joining requirements.
6. **Membership Workflows:** Direct joining for open circles and request-to-join submission with brief introductory notes for moderated circles.
7. **Membership Management:** Member rosters, participant status, host privileges, and leave/remove capabilities.
8. **Session Scheduling:** Scheduling engine for upcoming study sessions with dates, times, durations, agendas, and locations/links.
9. **Upcoming Session Management:** RSVP status tracking, session updates, and calendar views.
10. **Host & Facilitator Controls:** Group editing, membership request approval/rejection, and session management.
11. **Personal Study Dashboard:** Consolidated overview of joined circles, pending applications, recommended circles, and upcoming study sessions.
12. **Local Data Persistence:** Client-side data persistence engine allowing seamless testing and state retention across browser sessions.

### 5.2 Out of Scope (Initial Release)
The following capabilities are deliberately excluded from the initial release to maintain focus, prevent feature bloat, and safeguard security:
* **Real Payment Processing:** No membership fees, commercial transactions, or payment gateway integrations.
* **Integrated Video Conferencing:** CohortCircle coordinates when and where to meet; actual calls will link to established tools (Google Meet, Zoom, Jitsi) or physical campus rooms.
* **Live Chat Infrastructure:** Real-time WebSocket chat infrastructure is excluded to avoid moderation overhead and performance bottlenecks.
* **External Calendar Synchronization:** Direct two-way sync with Google Calendar or Outlook is deferred to post-v1.0 releases.
* **Opaque AI Integrations:** Matching must be deterministic, transparent, and auditable, avoiding black-box machine learning claims.
* **Proprietary Third-Party API Dependencies:** The application must function reliably as an independent client-side application.
* **Collection of Sensitive Personal Information:** No phone numbers, home addresses, government IDs, or student transcripts will ever be requested.
* **Production Institutional SSO:** No mandatory integration with proprietary university authentication backends.

---

## 6. Project Governance & Roles

* **Project Owner & Principal Architect:** Muhammad Taimoor Ajmal
  * Owns the product roadmap, architectural sign-off, research protocol approvals, and repository maintenance.
* **User Community Representatives:** Primary learners and student group facilitators participating in empirical research and usability testing.
* **Open-Source Contributors:** Future community contributors following repository guidelines and established coding standards.

---

## 7. Success Metrics & Key Performance Indicators (KPIs)

The success of the platform will be evaluated in later modules against rigorous Human-Computer Interaction (HCI) benchmarks:

| Dimension | Target Metric | Evaluation Method |
|---|---|---|
| **System Usability** | SUS Score &ge; 80 / 100 (Grade A) | Summative 18-participant usability evaluation (Module 09) |
| **Task Ease** | Average Single Ease Question (SEQ) &ge; 5.5 / 7.0 | Post-task rating across all 5 benchmark usability tasks |
| **Task Completion** | Completion Rate &ge; 90% across core tasks | Summative task execution without facilitator intervention |
| **Discovery Efficiency** | Time-on-Task &le; 90 seconds for group matching | Timed discovery and filtering benchmarks |
| **Accessibility** | 0 Level A / AA violations | Automated Axe/Lighthouse audits and manual keyboard testing |
| **Data Integrity** | 100% adherence to research ethics & local privacy | Ethical audit and peer verification |
