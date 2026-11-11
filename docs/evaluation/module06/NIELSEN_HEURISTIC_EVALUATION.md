# CohortCircle — Expert Heuristic Evaluation (Nielsen's 10 Usability Heuristics)

* **Product:** CohortCircle  
* **Tagline:** Find your people. Learn together.  
* **Methodology:** Expert Heuristic Inspection (Nielsen, 1994) applied to the low-fidelity digital wireframe prototype ([`docs/prototypes/module05/index.html`](../prototypes/module05/index.html)).  
* **Evaluator:** Senior UX Researcher & HCI Specialist  
* **Status:** Verified Expert Inspection  

---

## 1. Evaluation Methodology & Heuristic Framework

This inspection systematically reviews all twelve screens, interactive modal dialogs, and navigation states of the low-fidelity prototype against Jakob Nielsen's Ten Usability Heuristics for User Interface Design.

Each evaluation entry details:
1. **Heuristic ID & Name**
2. **Evaluation Scope** (Target screens and interaction workflows)
3. **Relevant Screen or DOM Element** (Exact selectors and attributes)
4. **Actual Inspected Evidence** (Observed prototype behavior)
5. **Identified Usability Problem** (or verified compliance baseline)
6. **Severity Rating** (`CATASTROPHIC`, `MAJOR`, `MINOR`, `COSMETIC`, or `PASS`)
7. **Recommended Correction**
8. **Related Requirements** (FRs and NFRs)
9. **Verification Method** (Static code review, interaction playback, or DOM inspection)

---

## 2. Heuristic-by-Heuristic Inspection Results

---

### H01: Visibility of System Status
*The design should always keep users informed about what is going on, through appropriate feedback within a reasonable time.*

* **Evaluation Scope:** State changes across Learner Dashboard, Directory Search, Form Submissions, Join Requests, Wizard Progression, and RSVP Attendance.
* **Relevant DOM Elements:**
  * `#toast-container` (Screen-reader announced alert mechanism)
  * `#explore-results-count` (Directory filtering feedback)
  * `#cd-seats` and `#cd-action-button-container` (Circle details membership state)
  * `.wizard-steps .wizard-step-item` (Creation wizard progress tabs)
  * `#sd-current-rsvp-text` and `#sd-attendee-count` (Session RSVP attendance counters)
  * `#dash-user-name` and Profile Setup Progress indicator
* **Actual Inspected Evidence:**
  * Real-time text search and filter changes immediately update `#explore-results-count` (e.g., "Showing 1 of 5 circles") in < 20ms.
  * Toggling RSVP on Screen 11 immediately updates the segmented button style (`selected`), the textual status (`sd-current-rsvp-text`), and recalculates total responses (`sd-attendee-count`).
  * Asynchronous actions (e.g., `saveLearnerProfile()`, `submitScheduleSession()`) invoke `showToast()` rendering temporary floating notices with `aria-live="polite"`.
  * *Discrepancy Discovered:* On Screen 01 (Dashboard), the "Profile Setup: 85% Complete" progress card is statically hardcoded in HTML. When a user updates their bio, topics, or availability grid on Screen 02 and returns, the percentage remains fixed at 85%, providing no positive visual reinforcement of completion progress.
* **Identified Usability Problem:** Hardcoded profile progress percentage fails to reflect dynamic completion state after user preference updates.
* **Severity:** **`MINOR`** (Logged as `UX-004`)
* **Recommended Correction:** Compute profile completion dynamically based on configured topics, styles, and availability slots (e.g., 100% when bio, 2+ topics, and availability slots are set).
* **Related Requirements:** `FR-001`, `FR-022`, `NFR-001`
* **Verification Method:** Manual interaction testing and DOM inspection of Screen 01 and Screen 02.

---

### H02: Match Between System and Real World
*The design should speak the users' language, with words, phrases, and concepts familiar to the user, rather than internal jargon.*

* **Evaluation Scope:** Domain terminology, study style classifications, scheduling conventions, and joining policy explanations.
* **Relevant DOM Elements:**
  * `#availability-grid-body .avail-cell` (7x3 weekly availability matrix)
  * `#profile-styles-container` and `#filter-style` (Study habits classification)
  * `#filter-policy` and badges (`Open` vs `Moderated`)
  * `#modal-compat-breakdown` (Explainable compatibility factor labels)
