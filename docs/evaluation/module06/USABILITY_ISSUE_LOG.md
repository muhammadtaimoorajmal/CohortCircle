# CohortCircle — Formative Usability Issue Log

* **Product:** CohortCircle  
* **Tagline:** Find your people. Learn together.  
* **Document Focus:** Authoritative severity-rated usability issue register compiled through expert heuristic evaluation and cognitive walkthroughs of the low-fidelity digital wireframe prototype ([`docs/prototypes/module05/index.html`](../prototypes/module05/index.html)).  
* **Severity Taxonomy:**
  * **CATASTROPHIC:** Workflow impossible to complete; data loss or privacy harm; unrecoverable failure.
  * **MAJOR:** Key task blocked or requires heavy workaround/assistance; significant user friction.
  * **MINOR:** Interaction possible but causes confusion, hesitation, or avoidable recoverable effort.
  * **COSMETIC:** Minor visual, typographic, or terminology inconsistency with negligible task impact.

---

## 1. Usability Issue Summary Table

| Issue ID | Short Title | Severity | Evidence Source | Affected Screen | Related FR/NFR | Status |
|---|---|---|---|---|---|---|
| **`UX-001`** | Wizard Draft Abandonment Without Confirmation | **MAJOR** | Observed in Prototype | Screen 08 (Wizard) | `FR-016`, `NFR-003` | Remediated in Prototype |
| **`UX-002`** | Unconfirmed Applicant Rejection in Console | **MAJOR** | Source-Code Verified | Screen 09 (Management) | `FR-018`, `NFR-003` | Remediated in Prototype |
| **`UX-003`** | Past Date Selection Permitted in Session Scheduler | **MAJOR** | Observed in Prototype | Screen 10 (Scheduler) | `FR-020`, `NFR-003` | Remediated in Prototype |
| **`UX-004`** | Hardcoded Profile Progress Percentage on Dashboard | **MINOR** | Source-Code Verified | Screen 01 (Dashboard) | `FR-001`, `FR-022` | Remediated in Prototype |
| **`UX-005`** | Ambiguous Cell Label "OPEN" in Availability Grid | **COSMETIC**| Analytical Prediction | Screen 02 (Profile) | `FR-003`, `NFR-013` | Remediated in Prototype |
| **`UX-006`** | Inconsistent CTA Button Copy Across Directory & Details | **COSMETIC**| Source-Code Verified | Screen 03 & Screen 04 | `FR-013`, `FR-014` | Remediated in Prototype |
| **`UX-007`** | Scheduler Modal Circle Default Lacks View Context | **MINOR** | Observed in Prototype | Screen 10 (Scheduler) | `FR-020`, `NFR-013` | Remediated in Prototype |
| **`UX-008`** | Lack of Availability Presets (Clear All / Weekdays) | **MINOR** | Analytical Prediction | Screen 02 (Profile) | `FR-003`, `NFR-001` | Remediated in Prototype |
| **`UX-009`** | Vertical Card Stacking on Tablet Width Viewports | **COSMETIC**| Observed in Prototype | Screen 04 (Details) | `FR-012`, `NFR-004` | Deferred to M07 (Hi-Fi) |
| **`UX-010`** | Inline Form Validation Errors Lack `aria-describedby` | **MINOR** | Source-Code Verified | Screens 02, 06, 08, 10 | `FR-001`, `NFR-002` | Remediated in Prototype |
| **`UX-011`** | Directory Policy Badges Lack Immediate Definitions | **MINOR** | Analytical Prediction | Screen 03 (Explore) | `FR-005`, `NFR-013` | Remediated in Prototype |
| **`UX-012`** | "Save Profile" Exclusively in Header Without Bottom CTA | **MINOR** | Analytical Prediction | Screen 02 (Profile) | `FR-001`, `NFR-001` | Remediated in Prototype |
| **`UX-013`** | Single Filter Reset Control Disconnected on Scroll | **COSMETIC**| Observed in Prototype | Screen 03 (Explore) | `FR-008`, `NFR-001` | Remediated in Prototype |

---

## 2. Detailed Severity-Rated Issue Records

---

