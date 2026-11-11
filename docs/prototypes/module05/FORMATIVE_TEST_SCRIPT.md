# CohortCircle — Formative Usability Testing Script (Module 06 Instrument)

* **Product:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Document Focus:** Formative evaluation protocol and benchmark task test script prepared for Module 06 usability testing on the low-fidelity digital wireframe prototype ([`docs/prototypes/module05/index.html`](index.html)).
* **Governance Status:** **INSTRUMENT PREPARATION ONLY.** No fabricated participant data, simulated completion rates, or invented usability results are recorded in this document.

---

## 1. Usability Evaluation Purpose & Methodology

The purpose of this formative usability evaluation instrument is to empirically test the low-fidelity wireframe prototype with representative prospective users (university students and independent adult learners) during Module 06.

### Methodological Framework:
* **Protocol:** Concurrent Think-Aloud (CTA) Protocol (Ericsson & Simon, 1993; Nielsen, 1993).
* **Participant Cohort Size:** 5 to 7 participants, adhering to Nielsen's formative evaluation sample size curve to uncover approximately 80–85% of critical usability defects.
* **Environment:** Direct interaction with [`docs/prototypes/module05/index.html`](index.html) running in a standard modern web browser.
* **Facilitation Stance:** Neutral, non-directive facilitator stance. The facilitator observes, prompts think-aloud verbalizations without leading ("What are you thinking right now?"), and records objective interaction metrics.

---

## 2. Participant Welcome & Pre-Session Briefing

### Scripted Facilitator Introduction (Read verbatim):
> *"Thank you for participating today. We are evaluating CohortCircle, an open-source collaborative platform designed to help learners find compatible study peers, organize structured study sessions, and maintain accountability.*
>
> *Before we begin, I want to emphasize three important points:*
> 1. *We are testing the design and structure of the prototype, NOT you. There are no right or wrong answers, and you cannot make a mistake.*
> 2. *This is an early-stage digital wireframe. It is deliberately grayscale and unpolished so we can focus on layout, navigation, and usability before developing the final software.*
> 3. *Please think out loud as you work through each task. Tell me what you are looking for, what you expect to happen when you click something, and if anything feels confusing or surprising.*
>
> *Do you have any questions before we begin?"*

---

## 3. Five Benchmark Usability Evaluation Tasks

---

### TASK 01: Configure a Learner Study Profile & Availability Matrix
* **Task ID:** `UT-TASK-01`
* **Target Flow:** `FLOW-01` (Profile Setup & Preference Configuration)
* **Functional Requirements:** `FR-001`, `FR-002`, `FR-003`, `FR-004`
* **User Scenario:**
  You have just arrived on CohortCircle as a new learner named Alex Rivera. You are studying Computer Science and want the system to match you with compatible study circles based on your study habits and schedule.
* **Participant Instruction:**
  > *"Starting from the Dashboard, navigate to your Profile & Preferences. Update your bio, ensure 'Algorithms & DS' and 'Discrete Mathematics' are selected under study topics, select 'Problem-Solving' under study habits, set your availability for Tuesday and Thursday evenings on the weekly matrix, set your preferred group size to 6, and save your profile."*
* **Expected Completion State:**
  Profile form saved successfully; in-memory user preferences updated; confirmation toast displayed; user navigated to Explore Directory.
* **Observable Actions:**
  1. Locates "Edit Profile & Preferences" button on Dashboard card or clicks "My Profile" in main navigation.
  2. Scans personal information and modifies bio if desired.
  3. Locates and checks appropriate checkboxes under "Primary Subjects / Topics of Interest".
  4. Identifies "Dominant Study Style Preferences" and selects "Problem-Solving".
  5. Locates the 7x3 Weekly Availability Matrix table.
  6. Clicks the "Tue" and "Thu" cells on the "Evening (5pm - 9pm)" row, observing state change to `OPEN` (dark background).
  7. Adjusts the group size slider to 6.
  8. Clicks "Save Profile" and observes confirmation toast.
* **Potential Participant Errors / Usability Snags:**
  * Attempting to click table headers instead of individual period cells.
  * Overlooking the "Save Profile" button at the top-right of the screen.
  * Deselecting all topics and triggering the inline validation error.
* **Success Criteria (Binary):**
  **Pass:** Participant successfully saves profile with requested topics, styles, and availability slots without facilitator assistance.
  **Fail:** Participant gives up, requests facilitator intervention, or abandons the screen.
* **Metrics to Record:**
  * Task Completion Status (Success / Assisted / Fail)
  * Time on Task (Seconds)
  * Number of Misclicks / Validation Triggers
  * Subjective Ease-of-Use Rating (Single Ease Question: 1–7 scale)

---

### TASK 02: Discover a Study Circle Using Search & Multiple Filters
* **Task ID:** `UT-TASK-02`
* **Target Flow:** `FLOW-02` (Explore Directory & Multi-Criteria Filtering)
* **Functional Requirements:** `FR-005`, `FR-006`, `FR-007`, `FR-008`, `FR-011`
* **User Scenario:**
  You want to join an online study circle specifically focused on Computer Science algorithms that has available seats and emphasizes hands-on problem-solving.
