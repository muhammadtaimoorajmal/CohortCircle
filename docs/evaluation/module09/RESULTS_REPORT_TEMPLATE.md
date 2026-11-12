# Summative Usability Evaluation Final Results Report Template
## Academic & HCI Lab 10 Compliance Framework

> **System Under Evaluation:** CohortCircle ("Find your people. Learn together.")  
> **Lifecycle Milestone:** Module 09 Summative Usability Evaluation  
> **Author & Lead:** Muhammad Taimoor Ajmal  
> **Target Sample:** $N = 18$ unique participants (`M09-P01` to `M09-P18`)  
> **Current Status:** STUDY INSTRUMENTATION PREPARED — PARTICIPANT FIELDWORK PENDING

---

## 1. Description of the Selected System

**CohortCircle** is an open-source collaborative learning web platform designed to eliminate the friction of discovering, organizing, and sustaining peer study circles for university students and independent learners.

* **Core Value Proposition:** Unlike unstructured messaging groups (e.g., WhatsApp, Discord) or static message boards, CohortCircle provides **transparent, rule-based compatibility matching** across academic topics, weekly schedules, preferred study styles (silent co-study, collaborative problem-solving, discussion, peer teaching, exam prep), meeting format, and group size.
* **Technology Baseline:** Built with React 19, Vite 6, React Router 7, CSS Modules, and local browser persistence (`localStorage` key `cohortcircle_state_v1`).
* **Deployment & Boundary:** Executes locally at `http://localhost:5173` as a high-fidelity, single-user client application.

---

## 2. Selected Usability Features (5 Core Areas)

1. **Feature 1: Learner Study Profile & Availability Management (`FR-001`–`FR-004`):** Profile editing, academic tags, weekly 7×3 availability matrix with bulk presets, study style selection, and modality preferences.
2. **Feature 2: Curated Discovery & Transparent Compatibility Engine (`FR-005`–`FR-011`):** Real-time search, multi-criteria filtering across 6 dimensions, sorting by match, and explainable 5-factor compatibility breakdown modal.
3. **Feature 3: Circle Details & Membership Workflows (`FR-012`–`FR-015`):** Comprehensive circle view with charter norms, direct 1-click join, moderated join request queue with introductory notes, and member departure modal.
4. **Feature 4: Host Circle Creation & Facilitation Console (`FR-016`–`FR-019`):** 4-step progressive disclosure wizard, circle settings management with capacity safeguards, admission queue applicant moderation, and member roster management.
5. **Feature 5: Study Session Scheduling, RSVP & Dashboard (`FR-020`–`FR-023`):** Session scheduler with past-date prevention, agenda breakdown, synchronized 3-state RSVP management with zero double-counting, centralized dashboard, and local demo state reset tools.

---

## 3. Corresponding Participant Tasks

* **Task T01 (Profile & Preferences):** Configure study topics, select learning styles, set weekday evening availability, set hybrid format, save profile, and verify persistence after page reload.
* **Task T02 (Discovery & Compatibility):** Search for 'Algorithms', filter for 'Online' circles with vacancy, inspect highest compatibility match score breakdown, articulate match factors, and reset filters.
* **Task T03 (Circle Details & Membership):** Inspect circle charter, join an open circle directly, submit a moderated join request with note to an approval-required circle, verify pending state, and leave the first circle.
* **Task T04 (Host Circle Creation & Management):** Switch to host role, create 'Discrete Math' circle via 4-step wizard, review applicant in admission queue, accept applicant into cohort, and verify member roster.
* **Task T05 (Session Scheduling & Dashboard):** Schedule future session with structured agenda, update RSVP to 'Attending', verify attendee count, inspect dashboard overview, and locate demo reset controls in Settings.

---

## 4. Evaluation Criteria Affecting User Interaction

Learners bring different levels of collaborative experience and technological familiarity to the platform:

* **Criterion 1: Peer Collaboration Frequency:** Frequent studiers (&ge;4h/wk) prioritize fast scheduling and roster control; novice studiers (<1h/wk) prioritize psychological safety and clear explanations.
* **Criterion 2: Technical Literacy & Browser Fluency:** Comfort with modern responsive web apps, multi-step wizards, and filtering controls.
* **Criterion 3: Study Format Preference:** Propensity toward quiet co-working vs. interactive debate.

---

## 5. Criteria-Wise Sample Population Table

| Experience Group | Selection Criteria | Planned Sample | Achieved Sample | Completion Status |
|---|---|:---:|:---:|:---:|
| **Group A: Frequent Users** | Regularly study with peers &ge; 4 hours/week | 6 (`P01`–`P06`) | *[0 - Pending]* | Awaiting Fieldwork |
| **Group B: Occasional Users** | Study with peers 1–3 hours/week or during exams | 6 (`P07`–`P12`) | *[0 - Pending]* | Awaiting Fieldwork |
| **Group C: Novice Users** | Study with peers < 1 hour/week or solo learners | 6 (`P13`–`P18`) | *[0 - Pending]* | Awaiting Fieldwork |
| **Total Population** | Stratified across collaboration experience | **18** | **[0 - Pending]** | **Awaiting Fieldwork** |

---

## 6. Contexts Affecting System Use

Two contextual dimensions influence how students interact with CohortCircle in real academic life:

1. **Hardware Device Modality (Laptop vs. Mobile):**
   * *Laptop:* Large widescreen viewport (&ge;1024px), persistent sidebar navigation, desktop cursor accuracy.
   * *Mobile:* Narrow viewport (360px–430px), bottom navigation bar, touch targets, virtual keyboard.