### UX-001: Wizard Draft Abandonment Without Confirmation
* **Severity:** **`MAJOR`**
* **Evidence Classification:** `OBSERVED IN PROTOTYPE`
* **Affected Screen:** Screen 08 — Circle Creation Wizard (`#screen-circle-wizard`)
* **Exact DOM Element:** `#screen-circle-wizard .page-header button.btn-secondary`
* **Reproduction Steps:**
  1. Navigate to Host Workspace (`#screen-host`).
  2. Click "+ Create New Study Circle".
  3. Enter circle title, select subject, enter detailed description.
  4. Click "Next &rarr;" to Step 2 and type several learning objectives.
  5. Click the "Cancel" button in the page header.
* **Expected Behavior:** System prompts the user with a confirmation modal: *"You have unsaved changes in this circle draft. Are you sure you want to discard your progress?"*
* **Actual Behavior:** System immediately invokes `navigateTo('screen-host')`, discarding all entered text and form state without confirmation.
* **User Impact:** High frustration and data loss for prospective facilitators who accidentally click "Cancel" while formulating thoughtful charters.
* **Related Benchmark Task:** `UT-TASK-04` (Host Operations)
* **Related Requirements:** `FR-016`, `NFR-003`
* **Root Cause:** Cancel button lacked event interception and unsaved-state dirty checking.
* **Recommended Remediation:** Implement `confirmCancelWizard()` checking if title or description contain content; prompt with confirmation modal before exiting.
* **Verification Criteria:** Clicking Cancel with filled fields displays confirmation dialog; confirming discards cleanly; cancelling keeps draft intact.
* **Status:** **Remediated in Prototype**

---

### UX-002: Unconfirmed Applicant Rejection in Management Console
* **Severity:** **`MAJOR`**
* **Evidence Classification:** `SOURCE-CODE VERIFIED`
* **Affected Screen:** Screen 09 — Circle Management Console (`#screen-circle-management`)
* **Exact DOM Element:** `#mgmt-requests-container button.btn-secondary` (`declineJoinRequest()`)
* **Reproduction Steps:**
  1. Open Circle Management Console for a hosted circle with pending applicants (e.g. "Algorithms Problem Solvers").
  2. Locate applicant Jordan Brooks in the Review Queue.
  3. Click "Decline".
* **Expected Behavior:** Facilitator is presented with a confirmation prompt: *"Are you sure you want to decline this application? (Optional: send constructive feedback note)."*
* **Actual Behavior:** Function immediately splices the applicant from `c.requests` and displays a toast message. The application cannot be recovered.
* **User Impact:** Accidental clicks permanently reject genuine prospective learners with no recourse or explanation.
* **Related Benchmark Task:** `UT-TASK-04` (Host Operations)
* **Related Requirements:** `FR-018`, `NFR-003`
* **Root Cause:** Direct invocation of array mutation without intermediate confirmation modal or state staging.
* **Recommended Remediation:** Create `#modal-decline-confirm` dialog prompting facilitator before final deletion, with optional feedback textarea.
* **Verification Criteria:** Clicking Decline opens modal; confirming removes applicant and announces via toast; cancelling aborts removal.
* **Status:** **Remediated in Prototype**

---

### UX-003: Past Date Selection Permitted in Session Scheduler
* **Severity:** **`MAJOR`**
* **Evidence Classification:** `OBSERVED IN PROTOTYPE`
* **Affected Screen:** Screen 10 — Session Scheduler Modal (`#modal-session-scheduler`)
* **Exact DOM Element:** `#sched-date-input`
* **Reproduction Steps:**
  1. Open Session Scheduler dialog via "+ Schedule Session".
  2. In the Session Date field, select any date in the past (e.g., 2025-01-01).
  3. Enter title and agenda, then click "Publish Session".
* **Expected Behavior:** The date picker disallows past dates (`min="YYYY-MM-DD"`), or submission validation flags past dates with an inline error: *"Session date cannot be in the past."*
* **Actual Behavior:** The system accepts the past date and schedules the session, populating upcoming calendars with expired dates.
* **User Impact:** Calendar pollution and confusion for circle members who see past dates listed under "Upcoming Study Sessions".
* **Related Benchmark Task:** `UT-TASK-05` (Session Coordination)
* **Related Requirements:** `FR-020`, `NFR-003`
* **Root Cause:** Absence of HTML `min` attribute on input and missing temporal comparison in `submitScheduleSession()`.
* **Recommended Remediation:** Dynamically set `min` to current date string and validate `selectedDate >= todayDate` before submission.
* **Verification Criteria:** Past dates are unselectable or fail validation with explicit error message.
* **Status:** **Remediated in Prototype**

