# CohortCircle — Persona-Grounded Analytical Cognitive Walkthroughs

* **Product:** CohortCircle  
* **Tagline:** Find your people. Learn together.  
* **Methodology:** Cognitive Walkthrough (Wharton et al., 1994) applied to the low-fidelity digital wireframe prototype ([`docs/prototypes/module05/index.html`](../prototypes/module05/index.html)).  
* **Analytical Lens:** Evaluated through the behavioral archetypes of our three unvalidated proto-personas ([`docs/synthesis/PERSONA_CATALOG.md`](../../synthesis/PERSONA_CATALOG.md)):
  * `PROTO-LEARN-01`: Independent Focused Problem-Solver
  * `PROTO-LEARN-02`: Conceptual Discussion Seeker
  * `PROTO-HOST-01`: Collaborative Cohort Facilitator
* **Governance Status:** **PERSONA-BASED ANALYTICAL WALKTHROUGH ONLY.** This analysis represents structured expert reasoning, not observed empirical testing with real human subjects.

---

## 1. Walkthrough Framework & Four Core Inquiries

At each discrete user action in the five benchmark workflows, the evaluation assesses four foundational cognitive criteria:
* **Q1 (Goal Formulation):** Will the user form the correct intention to achieve this step?
* **Q2 (Action Discoverability):** Will the user notice that the correct action/control is available?
* **Q3 (Semantic Affordance):** Will the user associate the visible action with their intended outcome?
* **Q4 (Progress Feedback):** If the correct action is performed, will the user see that progress has been made toward their goal?

---

## 2. Detailed Cognitive Walkthroughs across Tasks 01–05

---

### TASK 01: Configure Learner Study Profile & Availability Grid
* **Task ID:** `CW-TASK-01`
* **Target Flow:** `FLOW-01`
* **Analytical Persona:** `PROTO-LEARN-01` (Independent Focused Problem-Solver)
* **Preconditions:** User is on the Learner Dashboard (`#screen-dashboard`). Default mock user "Alex Rivera" is loaded.
* **Intended Goal:** Update technical study topics, select problem-solving habits, configure Tuesday/Thursday evening availability slots on the 7x3 matrix, and save preferences.

| Step # | Action Description | Q1: Try effect? | Q2: Notice action? | Q3: Associate action? | Q4: Understand progress? | Analytical Assessment & Potential Barriers |
|---|---|---|---|---|---|---|
| **1.1** | Click "Edit Profile & Preferences" on Dashboard card. | **Yes** — Seeking to update match criteria. | **Yes** — Prominently placed on setup card. | **Yes** — Direct label text. | **Yes** — Screen transitions to `#screen-profile` with breadcrumb. | *Clean transition. High affordance.* |
| **1.2** | Select "Algorithms & DS" and "Discrete Math" checkboxes. | **Yes** — Specific STEM courses. | **Yes** — Checkbox list in center panel. | **Yes** — Standard checkbox interaction. | **Yes** — Checkbox toggles checked state visually. | *No barrier observed.* |
| **1.3** | Select "Problem-Solving" habit checkbox. | **Yes** — Matches hands-on study preference. | **Yes** — Located immediately below topics. | **Yes** — Familiar form pattern. | **Yes** — Checkmark visible. | *No barrier observed.* |
| **1.4** | Configure 7x3 Availability Matrix (click Tue & Thu evening cells). | **Yes** — Wants to specify free study evenings. | **Marginal** — User may look for calendar time slots rather than a 7x3 grid. | **Yes** — Table headers indicate days and daily periods. | **Yes** — Cell background turns dark charcoal with label `OPEN`. | *Barrier:* Persona `PROTO-LEARN-01` may initially find clicking individual cells slightly tedious if entering complex schedules, though "Select Evenings" preset mitigates this. Label `OPEN` is slightly ambiguous (addressed in `UX-005`). |
| **1.5** | Adjust Group Size slider to 6. | **Yes** — Prefers small focused cohorts. | **Yes** — Range slider in sidebar. | **Yes** — Numerical badge updates in real time. | **Yes** — Badge reflects "6". | *High affordance.* |
| **1.6** | Click "Save Profile" button. | **Yes** — Must commit changes. | **Marginal** — Button is located at the top-right of page header rather than at bottom of form. | **Yes** — Primary dark button with label "Save Profile". | **Yes** — Toast notification announces save; view navigates to Explore directory. | *Barrier:* Users accustomed to bottom-anchored submit buttons may scroll down first before noticing the top header button (logged as `UX-012`). |

