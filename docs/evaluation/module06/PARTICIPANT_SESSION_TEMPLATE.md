# CohortCircle — Formative Usability Participant Session Packet

* **Product:** CohortCircle  
* **Tagline:** Find your people. Learn together.  
* **Document Focus:** Standardized data collection packet for individual participant usability evaluation sessions during Module 06 fieldwork.  
* **Privacy & De-Identification Protocol:** Store completed copies of this form exclusively in the local, unversioned `private-research-data/` directory (excluded in `.gitignore`). Never commit real participant names, student IDs, telephone numbers, or email addresses to version control.  
* **Governance Status:** **BLANK SESSION TEMPLATE — READY FOR FIELDWORK.**

---

## 1. Participant Intake & Session Metadata

* **Participant Code:** `[ P-0x ]` *(Choose de-identified identifier: `P-01` through `P-07`)*  
* **Evaluation Date & Time:** `[ YYYY-MM-DD HH:MM ]`  
* **Facilitator Name:** `[ Muhammad Taimoor Ajmal ]`  
* **Observer / Note Taker:** `[ Observer Name ]`  
* **Session Format:** `[ ] In-Person (Lab/Study Space)    [ ] Remote Moderated (Screen Share)`  
* **Hardware & OS:** `[ ] Windows Desktop/Laptop  [ ] macOS  [ ] Linux  [ ] Tablet`  
* **Web Browser & Version:** `[ ] Google Chrome  [ ] Mozilla Firefox  [ ] Microsoft Edge  [ ] Safari`  
* **Viewport Resolution:** `[ e.g., 1920x1080, 1440x900, 1366x768 ]`  
* **Prototype Build Evaluated:** `docs/prototypes/module05/index.html` (Commit: `[Git Commit SHA]`)

### Informed Consent & Pre-Flight Checklist:
- [ ] Participant briefed using standardized pre-session script ([`OBSERVER_GUIDE.md`](../prototypes/module05/OBSERVER_GUIDE.md)).
- [ ] Informed consent obtained and stored securely in `private-research-data/`.
- [ ] Participant explicitly reminded: *"We are evaluating the software design, NOT your personal ability."*
- [ ] Concurrent Think-Aloud (CTA) protocol demonstrated with warm-up exercise.
- [ ] Screen recording initiated (if applicable, with explicit consent).
- [ ] Prototype state reset to clean baseline via Screen 12 (Demo Data Engine).

---

## 2. Benchmark Task 01: Configure Learner Study Profile

* **Task Target:** `FLOW-01` (`UT-TASK-01` in [`FORMATIVE_TEST_SCRIPT.md`](../prototypes/module05/FORMATIVE_TEST_SCRIPT.md))
* **Participant Prompt:**  
  > *"Starting from the Dashboard, navigate to your Profile & Preferences. Update your bio, ensure 'Algorithms & DS' and 'Discrete Mathematics' are selected under study topics, select 'Problem-Solving' under study habits, set your availability for Tuesday and Thursday evenings on the weekly matrix, set your preferred group size to 6, and save your profile."*

* **Task Timing:**
  * Start Time: `[ HH:MM:SS ]`
  * End Time: `[ HH:MM:SS ]`
  * Total Duration: `[ ______ seconds ]`
* **Task Outcome:**
  * `[ ] SUCCESS (Unassisted)` — Completed without facilitator prompts or intervention.
  * `[ ] ASSISTED` — Completed after receiving minimal non-leading guidance.
  * `[ ] UNSUCCESSFUL (Fail)` — Abandoned, requested intervention, or failed to achieve target state.
* **Error & Friction Tracking:**
  * `[ ] Critical Errors (ERR-CRIT):` `[ Description of blocking failure ]`
  * `[ ] Non-Critical Errors (ERR-NON):` `[ Recoverable mistakes, e.g. validation trigger ]`
  * `[ ] Misclicks / Dead Clicks (ERR-CLICK):` `[ Inactive elements clicked ]`
  * `[ ] Navigation Disorientation (ERR-NAV):` `[ Confusion regarding screen hierarchy ]`
* **Think-Aloud Observations & Verbatim Quotations:**
  > *`[ Record exact participant quotes and behavioral observations during task execution ]`*
* **Post-Task Single Ease Question (SEQ):**
  * *"Overall, how easy or difficult was this task to complete?"*  
    `[ 1: Very Difficult ]  1  —  2  —  3  —  4  —  5  —  6  —  7  [ 7: Very Easy ]`  
    **Participant Rating:** `[ ___ / 7 ]`

---

## 3. Benchmark Task 02: Discover Study Circles with Search & Multi-Filters

* **Task Target:** `FLOW-02` (`UT-TASK-02` in [`FORMATIVE_TEST_SCRIPT.md`](../prototypes/module05/FORMATIVE_TEST_SCRIPT.md))
* **Participant Prompt:**  
  > *"Navigate to the Explore Circles directory. Find a study circle in 'Computer Science' with an 'Online' modality and 'Problem-Solving' study style that has open seats. Once you locate it, review the results and then reset your filters back to the default view."*