---

### UX-004: Hardcoded Profile Progress Percentage on Dashboard
* **Severity:** **`MINOR`**
* **Evidence Classification:** `SOURCE-CODE VERIFIED`
* **Affected Screen:** Screen 01 — Learner Dashboard (`#screen-dashboard`)
* **Exact DOM Element:** `#dash-regular-content .card-wireframe-dashed strong`
* **Reproduction Steps:**
  1. Note Dashboard card text: "Profile Setup: 85% Complete".
  2. Navigate to Screen 02 and fill out 100% of preferences (bio, multiple topics, styles, availability).
  3. Save profile and return to Dashboard.
* **Expected Behavior:** Profile setup progress increments to 100% (or changes to "Profile Configured").
* **Actual Behavior:** Percentage remains permanently hardcoded at "85% Complete".
* **User Impact:** Discourages learners who took the effort to complete their preferences and receive no visual reward or status update.
* **Related Benchmark Task:** `UT-TASK-01` (Learner Profile)
* **Related Requirements:** `FR-001`, `FR-022`, `NFR-001`
* **Root Cause:** Static markup in HTML rather than dynamic computation based on `appState.currentUser`.
* **Recommended Remediation:** Compute dynamic completeness percentage in `renderDashboard()` based on filled fields.
* **Verification Criteria:** Adding bio, topics, and availability updates the progress indicator to 100%.
* **Status:** **Remediated in Prototype**

---

### UX-005: Ambiguous Cell Label "OPEN" in Availability Grid
* **Severity:** **`COSMETIC`**
* **Evidence Classification:** `ANALYTICAL PREDICTION`
* **Affected Screen:** Screen 02 — Learner Profile (`#screen-profile`)
* **Exact DOM Element:** `#availability-grid-body .avail-cell`
* **Reproduction Steps:**
  1. Inspect the 7x3 availability matrix.
  2. Click a cell to toggle availability.
* **Expected Behavior:** Cell label clearly communicates personal availability (e.g., `FREE`, `AVAIL`, or checkmark).
* **Actual Behavior:** Active cell displays `OPEN`; inactive cell displays `—`.
* **User Impact:** Minor cognitive friction for users wondering whether "OPEN" refers to an open meeting or their own availability.
* **Related Benchmark Task:** `UT-TASK-01` (Learner Profile)
* **Related Requirements:** `FR-003`, `NFR-013`
* **Root Cause:** Ambiguous label choice during initial wireframe authoring.
* **Recommended Remediation:** Update active cell text to `AVAIL` and add an explicit table legend.
* **Verification Criteria:** Cell displays `AVAIL` when active.
* **Status:** **Remediated in Prototype**

---

### UX-006: Inconsistent CTA Button Copy Across Directory & Details
* **Severity:** **`COSMETIC`**
* **Evidence Classification:** `SOURCE-CODE VERIFIED`
* **Affected Screen:** Screen 03 (Explore) and Screen 04 (Details)
* **Exact DOM Element:** Button labels in card footer and detail header
* **Reproduction Steps:**
  1. Compare button text on directory card: "Join Circle" vs Screen 04: "Join Study Circle".
  2. Compare "Request to Join" vs "Request to Join Circle".
* **Expected Behavior:** Consistent button phrasing across both catalog and details views.
* **Actual Behavior:** Minor verbal variation creates subtle visual inconsistency.
* **User Impact:** Negligible task impediment; minor inconsistency under Heuristic H04.
* **Related Benchmark Task:** `UT-TASK-03`
* **Related Requirements:** `FR-013`, `FR-014`
* **Root Cause:** Divergent string literals in two render functions.
* **Recommended Remediation:** Standardize button copy to "Join Circle" and "Request to Join" across all views.
* **Verification Criteria:** Both views display identical button strings.
* **Status:** **Remediated in Prototype**

---

### UX-007: Scheduler Modal Circle Default Lacks View Context
* **Severity:** **`MINOR`**
* **Evidence Classification:** `OBSERVED IN PROTOTYPE`
* **Affected Screen:** Screen 10 — Session Scheduler Modal (`#modal-session-scheduler`)
* **Exact DOM Element:** `#sched-circle-select`
* **Reproduction Steps:**
  1. Navigate to Screen 04 (Circle Details) for "Silent Focus & Pomodoro Co-Working".
  2. Open the Session Scheduler.
