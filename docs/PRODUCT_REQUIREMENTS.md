# Product Requirements Specification: CohortCircle

> **Document Status:** VERIFIED & IMPLEMENTED (MODULE 08 FUNCTIONAL PRODUCT)<br>
> **Implementation Status:** FULLY IMPLEMENTED (All 23 Functional Requirements FR-001 through FR-023 implemented with centralized business logic, versioned localStorage persistence, deterministic matching, and 58 automated unit/integration tests.)<br>
> **Standard Target:** WCAG 2.2 Level AA Accessibility | ISO 9241-11 Usability Ergonomics

---

## 1. User Roles & Personas Baseline

In accordance with user-centered design principles, detailed personas are **not fabricated** in Module 01. Empirical persona profiles will be synthesized in Module 03 directly from field research. For the product specification baseline, we establish two functional user roles:

### 1.1 Primary Role: Learner / Student
* **Description:** An enrolled university student or independent learner seeking study peers to master specific subjects, complete course goals, or maintain regular study habits.
* **Core Goals:**
  * Find peers with matching subjects, aligned schedules, and compatible study styles.
  * Evaluate study circles before committing time or effort.
  * Join or apply to appropriate circles with minimal administrative overhead.
  * View upcoming study sessions and track scheduled commitments in a single view.
  * Adjust personal study preferences as course demands and schedules evolve.

### 1.2 Secondary Role: Study Circle Host / Facilitator
* **Description:** An active learner, peer tutor, or student organizer who initiates a circle to pursue a structured study goal with peers.
* **Core Goals:**
  * Define circle charter, expected learning objectives, meeting cadence, and study format.
  * Review and moderate incoming join requests to ensure cohort compatibility.
  * Schedule, update, or cancel upcoming study sessions with structured agendas.
  * Manage participant rosters and maintain an inclusive, productive study environment.

*Note:* A single user can seamlessly operate in both roles across different circles.

---

## 2. Functional Requirements (FR)

All 23 functional requirements are assigned stable identifiers (`FR-xxx`) and are verified by automated tests and interactive browser workflows.

### 2.1 Learner Profile & Study Preferences

| ID | Title | Description | Priority | Implementation Status | Automated Verification Reference |
|---|---|---|---|---|---|
| **FR-001** | Profile Creation & Editing | The system shall allow a learner to specify and update their display name, handle, bio, learning stage, primary study topics, and preferred language. | High | **Implemented** | `src/test/profileWorkflows.test.jsx`, `src/pages/learner/ProfilePage.jsx` |
| **FR-002** | Study Style Specification | The system shall allow a learner to select one or more preferred study styles (Silent Co-Study, Collaborative Problem-Solving, Discussion-Based, Peer Teaching, Exam Preparation). | High | **Implemented** | `src/test/profileWorkflows.test.jsx`, `src/services/compatibilityService.js` |
| **FR-003** | Weekly Availability Matrix | The system shall allow a learner to define their recurring weekly availability blocks across days of the week and time windows (Morning, Afternoon, Evening) with presets and clear-all. | High | **Implemented** | `src/test/profileWorkflows.test.jsx`, `src/services/storageService.js` |
| **FR-004** | Modality & Group Size Preferences | The system shall allow a learner to declare preferences for meeting modality (Online, In-Person, Flexible) and preferred group size limits (2–4, 5–8 members). | Medium | **Implemented** | `src/test/profileWorkflows.test.jsx`, `src/test/compatibilityService.test.js` |

---

### 2.2 Discovery, Search & Filtering

| ID | Title | Description | Priority | Implementation Status | Automated Verification Reference |
|---|---|---|---|---|---|
| **FR-005** | Directory Browsing | The system shall display a browsable directory of active study circles with key metadata (title, subject, study style, schedule, member count, format). | High | **Implemented** | `src/test/discoveryWorkflows.test.jsx`, `src/pages/learner/ExplorePage.jsx` |
| **FR-006** | Text-Based Search | The system shall provide a search input that filters study circles in real-time by title, subject keywords, description terms, charter rules, and syllabus tags. | High | **Implemented** | `src/test/discoveryWorkflows.test.jsx`, `src/pages/learner/ExplorePage.jsx` |
| **FR-007** | Multi-Criteria Filtering | The system shall allow filtering circles by subject domain, study style, meeting modality (Online/In-Person/Hybrid), meeting day of week, and capacity status (Open/Full). | High | **Implemented** | `src/test/discoveryWorkflows.test.jsx`, `src/pages/learner/ExplorePage.jsx` |
| **FR-008** | Filter Reset & Clear | The system shall provide a single-action control to reset all active filters (search, category, style, modality, day, capacity, sorting) to default state. | Medium | **Implemented** | `src/test/discoveryWorkflows.test.jsx`, `src/pages/learner/ExplorePage.jsx` |