* **Task Timing:**
  * Start Time: `[ HH:MM:SS ]`
  * End Time: `[ HH:MM:SS ]`
  * Total Duration: `[ ______ seconds ]`
* **Task Outcome:**
  * `[ ] SUCCESS (Unassisted)`
  * `[ ] ASSISTED`
  * `[ ] UNSUCCESSFUL (Fail)`
* **Filter Adjustment Count:** `[ ___ adjustments before locating target ]`
* **Reset Discovery:**
  * `[ ] Discovered immediately (Top Header / Bottom Button)`
  * `[ ] Delayed discovery (> 15 seconds search)`
  * `[ ] Failed to discover reset (Required prompt)`
* **Error & Friction Tracking:**
  * `[ ] Critical Errors (ERR-CRIT):` `[ ... ]`
  * `[ ] Non-Critical Errors (ERR-NON):` `[ ... ]`
  * `[ ] Misclicks (ERR-CLICK):` `[ ... ]`
  * `[ ] Navigation Confusion (ERR-NAV):` `[ ... ]`
* **Think-Aloud Observations & Quotations:**
  > *`[ ... ]`*
* **Post-Task Single Ease Question (SEQ):**
  * **Participant Rating:** `[ ___ / 7 ]`

---

## 4. Benchmark Task 03: Compatibility Inspection & Join/Request Membership

* **Task Target:** `FLOW-03` (`UT-TASK-03` in [`FORMATIVE_TEST_SCRIPT.md`](../prototypes/module05/FORMATIVE_TEST_SCRIPT.md))
* **Participant Prompt:**  
  > *"Open the details for 'Algorithms Problem Solvers'. Inspect the compatibility breakdown to see how your score was calculated. Review the circle rules. Because this circle is moderated, submit a join request with a brief introductory note. Once submitted, verify your pending status."*

* **Task Timing:**
  * Start Time: `[ HH:MM:SS ]`
  * End Time: `[ HH:MM:SS ]`
  * Total Duration: `[ ______ seconds ]`
* **Task Outcome:**
  * `[ ] SUCCESS (Unassisted)`
  * `[ ] ASSISTED`
  * `[ ] UNSUCCESSFUL (Fail)`
* **Factor Breakdown Interaction:**
  * `[ ] Located and reviewed factor breakdown modal cleanly`
  * `[ ] Confused breakdown button with join application CTA`
  * `[ ] Overlooked breakdown card entirely`
* **Introductory Note Length & Validation:**
  * Note character count: `[ ___ characters ]`
  * `[ ] Valid on first attempt (&ge; 15 chars)`
  * `[ ] Triggered short-note validation error (Recovered)`
* **Error & Friction Tracking:**
  * `[ ] Critical Errors (ERR-CRIT):` `[ ... ]`
  * `[ ] Non-Critical Errors (ERR-NON):` `[ ... ]`
  * `[ ] Misclicks (ERR-CLICK):` `[ ... ]`
* **Think-Aloud Observations & Quotations:**
  > *`[ ... ]`*
* **Post-Task Single Ease Question (SEQ):**
  * **Participant Rating:** `[ ___ / 7 ]`

---

## 5. Benchmark Task 04: Host Operations & Circle Creation Wizard

* **Task Target:** `FLOW-04` (`UT-TASK-04` in [`FORMATIVE_TEST_SCRIPT.md`](../prototypes/module05/FORMATIVE_TEST_SCRIPT.md))
* **Participant Prompt:**  
  > *"Switch to the Host Workspace using the role toggle at the top of the page. Initiate creating a new study circle. Progress through the 4-step wizard: enter the title 'Distributed Systems Lab', select 'Computer Science', enter a brief description and at least one learning objective, select 'Online' modality, set a schedule, set capacity to 5 learners, and finish creating the circle. Once created, review the pending applicant in your management console and approve them."*

* **Task Timing:**
  * Start Time: `[ HH:MM:SS ]`
  * End Time: `[ HH:MM:SS ]`
  * Total Duration: `[ ______ seconds ]`
* **Task Outcome:**
  * `[ ] SUCCESS (Unassisted)`
  * `[ ] ASSISTED`
  * `[ ] UNSUCCESSFUL (Fail)`
* **Wizard Progression Audit:**
  * Step 1 (Basics): `[ ] Smooth  [ ] Validation Trigger`
  * Step 2 (Charter & Style): `[ ] Smooth  [ ] Validation Trigger`
  * Step 3 (Logistics & Schedule): `[ ] Smooth  [ ] Validation Trigger`
  * Step 4 (Capacity & Review): `[ ] Smooth  [ ] Slider Hesitation`
* **Management Console Action:**
  * `[ ] Approved applicant successfully`
  * `[ ] Declined applicant`
  * `[ ] Verified member roster updated`
* **Error & Friction Tracking:**
  * `[ ] Critical Errors (ERR-CRIT):` `[ ... ]`
  * `[ ] Non-Critical Errors (ERR-NON):` `[ ... ]`
  * `[ ] Misclicks (ERR-CLICK):` `[ ... ]`