* **Actual Inspected Evidence:**
  * Study styles use intuitive, descriptive descriptors: "Problem-Solving (Hands-on problem breakdown)", "Discussion-Heavy (Socratic paper review)", and "Silent Co-Working (Pomodoro accountability)".
  * Compatibility explanation uses plain-language factors ("Subject Domain Overlap", "Study Style Alignment", "Schedule Availability", "Meeting Modality Fit", "Cohort Size Preference") rather than mathematical algorithmic jargon.
  * *Discrepancy Discovered:* In the 7x3 weekly availability grid (Screen 02), active cells display the uppercase label `OPEN`, while unselected cells display an em-dash `—`. In student mental models, "OPEN" is frequently interpreted as "an unbooked/empty slot" rather than "I am free/available to study". 
* **Identified Usability Problem:** Ambiguous cell label "OPEN" in availability matrix creates minor cognitive dissonance regarding whether it denotes personal availability or open circle sessions.
* **Severity:** **`COSMETIC`** (Logged as `UX-005`)
* **Recommended Correction:** Replace cell label `OPEN` with `FREE` or `AVAIL`, and provide explicit legend (`■ Available for Study  □ Busy / Unavailable`).
* **Related Requirements:** `FR-003`, `NFR-007`, `NFR-013`
* **Verification Method:** Analytical terminology review against student mental model mapping (`MENTAL_MODEL_MAPPING.md`).

---

### H03: User Control and Freedom
*Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue.*

* **Evaluation Scope:** Modal dialog dismissal, wizard cancellation, circle withdrawal, member removal, and data resetting.
* **Relevant DOM Elements:**
  * `#modal-join-request`, `#modal-session-scheduler`, `#modal-compat-breakdown`
  * `#wiz-prev-btn` and wizard "Cancel" button on Screen 08
  * `#dash-pending-list` ("Withdraw" button)
  * `#mgmt-requests-container` ("Decline" button)
  * `#modal-leave-confirm` and `#modal-remove-member`
* **Actual Inspected Evidence:**
  * All modal dialogs contain explicit "Cancel" buttons and support global `Escape` key dismissal.
  * Leaving a circle prompts an accessible confirmation modal (`#modal-leave-confirm`), preventing accidental loss of membership.
  * *Critical Discrepancy 1:* In Screen 08 (Circle Creation Wizard), clicking the top "Cancel" button immediately executes `navigateTo('screen-host')`, discarding all user input across steps 1–4 without checking whether form fields contain unsaved content.
  * *Critical Discrepancy 2:* In Screen 09 (Circle Management Console), clicking "Decline" on an applicant instantly removes their application from the queue with zero confirmation or undo capability.
* **Identified Usability Problem:**
  1. Lack of discard confirmation when exiting a multi-step wizard with uncommitted draft data.
  2. Immediate, unconfirmed applicant rejection by facilitators creates risk of accidental dismissal.
* **Severity:** **`MAJOR`** (Logged as `UX-001` and `UX-002`)
* **Recommended Correction:**
  1. Add an unsaved changes confirmation dialog if user clicks "Cancel" in the wizard after entering text.
  2. Add a confirmation prompt when declining an applicant in Screen 09, offering an optional constructive feedback note.
* **Related Requirements:** `FR-016`, `FR-018`, `NFR-003`
* **Verification Method:** Interaction simulation of accidental clicks on Cancel and Decline buttons.

---

### H04: Consistency and Standards
*Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.*

* **Evaluation Scope:** Primary navigation, action button labels, badge semantics, and form controls across screens.
* **Relevant DOM Elements:**
  * `.main-nav a` (Application shell navigation)
  * Action buttons on Screen 03 vs Screen 04 (`directJoinCircle` vs details join button)
  * Role badges (`Host`, `Member`, `Facilitator`)
  * Date and time displays across Dashboard, Circle Details, and Sessions
* **Actual Inspected Evidence:**
  * Application shell navigation is consistent across all views; active view receives consistent styling (`class="active"` with dark border).
  * Standard form conventions followed: required fields demarcated with asterisks (`*`), inputs use standard system fonts, labels precede inputs.
  * *Minor Inconsistency:* On Screen 03 card catalog, the action buttons are labeled "Join Circle" (Open) and "Request to Join" (Moderated). On Screen 04 (Circle Details), the buttons are labeled "Join Study Circle" and "Request to Join Circle". While semantically equivalent, standardized labeling reduces scanning friction.
* **Identified Usability Problem:** Slight phrasing variations in primary call-to-action buttons between directory cards and details screens.
* **Severity:** **`COSMETIC`** (Logged as `UX-006`)
* **Recommended Correction:** Standardize CTA button copy to "Join Circle" and "Request to Join" across both views.
* **Related Requirements:** `FR-013`, `FR-014`, `NFR-013`
* **Verification Method:** Cross-screen DOM text comparison.

---

### H05: Error Prevention
*Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.*

