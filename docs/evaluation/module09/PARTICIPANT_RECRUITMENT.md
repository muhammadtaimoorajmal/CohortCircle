# Participant Recruitment Screener & Informed Consent Protocol

> **Document Purpose:** Practical recruitment materials, participant screening questionnaire, and consent management procedures for the Module 09 summative evaluation.  
> **Governance:** [`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md), WCAG 2.2 AA, ISO 9241-11.  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Privacy Classification:** Public Instrument Template (Zero PII).

---

## 1. Recruitment Channels & Outreach Notice

Recruitment is conducted through open academic channels, student peer groups, and university campus message boards.

### Standard Recruitment Call Notice:
```text
[VOLUNTEER OPPORTUNITY — COHORTCIRCLE SOFTWARE EVALUATION]

Are you an active university student or independent learner?
Do you study alone or in study groups?

We are conducting a 40–50 minute user research study evaluating
CohortCircle, an open-source web application designed to help learners
discover compatible study circles and organize peer sessions.

• WHAT YOU WILL DO: Try out 5 realistic study scenarios on a laptop or mobile
  device and tell us what feels easy, confusing, or useful.
• PRIVACY: Completely voluntary, confidential, and de-identified. No personal
  academic records or course grades are collected.
• LOCATION: On campus (quiet library room or student commons) or remote via screen share.
• ELIGIBILITY: Any enrolled university student or adult independent learner.

Interested? Complete our brief 2-minute eligibility screener:
[Link to Screener Form / Research Contact]
```

---

## 2. Participant Eligibility Screener (5 Questions)

The following screener determines eligibility and assigns participants to an experience group (Group A, B, or C):

### Question 1 (Enrollment Status):
* *"Are you currently an enrolled university student (undergraduate or postgraduate) or an active independent learner pursuing structured academic or technical subjects?"*
  * [ ] Yes &rarr; *Eligible. Proceed to Q2.*
  * [ ] No &rarr; *Ineligible. Thank respondent and exit.*

### Question 2 (Weekly Collaborative Study Time):
* *"On average, how many hours per week do you spend studying collaboratively with peers or classmates (in-person or online)?"*
  * [ ] 4 or more hours per week &rarr; **Candidate for Group A (Frequent Users)**
  * [ ] 1 to 3 hours per week (or mainly during exams/projects) &rarr; **Candidate for Group B (Occasional Users)**
  * [ ] Less than 1 hour per week (or never) &rarr; **Candidate for Group C (Novice / Solo Users)**

### Question 3 (Device Access):
* *"Which devices do you regularly use for your academic coursework or personal study?" (Select all that apply)*
  * [ ] Laptop / Desktop computer (Windows, macOS, Linux)
  * [ ] Smartphone (iOS, Android)
  * [ ] Tablet only &rarr; *Route to Laptop or Mobile depending on secondary device.*

### Question 4 (Study Environment Habit):
* *"Where do you typically perform most of your digital studying?"*
  * [ ] Quiet environment (Private room, quiet library floor, silent study desk) &rarr; *Candidate for Quiet Condition*
  * [ ] Active / Public environment (Student lounge, cafeteria, coffee shop, noisy campus area) &rarr; *Candidate for Distracting Condition*

### Question 5 (Prior Participation):
* *"Did you participate in any earlier wireframe design evaluations for CohortCircle in Module 06?"*
  * [ ] Yes &rarr; *Exclude from Module 09 (to eliminate prior exposure bias).*
  * [ ] No &rarr; *Eligible. Proceed to scheduling.*

---

## 3. Screening Decision & Quota Assignment Logic

```
   [Respondent Screener]
             │
      Q1 == Yes AND Q5 == No?
       ├── No  ──> Thank & Exit (Ineligible)
       └── Yes ──> Evaluate Experience & Context
                    │
         ┌──────────┼──────────┐
         │          │          │
      Q2 >= 4h   1h-3h       < 1h
         │          │          │
      Group A    Group B    Group C
      Frequent   Occasional  Novice
      (Cap: 6)   (Cap: 6)   (Cap: 6)
         │          │          │
         └──────────┼──────────┘
                    │
       Assign Device (Laptop vs Mobile: 9 each)
       Assign Noise Environment (Quiet vs Distracting: 9 each)
       Assign ID: M09-P01 through M09-P18
```

---

## 4. Informed Consent Protocol & Participant Rights

Prior to starting any test session, the participant must review and sign the **CohortCircle Usability Research Informed Consent Form** ([`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md)).

### Key Informed Consent Principles (Mandatory Participant Acknowledgments):
1. **Voluntary Participation:** Participation is 100% voluntary. The participant can decline to answer any question, skip any task, or terminate the session at any moment without penalty.
2. **Interface Evaluation Only:** The software interface is being evaluated, never the participant’s cognitive or academic abilities.
3. **De-Identification & Privacy:** The participant’s legal name, email, phone number, and university ID are never linked to test data in public files. Data is stored solely under `M09-Pxx`.
4. **Recording Consent (Optional):** Audio or screen capture requires explicit separate opt-in consent. No facial recording or camera capture is permitted. Unrelated personal browser tabs or notifications must be closed.
5. **Demonstration Disclosure:** The application runs locally with synthetic demonstration data; actions do not affect real university records or external accounts.
6. **Data Storage Policy:** Raw consent forms and contact logs are stored strictly on the local researcher workstation in `private-research-data/module09/` (gitignored).

---

## 5. De-Identification & Safe Data Management

1. **Mapping Ledger:** A single private lookup file (`private-research-data/module09/participant_registry.private.csv`) maps real names to `M09-Pxx` codes. This file is strictly excluded from version control via `.gitignore`.
2. **Public Data Sanitization:** All task logs, observation records, SEQ scores, SUS questionnaires, and summary reports must exclusively use participant identifiers (`M09-P01` to `M09-P18`).
3. **Quotation Clearance:** Qualitative quotes may only be cited if the participant ticked the "Permission to quote anonymously" checkbox on their consent agreement. All quotes must be scrubbed of idiosyncratic course names, professor names, or location hints.
