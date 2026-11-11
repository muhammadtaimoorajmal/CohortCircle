# Detailed User Task Flows: CohortCircle

> **Governance Category:** Interaction Logic & Task Sequencing  
> **Status:** **FIVE COMPREHENSIVE TASK FLOWS SPECIFIED**  
> **Traceability Anchor:** Covers all 23 Functional Requirements (`FR-001`–`FR-023`) with exhaustive error handling and state recovery.

---

## Task Flow 01: Configure Learner Study Profile & Preferences

* **Scope & Requirements:** `FR-001`, `FR-002`, `FR-003`, `FR-004`
* **Primary Persona:** `PROTO-LEARN-01`, `PROTO-LEARN-02`

### 1. Flow Specifications
* **Entry Point:** Avatar menu in top navigation &rarr; Click **"My Study Profile & Preferences"** (or welcome banner on first visit).
* **Preconditions:** User has opened CohortCircle; local profile state initialized.
* **Success Path Steps:**
  1. *Step 1 (Basic Bio):* Learner inspects profile form. Enters Display Name, Bio, and preferred working language (`FR-001`).
  2. *Step 2 (Topics of Focus):* Enters primary course subjects (e.g., "Algorithms", "Linear Algebra") as tag pills (`FR-001`).
  3. *Step 3 (Study Styles):* Selects 1 to 2 preferred study methods from checkboxes: *Silent Co-Study*, *Collaborative Problem-Solving*, *Discussion-Based Learning*, *Peer Teaching*, *Exam Prep* (`FR-002`).
  4. *Step 4 (Availability Grid):* Toggles 7 &times; 3 weekly availability grid (Monday–Sunday &times; Morning, Afternoon, Evening) to indicate free study blocks (`FR-003`).
  5. *Step 5 (Modality & Cap):* Selects meeting modality preference (*Online*, *In-Person*, *Flexible*) and preferred group size limit (2–8) (`FR-004`).
  6. *Step 6 (Save):* Clicks **"Save Profile Preferences"**.
* **System Response:** System validates input data, persists profile to browser local storage via `storageAdapter`, displays a success toast notification ("Preferences saved successfully"), and redirects user to Explore Directory with active compatibility badges.
* **Decisions & Branches:**
  * *Decision:* Does learner want to update existing preferences? If yes, form loads previously saved values into form controls.
* **Alternate Paths:**
  * *Alt Path 1A:* Learner clicks "Cancel / Discard Changes". System checks if form is dirty; if dirty, presents modal: *"Discard unsaved profile changes?"* Upon confirmation, reverts changes.
* **Error States & Recovery Paths:**
  * *Error State:* User submits form with an empty Display Name or zero selected study topics.
  * *Recovery Path:* Inline validation alerts appear below the corresponding fields: *"Please provide a display name"* and *"Please add at least one subject topic"*. Keyboard focus shifts automatically to the first invalid field. Form is not submitted.
* **Successful Completion:** Learner profile is persisted and fully registered in local state; compatibility engine unlocks personalized scoring.

---

## Task Flow 02: Discover, Search & Multi-Filter Study Circles

* **Scope & Requirements:** `FR-005`, `FR-006`, `FR-007`, `FR-008`
* **Primary Persona:** `PROTO-LEARN-01`, `PROTO-LEARN-02`

### 1. Flow Specifications
* **Entry Point:** Top navigation bar &rarr; Click **"Explore Circles"** (`/explore`).
* **Preconditions:** Active study circles exist in local storage catalog.
* **Success Path Steps:**
  1. *Step 1 (Directory Rendering):* Learner arrives on directory view. System renders all active circles in responsive card grid displaying title, subject, format badge, schedule, member count, and compatibility score (`FR-005`).
  2. *Step 2 (Text Search):* Learner types query (e.g., "Discrete Math") into the search input. System filters cards in real-time (&le; 100ms) by matching title, subject, and description keywords (`FR-006`).
  3. *Step 3 (Filter Application):* Learner applies filter pills: clicks "Tuesday" (Day), "Collaborative Problem-Solving" (Style), and "Open" (Capacity Status) (`FR-007`).
  4. *Step 4 (Filtered Results):* System dynamically applies logical `AND` across active filters. Results counter updates: *"Showing 3 of 14 Circles"*.
  5. *Step 5 (Selection):* Learner clicks preferred circle card to inspect details.
