# CohortCircle — Low-Fidelity Prototype Screen Inventory

* **Product:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Document Focus:** Detailed functional specification, component breakdown, interactive triggers, and state behavior for Screens 01 through 12.
* **Prototype Implementation:** [`docs/prototypes/module05/index.html`](index.html)

---

## 1. Screen Inventory Matrix

The low-fidelity prototype implements twelve fully navigable digital wireframe screens and four modal dialogs without dead ends or missing links:

| Screen # | Screen Title & DOM Identifier | Primary Role | Entry Preconditions | Core Functionality | Traced Requirements |
|---|---|---|---|---|---|
| **Screen 01** | **Learner Dashboard**<br>`#screen-dashboard` | Learner | Authenticated / Initial Load | Personal study overview, active circles, upcoming sessions, pending requests. | `FR-022`, `NFR-001`, `NFR-004` |
| **Screen 02** | **Learner Profile & Preferences**<br>`#screen-profile` | Learner | Nav Bar / Dashboard Card | Configure bio, subjects, styles, 7x3 availability matrix, modality, group cap. | `FR-001`–`FR-004`, `NFR-003` |
| **Screen 03** | **Explore Circles Directory**<br>`#screen-explore` | Learner / Host | Nav Bar / CTA Buttons | Real-time keyword search, multi-criteria filtering, sorting, card catalog. | `FR-005`–`FR-008`, `NFR-001` |
| **Screen 04** | **Circle Details & Charter**<br>`#screen-circle-details` | Learner | Card Click / Deep Link | Full charter, learning objectives, rules, schedule, compatibility breakdown. | `FR-009`–`FR-014`, `NFR-007` |
| **Screen 05** | **My Circles Workspace**<br>`#screen-my-circles` | Learner / Host | Nav Bar / Dashboard | Joined circles catalog, membership roles, upcoming sessions, leave circle. | `FR-014`, `FR-015`, `NFR-004` |
| **Screen 06** | **Join Request Modal**<br>`#modal-join-request` | Learner | Screen 04 CTA ("Request to Join") | Moderated circle application, custom intro note, character counter, validation. | `FR-013`, `FR-014`, `NFR-003` |
| **Screen 07** | **Host Dashboard / Workspace**<br>`#screen-host` | Host | Nav Bar / Role Switcher | Facilitator summary, hosted circles overview, pending requests alert, stats. | `FR-016`–`FR-019`, `NFR-004` |
| **Screen 08** | **Circle Creation Wizard**<br>`#screen-circle-wizard` | Host | Host Workspace / CTA | 4-step progressive wizard (Basics, Charter, Logistics, Policy & Review). | `FR-016`, `FR-017`, `NFR-003` |
| **Screen 09** | **Circle Management Console**<br>`#screen-circle-management` | Host | Host Dashboard ("Manage") | Settings summary, applicant review queue (Approve/Decline), member roster. | `FR-018`, `FR-019`, `NFR-004` |
| **Screen 10** | **Session Scheduler Modal**<br>`#modal-session-scheduler` | Host / Learner | Dashboard / Management / Details | Propose study session, date, time, duration, structured timed agenda. | `FR-020`, `NFR-003`, `NFR-004` |
| **Screen 11** | **Session Details & RSVP**<br>`#screen-session-details` | Learner / Host | Dashboard / Session Click | Detailed agenda, location/link, segmented RSVP toggle (`Attending`/`Tentative`/`Decline`). | `FR-020`, `FR-021`, `NFR-004` |
| **Screen 12** | **Local Demo Data Engine**<br>`#screen-demo-data` | System / Tester | Top Banner Action | Architecture disclosure, seed data restoration, clear state for empty-state audits. | `FR-023`, `NFR-006`, `NFR-007` |

---

## 2. Detailed Screen Specifications

### Screen 01: Learner Dashboard (`#screen-dashboard`)
* **Purpose:** Serves as the central daily operational hub for learners, highlighting urgent study activities, upcoming sessions, and cohort commitments.
* **Key Components:**
  1. *Welcome Header:* Greets user by name with breadcrumb hierarchy.
  2. *Profile Progress Card (85%):* Highlights completeness of study preferences with a direct link to Screen 02.
  3. *Active Circles Grid:* Compact cards showing title, subject, meeting time, role (`Member` vs `Host`), and quick navigation.
  4. *Upcoming Sessions Panel:* Chronologically ordered session cards with date, time, duration, and user RSVP badge.
  5. *Pending Applications Queue:* Displays submitted requests currently under host review with a 1-click "Withdraw" action.
  6. *Quick Discovery Footer:* Action buttons to browse directory, create a circle, or adjust preferences.
* **Empty State:** Includes an interactive toggle (`Toggle Empty Dashboard`) demonstrating zero-state guidance when a user has not joined any circles.

---