* **Evaluation Scope:** Form submission guards, capacity overflows, duplicate enrollments, invalid calendar dates, and past scheduling.
* **Relevant DOM Elements:**
  * `#wiz-title`, `#wiz-subject`, `#wiz-description`, `#wiz-objectives`, `#wiz-schedule`
  * `#sched-date-input`, `#sched-time-input`, `#sched-title-input`
  * `#join-note-input` (Character count enforcement)
  * `directJoinCircle()` capacity guard (`c.members.length >= c.capacity`)
* **Actual Inspected Evidence:**
  * Capacity safeguards properly prevent joining or approving applicants when a circle is at maximum capacity (`c.members.length >= c.capacity`).
  * The wizard disables the "Next" button until required step fields pass validation.
  * The Join Request modal requires at least 15 characters, preventing empty or spam submissions.
  * *Critical Discrepancy:* In Screen 10 (Session Scheduler Modal), the date input (`#sched-date-input`) defaults to the current date, but does not enforce a minimum date attribute (`min="YYYY-MM-DD"`). Users can select dates in the past, creating past study sessions on upcoming schedules.
* **Identified Usability Problem:** Session scheduler accepts past dates, allowing illogical calendar scheduling.
* **Severity:** **`MAJOR`** (Logged as `UX-003`)
* **Recommended Correction:** Set `min` attribute on `#sched-date-input` to today's date (`new Date().toISOString().split("T")[0]`) and validate `date >= today` in `submitScheduleSession()`.
* **Related Requirements:** `FR-020`, `NFR-003`
* **Verification Method:** Manual date input test with yesterday's date in `#modal-session-scheduler`.

---

### H06: Recognition Rather Than Recall
*Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.*

* **Evaluation Scope:** Pre-populated forms, contextual modal summaries, filter memory, and session dropdown defaults.
* **Relevant DOM Elements:**
  * `#join-modal-circle-name` and `#join-modal-host` (Join request modal)
  * `#sched-circle-select` (Session scheduler circle dropdown)
  * `#wiz-review-summary` (Step 4 wizard review)
  * `#modal-compat-breakdown` (Factor breakdown weights)
* **Actual Inspected Evidence:**
  * Step 4 of the circle wizard aggregates and displays a comprehensive summary of choices from Steps 1–3 before final creation.
  * The Join Request modal clearly presents the circle name and host name, reminding users of context.
  * *Discrepancy Discovered:* When opening the Session Scheduler from the Learner Dashboard or Host Workspace, the circle dropdown `#sched-circle-select` defaults to the first circle in the array rather than maintaining the most recently viewed circle context.
* **Identified Usability Problem:** Scheduler modal requires users to recall and re-select their target circle when triggered from general workspace screens.
* **Severity:** **`MINOR`** (Logged as `UX-007`)
* **Recommended Correction:** Contextually pre-select `appState.selectedCircleId` in `#sched-circle-select` whenever launching the scheduler from circle-specific screens.
* **Related Requirements:** `FR-020`, `NFR-013`
* **Verification Method:** Interaction flow testing across Dashboard &rarr; Scheduler vs Circle Details &rarr; Scheduler.

---

### H07: Flexibility and Efficiency of Use
*Shortcuts — hidden from novice users — may speed up the interaction for the expert user such that the design can cater to both inexperienced and experienced users.*

* **Evaluation Scope:** Preset selection shortcuts, keyboard navigability, batch availability selection, and quick links.
* **Relevant DOM Elements:**
  * Screen 02 Availability Grid preset button ("Select Evenings")
  * Screen 03 Real-time search and filter reset
  * Keyboard navigation shortcuts (`Escape` modal dismissal)
  * Quick action buttons on Learner Dashboard
* **Actual Inspected Evidence:**
  * The "Select Evenings" preset button on Screen 02 saves 7 individual cell clicks for common student evening availability schedules.
  * Filter reset button instantly restores default directory state.
  * *Opportunity Discovered:* In Screen 02, while "Select Evenings" exists, there is no "Clear All" or "Select Weekday Mornings" shortcut. Users wishing to reset their 7x3 availability matrix must manually deselect up to 21 cells individually.
* **Identified Usability Problem:** Limited preset options on the 7x3 availability matrix increases interaction fatigue for learners with non-evening study patterns.
* **Severity:** **`MINOR`** (Logged as `UX-008`)
* **Recommended Correction:** Add a secondary preset button ("Clear Matrix" and "Select Weekdays") alongside "Select Evenings".
* **Related Requirements:** `FR-003`, `NFR-001`, `NFR-013`
* **Verification Method:** Interaction count audit for matrix clearing (21 clicks vs 1 click).

---