* **Expected Behavior:** The scheduler circle dropdown defaults to the circle currently being viewed.
* **Actual Behavior:** Dropdown defaulted to the first eligible circle in array order unless explicitly opened via a specialized helper.
* **User Impact:** Facilitators risk scheduling a session under the wrong cohort if they overlook the dropdown.
* **Related Benchmark Task:** `UT-TASK-05`
* **Related Requirements:** `FR-020`, `NFR-013`
* **Root Cause:** `openSchedulerModal()` did not default to `appState.selectedCircleId`.
* **Recommended Remediation:** Pre-select `appState.selectedCircleId` in `openSchedulerModal()` if the current user is an enrolled member.
* **Verification Criteria:** Dropdown automatically matches the active circle context.
* **Status:** **Remediated in Prototype**

---

### UX-008: Lack of Availability Presets (Clear All / Weekdays)
* **Severity:** **`MINOR`**
* **Evidence Classification:** `ANALYTICAL PREDICTION`
* **Affected Screen:** Screen 02 — Learner Profile (`#screen-profile`)
* **Exact DOM Element:** `#screen-profile .availability-table` header toolbar
* **Reproduction Steps:**
  1. Navigate to 7x3 availability matrix with multiple active cells.
  2. Attempt to clear all cells or set weekday mornings.
* **Expected Behavior:** Quick action buttons allow clearing the grid or applying common student schedules.
* **Actual Behavior:** Only "Select Evenings" preset was available; clearing required up to 21 individual clicks.
* **User Impact:** Unnecessary repetitive clicking for learners reconfiguring availability.
* **Related Benchmark Task:** `UT-TASK-01`
* **Related Requirements:** `FR-003`, `NFR-001`
* **Root Cause:** Only a single preset shortcut was authored in the initial prototype pass.
* **Recommended Remediation:** Add "Clear All" and "All Weekdays" preset buttons alongside "Select Evenings".
* **Verification Criteria:** Clicking "Clear All" clears all 21 cells in 1 click; "All Weekdays" selects Monday–Friday slots.
* **Status:** **Remediated in Prototype**

---

### UX-009: Vertical Card Stacking on Tablet Width Viewports
* **Severity:** **`COSMETIC`**
* **Evidence Classification:** `OBSERVED IN PROTOTYPE`
* **Affected Screen:** Screen 04 — Circle Details (`#screen-circle-details`)
* **Exact DOM Element:** `.grid-sidebar` right column
* **Reproduction Steps:**
  1. Resize browser viewport to 800px width.
  2. Inspect Screen 04 layout.
* **Expected Behavior:** Secondary sidebar elements compress or utilize multi-column layout on medium viewports.
* **Actual Behavior:** Sidebar drops below main content, creating a long vertical scroll to view the member roster.
* **User Impact:** Minor scrolling inconvenience on tablet screens; all functionality remains accessible.
* **Related Benchmark Task:** `UT-TASK-03`
* **Related Requirements:** `FR-012`, `NFR-004`
* **Root Cause:** Standard CSS grid breakpoint (`@media (max-width: 860px)`) forces single-column layout.
* **Recommended Remediation:** Defer to Module 07 high-fidelity CSS Grid/Flexbox responsive token refactoring.
* **Verification Criteria:** Validated responsive behavior in Module 07.
* **Status:** **Deferred to Module 07 (Hi-Fi)**

---

### UX-010: Inline Form Validation Errors Lack `aria-describedby`
* **Severity:** **`MINOR`**
* **Evidence Classification:** `SOURCE-CODE VERIFIED`
* **Affected Screen:** Screens 02, 06, 08, 10
* **Exact DOM Element:** `.form-error` divs adjacent to form inputs
* **Reproduction Steps:**
  1. Trigger a validation error on Screen 02 (empty name) or Screen 08 (short title).
  2. Inspect DOM accessibility tree.
