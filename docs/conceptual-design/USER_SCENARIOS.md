# User Scenarios & Operational Use Cases: CohortCircle

> **Governance Category:** Use Case Specifications & Exception Handling  
> **Status:** **FOUR DETAILED OPERATIONAL SCENARIOS SPECIFIED**  
> **Traceability Anchor:** Supports Benchmark Evaluation Tasks `T01` to `T05` and Functional Requirements `FR-001` to `FR-023`.

---

## Scenario 01: Discovering & Joining an Open Study Circle

* **Identifier:** `SCEN-01`
* **Primary User Role:** Learner / Student (`PROTO-LEARN-01`)
* **Core Goal:** Find and join a study circle focused on "Data Structures" with evening availability without lengthy approval delays.

### 1. Preconditions
* User has opened CohortCircle on an evergreen browser.
* User has completed their basic profile, indicating "Computer Science" as their focus topic and Thursday evening availability (`FR-001`, `FR-003`).
* At least one active circle covering Data Structures exists with open capacity.

### 2. Main Success Path
1. Learner navigates to **Explore Circles** (`FR-005`).
2. Enters "Data Structures" into the search bar (`FR-006`).
3. Clicks the "Thursday" day-filter pill and "In-Person" format pill (`FR-007`).
4. System immediately displays matching circle cards. Top card: *"Data Structures Sprint Circle — Thursdays 18:00 — 3/4 Members"*.
5. Learner clicks the card to inspect the detailed **Circle Profile** (`FR-012`).
6. Reviews syllabus topics, host bio, ground rules, and member list.
7. Observes that join policy is "Open". Clicks the primary **"Join Circle"** button (`FR-013`).
8. System adds learner to the circle roster, increments member count to 4/4, and displays a success notification.
9. System redirects learner to the circle view, unlocking access to upcoming session schedules.

### 3. Alternative Paths
* **Alt Path 1A (Direct Search without Profile):** Learner has not yet configured a study profile. The system permits full searching and browsing, but displays a non-intrusive banner: *"Configure your study preferences to see personalized compatibility scores."*
* **Alt Path 1B (Filter Reset):** Applied filters return zero results. Learner clicks **"Reset All Filters"** (`FR-008`); directory immediately restores full listing.

### 4. Failure & Recovery Conditions
* **Failure Condition (Concurrent Fill):** Between opening the circle card and clicking "Join", another student fills the last remaining seat, reaching the 4-member cap.
* **Recovery Mechanism:** System displays an accessible alert: *"This circle has just reached maximum capacity (4/4 members). You have not been charged a join slot."* The button state dynamically updates to a disabled **"Circle Full"** badge, and the system recommends two adjacent circles covering the same topic.

### 5. Postconditions
* Learner is recorded as an active member in browser local storage (`Membership` entity).
* Circle appears immediately on the learner's **Personal Study Dashboard** (`FR-022`).
* Circle status updates to "Full" for subsequent visitors.

---

## Scenario 02: Evaluating Explainable Compatibility & Submitting Moderated Request

* **Identifier:** `SCEN-02`
* **Primary User Role:** Learner / Student (`PROTO-LEARN-02`)
* **Core Goal:** Identify whether a moderated study circle shares their preference for discussion-based learning, inspect the match breakdown, and submit an introductory application.

### 1. Preconditions
* Learner has configured their study preferences with "Discussion-Based Learning" as primary style and "Social Sciences" as domain (`FR-002`).
* A moderated study circle titled "Ethics in AI Debate Circle" exists, requiring host approval (`joinPolicy = 'approval_required'`).

### 2. Main Success Path
1. Learner visits **Explore Circles** and sorts by "Compatibility" (`FR-011`).
2. Top result displays *"Ethics in AI Debate Circle"* with a high compatibility badge: **"94% Match"** (`FR-009`).
3. Learner clicks the compatibility badge.
4. System opens the **Explainable Compatibility Breakdown Modal** (`FR-010`), displaying individual criteria alignment:
   * *Subject Alignment (35% wt):* Exact match in Ethics/AI (100% score).
   * *Schedule Overlap (25% wt):* Wednesday 15:00 aligns with learner availability (100% score).
   * *Study Style Match (20% wt):* Both specify Discussion-Based Learning (100% score).
   * *Group Size & Modality (20% wt):* Online format matches; circle cap is 5 members (90% score).
5. Reassured by the exact match, learner clicks **"View Full Circle"** (`FR-012`).
6. Reads circle charter: *"Weekly Socratic discussion on assigned readings; active verbal debate required."*
7. Clicks **"Request to Join"**. A lightweight modal opens prompting for an introductory note (`FR-014`).
8. Types: *"Hi! I'm taking the Ethics seminar this term and love debating reading arguments out loud."*
9. Clicks **"Submit Application"**.
10. System persists the `JoinRequest` record with `status: 'pending'`, displays a confirmation toast, and updates the button to a disabled *"Request Pending Review"* state.

### 3. Alternative Paths
* **Alt Path 2A (Revising Intro Note):** Learner clicks "Cancel" in the modal; modal closes without persisting data; learner returns to circle view.
* **Alt Path 2B (Inspecting Low Compatibility):** Learner inspects a circle with a "48% Match". Breakdown clearly shows: *"Study Style Mismatch: Group prefers Silent Co-Study while you prefer Discussion."* Learner closes modal and avoids joining an incompatible group.

### 4. Failure & Recovery Conditions
* **Failure Condition (Blank Intro Note on Strict Circle):** Learner clicks submit without entering any text.
* **Recovery Mechanism:** Form field highlights with an accessible inline error message: *"Please provide a brief 1–2 sentence note explaining your learning goals so the host can evaluate fit."* Keyboard focus shifts automatically to the text area (`NFR-USE-03`).

