# Summative Usability Tasks & Measurable Success Criteria

> **Document Purpose:** Detailed specification of the 5 core feature evaluation tasks, participant scenario scripts, and rigorous measurable success criteria for Module 09.  
> **Requirements Coverage:** All 23 Functional Requirements (`FR-001` through `FR-023`).  
> **Standard:** ISO 9241-11 Usability Ergonomics (Effectiveness, Efficiency, Satisfaction).  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`

---

## 1. Feature Selection & Requirements Mapping Overview

Five core functional clusters represent the primary learner and host user journeys in CohortCircle:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   FEATURE AREA & TASK MAPPING                          │
├───────┬──────────────────────────────────────────┬─────────────────────┤
│ Task  │ Feature Domain                           │ Requirements Traced │
├───────┼──────────────────────────────────────────┼─────────────────────┤
│ T01   │ Learner Profile & Study Preferences      │ FR-001 to FR-004    │
│ T02   │ Curated Discovery & Compatibility Engine │ FR-005 to FR-011    │
│ T03   │ Circle Details & Membership Workflows    │ FR-012 to FR-015    │
│ T04   │ Host Circle Creation & Facilitation      │ FR-016 to FR-019    │
│ T05   │ Session Scheduling, RSVP & Dashboard     │ FR-020 to FR-023    │
└───────┴──────────────────────────────────────────┴─────────────────────┘
```

---

## 2. Task T01: Learner Profile & Study Preferences

* **Requirements Covered:** `FR-001`, `FR-002`, `FR-003`, `FR-004`.
* **Feature Focus:** Profile editing, academic topics, weekly availability grid with bulk presets, study style selection, modality preferences, and browser local persistence.

### Scenario Brief (Read to Participant):
> *"Imagine you are an undergraduate student named Jordan preparing for upcoming courses. You want CohortCircle to understand your study preferences so it can recommend compatible peers.*  
>  
> *Please update your profile with the following fictional details:*  
> *• Add the study topic: 'Algorithms'*  
> *• Select your preferred study styles: 'Collaborative Problem-Solving' and 'Exam Preparation'*  
> *• Set your weekly availability to weekday evenings (Monday through Friday, 6–10 PM)*  
> *• Set your meeting format preference to 'Flexible / Hybrid'*  
> *• Save your changes and confirm that your preferences remain intact even if the page is reloaded.*  
>  
> *Please think out loud as you work. Tell me when you feel the task is complete."*

### Starting State:
* Initial application baseline state (`http://localhost:5173/app/dashboard`). Default demo learner profile loaded.

### Expected Successful End State:
* Profile page (`/app/profile`) reflects added topic `Algorithms`, selected styles `Collaborative Problem-Solving` & `Exam Preparation`, availability matrix slots filled for Mon–Fri evenings, format set to `Flexible`, saved successfully, and persistent upon browser refresh (`F5`).

### Measurable Success Criteria:
* **Unassisted Success ($S_U$):** Participant navigates to `/app/profile`, updates the fields, saves without errors, verifies persistence, and declares completion without hints.
* **Assisted Completion ($S_A$):** Participant requires 1–2 standardized facilitator prompts (e.g., pointing out the "Weekday Evenings" preset button or the bottom "Save Changes" action).
* **Failure Condition ($F$):** Participant abandons task, fails to save changes, or exceeds maximum time (300s).
* **Time-on-Task Measurement:** Timer starts upon acknowledging the scenario; stops when participant confirms saved profile state.
* **Observable Error Categories:**
  * `ERR-NAV`: Navigating to Settings instead of Profile to configure study preferences.
  * `ERR-CLICK`: Attempting to type directly into tag pills without pressing Enter/Add.
  * `ERR-MODEL`: Expecting auto-save without clicking "Save Preferences".

---

## 3. Task T02: Discovery & Explainable Compatibility

* **Requirements Covered:** `FR-005`, `FR-006`, `FR-007`, `FR-008`, `FR-009`, `FR-010`, `FR-011`.
* **Feature Focus:** Directory browse, real-time search, multi-criteria filtering (6 dimensions), sorting, compatibility indicator, and explainable breakdown modal.