### Screen 02: Learner Profile & Study Preferences (`#screen-profile`)
* **Purpose:** Captures explicit learner study habits, domain interests, and availability to power explainable compatibility scoring.
* **Key Components:**
  1. *Personal Details:* Full name, bio/learning goals, primary study language dropdown, and modality preference (`Hybrid`, `Online`, `In-Person`).
  2. *Group Size Slider:* Configurable cohort preference bounded between 2 and 8 members.
  3. *Topics Checklist:* Selectable subject checkboxes (`Algorithms`, `Discrete Math`, `Web Systems`, `AI & ML`, `Ethics in Tech`, `Networks`).
  4. *Study Habits Checklist:* Multi-select checkboxes (`Problem-Solving`, `Discussion-Heavy`, `Silent Co-Working`, `Visual Breakdown`, `Exam Drills`).
  5. *Weekly Availability Matrix (7 &times; 3 Grid):* Interactive table spanning 7 days across 3 daily time slots (Morning, Afternoon, Evening). Clicking cells toggles open availability. Includes a quick preset button ("Select Evenings").
* **Validation & Actions:**
  * Requires valid non-empty display name and at least one selected study topic.
  * Inline error messages displayed immediately below invalid inputs.
  * "Save Profile" updates in-memory user state and redirects to Screen 03 with success toast. "Discard" restores previous values.

---

### Screen 03: Explore Circles Directory (`#screen-explore`)
* **Purpose:** Facilitates rapid discovery of study cohorts using multi-criteria filtering and real-time search.
* **Key Components:**
  1. *Real-Time Search Bar:* Instantaneous text filter (< 100ms response) matching keywords across title, subject domain, and charter description.
  2. *Filter Sidebar:* Dropdowns for Subject Domain, Study Style, Meeting Modality, Joining Policy (`Open` vs `Moderated`), and a checkbox for "Has Open Seats Only".
  3. *Sorting Toolbar:* Sort by Compatibility Score (descending), Title (A–Z), or Member Count. Shows active result count.
  4. *Circle Cards Catalog:* Displays subject badge, modality badge, policy badge, compatibility match pill (e.g. `94% Match`), meeting schedule, remaining seats, and direct contextual action buttons.
  5. *Zero-Results State:* When no circles match filters, displays an explanatory empty state with a "Clear All Filters" button.

---

### Screen 04: Circle Details & Charter (`#screen-circle-details`)
* **Purpose:** Provides comprehensive transparency regarding a cohort's mission, expectations, schedule, and peer roster before joining.
* **Key Components:**
  1. *Circle Charter & Objectives:* Detailed description, structured learning objectives, and ground rules/code of conduct.
  2. *Scheduled Sessions List:* Upcoming meetings specific to this circle with links to Screen 11.
  3. *Explainable Compatibility Card:* Displays calculated match percentage and transparent factor summary with an "Inspect Factor Breakdown" trigger opening `#modal-compat-breakdown`.
  4. *Logistics Summary:* Meeting schedule, modality, facilitator name, capacity status (e.g., `4 of 6 seats filled`), and joining policy.
  5. *Cohort Roster:* Names of enrolled members with host distinction badges.
* **Context-Aware Action Button:**
  * If user is Host &rarr; "Manage Circle Console" (navigates to Screen 09).
  * If user is Enrolled Member &rarr; "Enrolled Member" badge + "Leave Circle" action.
  * If request is Pending &rarr; "Request Pending Review" badge + "Withdraw" action.
  * If circle is Full &rarr; "Cohort Full" disabled button.
  * If circle has Open Policy &rarr; "Join Study Circle" (instant enrollment).
  * If circle has Moderated Policy &rarr; "Request to Join Circle" (opens Screen 06 modal).

---

### Screen 05: My Circles Workspace (`#screen-my-circles`)
* **Purpose:** Dedicated management hub for all cohorts where the user is an active participant or host.
* **Key Components:**
  1. *Enrolled Circle Cards:* Displays joined circles with status badges (`Active Member` vs `Host`), meeting cadence, and upcoming session count.
  2. *Leave Circle Action:* Contextual button opening an accessible confirmation modal (`#modal-leave-confirm`). Confirming relinquishes the seat and updates directory capacity.
  3. *Empty State:* Accessible toggle (`Toggle Empty View`) showing guidance when a user has no active memberships.

---

### Screen 06: Join Request Modal (`#modal-join-request`)
* **Purpose:** Enables prospective learners to introduce themselves to circle facilitators when applying to moderated cohorts.
* **Key Components:**
  1. *Context Header:* Summarizes target circle name, facilitator name, and moderated policy notification.
  2. *Introductory Note Textarea:* Prompting user to share learning goals, background, and commitment.
  3. *Character Counter:* Live display tracking character count with minimum threshold indicator (`0 / 500 characters`, min 15 chars).
  4. *Submission Validation:* Prevents submission if note is under 15 characters, displaying an inline error message.
  5. *Submission Action:* On submit, records request in host review queue, logs pending status in Learner Dashboard, displays success toast, and closes modal.