---

### 2.3 Transparent Compatibility Engine

| ID | Title | Description | Priority | Implementation Status | Automated Verification Reference |
|---|---|---|---|---|---|
| **FR-009** | Compatibility Score Computation | The system shall compute a transparent percentage score (0–100%) indicating alignment between a learner's profile and a circle's attributes using a 5-factor weighted formula. | High | **Implemented** | `src/test/compatibilityService.test.js`, `src/services/compatibilityService.js` |
| **FR-010** | Explainable Compatibility Breakdown | The system shall present an explainable breakdown highlighting exact factors contributing to the score with human-readable rationale tags. | High | **Implemented** | `src/test/compatibilityService.test.js`, `src/components/circles/CompatibilityIndicator.jsx` |
| **FR-011** | Sorting by Compatibility | The system shall permit sorting discovery results by highest dynamically computed compatibility score. | Medium | **Implemented** | `src/test/discoveryWorkflows.test.jsx`, `src/pages/learner/ExplorePage.jsx` |

---

### 2.4 Detailed Circle Profiles & Joining Workflows

| ID | Title | Description | Priority | Implementation Status | Automated Verification Reference |
|---|---|---|---|---|---|
| **FR-012** | Detailed Circle View | The system shall provide a dedicated view for each circle detailing full description, syllabus/goals, host identity, member roster, meeting schedule, rules, and upcoming sessions. | High | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/pages/learner/CircleDetailsPage.jsx` |
| **FR-013** | Direct Join Flow | For open circles, the system shall allow an eligible learner to join immediately with a single confirmation, preventing duplicate membership or exceeding capacity. | High | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/context/AppContext.jsx` |
| **FR-014** | Request-to-Join Flow | For moderated circles, the system shall allow a learner to submit a join request with an introductory note (&ge; 15 chars), creating a pending request record. | High | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/pages/learner/CircleDetailsPage.jsx` |
| **FR-015** | Leave Circle | The system shall permit an active member to gracefully leave a circle, returning capacity to the group and reconciling future session RSVP records. | Medium | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/context/AppContext.jsx` |

---

### 2.5 Circle Creation & Host Facilitation