* **Participant Instruction:**
  > *"Navigate to the Explore Circles directory. Find a study circle in 'Computer Science' with an 'Online' modality and 'Problem-Solving' study style that has open seats. Once you locate it, review the results and then reset your filters back to the default view."*
* **Expected Completion State:**
  Directory filters successfully isolate matching circles (e.g., "Algorithms Problem Solvers"); participant inspects the resulting card and subsequently executes the filter reset.
* **Observable Actions:**
  1. Clicks "Explore Circles" in the main navigation.
  2. Locates the sidebar search and filter panel.
  3. Selects "Computer Science" in the Subject Domain dropdown.
  4. Selects "Problem-Solving" in the Study Style dropdown.
  5. Selects "Online" in the Modality dropdown.
  6. Checks "Has Open Seats Only".
  7. Observes the dynamic update of the results counter ("Showing 1 of 5 circles").
  8. Locates and clicks the "Reset" button in the filter card header to restore all 5 circles.
* **Potential Participant Errors / Usability Snags:**
  * Typing keywords into the search box that conflict with the selected dropdowns, triggering the zero-results state.
  * Failing to locate the "Reset" button when asked to return to the default directory view.
* **Success Criteria (Binary):**
  **Pass:** Participant applies the required filter combination, identifies the target cohort, and resets the directory to default.
  **Fail:** Participant cannot locate filters, misinterprets filter logic, or fails to reset the view.
* **Metrics to Record:**
  * Task Completion Status (Success / Assisted / Fail)
  * Time on Task (Seconds)
  * Filter adjustments before achieving target state
  * Single Ease Question (SEQ: 1–7)

---

### TASK 03: Evaluate Explainable Compatibility & Join or Request Membership
* **Task ID:** `UT-TASK-03`
* **Target Flow:** `FLOW-03` (Compatibility Inspection & Join/Request Membership)
* **Functional Requirements:** `FR-009`, `FR-010`, `FR-012`, `FR-013`, `FR-014`, `FR-015`
* **User Scenario:**
  You want to inspect why "Algorithms Problem Solvers" has a high compatibility score with your profile, review its learning objectives and rules, and apply to join. Afterwards, you want to verify where your enrolled circles appear.
* **Participant Instruction:**
  > *"Open the details for 'Algorithms Problem Solvers'. Inspect the compatibility breakdown to see how your score was calculated. Review the circle rules. Because this circle is moderated, submit a join request with a brief introductory note. Once submitted, verify your pending status."*
* **Expected Completion State:**
  Participant opens the compatibility factor modal; closes modal; opens the Join Request modal; types an introductory note (&ge; 15 characters); submits request; observes status change on screen.
* **Observable Actions:**
  1. Clicks "Inspect Details" or the title of "Algorithms Problem Solvers".
  2. Locates the Compatibility Match card on the sidebar.
  3. Clicks "Inspect Factor Breakdown &rarr;".
  4. Scans the 5 weighted factors (Subject: 30%, Style: 25%, Schedule: 20%, Modality: 15%, Size: 10%).
  5. Closes the modal via "Close Breakdown" button or `Escape` key.
  6. Locates the primary action button ("Request to Join Circle") and clicks it.
  7. Enters introductory text in `#join-note-input` and observes the character counter.
  8. Clicks "Submit Join Request".
  9. Observes success toast notification and notes the updated button state ("Request Pending Review").
* **Potential Participant Errors / Usability Snags:**
  * Submitting an introductory note with fewer than 15 characters, triggering the inline validation warning.
  * Confusing the "Inspect Factor Breakdown" modal with the actual join application.
* **Success Criteria (Binary):**
  **Pass:** Participant opens and reviews the compatibility breakdown, enters a valid introductory note, and successfully submits the application.
  **Fail:** Participant fails to find the breakdown, fails to submit the request, or abandons the modal.
* **Metrics to Record:**
  * Task Completion Status (Success / Assisted / Fail)
  * Time on Task (Seconds)
  * Qualitative comments regarding the transparency of the compatibility breakdown
  * Single Ease Question (SEQ: 1–7)

---

### TASK 04: Create and Manage a Study Circle as a Host
* **Task ID:** `UT-TASK-04`
* **Target Flow:** `FLOW-04` (Host Circle Creation & Moderation Console)
* **Functional Requirements:** `FR-016`, `FR-017`, `FR-018`, `FR-019`
* **User Scenario:**
  You want to start a new peer study group called "Distributed Systems Lab" focusing on backend engineering. You want to host this group, set the meeting time, and configure it for up to 5 learners with a moderated membership policy.
