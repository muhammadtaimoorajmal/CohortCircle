# CohortCircle — Formative Design Revision Matrix

* **Product:** CohortCircle  
* **Tagline:** Find your people. Learn together.  
* **Document Focus:** Actionable remediation matrix detailing the concrete interface, interaction, and validation corrections for all thirteen usability issues identified during Module 06 formative evaluation.  
* **Scope Classification:**
  * **Scope A (Immediate Prototype Repair):** Minimal, safe interaction and validation corrections implemented directly in [`docs/prototypes/module05/index.html`](../prototypes/module05/index.html) while strictly preserving its low-fidelity grayscale wireframe aesthetic.
  * **Scope B (Module 07 High-Fidelity Architecture):** Complex visual styling, advanced CSS grid refactoring, responsive token adaptations, and micro-interactions cataloged for the production React implementation in Module 07.

---

## 1. Comprehensive Design Revision Matrix

| Issue ID | Short Title | Severity | Remediation Scope | Current Status |
|---|---|---|---|---|
| **`UX-001`** | Wizard Draft Abandonment Without Confirmation | **MAJOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-002`** | Unconfirmed Applicant Rejection in Console | **MAJOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-003`** | Past Date Selection Permitted in Session Scheduler | **MAJOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-004`** | Hardcoded Profile Progress Percentage on Dashboard | **MINOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-005`** | Ambiguous Cell Label "OPEN" in Availability Grid | **COSMETIC** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-006`** | Inconsistent CTA Button Copy Across Directory & Details | **COSMETIC** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-007`** | Scheduler Modal Circle Default Lacks View Context | **MINOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-008`** | Lack of Availability Presets (Clear All / Weekdays) | **MINOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-009`** | Vertical Card Stacking on Tablet Width Viewports | **COSMETIC** | Scope B (Module 07 Hi-Fi) | **Documented for M07** |
| **`UX-010`** | Inline Form Validation Errors Lack `aria-describedby` | **MINOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-011`** | Directory Policy Badges Lack Immediate Definitions | **MINOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-012`** | "Save Profile" Exclusively in Header Without Bottom CTA | **MINOR** | Scope A (Prototype Repair) | **Remediated & Verified** |
| **`UX-013`** | Single Filter Reset Control Disconnected on Scroll | **COSMETIC** | Scope A (Prototype Repair) | **Remediated & Verified** |

---

## 2. Detailed Remediation Specifications (Major & High-Priority Issues)

---

### Remediation for UX-001: Wizard Draft Abandonment Confirmation
* **Original Problem:** Clicking "Cancel" during the multi-step circle wizard instantly exited to `#screen-host`, destroying uncommitted draft text.
* **Proposed Interface Correction:** Introduce a dirty-state check `confirmCancelWizard()`. If the user has entered title or description content, display an accessible confirmation modal (`#modal-wizard-cancel-confirm`) asking: *"Discard circle draft? Any information entered in steps 1–4 will be lost."*
* **Revised Interaction Behavior:**
  * If fields are empty &rarr; Immediate clean exit to Host Workspace.
  * If fields contain text &rarr; Confirmation modal opens. Clicking "Keep Editing" resumes the current wizard step; clicking "Discard Draft" resets wizard state and navigates to `#screen-host`.