* **Recovery Options:** "Discard" button in header safely restores previous values.
* **Related Requirements:** `FR-001`, `FR-002`, `FR-003`, `FR-004`, `NFR-001`
* **Remediation Recommendation:** Add duplicate "Save Profile" action button at the bottom of the profile form to support downward-scrolling form completion.

---

### TASK 02: Discover Study Circles with Search & Multi-Filters
* **Task ID:** `CW-TASK-02`
* **Target Flow:** `FLOW-02`
* **Analytical Persona:** `PROTO-LEARN-01` & `PROTO-LEARN-02`
* **Preconditions:** User is on Explore Circles Directory (`#screen-explore`). 5 pre-seeded circles displayed.
* **Intended Goal:** Find an online Computer Science circle focused on problem solving with open seats, and subsequently reset filters.

| Step # | Action Description | Q1: Try effect? | Q2: Notice action? | Q3: Associate action? | Q4: Understand progress? | Analytical Assessment & Potential Barriers |
|---|---|---|---|---|---|---|
| **2.1** | Locate search & filter sidebar. | **Yes** — Seeking to narrow list. | **Yes** — Prominent left sidebar panel. | **Yes** — Heading "Search & Filters". | **Yes** — Visual presence confirmed. | *No barrier.* |
| **2.2** | Select "Computer Science" in Subject Domain dropdown. | **Yes** — Filter by topic. | **Yes** — First dropdown in panel. | **Yes** — Standard select element. | **Yes** — Results update instantly; counter reflects matching count. | *Fast client-side response (< 20ms).* |
| **2.3** | Select "Problem-Solving" in Study Style dropdown. | **Yes** — Wants hands-on practice. | **Yes** — Second dropdown. | **Yes** — Clear label. | **Yes** — Non-matching circles disappear. | *No barrier.* |
| **2.4** | Select "Online" in Modality dropdown. | **Yes** — Remote study goal. | **Yes** — Third dropdown. | **Yes** — Standard select. | **Yes** — Directory filters immediately. | *No barrier.* |
| **2.5** | Check "Has Open Seats Only". | **Yes** — Avoid full cohorts. | **Yes** — Checkbox at bottom of filter card. | **Yes** — Plain-language label. | **Yes** — Card count updates. | *No barrier.* |
| **2.6** | Click "Reset" button in filter header. | **Yes** — Return to default catalog. | **Marginal** — "Reset" button is small and located in the card header. | **Yes** — Standard reset label. | **Yes** — All 5 circles reappear; dropdowns reset to "All". | *Barrier:* If users scroll down the filter list, the "Reset" button at the top header may drift out of focus (logged as `UX-013`). |

* **Recovery Options:** Zero-results state includes a prominent "Clear All Filters" button if filters over-constrain the catalog.
* **Related Requirements:** `FR-005`, `FR-006`, `FR-007`, `FR-008`, `FR-011`, `NFR-001`
* **Remediation Recommendation:** Ensure "Reset Filters" action is accessible both at the top of the sidebar and as a sticky control or bottom button.

---

### TASK 03: Compatibility Inspection & Join/Request Membership
* **Task ID:** `CW-TASK-03`
* **Target Flow:** `FLOW-03`
* **Analytical Persona:** `PROTO-LEARN-02` (Conceptual Discussion Seeker)
* **Preconditions:** User has identified "Algorithms Problem Solvers" in the Explore Directory.
* **Intended Goal:** Inspect the compatibility breakdown, review the charter and ground rules, and submit a join request with an introductory note.