* **Participant Instruction:**
  > *"Switch to the Host Workspace using the role toggle at the top of the page. Initiate creating a new study circle. Progress through the 4-step wizard: enter the title 'Distributed Systems Lab', select 'Computer Science', enter a brief description and at least one learning objective, select 'Online' modality, set a schedule, set capacity to 5 learners, and finish creating the circle. Once created, review the pending applicant in your management console and approve them."*
* **Expected Completion State:**
  New study circle successfully created through the 4-step wizard; user automatically redirected to the Circle Management Console; pending applicant approved and added to the member roster.
* **Observable Actions:**
  1. Clicks "Switch to Host View" in the top prototype banner or navigates to "Host Workspace".
  2. Clicks "+ Create New Study Circle" button.
  3. Step 1: Enters title, selects "Computer Science", enters description, clicks "Next &rarr;".
  4. Step 2: Enters learning objectives, selects study style, clicks "Next &rarr;".
  5. Step 3: Selects modality, enters recurring meeting schedule, clicks "Next &rarr;".
  6. Step 4: Adjusts capacity slider to 5, selects "Moderated" policy, reviews summary, and clicks "Create Study Circle".
  7. Observes redirection to Screen 09 (Circle Management Console).
  8. Locates the "Pending Membership Applications" card and clicks "Approve".
  9. Verifies that the applicant is added to the "Current Member Roster" and available seats update.
* **Potential Participant Errors / Usability Snags:**
  * Attempting to click "Next" on wizard steps without filling out required inputs (e.g., omitting learning objectives).
  * Hesitation at the role switcher if unfamiliar with prototype testing modes.
* **Success Criteria (Binary):**
  **Pass:** Participant navigates the 4-step wizard without input deadlocks, creates the cohort, and approves an applicant in the management console.
  **Fail:** Participant cannot complete the wizard, encounters unrecoverable validation failure, or fails to find the approval controls.
* **Metrics to Record:**
  * Task Completion Status (Success / Assisted / Fail)
  * Time on Task (Seconds)
  * Wizard step friction points (Step 1, 2, 3, or 4)
  * Single Ease Question (SEQ: 1–7)

---

### TASK 05: Schedule a Study Session and Update RSVP Attendance
* **Task ID:** `UT-TASK-05`
* **Target Flow:** `FLOW-05` (Session Scheduling & RSVP Coordination)
* **Functional Requirements:** `FR-020`, `FR-021`, `FR-022`
* **User Scenario:**
  As a circle member or facilitator, you want to schedule an upcoming study session for your group, review the timed agenda, and mark yourself as "Attending".
* **Participant Instruction:**
  > *"From either the Dashboard or your Circle Management console, open the session scheduler. Schedule a session titled 'Graph Algorithms Whiteboard Sprint' for next week with a 90-minute duration and an outline agenda. Once scheduled, open the session details and confirm that your RSVP status is set to 'Attending'."*
* **Expected Completion State:**
  Session scheduled via modal; session details screen opens; segmented RSVP control reflects "Attending"; attendee counter reflects presence.
* **Observable Actions:**
  1. Clicks "+ Schedule Session" button on Dashboard, Circle Details, or Host Console.
  2. Selects target circle from dropdown.
  3. Enters session topic / title.
  4. Selects date and start time.
  5. Selects 90-minute duration and confirms meeting venue/URL.
  6. Enters or reviews timed session agenda.
  7. Clicks "Publish Session".
  8. Observes redirection to Screen 11 (Session Details & RSVP).
  9. Verifies agenda checkpoints and clicks "Attending" on the segmented RSVP control if not already active.
  10. Navigates back to Dashboard and confirms session appears in upcoming list.
* **Potential Participant Errors / Usability Snags:**
  * Submitting the scheduler modal without entering a date or title.
  * Difficulty distinguishing between "Circle Meeting Cadence" (recurring) and a specific "Study Session" instance.
* **Success Criteria (Binary):**
  **Pass:** Participant schedules session with valid inputs, verifies agenda on details screen, and updates/verifies RSVP.
  **Fail:** Participant cannot locate scheduler or fails to complete session creation.
* **Metrics to Record:**
  * Task Completion Status (Success / Assisted / Fail)
  * Time on Task (Seconds)
  * Single Ease Question (SEQ: 1–7)

---

## 4. Post-Session Debriefing & System Usability Scale (SUS)

Following completion of the five tasks, the facilitator administers the standard 10-item System Usability Scale (SUS) questionnaire (Brooke, 1996) and conducts a brief semi-structured debrief:

### Debriefing Questions:
1. *"Overall, how clear was the distinction between exploring circles as a learner versus managing a circle as a host?"*
2. *"What was your reaction to the compatibility score and the factor breakdown modal? Did you find it transparent and believable?"*
3. *"Was there any point during the session where you felt stuck or unsure of what to do next?"*
4. *"If you could change one thing about how study circles or sessions are organized in this prototype, what would it be?"*

---

## 5. Instrument Execution Readiness

This testing script is fully prepared, validated against prototype DOM elements, and ready for deployment in Module 06 with zero modifications required.
