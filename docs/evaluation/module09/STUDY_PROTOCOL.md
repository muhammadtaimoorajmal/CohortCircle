# Summative Usability Evaluation Study Protocol

> **Document Purpose:** Authoritative study protocol governing the Module 09 summative user evaluation of the CohortCircle web application.  
> **Standard Governance:** ISO 9241-11 (Guidance on Usability), ISO/IEC 25010 (Software Quality), WCAG 2.2 AA.  
> **Research Ethics Reference:** [`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md)  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Author & Lead:** Muhammad Taimoor Ajmal

---

## 1. Study Overview & Evaluation Objectives

### 1.1 Objective
The primary objective of Module 09 is to conduct a **rigorous summative usability evaluation** of the CohortCircle application with authentic human participants. The study assesses whether university students and independent learners can effectively, efficiently, and satisfactorily discover compatible study circles, interpret transparent compatibility scores, manage group memberships, facilitate circles, and coordinate structured study sessions.

### 1.2 System Under Evaluation
* **Product:** CohortCircle ("Find your people. Learn together.")
* **Technology Baseline:** React 19, Vite 6, React Router 7, CSS Modules, and versioned `localStorage` persistence adapter (`cohortcircle_state_v1`).
* **Deployment Target:** Local production-grade client application executing at `http://localhost:5173`.
* **Demonstration Boundary:** Standalone single-user local-first demonstration. Synthetic peer profiles and circle rosters represent illustrative data; no cloud database, remote server, or live peer messaging is deployed.

---

## 2. Participant Eligibility & Target Population

### 2.1 Target Population
The target population consists of active university students (undergraduate or postgraduate) and independent adult learners who engage in academic coursework, exam preparation, or peer collaborative learning.

### 2.2 Inclusion Criteria
1. Must be 18 years of age or older. (Participants under 18 cannot be recruited without formal institutional ethics approval and minor assent / parental consent; minor recruitment remains suspended pending institutional confirmation).
2. Currently enrolled university student or active independent learner.
3. Must study course material or domain subjects requiring at least 1 hour of study per week.
4. Capable of operating a web browser on desktop/laptop and/or mobile devices.
5. Fluent in written English (the primary interface language of the application).
6. Willing to provide informed consent for an in-person or remote moderated usability evaluation.

### 2.3 Exclusion Criteria
1. Individuals under 18 years of age (pending institutional ethics review approval).
2. Members of the direct CohortCircle core development team.
3. Individuals who participated in the Module 06 formative wireframe evaluation (to eliminate familiarity bias).
4. Individuals unwilling to think aloud or share feedback.

---

## 3. Sampling Allocation & Experimental Design

### 3.1 Sample Size
The planned summative cohort consists of **18 unique participants** (`M09-P01` through `M09-P18`). This provides robust coverage across diverse learner segments, device configurations, and noise environments.

### 3.2 Stratification Dimensions
1. **Experience Criteria (3 groups &times; 6 participants = 18):**
   * *Group A (Frequent Group-Study Users):* Regularly study with peers &ge; 4 hours per week.
   * *Group B (Occasional Group-Study Users):* Study with peers 1–3 hours per week or during midterms/finals.
   * *Group C (Novice / Limited Group-Study Users):* Study with peers < 1 hour per week or have never joined a formal study circle.
2. **Device Context (9 Laptop, 9 Mobile Phone):**
   * *Laptop / Desktop:* Viewport &ge; 1024px, standard mouse/trackpad and keyboard.
   * *Mobile Phone:* Touchscreen device, viewport 360px–430px width.
3. **Environmental Context (9 Quiet, 9 Mildly Distracting):**
   * *Quiet Environment:* Private study room, silent library area, or quiet home office with minimal interruption.
   * *Mildly Distracting Environment:* University student center, campus cafeteria, or active lounge with background ambient speech and movement.

### 3.3 Sampling Matrix (Balanced 18-Participant Grid)

| Experience Group | Laptop / Quiet | Laptop / Distracting | Mobile / Quiet | Mobile / Distracting | Group Total |
|---|---|---|---|---|---|
| **Frequent Users (Group A)** | 2 (`P01`, `P02`) | 1 (`P03`) | 1 (`P04`) | 2 (`P05`, `P06`) | **6** |
| **Occasional Users (Group B)** | 1 (`P07`) | 2 (`P08`, `P09`) | 2 (`P10`, `P11`) | 1 (`P12`) | **6** |
| **Novice Users (Group C)** | 2 (`P13`, `P14`) | 1 (`P15`) | 1 (`P16`) | 2 (`P17`, `P18`) | **6** |
| **Context Totals** | **5** | **4** | **4** | **5** | **18** |

---

## 4. Counterbalancing & Task Sequence Allocation

To control for order and learning effects across tasks, a **Latin-Square Counterbalancing Scheme** is deployed using five cyclic task sequences across the 5 core tasks (T01–T05):

* **Sequence A:** T01 &rarr; T02 &rarr; T03 &rarr; T04 &rarr; T05
* **Sequence B:** T02 &rarr; T03 &rarr; T04 &rarr; T05 &rarr; T01
* **Sequence C:** T03 &rarr; T04 &rarr; T05 &rarr; T01 &rarr; T02
* **Sequence D:** T04 &rarr; T05 &rarr; T01 &rarr; T02 &rarr; T03
* **Sequence E:** T05 &rarr; T01 &rarr; T02 &rarr; T03 &rarr; T04

### Sequence Distribution Across Participants:
* **Sequence A (4 participants):** `M09-P01`, `M09-P06`, `M09-P11`, `M09-P16`
* **Sequence B (4 participants):** `M09-P02`, `M09-P07`, `M09-P12`, `M09-P17`
* **Sequence C (4 participants):** `M09-P03`, `M09-P08`, `M09-P13`, `M09-P18`
* **Sequence D (3 participants):** `M09-P04`, `M09-P09`, `M09-P14`
* **Sequence E (3 participants):** `M09-P05`, `M09-P10`, `M09-P15`

---

## 5. Evaluation Methodology & Facilitator Script

### 5.1 Evaluation Method
The study utilizes **moderated usability testing with concurrent Think-Aloud (CTA)**. Participants are encouraged to verbalize their thoughts, expectations, hesitations, and reasoning as they navigate the application.

### 5.2 Facilitator Responsibilities & Neutrality
* The facilitator reads scripted, goal-oriented task briefs without hinting at buttons, URLs, or shortcuts.
* The facilitator observes silently and does not offer advice unless the participant is completely stuck for &gt; 90 seconds or explicitly requests help.
* If assistance is requested, the facilitator records a standardized prompt (`ASSIST-1`, `ASSIST-2`) and marks the task as **Assisted Completion** rather than Unassisted Success.
* The facilitator logs all errors, dead clicks, hesitation intervals, and navigation loops using the established error taxonomy.

### 5.3 Step-by-Step Session Procedure (40–50 minutes total)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SESSION TIMELINE & STAGES                            │
├─────────┬──────────────────────────────────────────────┬───────────────┤
│ Stage 1 │ Welcome, Informed Consent & Rights Briefing  │  5 minutes    │
│ Stage 2 │ Device & Context Setup, Warm-Up Interaction  │  3 minutes    │
│ Stage 3 │ Task Execution (5 Counterbalanced Tasks)     │ 25 minutes    │
│         │   - Scripted Task Instruction                │               │
│         │   - Think-Aloud Observation & Error Logging  │               │
│         │   - Post-Task Single Ease Question (SEQ 1–7) │               │
│ Stage 4 │ Post-Test System Usability Scale (SUS 10-Item) 5 minutes    │
│ Stage 5 │ Semi-Structured Qualitative Feedback & Debrief 7 minutes    │
└─────────┴──────────────────────────────────────────────┴───────────────┘
```

#### Facilitator Briefing Script (Word-for-Word):
> *"Thank you for participating today. We are testing an open-source collaborative learning platform called CohortCircle. Our goal is to evaluate the software interface, not your personal abilities. There are no right or wrong actions. If something feels confusing, that is a defect in our design, not a mistake by you.*  
>  
> *Please think out loud as you work: tell me what you are looking for, what you expect to happen, and whether something is unclear. I will be observing and taking notes, so I might remain quiet during tasks. You can stop or take a break at any point.*  
>  
> *Before we start, please note that this is a local demonstration prototype pre-loaded with synthetic example data. Your responses will be completely de-identified and referenced only by an anonymous participant code. Do you have any questions before we review the consent form?"*

---

## 6. Usability Metrics & Measurement Instruments

### 6.1 Effectiveness (Task Completion)
* **Unassisted Success ($S_U$):** Participant completes the task goal independently without hints or facilitator intervention.
* **Assisted Completion ($S_A$):** Participant achieves the task goal only after receiving one or more standardized verbal prompts from the facilitator.
* **Unsuccessful / Failure ($F$):** Participant gives up, makes an unrecoverable critical error, or fails to complete the core goal within the maximum time limit (300 seconds).
* **Overall Completion Rate ($C_{\text{overall}}$):** $(S_U + S_A) / N_{\text{attempted}} \times 100\%$.
* **Unassisted Completion Rate ($C_{\text{unassisted}}$):** $S_U / N_{\text{attempted}} \times 100\%$.

### 6.2 Efficiency (Time on Task)
* Exact time elapsed (in seconds) from the moment the participant acknowledges the task prompt until the goal is declared complete or abandoned.
* Metrics reported: Mean, Median, Standard Deviation, Minimum, and Maximum per task.

### 6.3 Error Taxonomy & Behavioral Indicators
* **`ERR-CRIT` (Critical Error):** Action that blocks task completion, causes unintended state loss, or results in an incorrect end state without participant awareness.
* **`ERR-NON` (Non-Critical Error):** Recoverable mistake, incorrect input corrected by participant, or navigating to an incorrect screen before finding the proper route.
* **`ERR-CLICK` (Dead Click / Misclick):** Clicking an unclickable UI element or missing an interactive affordance.
* **`ERR-NAV` (Navigation Disorientation):** Lost in page hierarchy, backtracking repeatedly, or failing to locate breadcrumb/sidebar navigation.
* **`ERR-MODEL` (Mental-Model Mismatch):** Misinterpreting what a feature does (e.g., confusing "Open Circle" direct join with "Moderated Request-to-Join", or misunderstanding compatibility percentages).

### 6.4 Single Ease Question (SEQ)
* Administered immediately following each task:  
  * *"Overall, how easy or difficult was this task to complete?"*  
  * Rating scale: 1 ("Very Difficult") to 7 ("Very Easy").  
  * **Target Benchmark:** Mean SEQ &ge; 5.5 / 7.0.

### 6.5 System Usability Scale (SUS)
* Standard 10-item questionnaire administered at the conclusion of all 5 tasks.
* 5-point Likert scale (1 = Strongly Disagree to 5 = Strongly Agree).
* Standard scoring formula:  
  $$\text{SUS} = 2.5 \times \left( \sum_{i \in \text{odd}} (R_i - 1) + \sum_{i \in \text{even}} (5 - R_i) \right)$$
* **Target Benchmark:** Mean SUS &ge; 80.0 / 100 (`NFR-USE-01`). Note that the project benchmark of &ge; 80.0 is an operational milestone threshold at the Grade B / Grade A boundary, distinct from the standardized Sauro & Lewis (2016) curved Grade A cutoff of 80.3 (90th percentile). A score of 80.0–80.2 is Grade B (above average).

### 6.6 Post-Test Qualitative Debrief
* Four structured open-ended questions:
  1. What aspect of CohortCircle felt most intuitive or helpful?
  2. What aspect caused the greatest hesitation, confusion, or frustration?
  3. How clear and trustworthy did the compatibility matching scores feel?
  4. What one change would you prioritize before using this platform with classmates?

---

## 7. Data Privacy, Storage & Ethical Governance

1. **Governing Reference:** All procedures strictly adhere to [`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md).
2. **Voluntary Participation & Withdrawal:** Participants may withdraw at any time without penalty or explanation.
3. **Zero PII Exposure in Git:**
   * Signed consent forms, raw notes, audio recordings, and participant identity maps are stored exclusively in the local directory `private-research-data/module09/` (gitignored).
   * All public artifacts, reports, and commits use strictly de-identified codes (`M09-P01` to `M09-P18`).
   * No phone numbers, student IDs, email addresses, or identifying images are ever committed.
4. **Recording Consent Options:** The consent protocol provides independent separate options for audio recording, application-only screen recording, and no recording. Participants who decline recording may still participate fully without prejudice.
5. **Data Retention & Disposal:** Audio recordings are erased within 5 business days of verified transcription. Any long-term institutional archival or disposal requirements remain pending supervisor/institutional confirmation.
6. **Synthetic Scenarios:** Participants are instructed to use provided fictional persona scenarios rather than entering personal course grades or private academic information.

---

## 8. Stopping Rules & Fieldwork Integrity

* **Stopping Rule:** Preparation of this study protocol, questionnaires, task scripts, and analysis tooling constitutes the complete analytical deliverable of Module 09.
* **Integrity Gate:** In accordance with DEC-024 and DEC-027, the module status is formally declared:  
  **`MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING`**
* **Fieldwork Prerequisite:** Empirical results (SUS scores, SEQ averages, task times, error counts) may only be authored and reported after genuine human participants have completed recorded sessions. No simulated or artificial data will be merged into the canonical results report.