| Step # | Action Description | Q1: Try effect? | Q2: Notice action? | Q3: Associate action? | Q4: Understand progress? | Analytical Assessment & Potential Barriers |
|---|---|---|---|---|---|---|
| **3.1** | Click "Inspect Details" on circle card. | **Yes** — Learn more about group. | **Yes** — Secondary button on card. | **Yes** — Clear button text. | **Yes** — Navigates to Screen 04 (`#screen-circle-details`). | *Smooth transition.* |
| **3.2** | Inspect Compatibility Card & click "Inspect Factor Breakdown &rarr;". | **Yes** — Wants to know *why* score is 94%. | **Yes** — Dashed card in sidebar with badge. | **Yes** — Button explicitly says "Inspect Factor Breakdown". | **Yes** — Modal `#modal-compat-breakdown` opens smoothly. | *Strong mental model alignment with explainable matching.* |
| **3.3** | Review 5 weighted factors and close modal. | **Yes** — Understand weights. | **Yes** — Prominent "Close Breakdown" button. | **Yes** — Standard modal dismissal. | **Yes** — Modal closes; focus returns to details view. | *High transparency.* |
| **3.4** | Click "Request to Join Circle". | **Yes** — Wants to apply. | **Yes** — Primary dark button in header action area. | **Yes** — Indicates moderated policy. | **Yes** — Modal `#modal-join-request` opens. | *Clear distinction from instant join.* |
| **3.5** | Type introductory note (&ge; 15 chars). | **Yes** — Introduce self. | **Yes** — Textarea with placeholder prompt. | **Yes** — Character counter shows live progress (`x / 500`). | **Yes** — Character counter increments. | *Barrier:* If participant enters < 15 chars, error triggers upon submit. Inline hint mentions minimum, but counter could turn bold/green once threshold is met. |
| **3.6** | Click "Submit Join Request". | **Yes** — Send application. | **Yes** — Primary button in modal footer. | **Yes** — Direct label. | **Yes** — Modal closes; toast confirms submission; button updates to "Request Pending Review". | *Strong feedback cycle.* |

* **Recovery Options:** Learner can withdraw request at any time from Dashboard or Circle Details.
* **Related Requirements:** `FR-009`, `FR-010`, `FR-012`, `FR-013`, `FR-014`, `NFR-007`
* **Remediation Recommendation:** Provide dynamic visual indicator in character counter (e.g., "18 / 500 characters (Minimum reached)") to proactively prevent submission rejection.

---

### TASK 04: Host Operations & Circle Creation Wizard
* **Task ID:** `CW-TASK-04`
* **Target Flow:** `FLOW-04`
* **Analytical Persona:** `PROTO-HOST-01` (Collaborative Cohort Facilitator)
* **Preconditions:** User is logged in and switches to Host Workspace (`#screen-host`).
* **Intended Goal:** Create a new study circle via the 4-step wizard, set capacity to 5, and approve an applicant in the management console.

| Step # | Action Description | Q1: Try effect? | Q2: Notice action? | Q3: Associate action? | Q4: Understand progress? | Analytical Assessment & Potential Barriers |
|---|---|---|---|---|---|---|
| **4.1** | Click "Switch to Host View" in top banner. | **Yes** — Needs host tools. | **Yes** — Prominently placed in prototype banner. | **Yes** — Context badge updates to "HOST / FACILITATOR". | **Yes** — Navigates to `#screen-host`. | *Role switcher operates cleanly in prototype mode.* |
| **4.2** | Click "+ Create New Study Circle". | **Yes** — Initiate group. | **Yes** — Primary button in page header. | **Yes** — Standard creation pattern. | **Yes** — Opens Step 1 of `#screen-circle-wizard`. | *Clean entry.* |
| **4.3** | Complete Step 1 (Title, Subject, Desc) & click "Next &rarr;". | **Yes** — Enter basics. | **Yes** — Standard form fields. | **Yes** — "Next &rarr;" button at bottom. | **Yes** — Step 1 tab marks "done", Step 2 activates. | *Validation catches short titles (< 5 chars).* |
| **4.4** | Complete Step 2 (Objectives, Style, Rules) & click "Next &rarr;". | **Yes** — Set charter. | **Yes** — Textareas with clear prompts. | **Yes** — "Next &rarr;" button. | **Yes** — Step 2 tab marks "done", Step 3 activates. | *No barrier.* |
| **4.5** | Complete Step 3 (Modality, Schedule, Location) & click "Next &rarr;". | **Yes** — Logistics. | **Yes** — Form inputs. | **Yes** — "Next &rarr;" button. | **Yes** — Step 3 tab marks "done", Step 4 activates. | *No barrier.* |
| **4.6** | Complete Step 4 (Capacity slider to 5, Moderated policy). | **Yes** — Restrict size. | **Yes** — Slider with large numeric readout ("5"). | **Yes** — Radio buttons for policy. | **Yes** — Review summary dynamically reflects all choices. | *High confidence review state.* |
| **4.7** | Click "Create Study Circle". | **Yes** — Finalize creation. | **Yes** — Next button label changed to "Create Study Circle". | **Yes** — Direct call to action. | **Yes** — Redirects to Screen 09 (`#screen-circle-management`) with toast. | *Immediate transition to management console.* |
| **4.8** | In Management Console, click "Approve" on pending applicant. | **Yes** — Accept member. | **Yes** — Dark button in applicant queue card. | **Yes** — Clear "Approve" label. | **Yes** — Applicant moved to roster, pending queue decrements, open seats update. | *High satisfaction; complete loop.* |