* **Decisions & Branches:**
  * *Decision:* Does learner want to clear filters? Learner clicks **"Reset Filters"** (`FR-008`). System immediately clears all active filter pills and search inputs, restoring full directory view.
* **Alternate Paths:**
  * *Alt Path 2A (Sorting Toggle):* Learner toggles sort dropdown between "Compatibility (High &rarr; Low)", "Soonest Meeting", and "Newly Added" (`FR-011`).
* **Error States & Recovery Paths:**
  * *Error State (Zero Results):* Applied filter combinations yield 0 matching circles.
  * *Recovery Path:* System displays an accessible empty state container: *"No circles match your current filter combination."* Includes a prominent **"Reset All Filters"** action button and suggestions to widen subject categories.
* **Successful Completion:** Learner navigates from a wide catalog to an exact targeted circle card meeting their specific criteria.

---

## Task Flow 03: Evaluate Explainable Compatibility & Join / Request Circle

* **Scope & Requirements:** `FR-009`, `FR-010`, `FR-012`, `FR-013`, `FR-014`, `FR-015`
* **Primary Persona:** `PROTO-LEARN-01`, `PROTO-LEARN-02`

### 1. Flow Specifications
* **Entry Point:** Explore directory &rarr; Click circle card OR click compatibility badge on card.
* **Preconditions:** Circle exists; learner is viewing circle detail view (`/circle/:id`).
* **Success Path Steps:**
  1. *Step 1 (Inspect Compatibility):* Learner clicks compatibility badge (`FR-009`). System opens **Explainable Compatibility Breakdown Modal** (`FR-010`) showing weighted criteria breakdown (Topic 35%, Schedule 25%, Style 20%, Format 12%, Size 8%) and human-readable explanation sentence.
  2. *Step 2 (Review Charter):* Learner closes modal and reads full circle profile: syllabus targets, meeting day/time, location, host bio, and active members (`FR-012`).
  3. *Step 3 (Join Policy Branch):*
     * *Branch A (Open Circle):* Circle join policy is `open`. Primary button reads **"Join Circle"**. Learner clicks button. System validates capacity, creates `Membership` record (`FR-013`), updates member count, displays success banner, and unlocks member session list.
     * *Branch B (Moderated Circle):* Circle join policy is `approval_required`. Primary button reads **"Request to Join"**. Learner clicks button. Modal opens prompting for an introductory note (`FR-014`). Learner enters brief note and clicks **"Submit Application"**. System creates `JoinRequest` record with `status: 'pending'`, updates button to disabled *"Request Pending"*, and logs request to personal dashboard.
* **Decisions & Branches:**
  * *Decision (Leaving Circle):* Active member decides to leave circle (`FR-015`). Clicks "Leave Circle". System opens confirmation dialog: *"Are you sure you want to leave this circle? Your seat will be opened to other learners."* Upon confirmation, removes membership record, decrements member count, and returns user to dashboard.
* **Alternate Paths:**
  * *Alt Path 3A (Circle Already Full):* Circle capacity is reached (e.g., 4/4). Primary button renders as disabled **"Circle Full"**. Join actions are blocked; learner is presented with a "Browse Similar Circles" link.
* **Error States & Recovery Paths:**
  * *Error State (Duplicate Join Request):* Learner attempts to submit multiple join requests to the same circle.
  * *Recovery Path:* System detects existing `JoinRequest` record; prevents duplicate submission; displays status badge: *"You have an active request pending review for this circle."*
* **Successful Completion:** Learner is either immediately enrolled in an open circle or has an active, traceable join application in the host's review queue.

---

## Task Flow 04: Host Circle Creation & Member Moderation

* **Scope & Requirements:** `FR-016`, `FR-017`, `FR-018`, `FR-019`
* **Primary Persona:** `PROTO-HOST-01`