| ID | Title | Description | Priority | Implementation Status | Automated Verification Reference |
|---|---|---|---|---|---|
| **FR-016** | Circle Creation Wizard | The system shall provide a 4-step progressive wizard to create a new circle specifying title, subject, description, charter, study style, schedule, modality, and capacity cap. | High | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/pages/host/CreateCirclePage.jsx` |
| **FR-017** | Circle Settings Modification | The system shall allow the circle host to edit circle description, objectives, meeting format, and capacity limit (enforcing capacity &ge; current members). | High | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/pages/host/ManageCirclePage.jsx` |
| **FR-018** | Membership Request Moderation | The system shall provide the host an interface to view pending join requests with notes and accept or reject each request while preserving status history. | High | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/pages/host/ManageCirclePage.jsx` |
| **FR-019** | Member Management | The system shall permit the host to remove non-host members from the circle roster with explicit confirmation, updating capacity and attendee lists. | Medium | **Implemented** | `src/test/circleWorkflows.test.jsx`, `src/pages/host/ManageCirclePage.jsx` |

---

### 2.6 Study Session Scheduling & Dashboard

| ID | Title | Description | Priority | Implementation Status | Automated Verification Reference |
|---|---|---|---|---|---|
| **FR-020** | Session Creation | The system shall allow a host to schedule a study session with title, date, start time, duration, agenda, and location/URL (rejecting past dates). | High | **Implemented** | `src/test/sessionWorkflows.test.jsx`, `src/pages/sessions/SessionsPage.jsx` |
| **FR-021** | Session RSVP Tracking | The system shall allow circle members to set their attendance status (Attending, Tentative, Decline), keeping attendee records and counts in sync without double-counting. | High | **Implemented** | `src/test/sessionWorkflows.test.jsx`, `src/components/sessions/RSVPControl.jsx` |
| **FR-022** | Personal Study Dashboard | The system shall provide a centralized dashboard displaying the learner's joined circles, pending requests, and upcoming sessions from authoritative state. | High | **Implemented** | `src/test/integrationWorkflows.test.jsx`, `src/pages/dashboard/DashboardPage.jsx` |
| **FR-023** | Local Data State Reset / Seed | The system shall provide explicit mechanisms to restore the factory demonstration baseline seed or clear local application state cleanly. | Medium | **Implemented** | `src/test/storageService.test.js`, `src/pages/settings/SettingsPage.jsx` |

---

## 3. Non-Functional Requirements (NFR)

A total of **15 non-functional requirements** across six architectural categories define strict quality, security, and accessibility benchmarks. All NFRs are testable and verifiable during evaluation.

### 3.1 Accessibility (WCAG 2.2 Level AA)
* **NFR-A11Y-01 (Contrast Ratio):** All text elements must achieve a contrast ratio of at least 4.5:1 against their background for regular text and 3.0:1 for large text (&ge; 18pt or bold 14pt).
* **NFR-A11Y-02 (Keyboard Traversal):** Every interactive control (buttons, links, form inputs, modal dialogs) must be fully navigable and operable using standard keyboard keys (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
* **NFR-A11Y-03 (Focus Indicators):** Interactive controls must render a distinct, high-visibility focus ring when receiving keyboard focus.
* **NFR-A11Y-04 (Screen Reader Semantics):** Forms must use explicit `<label>` associations; modal dialogs must use `role="dialog"` with `aria-modal="true"`; dynamic status changes must announce via `aria-live` regions.

### 3.2 Responsiveness & Layout
* **NFR-RESP-01 (Screen Support):** Interface must render flawlessly across viewports ranging from 320px (compact mobile) to 2560px (large desktop) without horizontal clipping or overlapping elements.
* **NFR-RESP-02 (Touch Targets):** Interactive touch targets on mobile viewports must measure at least 44 &times; 44 CSS pixels with adequate spacing.

### 3.3 Usability & Human Factors
* **NFR-USE-01 (System Usability Scale):** In summative testing (Module 09), the application must achieve a mean SUS score &ge; 80 / 100.
* **NFR-USE-02 (Single Ease Question):** Individual benchmark task evaluations must yield an average SEQ score &ge; 5.5 on a 7-point Likert scale.
* **NFR-USE-03 (Error Prevention & Recovery):** Destructive actions (e.g., leaving a circle, canceling a session, deleting data) must require explicit confirmation with an undo path where feasible.

### 3.4 Performance & Reliability
* **NFR-PERF-01 (Initial Load Time):** First Contentful Paint (FCP) must complete within &le; 1.5 seconds under standard simulated network conditions.
* **NFR-PERF-02 (Interaction Responsiveness):** In-memory filtering and search input response times must remain under 100 milliseconds for datasets up to 1,000 circles.
* **NFR-REL-01 (Fault Tolerance):** Application must employ React Error Boundaries to prevent full-screen crashes upon encountering isolated rendering errors.

### 3.5 Privacy & Data Protection
* **NFR-PRIV-01 (Zero Unnecessary PII):** The platform will never ask for or store phone numbers, physical residential addresses, national identification numbers, or financial credentials.
* **NFR-PRIV-02 (Local-First Storage):** User data for the standalone prototype is persisted strictly inside the user's browser local storage, giving the user complete ownership and control over data deletion.

### 3.6 Browser Compatibility
* **NFR-COMP-01 (Evergreen Browser Support):** The web application must function identically without visual or functional anomalies across modern evergreen browsers: Google Chrome (last 2 versions), Mozilla Firefox (last 2 versions), Apple Safari (last 2 versions), and Microsoft Edge (last 2 versions).

---

## 4. Usability Benchmark Tasks Reference

The functional requirements directly support the five candidate usability evaluation tasks planned for later modules:

* **Task T01:** Discover a study circle matching a specified subject and availability criteria (`FR-005`, `FR-006`, `FR-007`).
* **Task T02:** Compare group profiles, inspect compatibility explanations, and select the best fit (`FR-009`, `FR-010`, `FR-012`).
* **Task T03:** Join an open circle or submit a request to join a moderated circle with an introductory note (`FR-013`, `FR-014`, `FR-022`).
* **Task T04:** Create a new study circle, define objectives, and schedule an initial study session (`FR-016`, `FR-020`).
* **Task T05:** Manage an existing circle, review member requests, and update an upcoming session agenda (`FR-017`, `FR-018`, `FR-021`).