---

### Screen 07: Host Dashboard / Workspace (`#screen-host`)
* **Purpose:** Administrative center for learners facilitating one or more study circles.
* **Key Components:**
  1. *Facilitator Overview Metrics:* High-level cards summarizing total hosted circles, pending applicant count, and upcoming sessions.
  2. *Managed Circles List:* Cards for each hosted circle detailing member count vs capacity, pending request counts, and direct links to the Circle Management Console (Screen 09) and Session Scheduler (Screen 10).
  3. *Create Circle CTA:* Prominent button launching the 4-Step Circle Creation Wizard (Screen 08).
  4. *Empty State:* Shown if host has created zero circles, prompting initiation.

---

### Screen 08: Circle Creation Wizard (`#screen-circle-wizard`)
* **Purpose:** Guides facilitators through structured cohort creation across four progressive steps.
* **Step Breakdown:**
  * **Step 1 (Basics & Subject):** Circle name (min 5 chars), subject domain selection, and summary description (min 15 chars).
  * **Step 2 (Charter & Style):** Learning objectives (one per line), dominant study style dropdown, and code of conduct.
  * **Step 3 (Logistics & Schedule):** Meeting modality (`Online`, `Hybrid`, `In-Person`), recurring meeting cadence, and venue/meeting URL.
  * **Step 4 (Capacity, Policy & Review):** Capacity slider constrained to 2–8 members, joining policy radio (`Moderated` vs `Open`), and automated summary review box.
* **Controls & State Behavior:**
  * "Previous" button disabled on Step 1.
  * "Next" button validates required inputs before advancing.
  * On Step 4, clicking "Create Study Circle" creates the cohort in-memory, adds creator as Host/Member, and redirects to Screen 09 with a success notification.

---

### Screen 09: Circle Management Console (`#screen-circle-management`)
* **Purpose:** Fine-grained administrative console for a specific hosted study circle.
* **Key Components:**
  1. *Pending Applicant Queue:* Cards for each applicant displaying name, application date, explainable compatibility preview, introductory note, and action buttons (`Approve` and `Decline`).
  2. *Applicant Approval Flow:* Clicking "Approve" moves applicant to the active roster, decrements available seats, and refreshes the console.
  3. *Applicant Decline Flow:* Clicking "Decline" dismisses the application without adding to roster.
  4. *Member Roster Panel:* Lists all current members. Facilitator can click "Remove" on non-host members, triggering `#modal-remove-member`.
  5. *Circle Properties Sidebar:* Displays configured subject, style, modality, schedule, and capacity limits.

---

### Screen 10: Session Scheduler Modal (`#modal-session-scheduler`)
* **Purpose:** Accessible dialog allowing facilitators and members to schedule upcoming structured study meetings.
* **Key Components:**
  1. *Target Circle Selector:* Dropdown pre-populated with eligible joined and hosted circles.
  2. *Topic & Timing Inputs:* Session title input, date picker, start time picker, and duration dropdown (60m, 90m, 120m).
  3. *Venue / Meeting URL Input:* Input for video room link (e.g. Jitsi) or campus room.
  4. *Structured Agenda Textarea:* Pre-filled template encouraging checkpoint-driven study agendas.
  5. *Submission & Validation:* Enforces required title, date, time, and agenda. Upon publishing, adds session to in-memory store and navigates to Screen 11.

---

### Screen 11: Session Details & RSVP (`#screen-session-details`)
* **Purpose:** Meeting coordination screen displaying structured agenda, participant preparation notes, and attendance tracking.
* **Key Components:**
  1. *Session Header & Logistics:* Title, host circle name, date, time, duration, and virtual room link.
  2. *Timed Agenda:* Formatted multi-line breakdown of session checkpoints and time allocations.
  3. *Segmented RSVP Controls:* Mutually exclusive buttons (`Attending`, `Tentative`, `Decline`). Clicking any button updates the user's status immediately in memory, recalculates attendee counts, and announces via toast.
  4. *Attendee Roster:* Segmented lists detailing which peers are attending, tentative, or declined.

---

### Screen 12: Local Demo Data Engine (`#screen-demo-data`)
* **Purpose:** Administrative utility for testing empty states, edge cases, and restoring illustrative sample data during usability evaluation.
* **Key Components:**
  1. *Data Disclosure Panel:* Explicitly explains that all state is local, in-memory, and simulated.
  2. *Restore Demonstration Data:* One-click restoration of all 5 initial study circles, memberships, and scheduled sessions.
  3. *Clear State Action:* Opens destructive confirmation modal (`#modal-reset-confirm`) to wipe memberships and sessions, activating empty states across all screens.
  4. *Live State Monitor:* Displays real-time counts of circles in directory, user joined circles, scheduled sessions, and active role.