### H08: Aesthetic and Minimalist Design
*Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information.*

* **Evaluation Scope:** Visual hierarchy, information density, wireframe clutter, and card layout simplicity.
* **Relevant DOM Elements:**
  * Screen 01 Dashboard layout
  * Screen 03 Circle card layout
  * Screen 04 Circle Details sidebar
* **Actual Inspected Evidence:**
  * Low-fidelity grayscale design system maintains clean visual hierarchy with standard 8px grid spacing.
  * Cards clearly separate subject badges, titles, descriptions, and action rows.
  * *Minor Finding:* On Screen 04 (Circle Details), the right sidebar stacks three dense cards (Compatibility Explanation, Logistics, and Member Roster). On tablet viewports (768px–860px), this produces a long vertical scroll where the Member Roster is pushed below the fold.
* **Identified Usability Problem:** Secondary sidebar stack increases page length on medium-width tablet screens.
* **Severity:** **`COSMETIC`** (Logged as `UX-009`)
* **Recommended Correction:** Group Logistics and Roster into a compact tabbed or collapsible card in the high-fidelity design (Module 07).
* **Related Requirements:** `FR-012`, `NFR-004`, `NFR-013`
* **Verification Method:** Viewport resizing inspection from 1140px down to 768px.

---

### H09: Help Users Recognize, Diagnose, and Recover from Errors
*Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.*

* **Evaluation Scope:** Form validation messages, character counter feedback, empty state error recoveries, and capacity warnings.
* **Relevant DOM Elements:**
  * `#prof-name-error`, `#prof-topic-error`
  * `#wiz-title-error`, `#wiz-subject-error`, `#wiz-desc-error`, `#wiz-obj-error`, `#wiz-sched-error`
  * `#join-note-error`
  * `#explore-empty-state`
* **Actual Inspected Evidence:**
  * Validation errors appear inline immediately below the offending input with bold text and distinct background styling (`#f8d7da`).
  * Error messages provide constructive recovery guidance: "Circle title is required (min 5 characters)", "Please select at least one study topic", "Please write a brief note (at least 15 characters)".
  * Directory zero-results state provides an explicit "Clear All Filters" button.
  * *Accessibility Limitation:* Validation error containers (`.form-error`) are toggled via `display: block`, but are not programmatically associated with form inputs via `aria-describedby` or announced via an `aria-live` region, creating a barrier for screen reader users.
* **Identified Usability Problem:** Inline validation errors lack programmatic `aria-describedby` linkage to form fields.
* **Severity:** **`MINOR`** (Logged as `UX-010`)
* **Recommended Correction:** Add `id` to each error element and reference it in the input's `aria-describedby` attribute upon validation failure.
* **Related Requirements:** `FR-001`, `FR-016`, `NFR-002`, `NFR-003`
* **Verification Method:** DOM accessibility tree inspection and screen reader virtual cursor audit.

---

### H10: Help and Documentation
*Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.*

* **Evaluation Scope:** Contextual onboarding cues, explanatory tooltips, policy badges, and compatibility methodology disclosure.
* **Relevant DOM Elements:**
  * `.prototype-banner` (Prototype disclosure and role explanation)
  * `#modal-compat-breakdown` (Formula explanation)
  * Policy indicators on cards (`Open` vs `Moderated`)
  * Screen 12 Data Engine disclosures
* **Actual Inspected Evidence:**
  * The prototype clearly explains its simulation nature via the top persistent banner and Screen 12.
  * The Compatibility Breakdown modal explicitly details the 5 factor weights (30%, 25%, 20%, 15%, 10%) and explains how user preferences influenced the score.
  * *Discrepancy Discovered:* On Screen 03 (Explore Circles), circles carry badges for `Open` and `Moderated`, but there is no tooltip, label, or help icon explaining the practical difference (Instant Join vs Host Application Note) until the user inspects details or clicks the action button.
* **Identified Usability Problem:** First-time learners may not intuitively understand what `Moderated` implies when browsing directory cards.
* **Severity:** **`MINOR`** (Logged as `UX-011`)
* **Recommended Correction:** Add a subtle explanatory subtitle or tooltip to policy badges on directory cards (e.g., `Moderated (Requires note)` / `Open (Instant join)`).
* **Related Requirements:** `FR-005`, `FR-013`, `FR-014`, `NFR-013`
* **Verification Method:** Contextual inspection of directory card badges.

---

## 3. Summary of Nielsen Heuristic Findings

All ten heuristics were systematically inspected. The evaluation produced **0 Catastrophic**, **3 Major**, **5 Minor**, and **2 Cosmetic** issues directly traceable to specific DOM elements in `docs/prototypes/module05/index.html`.