### Scenario Brief (Read to Participant):
> *"You are looking for a study group to join for the semester. You want a circle that meets online, focuses on Computer Science, and aligns with your study habits.*  
>  
> *Please perform the following actions:*  
> *• Navigate to the Explore circles catalog.*  
> *• Find circles related to 'Algorithms' or filter by the 'Computer Science' category.*  
> *• Filter the directory to display only 'Online' circles that have open spots available.*  
> *• Find the circle with the highest compatibility score, open its compatibility breakdown, and explain in your own words why it is a strong match for your profile.*  
> *• Finally, reset the filters back to the full directory view.*  
>  
> *Let me know when you have reviewed the match breakdown and reset the catalog."*

### Starting State:
* Profile configured with standard demo topics and preferences; user at `/app/dashboard`.

### Expected Successful End State:
* Active directory at `/app/explore` filtered by category/search and modality; compatibility modal opened and inspected; participant explains factor contributions; filters successfully cleared with "Reset All Filters" control.

### Measurable Success Criteria:
* **Unassisted Success ($S_U$):** Participant applies filters, inspects highest match modal, articulates at least 2 contributing match factors (e.g., shared topics, schedule match), and resets filters independently.
* **Assisted Completion ($S_A$):** Participant requires a prompt to click the compatibility badge or locate the reset button.
* **Failure Condition ($F$):** Unable to filter, misinterprets the percentage as a random score, cannot explain match factors, or exceeds 300s.
* **Time-on-Task Measurement:** Timer starts upon prompt; stops upon clicking filter reset.
* **Observable Error Categories:**
  * `ERR-CLICK`: Clicking circle title expecting compatibility modal rather than the compatibility badge.
  * `ERR-MODEL`: Assuming compatibility is computed by an opaque AI chatbot rather than deterministic factor weights.
  * `ERR-NON`: Applying conflicting filters yielding 0 results without noticing the active filter pills.

---

## 4. Task T03: Circle Details & Membership Workflows

* **Requirements Covered:** `FR-012`, `FR-013`, `FR-014`, `FR-015`.
* **Feature Focus:** Circle overview, charter & norms, host card, direct 1-click join, moderated request-to-join with introductory message, and member departure modal.

### Scenario Brief (Read to Participant):
> *"You want to inspect two different study circles before committing.*  
>  
> *• First, locate an 'Open Circle' with vacancy (such as 'Distributed Systems & Cloud Architecture') and join it directly.*  
> *• Next, find a 'Moderated Circle' (such as 'Advanced Algorithms & Problem Solving') that requires approval. Submit a join request including a brief introductory note explaining why you want to join.*  
> *• Verify that your request is recorded as 'Pending'.*  
> *• Finally, navigate to 'My Circles', open the circle you directly joined, and leave the circle to free up your spot.*  
>  
> *Tell me when you have submitted the request and left the first circle."*

### Starting State:
* Standard baseline state with demo circles available.

### Expected Successful End State:
* Direct join successfully executed for circle with vacancy; moderated join request submitted with valid note (&ge; 15 chars); pending badge visible on circle; circle left gracefully via confirmation modal.

### Measurable Success Criteria:
* **Unassisted Success ($S_U$):** Participant completes direct join, submits moderated request with note, checks pending state, and completes leave flow unassisted.
* **Assisted Completion ($S_A$):** Participant requires assistance navigating between Explore and My Circles or understanding the note length requirement.
* **Failure Condition ($F$):** Submits empty note, fails to confirm leave modal, or exceeds 300s.
* **Time-on-Task Measurement:** Timer starts upon prompt; stops when leave modal confirmation completes.
* **Observable Error Categories:**
  * `ERR-NON`: Entering an introductory note shorter than 15 characters and seeing validation error.
  * `ERR-MODEL`: Confusing direct join (immediate membership) with moderated request (pending host review).
  * `ERR-CRIT`: Accidentally attempting to leave a circle where the user is the host.

---

## 5. Task T04: Host Circle Creation & Facilitation Console

* **Requirements Covered:** `FR-016`, `FR-017`, `FR-018`, `FR-019`.
* **Feature Focus:** 4-step circle creation wizard, schedule configuration, circle settings modification, admission queue moderation, and member roster management.