### 1. Flow Specifications
* **Entry Point:** Top navigation &rarr; Click **"Host Hub"** &rarr; Click **"Create Study Circle"** (`FR-016`).
* **Preconditions:** User is logged in as an active student account.
* **Success Path Steps:**
  1. *Step 1 (Creation Wizard):* Host progresses through the 4-step wizard:
     * *Step 1 (Identity):* Title, Subject domain, Description.
     * *Step 2 (Charter):* Syllabus learning goals, pacing expectations.
     * *Step 3 (Style & Modality):* Primary study style, meeting format, physical room / meeting URL.
     * *Step 4 (Logistics):* Recurring day/time, member capacity cap (2–8), join policy (`open` vs. `approval_required`).
  2. *Step 2 (Publish):* Host clicks **"Create & Publish Circle"**. System validates form, instantiates `StudyCircle` and host `Membership`, and opens **Circle Host Console** (`FR-017`).
  3. *Step 3 (Moderate Requests):* Host receives application alert. Opens **Membership Requests Queue** (`FR-018`).
  4. *Step 4 (Review Application):* Host reads applicant profile, study styles, and introductory note.
  5. *Step 5 (Decision):* Host clicks **"Approve"** (or **"Decline"**). System updates `JoinRequest` state, creates member record if approved, updates capacity count, and closes review card.
* **Decisions & Branches:**
  * *Decision (Editing Circle Settings):* Host opens settings tab to update meeting room or syllabus description (`FR-017`). Edits fields and saves; changes reflect immediately on public circle view.
  * *Decision (Member Removal):* Host removes an inactive or disruptive member (`FR-019`). Clicks "Remove Member" on roster; confirms dialog; member is removed, and capacity is restored.
* **Alternate Paths:**
  * *Alt Path 4A (Reject with Reason):* Host clicks "Decline" and provides an optional polite note: *"Our group has already completed Chapters 1–3"*.
* **Error States & Recovery Paths:**
  * *Error State (Invalid Wizard Input):* Host leaves title empty or sets capacity cap to `0` or `20`.
  * *Recovery Path:* Form validation blocks progression; highlights step indicator; displays inline message: *"Circle capacity must be between 2 and 8 members."* Focus moves to invalid input.
* **Successful Completion:** Study circle is published, actively managed, and populated with approved members.

---

## Task Flow 05: Session Scheduling, RSVP Tracking & Dashboard Operations

* **Scope & Requirements:** `FR-020`, `FR-021`, `FR-022`, `FR-023`
* **Primary Persona:** `PROTO-HOST-01` (Host) and `PROTO-LEARN-01` (Member)

### 1. Flow Specifications
* **Entry Point:** Circle management console &rarr; Click **"Schedule Session"** (`FR-020`) OR Top navigation &rarr; Click **"My Dashboard"** (`FR-022`).
* **Preconditions:** Active study circle exists with at least host and member enrolled.
* **Success Path Steps:**
  1. *Step 1 (Schedule Session):* Host opens session modal. Enters Title, Date, Start Time, Duration (e.g., 90m), Venue/URL, and structured Agenda items (`FR-020`). Clicks **"Publish Session"**.
  2. *Step 2 (System Notification):* System instantiates `StudySession` record, sets host RSVP to `'attending'`, and indexes session under circle and member dashboards.
  3. *Step 3 (Member Dashboard View):* Member navigates to **Personal Study Dashboard** (`FR-022`). Inspects *"Upcoming Study Sessions"* card showing meeting date countdown, location, and full agenda.
  4. *Step 4 (RSVP Confirmation):* Member clicks **"Attending"** button (`FR-021`). System updates attendee list; counter increments in real-time.
  5. *Step 5 (Host Monitor):* Host opens session view and verifies confirmed attendee roster.
* **Decisions & Branches:**
  * *Decision (RSVP Adjustment):* Member needs to change RSVP. Clicks "Change RSVP &rarr; Declined". Attendee counter updates immediately; host dashboard reflects change.
  * *Decision (Local Data Reset / Seeding):* Evaluator or user navigates to Settings &rarr; Data Utility (`FR-023`). Clicks **"Load Sample Dataset"** to populate pre-seeded test circles, or **"Reset to Clean Slate"** to clear storage. System prompts for confirmation before resetting state.
* **Alternate Paths:**
  * *Alt Path 5A (Empty Dashboard State):* A new user visits dashboard with no circles joined. System renders an encouraging empty state: *"You haven't joined any study circles yet"* with a prominent **"Explore Circles"** call-to-action button.
* **Error States & Recovery Paths:**
  * *Error State (Past Date Scheduling):* Host selects a date in the past.
  * *Recovery Path:* Inline validation error displays: *"Session date must be scheduled in the future."* Submission is prevented until a valid future date is picked.
* **Successful Completion:** Study session is scheduled, confirmed with attendee RSVPs, and seamlessly visible on all personal dashboards.