### 5. Postconditions
* A `JoinRequest` entity is created linking learner ID and circle ID.
* The application appears under "Pending Requests" on the learner's dashboard (`FR-022`).
* The circle host receives an alert badge on their host dashboard.

---

## Scenario 03: Host Creates a Study Circle & Moderates Membership

* **Identifier:** `SCEN-03`
* **Primary User Role:** Circle Host / Facilitator (`PROTO-HOST-01`)
* **Core Goal:** Create a new structured study circle for "Linear Algebra Problem Solving", set a 5-member limit, and approve a qualified peer application.

### 1. Preconditions
* User is logged in as an active student and navigates to the **Host Operations** section.
* User has verified syllabus topics and chosen a recurring weekly study time.

### 2. Main Success Path
1. Host clicks **"Create Study Circle"** on the host dashboard (`FR-016`).
2. System presents the structured **Circle Creation Wizard**:
   * *Step 1: Basics:* Title ("Linear Algebra Problem Lab"), Subject ("Mathematics / Lin Alg"), Description.
   * *Step 2: Learning Charter:* Target Goals ("Master Chapter 3–6 proofs, weekly problem sets").
   * *Step 3: Study Format:* Primary Style ("Collaborative Problem-Solving"), Modality ("In-Person"), Location ("Library 2nd Floor").
   * *Step 4: Logistics & Capacity:* Meeting Day ("Tuesdays 16:00, 90 mins"), Capacity Cap ("5 members"), Policy ("Approval Required").
3. Host clicks **"Publish Study Circle"**.
4. System validates inputs, instantiates the `StudyCircle` entity with host assigned, establishes the host's `Membership` record with `role: 'host'`, and opens the new **Circle Host Management Console** (`FR-017`).
5. Two hours later, host receives an alert: *"1 New Join Request"*.
6. Host opens **Membership Requests Queue** (`FR-018`).
7. Inspects applicant card: applicant profile, study styles, and personal note.
8. Host clicks **"Approve Member"**.
9. System transitions `JoinRequest` status to `'approved'`, creates an active `Membership` record for the applicant, updates member count to 2/5, and notifies the applicant.

### 3. Alternative Paths
* **Alt Path 3A (Rejecting Incompatible Applicant):** Applicant's note states they want silent solo homework copying. Host clicks **"Decline Request"**. System prompts for optional polite feedback reason (e.g., *"Circle focus is active collaborative problem solving"*). Application status transitions to `'rejected'`. Capacity is preserved.
* **Alt Path 3B (Editing Circle Details Later):** Host changes the meeting time to 16:30. Host opens circle settings, edits time input, and saves (`FR-017`). All active members see the updated time on their dashboards.

### 4. Failure & Recovery Conditions
* **Failure Condition (Exceeding Maximum Cap):** Host accidentally enters a capacity cap of `25` members.
* **Recovery Mechanism:** System displays validation warning: *"CohortCircle limits study circles to a maximum of 8 members to maintain collaborative accountability. For larger cohorts, please create multiple micro-circles."* The field resets to the maximum permissible threshold (`8`).

### 5. Postconditions
* Circle is published to the public explore directory.
* Host is granted facilitator privileges for session creation and member moderation.

---

## Scenario 04: Host Schedules a Study Session & Members Manage RSVPs

* **Identifier:** `SCEN-04`
* **Primary User Roles:** Circle Host (`PROTO-HOST-01`) and Active Circle Member (`PROTO-LEARN-01`)
* **Core Goal:** Host schedules a concrete upcoming study session with an explicit agenda; members view the session on their dashboards and confirm attendance.

### 1. Preconditions
* Circle has been established with 3 active members.
* Host has secured a physical room booking or online meeting link for the upcoming week.

### 2. Main Success Path
1. Host opens the circle management view and clicks **"Schedule New Session"** (`FR-020`).
2. Fills session modal form:
   * *Title:* "Midterm 1 Review & Proof Exercises"
   * *Date & Time:* "Tuesday, Nov 17, 16:00"
   * *Duration:* "90 minutes"
   * *Venue / URL:* "Campus Central Library, Study Room 304"
   * *Structured Agenda:* "16:00-16:45: Eigenvalues problem set; 16:45-17:30: Matrix diagonalization review"
3. Host clicks **"Publish Session"**.
4. System validates date, instantiates `StudySession` entity, and sets host RSVP to `'attending'`.
5. Member opens their **Personal Study Dashboard** (`FR-022`).
6. Under *"Upcoming Study Sessions"*, the new session card is prominently displayed with countdown, agenda, and venue.
7. Member inspects agenda and clicks **"Attending"** button (`FR-021`).
8. System updates member's RSVP status to `'attending'` and increments the confirmed attendee counter to 2/3.
9. Host opens the session card and sees confirmed attendees list in real time.

### 3. Alternative Paths
* **Alt Path 4A (Changing RSVP to Declined):** Member realizes a work conflict arose. Opens session card, clicks **"Change RSVP &rarr; Can't Make It"**. System updates attendee count to 1/3 and allows member to leave a brief note: *"Sorry, stuck at work transit!"* Host sees the update immediately and does not wonder why the member is absent.
* **Alt Path 4B (Session Rescheduling by Host):** Library room 304 is closed. Host edits session venue to "Lounge Table 4" and updates notes. System updates session card with a "Venue Updated" indicator.

### 4. Failure & Recovery Conditions
* **Failure Condition (Scheduling in the Past):** Host accidentally enters yesterday's date.
* **Recovery Mechanism:** Form validation prevents submission and displays error: *"Session date and time must be set in the future."*

### 5. Postconditions
* Session is chronologically indexed on all member dashboards.
* Attendance accountability is established prior to physical arrival.