* **Affected Screen:** Screen 08 (`#screen-circle-wizard`).
* **Related Requirements:** `FR-016`, `NFR-003`.
* **Expected Usability Improvement:** Completely eliminates accidental loss of thoughtful cohort descriptions and objectives.
* **Verification Scenario:** Type "Advanced Graph Theory" in title, click Cancel, verify modal opens, click "Keep Editing", verify draft is retained.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-002: Unconfirmed Applicant Rejection
* **Original Problem:** Clicking "Decline" on an applicant card in Screen 09 immediately purged the applicant without confirmation or opportunity to give feedback.
* **Proposed Interface Correction:** Bind "Decline" to an accessible confirmation dialog (`#modal-decline-confirm`) displaying the applicant's name, note excerpt, and an optional feedback reason selector (e.g., "Cohort at capacity", "Schedule misalignment", "Prerequisite gap").
* **Revised Interaction Behavior:** Facilitator clicks "Decline" &rarr; modal opens &rarr; facilitator confirms &rarr; application is removed with toast confirmation: *"Declined application for [Name]."*
* **Affected Screen:** Screen 09 (`#screen-circle-management`).
* **Related Requirements:** `FR-018`, `NFR-003`.
* **Expected Usability Improvement:** Prevents irreversible misclicks; provides psychological safety for facilitators managing competitive applicant pools.
* **Verification Scenario:** Click Decline on Jordan Brooks, verify confirmation modal opens, cancel, verify applicant remains; confirm, verify removal.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-003: Past Date Selection Safeguard
* **Original Problem:** `#sched-date-input` allowed selecting dates prior to the current day, resulting in past study sessions listed on upcoming dashboards.
* **Proposed Interface Correction:** Set `min` attribute on `#sched-date-input` dynamically to today's ISO date string (`new Date().toISOString().split("T")[0]`), and validate `date >= today` in `submitScheduleSession()`. If an earlier date is entered, display inline error: *"Session date must be today or in the future."*
* **Revised Interaction Behavior:** Calendar picker disables previous dates; manual typing of past dates fails submission validation with explicit feedback.
* **Affected Screen:** Screen 10 (`#modal-session-scheduler`).
* **Related Requirements:** `FR-020`, `NFR-003`.
* **Expected Usability Improvement:** Guarantees chronological integrity across personal and circle study calendars.
* **Verification Scenario:** Attempt to enter yesterday's date, click Publish, verify error is displayed and session is not created.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-004: Dynamic Profile Completion Indicator
* **Original Problem:** Dashboard card statically showed "Profile Setup: 85% Complete" regardless of preferences configured on Screen 02.
* **Proposed Interface Correction:** Implement `calculateProfileCompleteness()` computing a dynamic percentage: Name (25%), Bio (25%), 2+ Topics (25%), Availability Grid (25%). Update Dashboard text dynamically.
* **Revised Interaction Behavior:** When user completes bio, topics, and availability, Dashboard displays: *"Profile Setup: 100% Complete — Preferences fully configured."*
* **Affected Screen:** Screen 01 (`#screen-dashboard`).
* **Related Requirements:** `FR-001`, `FR-022`, `NFR-001`.
* **Expected Usability Improvement:** Positive reinforcement for profile onboarding; clear visibility of matching readiness.
* **Verification Scenario:** Update profile, save, verify Dashboard progress text reflects 100%.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-005: Availability Matrix Cell Label Clarity
* **Original Problem:** Cell label `OPEN` was ambiguous, leading users to question if it meant personal availability or circle meeting time.
* **Proposed Interface Correction:** Change active cell label from `OPEN` to `FREE`, and add an explicit table legend beneath the grid: `■ FREE (Available for study)  □ — (Busy / Unavailable)`.
* **Revised Interaction Behavior:** Clicking a cell toggles between `FREE` (dark surface) and `—` (white surface).
* **Affected Screen:** Screen 02 (`#screen-profile`).
* **Related Requirements:** `FR-003`, `NFR-013`.
* **Expected Usability Improvement:** Eliminates semantic ambiguity regarding individual vs group availability.
* **Verification Scenario:** Click matrix cell, observe `FREE` label.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-006: Standardized CTA Button Copy
* **Original Problem:** Inconsistent button text ("Join Circle" vs "Join Study Circle"; "Request to Join" vs "Request to Join Circle").
* **Proposed Interface Correction:** Standardize all join triggers across Screen 03 (Explore) and Screen 04 (Details) to exact literals: `"Join Circle"` (Open policy) and `"Request to Join"` (Moderated policy).
* **Affected Screen:** Screen 03 and Screen 04.
* **Related Requirements:** `FR-013`, `FR-014`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-007: Context-Aware Scheduler Default
* **Original Problem:** Opening Session Scheduler modal from Screen 09 or Screen 04 defaulted to the first array circle rather than the active circle being inspected.
* **Proposed Interface Correction:** Update `openSchedulerModal()` to detect `appState.selectedCircleId` and pre-select it in `#sched-circle-select`.
* **Affected Screen:** Screen 10 (`#modal-session-scheduler`).
* **Related Requirements:** `FR-020`, `NFR-013`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-008: Additional Availability Grid Presets
* **Original Problem:** Users had to click up to 21 cells to clear the availability grid or configure daytime schedules.
* **Proposed Interface Correction:** Add "Clear All" and "All Weekdays" preset buttons in the availability card header alongside "Select Evenings".
* **Affected Screen:** Screen 02 (`#screen-profile`).
* **Related Requirements:** `FR-003`, `NFR-001`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-010: Form Validation `aria-describedby` Accessibility
* **Original Problem:** Visual error messages lacked programmatic linkage to inputs for screen readers.
* **Proposed Interface Correction:** Assign explicit IDs to all error divs (e.g. `id="prof-name-error"`) and dynamically set `input.setAttribute("aria-describedby", "prof-name-error")` upon validation failure.
* **Affected Screen:** Screens 02, 06, 08, 10.
* **Related Requirements:** `FR-001`, `FR-016`, `NFR-002`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-011: Contextual Explanations on Policy Badges
* **Original Problem:** Badges for `Open` and `Moderated` lacked micro-copy explaining the difference on directory cards.
* **Proposed Interface Correction:** Update badge presentation to `Open (Instant)` and `Moderated (Application)`.
* **Affected Screen:** Screen 03 (`#screen-explore`).
* **Related Requirements:** `FR-005`, `NFR-013`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-012: Bottom "Save Profile" Action Button
* **Original Problem:** Downward-scrolling users had to scroll back up to the top header to save profile changes.
* **Proposed Interface Correction:** Add a secondary "Save Profile & Preferences" primary button at the bottom of the right panel below the availability matrix.
* **Affected Screen:** Screen 02 (`#screen-profile`).
* **Related Requirements:** `FR-001`, `NFR-001`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

### Remediation for UX-013: Secondary Filter Reset at Bottom of Sidebar
* **Original Problem:** Scrolling down the filter sidebar pushed the single top "Reset" button out of view.
* **Proposed Interface Correction:** Add a secondary "Reset All Filters" button at the bottom of the filter card.
* **Affected Screen:** Screen 03 (`#screen-explore`).
* **Related Requirements:** `FR-008`, `NFR-001`.
* **Remediation Scope:** **Scope A (Implemented in `module05/index.html`)**.

---

## 3. Scope B: Deferred High-Fidelity Specifications (Module 07)

* **`UX-009` (Tablet Sidebar Stacking):** In Module 07, implement CSS Grid `minmax()` layout and collapsible accordion sections for secondary metadata cards (Logistics and Roster) to prevent excessive vertical scrolling on 768px–860px viewports.