* **Expected Behavior:** Input element has attribute `aria-describedby="[error-id]"` allowing screen readers to announce the error upon focus.
* **Actual Behavior:** Error is displayed visually via `display: block`, but lacks programmatic ARIA description linkage.
* **User Impact:** Screen reader users may not be informed why form submission failed without manually navigating the virtual cursor.
* **Related Benchmark Task:** All tasks with forms
* **Related Requirements:** `FR-001`, `FR-016`, `NFR-002`
* **Root Cause:** Omission of dynamic `aria-describedby` assignment in validation failure scripts.
* **Recommended Remediation:** Assign explicit IDs to `.form-error` containers and bind `aria-describedby` dynamically upon error trigger.
* **Verification Criteria:** Accessibility tree confirms `aria-describedby` linkage on invalid fields.
* **Status:** **Remediated in Prototype**

---

### UX-011: Directory Policy Badges Lack Immediate Definitions
* **Severity:** **`MINOR`**
* **Evidence Classification:** `ANALYTICAL PREDICTION`
* **Affected Screen:** Screen 03 — Explore Circles Directory (`#screen-explore`)
* **Exact DOM Element:** `#explore-cards-container .badge`
* **Reproduction Steps:**
  1. Browse circle cards on Screen 03.
  2. Observe badges for `Open` and `Moderated`.
* **Expected Behavior:** Badges include contextual micro-copy clarifying what the policy requires before clicking.
* **Actual Behavior:** Standalone badge text `Open` or `Moderated` offers no immediate explanation of the requirement.
* **User Impact:** Prospective applicants may hesitate to click "Request to Join" without knowing what application entails.
* **Related Benchmark Task:** `UT-TASK-02`, `UT-TASK-03`
* **Related Requirements:** `FR-005`, `FR-013`, `FR-014`, `NFR-013`
* **Root Cause:** Minimalist badge labels without contextual sub-labels.
* **Recommended Remediation:** Update badge text or titles to `Policy: Open (Instant Join)` and `Policy: Moderated (Note Required)`.
* **Verification Criteria:** Badges display explanatory text or descriptive title attributes.
* **Status:** **Remediated in Prototype**

---

### UX-012: "Save Profile" Exclusively in Header Without Bottom CTA
* **Severity:** **`MINOR`**
* **Evidence Classification:** `ANALYTICAL PREDICTION`
* **Affected Screen:** Screen 02 — Learner Profile (`#screen-profile`)
* **Exact DOM Element:** `#screen-profile .page-header`
* **Reproduction Steps:**
  1. Open Screen 02 on a mobile or laptop screen.
  2. Scroll down through bio, topics, styles, and availability grid to the bottom of the page.
* **Expected Behavior:** A "Save Profile" button is visible at the bottom of the form where natural downward completion ends.
* **Actual Behavior:** The only "Save Profile" button is located at the top-right in the page header, requiring users to scroll back to the top.
* **User Impact:** Minor scrolling friction and brief hesitation after completing the 7x3 availability matrix at the bottom of the page.
* **Related Benchmark Task:** `UT-TASK-01`
* **Related Requirements:** `FR-001`, `NFR-001`
* **Root Cause:** Form action buttons placed exclusively in the page header bar.
* **Recommended Remediation:** Add duplicate primary "Save Profile" button at the bottom of the right panel below the availability matrix.
* **Verification Criteria:** Both top header and bottom panel contain functional "Save Profile" action buttons.
* **Status:** **Remediated in Prototype**

---

### UX-013: Single Filter Reset Control Disconnected on Scroll
* **Severity:** **`COSMETIC`**
* **Evidence Classification:** `OBSERVED IN PROTOTYPE`
* **Affected Screen:** Screen 03 — Explore Circles Directory (`#screen-explore`)
* **Exact DOM Element:** Sidebar filter card header
* **Reproduction Steps:**
  1. Open Screen 03 and scroll down the filter options (Subject, Style, Modality, Policy, Seats).
  2. Attempt to reset filters.
* **Expected Behavior:** Reset action is easily reachable from the bottom of the filter controls as well as the top.
* **Actual Behavior:** "Reset" button was located only in the card header at the top of the sidebar.
* **User Impact:** Minor inconvenience on smaller screens where scrolling down hides the top card header.
* **Related Benchmark Task:** `UT-TASK-02`
* **Related Requirements:** `FR-008`, `NFR-001`
* **Root Cause:** Single placement of reset trigger in card header.
* **Recommended Remediation:** Add a secondary "Reset All Filters" button at the bottom of the filter card.
* **Verification Criteria:** Both top header and bottom of filter panel contain active reset triggers.
* **Status:** **Remediated in Prototype**