* **Potential Barrier Discovered:** Clicking the top "Cancel" button during steps 2 or 3 discards all entered data without confirmation (`UX-001`).
* **Related Requirements:** `FR-016`, `FR-017`, `FR-018`, `FR-019`, `NFR-003`
* **Remediation Recommendation:** Add modal confirmation prompt when canceling wizard if draft content exists.

---

### TASK 05: Session Scheduling & RSVP Coordination
* **Task ID:** `CW-TASK-05`
* **Target Flow:** `FLOW-05`
* **Analytical Persona:** `PROTO-HOST-01` & `PROTO-LEARN-01`
* **Preconditions:** Host is on Circle Management console or Learner Dashboard.
* **Intended Goal:** Schedule an upcoming study session with a structured agenda, review session details, and toggle RSVP status.

| Step # | Action Description | Q1: Try effect? | Q2: Notice action? | Q3: Associate action? | Q4: Understand progress? | Analytical Assessment & Potential Barriers |
|---|---|---|---|---|---|---|
| **5.1** | Click "+ Schedule Session". | **Yes** — Propose session. | **Yes** — Header button on host console. | **Yes** — Direct label. | **Yes** — Modal `#modal-session-scheduler` opens. | *Clear trigger.* |
| **5.2** | Verify circle, enter topic, select date and time. | **Yes** — Provide logistics. | **Yes** — Inputs in modal dialog. | **Yes** — Standard date/time pickers. | **Yes** — Values visible in inputs. | *Barrier:* Date picker allowed past dates (`UX-003`). |
| **5.3** | Review structured timed agenda template. | **Yes** — Set expectations. | **Yes** — Textarea with pre-filled 4-step agenda template. | **Yes** — High scaffolding for facilitators. | **Yes** — Textarea editable. | *Strong peer learning reinforcement.* |
| **5.4** | Click "Publish Session". | **Yes** — Commit session. | **Yes** — Primary button in modal footer. | **Yes** — Direct label. | **Yes** — Modal closes, toast confirms, redirects to Screen 11 (`#screen-session-details`). | *High feedback.* |
| **5.5** | On Session Details screen, click "Attending" on RSVP control. | **Yes** — Confirm personal attendance. | **Yes** — Prominent segmented control in right sidebar. | **Yes** — Three choices: Attending, Tentative, Decline. | **Yes** — Button receives dark active styling; current status text updates; attendee roster list updates immediately. | *High responsiveness.* |
| **5.6** | Return to Dashboard via "&larr; Back to Dashboard". | **Yes** — Return to overview. | **Yes** — Header secondary button. | **Yes** — Standard return pattern. | **Yes** — Navigates to Dashboard; new session appears in "Upcoming Study Sessions" list. | *Closed feedback loop.* |

* **Related Requirements:** `FR-020`, `FR-021`, `FR-022`, `NFR-004`
* **Remediation Recommendation:** Enforce `min` date constraint on scheduler input to disallow dates prior to current day (`UX-003`).

---

## 3. Walkthrough Synthesis & General Friction Patterns

Across the five walkthroughs, the prototype demonstrated strong navigational coherence and feedback visibility. The main friction points centered on:
1. **Accidental Cancellation Vulnerability:** Lack of uncommitted draft confirmation in the creation wizard (`UX-001`).
2. **Missing Input Bounds:** Allowing past dates in the session scheduler (`UX-003`).
3. **Button Placement Consistency:** Placing the primary "Save Profile" action exclusively in the top header rather than mirroring it at the bottom of the form (`UX-012`).
