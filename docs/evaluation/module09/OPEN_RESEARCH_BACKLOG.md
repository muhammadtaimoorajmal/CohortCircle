# Open Empirical Research Backlog: CohortCircle

> **Document Status:** LIVING RESEARCH AUDIT REGISTER  
> **Lifecycle Reference:** Modules 02, 03, 06, and 09 Governance  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Maintainer & Lead:** Muhammad Taimoor Ajmal  
> **Privacy Classification:** Public Metadata & Status (Zero PII)

---

## 1. Executive Summary & Purpose

This register tracks all open empirical research activities across the 10-module lifecycle of CohortCircle. In strict compliance with scientific integrity principles (DEC-024, DEC-025, DEC-027) and ethical standards ([`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md)), this document establishes unambiguous boundaries between **analytical/expert preparation** and **genuine empirical user fieldwork**.

Zero user observations, participant responses, quotes, timings, or survey ratings may be fabricated or simulated. Fieldwork items remain explicitly designated as **`[PENDING FIELDWORK]`** until authentic human participants have provided informed consent and completed recorded sessions.

---

## 2. Local Research Data Repository Audit

An inspection of the local filesystem was conducted:
* **Target Storage Directory:** `private-research-data/`
* **Git Exemption Status:** Ignored in `.gitignore` (line 120) to guarantee zero exposure of personal identifiable information (PII), signed consent agreements, or raw audio/transcripts.
* **Audit Finding:** The local directory `private-research-data/` exists and contains **0 raw participant files** as of Module 09 kickoff.
* **Integrity Implication:** All empirical participant data across Modules 02, 03, 06, and 09 remains legitimately **PENDING FIELDWORK**. No completed trials exist to date.

---

## 3. Disaggregated Research Stream Tracking

The four distinct empirical research streams are strictly segregated to prevent cohort blending, sample misrepresentation, or conflation:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   COHORTCIRCLE RESEARCH STREAM MAP                     │
├─────────────────────┬───────────────────┬──────────────┬───────────────┤
│ Stream / Module     │ Target Method     │ Cohort ID    │ Sample Target │
├─────────────────────┼───────────────────┼──────────────┼───────────────┤
│ Stream A: Module 02 │ Contextual Inq.   │ OBS-01..03   │ 3 Field Sites │
│                     │ Semi-Struct. Int. │ INT-01..07   │ 5–7 Students  │
│                     │ Exploratory Surv. │ SURV-001..   │ 30–50 Learners│
├─────────────────────┼───────────────────┼──────────────┼───────────────┤
│ Stream B: Module 03 │ Empirical Synth.  │ Synthesis    │ Maps & Personas│
├─────────────────────┼───────────────────┼──────────────┼───────────────┤
│ Stream C: Module 06 │ Formative Eval.   │ M06-P01..07  │ 5–7 Learners  │
├─────────────────────┼───────────────────┼──────────────┼───────────────┤
│ Stream D: Module 09 │ Summative Eval.   │ M09-P01..18  │ 18 Learners   │
└─────────────────────┴───────────────────┴──────────────┴───────────────┘
```

---

## 4. Detailed Stream Specifications

### Stream A: Module 02 — Exploratory User Research
* **Contextual Inquiry (Direct In-Situ Observation):**
  * **Site OBS-01:** University Central Library (quiet individual study vs. quiet group zones).
  * **Site OBS-02:** Campus Student Lounge / Commons (informal collaborative study tables).
  * **Site OBS-03:** Student Cafeteria / Coffee Shop Area (high-distraction group work).
  * *Status:* Protocol authored in [`docs/research/CONTEXTUAL_INQUIRY_PROTOCOL.md`](../research/CONTEXTUAL_INQUIRY_PROTOCOL.md); **Pending on-site fieldwork execution**.
* **Semi-Structured Qualitative Interviews:**
  * **Target Sample:** 5 to 7 enrolled university students.
  * **Participant ID Allocation:** `INT-01` through `INT-07`.
  * **Planned Duration:** 25–35 minutes per interview session.
  * **Guide Reference:** [`docs/research/INTERVIEW_GUIDE.md`](../research/INTERVIEW_GUIDE.md).
  * *Status:* Interview guide and screener complete; **Pending recruitment and interview execution**.
* **Exploratory Survey Questionnaire:**
  * **Target Sample:** 30 to 50 valid responses.
  * **Instrument Reference:** [`docs/research/SURVEY_INSTRUMENT.md`](../research/SURVEY_INSTRUMENT.md) (8 items).
  * *Status:* Questionnaire finalized; **Pending survey distribution and response collection**.

---

### Stream B: Module 03 — Empirical Research Synthesis
* **Affinity Diagramming:** 7 initial clusters defined in [`docs/synthesis/AFFINITY_MAPPING.md`](../synthesis/AFFINITY_MAPPING.md) based on preliminary problem hypotheses. Requires empirical verification and cluster re-weighting using raw quotes from `INT-01` through `INT-07`.
* **Empathy Maps:** Four empathy quadrants drafted across learner personas; awaiting real observed quotes and friction points.
* **Proto-Personas Status:**
  * Persona 1: *Alex Chen (The Goal-Oriented Exam Driller)* — **UNVALIDATED PROTO-PERSONA**.
  * Persona 2: *Maya Lin (The Collaborative Deep-Dive Learner)* — **UNVALIDATED PROTO-PERSONA**.
  * Persona 3: *Jordan Taylor (The Working Part-Time Student)* — **UNVALIDATED PROTO-PERSONA**.
  * *Status:* Personas must remain explicitly labeled as proto-personas until genuine qualitative evidence warrants elevation to empirical personas.

---

### Stream C: Module 06 — Formative Usability Evaluation
* **Evaluation Target:** Standalone low-fidelity interactive wireframe prototype ([`docs/prototypes/module05/index.html`](../prototypes/module05/index.html)).
* **Analytical Baseline:** Completed via Nielsen’s 10 Heuristics and Cognitive Walkthrough across Screens 01–12 (13 usability defects identified; 12 interaction remediations verified in HTML prototype).
* **Participant Fieldwork:**
  * **Target Sample:** 5 to 7 real student participants.
  * **Participant ID Allocation:** `M06-P01` through `M06-P07`.
  * **Task Scripts:** Tasks 01 through 05 in [`docs/prototypes/module05/TASK_SCENARIOS.md`](../prototypes/module05/TASK_SCENARIOS.md).
  * *Status:* Expert inspection complete; **Participant empirical validation pending**. Expert findings must not be conflated with empirical participant metrics.

---

### Stream D: Module 09 — Summative Usability Evaluation
* **Evaluation Target:** Working React 19 + Vite web application ([`http://localhost:5173`](http://localhost:5173)) featuring full functional logic and local persistence established in Module 08.
* **Target Sample:** **18 distinct real participants** (completely separate from Module 02 interviewees and Module 06 formative evaluators).
* **Participant ID Allocation:** `M09-P01` through `M09-P18`.
* **Methodology:** Goal-directed task execution (5 core tasks), concurrent Think-Aloud, time-on-task, error categorization, post-task SEQ (Single Ease Question), post-test SUS (System Usability Scale), and semi-structured qualitative interview.
* *Status:* Evaluation protocol, sampling matrix, and data instruments established; **Pending participant recruitment and session execution**.

---

## 5. Research Backlog Management & Integrity Commitments

1. **No Data Fabrication:** Under no circumstance will synthetic values, simulated participant quotes, manufactured SUS scores, or fictitious task durations be entered into research registers.
2. **Explicit Labeling:** All reports, tables, and handovers must clearly specify achieved sample counts ($n = 0$ until sessions are held).
3. **Data Segregation:** Raw notes, audio recordings, and signed consent documentation will be stored strictly in local `private-research-data/` subdirectories and will never be committed to the public Git repository.
4. **Independent Lifecycle Gates:** Completing Module 09 study instrumentation does not imply completion of Module 02 fieldwork or Module 06 participant trials. Each stream retains its own verifiable evidence audit trail.