### Scenario Brief (Read to Participant):
> *"Imagine you want to start a new peer study group and lead it as the facilitator.*  
>  
> *• Switch to the Host workspace and start creating a new study circle.*  
> *• Complete the 4-step wizard with the following details:*  
>   *- Title: 'Discrete Mathematics Study Cohort'*  
>   *- Category: 'Computer Science'*  
>   *- Description: 'Weekly problem sets and proof discussions for Discrete Math.'*  
>   *- Meeting Day & Time: Thursday evening*  
>   *- Capacity: 6 members*  
>   *- Policy: Open join*  
> *• After creating the circle, inspect your Host Management console.*  
> *• Open an existing circle with pending applicants, review an applicant's note, and accept them into the circle.*  
> *• Inspect the member roster and verify that the accepted applicant appears as an active member.*  
>  
> *Let me know when the circle is created and the applicant is accepted."*

### Starting State:
* User in authenticated application shell; pre-loaded demo host data available.

### Expected Successful End State:
* New circle created and visible in Host Dashboard; applicant queue reviewed; applicant accepted; roster count incremented by 1.

### Measurable Success Criteria:
* **Unassisted Success ($S_U$):** Completes all 4 wizard steps, creates circle, navigates to manage circle, and accepts applicant without facilitator intervention.
* **Assisted Completion ($S_A$):** Requires help locating the Host switch toggle or understanding wizard stepper navigation.
* **Failure Condition ($F$):** Abandons wizard, fails form validation on required fields, or exceeds 300s.
* **Time-on-Task Measurement:** Timer starts upon prompt; stops when applicant acceptance is confirmed.
* **Observable Error Categories:**
  * `ERR-NAV`: Missing the sidebar role toggle between Learner and Host.
  * `ERR-NON`: Skipping required meeting day or description fields in the wizard.
  * `ERR-CLICK`: Attempting to accept an applicant from the public Explore page instead of the Host Management console.

---

## 6. Task T05: Session Scheduling, RSVP Tracking & Dashboard

* **Requirements Covered:** `FR-020`, `FR-021`, `FR-022`, `FR-023`.
* **Feature Focus:** Session scheduling modal with past-date prevention, agenda breakdown, 3-state RSVP syncing without double-counting, learner dashboard overview, and demo reset controls.

### Scenario Brief (Read to Participant):
> *"You need to schedule an upcoming study session for your study circle and coordinate attendance.*  
>  
> *• In the Sessions area, schedule a new session for next week with the title 'Exam Drill & Proof Review' and a brief 2-point agenda.*  
> *• Open the scheduled session details, update your RSVP response to 'Attending', and verify that the attendee count updates correctly.*  
> *• Navigate to the Learner Dashboard and check if the upcoming session and your active circles are clearly shown.*  
> *• Finally, navigate to Settings, locate the demonstration controls, and observe the option to reset demo data.*  
>  
> *Tell me when you have reviewed your dashboard and located the demo controls."*

### Starting State:
* Baseline state with joined circles; user at `/app/dashboard`.

### Expected Successful End State:
* Future session created; RSVP recorded as 'Attending' without count drift; session visible on dashboard; Settings demo reset control identified.

### Measurable Success Criteria:
* **Unassisted Success ($S_U$):** Schedules session with future date, updates RSVP, verifies dashboard reflects session, and navigates to Settings unassisted.
* **Assisted Completion ($S_A$):** Requires prompt on past-date validation or locating the session creation button.
* **Failure Condition ($F$):** Attempts to schedule past date and gets blocked without understanding why, or exceeds 300s.
* **Time-on-Task Measurement:** Timer starts upon prompt; stops upon locating Settings reset control.
* **Observable Error Categories:**
  * `ERR-NON`: Selecting today or a past date and receiving validation error.
  * `ERR-MODEL`: Expecting RSVP changes to immediately alter other members' synthetic statuses.
  * `ERR-NAV`: Looking for session creation under Profile instead of Sessions.

---

## 7. Standardized Post-Task Single Ease Question (SEQ)

Immediately after each task (T01 through T05), the facilitator presents the Single Ease Question:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      SINGLE EASE QUESTION (SEQ)                        │
├────────────────────────────────────────────────────────────────────────┤
│ "Overall, how easy or difficult was this task to complete?"            │
│                                                                        │
│ [ 1 ]  Very Difficult                                                  │
│ [ 2 ]  Difficult                                                       │
│ [ 3 ]  Somewhat Difficult                                              │
│ [ 4 ]  Neutral                                                         │
│ [ 5 ]  Somewhat Easy                                                   │
│ [ 6 ]  Easy                                                            │
│ [ 7 ]  Very Easy                                                       │
└────────────────────────────────────────────────────────────────────────┘
```
