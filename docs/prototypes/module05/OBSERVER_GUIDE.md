# CohortCircle — Formative Usability Evaluation Observer Guide

* **Product:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Document Focus:** Operational protocol and observation recording instrument for test facilitators and observers during Module 06 formative usability testing.
* **Evaluation Target:** Low-Fidelity Interactive Wireframe Prototype ([`docs/prototypes/module05/index.html`](index.html)).
* **Governance Status:** **OBSERVER INSTRUMENT PREPARATION ONLY.** No participant identities, simulated test logs, or fabricated observations are included.

---

## 1. Ethical Governance & Participant Consent

In compliance with the project's established research ethics charter ([`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md)), all evaluators and session observers must adhere to strict data protection standards:

### 1.1 Anonymized Participant Coding
* No participant names, university emails, student identification numbers, or biometric data may be logged.
* All test participants must be assigned de-identified sequential alphanumeric codes:
  * `P-01`, `P-02`, `P-03`, `P-04`, `P-05`, `P-06`, `P-07`

### 1.2 Consent & Voluntary Participation Check
Prior to launching [`docs/prototypes/module05/index.html`](index.html), the facilitator must confirm:
1. Written or verbal informed consent for task recording and usability observation has been obtained.
2. Participant understands they may pause, take breaks, or withdraw from the session at any moment without penalty.
3. Participant confirms understanding that the software interface is being evaluated, not their personal intellect or computer proficiency.

---

## 2. Think-Aloud Protocol & Neutral Facilitator Conduct

The evaluation employs the Concurrent Think-Aloud (CTA) protocol (Ericsson & Simon, 1993). Participants verbalize their thoughts, expectations, doubts, and rationales continuously while interacting with the interface.

### 2.1 Golden Rules for Neutral Facilitation
* **DO NOT Lead or Instruct:** Never tell the participant where to click, what an icon means, or how a workflow operates. If a participant asks *"Should I click this button?"*, respond neutrally with:
  > *"What would you expect to happen if you clicked that?"*
* **Prompting Without Bias:** When a participant falls silent for more than 5–8 seconds, prompt gently with neutral nudges:
  > *"What are you thinking right now?"*
  > *"What are you looking for on this screen?"*
  > *"What caught your attention just now?"*
* **Acknowledge Without Validating:** When participants express frustration or praise, respond with neutral acknowledgment:
  > *"I see."* / *"Thank you for sharing that."* / *"Understood."*
  Avoid evaluative statements like *"Good job!"*, *"That's right"*, or *"That was tricky"*.
* **Intervention Threshold (Task Abandonment):** If a participant spends > 3 minutes experiencing extreme frustration, running in circles, or explicitly declares they are stuck and cannot proceed:
  1. Mark the task outcome as **Assisted** or **Unsuccessful (Fail)**.
  2. Provide the minimum necessary navigational cue to return them to a neutral state.
  3. Transition smoothly to the next benchmark task.

---

## 3. Usability Error & Friction Taxonomy

Observers must record behavioral friction points using the standardized taxonomy below:

| Friction Category | Code | Operational Definition | Observable Indicator |
|---|---|---|---|
| **Critical Usability Error** | `ERR-CRIT` | An action or dead-end that completely halts task progression, requires external intervention, or results in an erroneous final state. | Submitting invalid data that cannot be recovered; abandoning a task workflow entirely. |
| **Non-Critical Error** | `ERR-NON` | An error or incorrect interaction that the participant recovers from independently without facilitator assistance. | Triggering form validation (e.g. short note) and correcting it; clicking wrong tab and returning. |
| **Misclick / Dead Click** | `ERR-CLICK` | Clicking a non-interactive element expecting an action, or clicking an inactive region. | Clicking static table headers expecting sorting; clicking disabled buttons repeatedly. |
| **Navigation Disorientation**| `ERR-NAV` | Expressed or observed confusion regarding current location within the application hierarchy. | Looking for Dashboard when stuck in Wizard; confusion regarding Learner vs Host workspace. |
| **Mental Model Mismatch** | `ERR-MODEL`| Expressed surprise when an interaction does not behave according to the participant's prior expectations. | Expecting instant enrollment in a moderated circle; expecting circle meeting to automatically launch a video call. |

---

## 4. Observation Data Logging Protocol

Observers utilize the structured matrix below for each participant session during Module 06:

### Observer Log Template:
```
================================================================================
COHORTCIRCLE FORMATIVE USABILITY OBSERVATION LOG
Participant Code: [ P-xx ]
Date & Time:      [ YYYY-MM-DD HH:MM ]
Facilitator:      [ Muhammad Taimoor Ajmal ]
Observer:         [ Observer Name ]
Prototype Build:  docs/prototypes/module05/index.html (Commit: [SHA])
================================================================================

TASK 01: Configure Learner Study Profile (FLOW-01)
--------------------------------------------------------------------------------
- Start Time:                  [ 00:00 ]
- End Time:                    [ 00:00 ]
- Duration (Time on Task):     [ xx seconds ]
- Completion Status:           [ ] Success (Unassisted)  [ ] Assisted  [ ] Fail
- Errors Observed:             [ ] ERR-CRIT  [ ] ERR-NON  [ ] ERR-CLICK  [ ] ERR-NAV
- Specific Friction Notes:     [ Note specific inputs or matrix cells clicked ]
- Think-Aloud Quotes:          [ "Direct participant quotation" ]
- Single Ease Question (1-7):  [ Score / 7 ]

TASK 02: Discover Study Circle with Multi-Filters (FLOW-02)
--------------------------------------------------------------------------------
- Duration (Time on Task):     [ xx seconds ]
- Completion Status:           [ ] Success  [ ] Assisted  [ ] Fail
- Filter Adjustments:          [ Number of filter changes before target found ]
- Reset Discovered:            [ ] Yes, immediate  [ ] Yes, delayed  [ ] Not found
- Specific Friction Notes:     [ ... ]
- Single Ease Question (1-7):  [ Score / 7 ]

TASK 03: Compatibility Inspection & Join Request (FLOW-03)
--------------------------------------------------------------------------------
- Duration (Time on Task):     [ xx seconds ]
- Completion Status:           [ ] Success  [ ] Assisted  [ ] Fail
- Factor Breakdown Inspected:  [ ] Yes  [ ] No  [ ] Confused with Join CTA
- Intro Note Length / Errors:  [ Valid on first attempt / Triggered 15-char error ]
- Specific Friction Notes:     [ ... ]
- Single Ease Question (1-7):  [ Score / 7 ]

TASK 04: Host Circle Creation & Moderation (FLOW-04)
--------------------------------------------------------------------------------
- Duration (Time on Task):     [ xx seconds ]
- Completion Status:           [ ] Success  [ ] Assisted  [ ] Fail
- Wizard Friction Step:        [ ] Step 1  [ ] Step 2  [ ] Step 3  [ ] Step 4  [ ] None
- Roster Action Executed:      [ ] Approved applicant  [ ] Declined applicant
- Specific Friction Notes:     [ ... ]
- Single Ease Question (1-7):  [ Score / 7 ]

TASK 05: Session Scheduling & RSVP Coordination (FLOW-05)
--------------------------------------------------------------------------------
- Duration (Time on Task):     [ xx seconds ]
- Completion Status:           [ ] Success  [ ] Assisted  [ ] Fail
- RSVP Toggled:                [ ] Attending  [ ] Tentative  [ ] Declined
- Dashboard Return Verified:   [ ] Yes  [ ] No
- Specific Friction Notes:     [ ... ]
- Single Ease Question (1-7):  [ Score / 7 ]

POST-TEST SYSTEM USABILITY SCALE (SUS) RESPONSES
--------------------------------------------------------------------------------
Q01: I think that I would like to use this system frequently.          [ 1 - 5 ]
Q02: I found the system unnecessarily complex.                        [ 1 - 5 ]
Q03: I thought the system was easy to use.                             [ 1 - 5 ]
Q04: I think that I would need the support of a technical person...   [ 1 - 5 ]
Q05: I found the various functions in this system were well integrated.[ 1 - 5 ]
Q06: I thought there was too much inconsistency in this system.       [ 1 - 5 ]
Q07: I would imagine that most people would learn to use this quickly. [ 1 - 5 ]
Q08: I found the system very cumbersome to use.                       [ 1 - 5 ]
Q09: I felt very confident using the system.                           [ 1 - 5 ]
Q10: I needed to learn a lot of things before I could get going...    [ 1 - 5 ]
--------------------------------------------------------------------------------
Raw Calculated SUS Score:      [ Pending Module 06 Evaluation ]
================================================================================
```

---

## 5. Instrument Validation & Readiness Checklist

Prior to conducting fieldwork in Module 06, the facilitator must verify:
* [x] Protocol adheres to concurrent think-aloud best practices.
* [x] Usability error taxonomy defines observable behavioral indicators.
* [x] Neutral facilitation rules prevent leading questions or confirmation bias.
* [x] Data collection sheet adheres to participant de-identification standards (`P-01` to `P-07`).
* [x] No fabricated empirical results are entered; logging template is completely blank and ready for deployment.