* **Think-Aloud Observations & Quotations:**
  > *`[ ... ]`*
* **Post-Task Single Ease Question (SEQ):**
  * **Participant Rating:** `[ ___ / 7 ]`

---

## 6. Benchmark Task 05: Session Scheduling & RSVP Coordination

* **Task Target:** `FLOW-05` (`UT-TASK-05` in [`FORMATIVE_TEST_SCRIPT.md`](../prototypes/module05/FORMATIVE_TEST_SCRIPT.md))
* **Participant Prompt:**  
  > *"From either the Dashboard or your Circle Management console, open the session scheduler. Schedule a session titled 'Graph Algorithms Whiteboard Sprint' for next week with a 90-minute duration and an outline agenda. Once scheduled, open the session details and confirm that your RSVP status is set to 'Attending'."*

* **Task Timing:**
  * Start Time: `[ HH:MM:SS ]`
  * End Time: `[ HH:MM:SS ]`
  * Total Duration: `[ ______ seconds ]`
* **Task Outcome:**
  * `[ ] SUCCESS (Unassisted)`
  * `[ ] ASSISTED`
  * `[ ] UNSUCCESSFUL (Fail)`
* **Scheduler & RSVP Audit:**
  * Date Picker: `[ ] Valid future date selected  [ ] Past date attempted`
  * Agenda: `[ ] Reviewed/customized agenda template  [ ] Kept default`
  * RSVP Toggled: `[ ] Attending  [ ] Tentative  [ ] Declined`
  * Dashboard Sync: `[ ] Verified session appears on Learner Dashboard`
* **Error & Friction Tracking:**
  * `[ ] Critical Errors (ERR-CRIT):` `[ ... ]`
  * `[ ] Non-Critical Errors (ERR-NON):` `[ ... ]`
  * `[ ] Misclicks (ERR-CLICK):` `[ ... ]`
* **Think-Aloud Observations & Quotations:**
  > *`[ ... ]`*
* **Post-Task Single Ease Question (SEQ):**
  * **Participant Rating:** `[ ___ / 7 ]`

---

## 7. System Usability Scale (SUS) Standard Questionnaire

Please circle the rating that best reflects your immediate reaction (1 = Strongly Disagree, 5 = Strongly Agree):

| Item # | System Usability Scale (SUS) Statement | Strongly Disagree (1) | Disagree (2) | Neutral (3) | Agree (4) | Strongly Agree (5) |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Q01** | I think that I would like to use this system frequently. | 1 | 2 | 3 | 4 | 5 |
| **Q02** | I found the system unnecessarily complex. | 1 | 2 | 3 | 4 | 5 |
| **Q03** | I thought the system was easy to use. | 1 | 2 | 3 | 4 | 5 |
| **Q04** | I think that I would need the support of a technical person to be able to use this system. | 1 | 2 | 3 | 4 | 5 |
| **Q05** | I found the various functions in this system were well integrated. | 1 | 2 | 3 | 4 | 5 |
| **Q06** | I thought there was too much inconsistency in this system. | 1 | 2 | 3 | 4 | 5 |
| **Q07** | I would imagine that most people would learn to use this system very quickly. | 1 | 2 | 3 | 4 | 5 |
| **Q08** | I found the system very cumbersome to use. | 1 | 2 | 3 | 4 | 5 |
| **Q09** | I felt very confident using the system. | 1 | 2 | 3 | 4 | 5 |
| **Q10** | I needed to learn a lot of things before I could get going with this system. | 1 | 2 | 3 | 4 | 5 |

### SUS Score Calculation (Standard Brooke, 1996 Formulation):
* Positive items sum: `((Q1 - 1) + (Q3 - 1) + (Q5 - 1) + (Q7 - 1) + (Q9 - 1)) = [ ___ ]`
* Negative items sum: `((5 - Q2) + (5 - Q4) + (5 - Q6) + (5 - Q8) + (5 - Q10)) = [ ___ ]`
* **Raw Calculated SUS Score:** `(Positive Sum + Negative Sum) * 2.5 = [ ______ / 100 ]`

---

## 8. Semi-Structured Post-Session Debriefing

1. *"What was your overall impression of how CohortCircle helps you find study partners?"*  
   > *`[ ... ]`*

2. *"How transparent did you find the compatibility score and the factor breakdown? Did you trust the matching explanation?"*  
   > *`[ ... ]`*

3. *"How easy or difficult was it to switch between finding a circle to join versus creating and hosting your own circle?"*  
   > *`[ ... ]`*

4. *"What was the single most confusing or frustrating moment during today's session?"*  
   > *`[ ... ]`*

5. *"What feature or capability would you most like to see added or changed in the next high-fidelity version?"*  
   > *`[ ... ]`*

---

## 9. Session Facilitator Sign-Off

* **Facilitator Signature / Acknowledgment:** `[ Muhammad Taimoor Ajmal ]`  
* **Date Form Completed:** `[ YYYY-MM-DD ]`  
* **Storage Confirmation:** Stored in `private-research-data/sessions/session-[P-0x].md`.