2. **Physical Noise & Cognitive Distraction:**
   * *Quiet Environment:* High acoustic focus (&le;45 dB), solitary study room or silent library.
   * *Mildly Distracting Environment:* Campus cafeteria, lounge, or student center (60–75 dB ambient chatter).

---

## 7. Context-Wise Sample Population Table

| Experience Group | Laptop / Quiet | Laptop / Distracting | Mobile / Quiet | Mobile / Distracting | Group Total |
|---|:---:|:---:|:---:|:---:|:---:|
| **Group A: Frequent Users** | 2 (`P01`, `P02`) | 1 (`P03`) | 1 (`P04`) | 2 (`P05`, `P06`) | **6** |
| **Group B: Occasional Users** | 1 (`P07`) | 2 (`P08`, `P09`) | 2 (`P10`, `P11`) | 1 (`P12`) | **6** |
| **Group C: Novice Users** | 2 (`P13`, `P14`) | 1 (`P15`) | 1 (`P16`) | 2 (`P17`, `P18`) | **6** |
| **Context Totals** | **5** | **4** | **4** | **5** | **18** |

---

## 8. Actual Participant Observation Records (M09-P01 to M09-P18)

*In accordance with DEC-024 and DEC-027, observation rows remain unpopulated until real human participants complete sessions. No synthetic data will be entered.*

| Participant ID | Group | Device | Environment | Seq | T01 Outcome | T02 Outcome | T03 Outcome | T04 Outcome | T05 Outcome | Mean Task Time | Total Errors | SUS Score |
|---|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **M09-P01** | Group A | Laptop | Quiet | Seq A | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P02** | Group A | Laptop | Quiet | Seq B | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P03** | Group A | Laptop | Distracting | Seq C | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P04** | Group A | Mobile | Quiet | Seq D | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P05** | Group A | Mobile | Distracting | Seq E | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P06** | Group A | Mobile | Distracting | Seq A | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P07** | Group B | Laptop | Quiet | Seq B | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P08** | Group B | Laptop | Distracting | Seq C | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P09** | Group B | Laptop | Distracting | Seq D | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P10** | Group B | Mobile | Quiet | Seq E | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P11** | Group B | Mobile | Quiet | Seq A | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P12** | Group B | Mobile | Distracting | Seq B | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P13** | Group C | Laptop | Quiet | Seq C | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P14** | Group C | Laptop | Quiet | Seq D | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P15** | Group C | Laptop | Distracting | Seq E | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P16** | Group C | Mobile | Quiet | Seq A | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P17** | Group C | Mobile | Distracting | Seq B | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |
| **M09-P18** | Group C | Mobile | Distracting | Seq C | *Pending* | *Pending* | *Pending* | *Pending* | *Pending* | — | — | — |

---

## 9. User Feedback & Suggestions from Post-Test Questions

*To be synthesized from genuine interview transcripts upon fieldwork completion.*

* **Intuitive Aspects:** *[Awaiting participant data]*
* **Hesitation & Friction Points:** *[Awaiting participant data]*
* **Compatibility Perceptions:** *[Awaiting participant data]*
* **Participant Improvement Suggestions:** *[Awaiting participant data]*

---

## 10. Quantitative Usability Analysis

*To be calculated by `scripts/analyze-module09.mjs` upon session data collection.*

### 10.1 Task Effectiveness (Completion Rates)
* Target Benchmark: $C_{\text{unassisted}} \ge 80\%$, $C_{\text{overall}} \ge 90\%$.
* *Achieved Metrics:* Pending fieldwork execution.

### 10.2 Task Efficiency (Time on Task)
* Target Benchmark: Mean time $\le 120$ seconds.
* *Achieved Metrics:* Pending fieldwork execution.

### 10.3 Single Ease Question (SEQ)
* Target Benchmark: Mean SEQ $\ge 5.5 / 7.0$.
* *Achieved Metrics:* Pending fieldwork execution.

### 10.4 System Usability Scale (SUS)
* Target Benchmark: Mean SUS $\ge 80.0 / 100$.
* *Achieved Metrics:* Pending fieldwork execution.

---

## 11. Qualitative Observation Analysis

*To be coded into thematic clusters (Discovery, Compatibility, Governance, Scheduling, Layout) with supporting participant IDs upon session completion.*

---

## 12. Recommendations for Improving System Usability

*Prioritized recommendations mapped to affected screens, tasks, and requirements for Module 10 implementation:*

| Priority | Issue / Defect Description | Affected Screen & Route | Related Requirement | Proposed Design Remediation |
|---|---|---|---|---|
| *Critical* | *[Pending Fieldwork]* | — | — | — |
| *Major* | *[Pending Fieldwork]* | — | — | — |
| *Minor* | *[Pending Fieldwork]* | — | — | — |
| *Cosmetic* | *[Pending Fieldwork]* | — | — | — |

---

## 13. Study Limitations

1. **Local-First Single-User Demonstration:** Synthetic peer profiles and rosters operate inside the participant's browser local storage; no real-time cross-user network messaging is evaluated.
2. **Simulated Academic Scenarios:** Participants complete standardized fictional scenarios (e.g., enrolling in 'Algorithms' and 'Discrete Math') to maintain testing consistency and protect personal course privacy.
3. **Sample Size & Generalizability:** A sample of $N = 18$ provides strong qualitative saturation and reliable usability metrics, but does not support complex multivariable inferential modeling.

---

## 14. Research Integrity & Privacy Declaration

* **Zero Fabrication Assurance:** All tables, metrics, and quotes in this report reflect authentic human interaction. No simulated, predicted, or artificial intelligence-generated participant data has been substituted.
* **Privacy by Design:** All personal identifiers have been de-identified. Raw consent records and unredacted audio/video files remain strictly local in `private-research-data/module09/` and are excluded from the public Git repository.
