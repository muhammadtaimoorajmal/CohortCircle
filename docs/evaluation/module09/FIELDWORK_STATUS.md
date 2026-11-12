# Summative Usability Fieldwork Status: CohortCircle

> **Lifecycle Milestone:** Module 09 of 10 (Summative User Participation Evaluation)  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Official Operational Status:** **`MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING`**  
> **Last Updated:** 2026-11-12

---

## 1. Fieldwork Summary Dashboard

| Metric | Target Baseline | Achieved To Date | Status |
|---|---|---|---|
| **Planned Participant Sample** | 18 unique learners | 0 recruited / 0 completed | PENDING FIELDWORK |
| **System Under Evaluation** | React 19 + Vite App (`http://localhost:5173`) | Operational (Module 08 functional logic) | READY FOR TESTING |
| **Study Protocol & Instruments** | 15 data collection documents | 15 authored & verified | COMPLETE |
| **Evaluation Tasks** | 5 core feature tasks (T01–T05) | Fully scripted & validated | READY |
| **Analysis Pipeline** | Automated verification & stats script | Authored & unit-tested | OPERATIONAL |
| **SUS Questionnaires Completed** | 18 completed valid surveys | 0 (No fabricated data) | AWAITING FIELDWORK |
| **Mean SUS Target** | &ge; 80.0 / 100 | N/A (Pending trials) | BENCHMARK UNTESTED |
| **Mean SEQ Target** | &ge; 5.5 / 7.0 | N/A (Pending trials) | BENCHMARK UNTESTED |

---

## 2. Participant Fieldwork Tracking Ledger (M09-P01 to M09-P18)

*In strict observance of scientific research integrity (DEC-024, DEC-027), participant slots M09-P01 through M09-P18 reflect planned recruitment allocations. No participant is marked as recruited, scheduled, or completed without authentic fieldwork sessions.*

| Participant ID | Experience Group | Device Context | Environment Context | Sequence | Informed Consent | Session Date | Session Status |
|---|---|---|---|---|---|---|---|
| **M09-P01** | Frequent (&ge;4h/wk) | Laptop | Quiet | Seq A | Pending | — | Planned / Not Recruited |
| **M09-P02** | Frequent (&ge;4h/wk) | Laptop | Quiet | Seq B | Pending | — | Planned / Not Recruited |
| **M09-P03** | Frequent (&ge;4h/wk) | Laptop | Distracting | Seq C | Pending | — | Planned / Not Recruited |
| **M09-P04** | Frequent (&ge;4h/wk) | Mobile | Quiet | Seq D | Pending | — | Planned / Not Recruited |
| **M09-P05** | Frequent (&ge;4h/wk) | Mobile | Distracting | Seq E | Pending | — | Planned / Not Recruited |
| **M09-P06** | Frequent (&ge;4h/wk) | Mobile | Distracting | Seq A | Pending | — | Planned / Not Recruited |
| **M09-P07** | Occasional (1–3h/wk)| Laptop | Quiet | Seq B | Pending | — | Planned / Not Recruited |
| **M09-P08** | Occasional (1–3h/wk)| Laptop | Distracting | Seq C | Pending | — | Planned / Not Recruited |
| **M09-P09** | Occasional (1–3h/wk)| Laptop | Distracting | Seq D | Pending | — | Planned / Not Recruited |
| **M09-P10** | Occasional (1–3h/wk)| Mobile | Quiet | Seq E | Pending | — | Planned / Not Recruited |
| **M09-P11** | Occasional (1–3h/wk)| Mobile | Quiet | Seq A | Pending | — | Planned / Not Recruited |
| **M09-P12** | Occasional (1–3h/wk)| Mobile | Distracting | Seq B | Pending | — | Planned / Not Recruited |
| **M09-P13** | Novice (<1h/wk) | Laptop | Quiet | Seq C | Pending | — | Planned / Not Recruited |
| **M09-P14** | Novice (<1h/wk) | Laptop | Quiet | Seq D | Pending | — | Planned / Not Recruited |
| **M09-P15** | Novice (<1h/wk) | Laptop | Distracting | Seq E | Pending | — | Planned / Not Recruited |
| **M09-P16** | Novice (<1h/wk) | Mobile | Quiet | Seq A | Pending | — | Planned / Not Recruited |
| **M09-P17** | Novice (<1h/wk) | Mobile | Distracting | Seq B | Pending | — | Planned / Not Recruited |
| **M09-P18** | Novice (<1h/wk) | Mobile | Distracting | Seq C | Pending | — | Planned / Not Recruited |

---

## 3. Fieldwork Execution Protocol & Rules of Engagement

1. **Physical / Remote Recruitment:**
   * Participants must be recruited from authentic university learner populations matching the criteria matrix.
   * Prior to session kickoff, verify that the participant has reviewed the information sheet and signed the Informed Consent Form ([`docs/RESEARCH_ETHICS.md`](../../RESEARCH_ETHICS.md)).
2. **Local Environment Preparation:**
   * Open the running application at `http://localhost:5173`.
   * Reset the demonstration state using Settings -> "Restore Initial Demo Data" (`FR-023`) to ensure a deterministic baseline.
3. **Session Recording Protocol:**
   * Facilitator delivers scripted task scenarios without prompting or leading.
   * Start and stop stopwatches for exact time-on-task logging.
   * Record SEQ response immediately after each individual task.
   * Administer the 10-item standard SUS questionnaire and post-test feedback interview at the conclusion of all five tasks.
   * Save raw de-identified CSV and note records directly to local `private-research-data/module09/` (gitignored).
