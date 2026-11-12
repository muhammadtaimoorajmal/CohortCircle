# Module 09: Summative User Participation Evaluation

> **Product:** CohortCircle ("Find your people. Learn together.")  
> **Lifecycle Stage:** Module 09 of 10  
> **Standard:** ISO 9241-11 Usability Ergonomics, WCAG 2.2 AA Accessibility  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Maintainer & Lead:** Muhammad Taimoor Ajmal  
> **Status:** **`MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING`**

---

## 1. Directory Overview & Toolkit Index

This directory contains the complete summative usability evaluation framework designed to assess the functional React 19 application with $N = 18$ authentic human participants.

| Document / Asset | Description | Status |
|---|---|:---:|
| [`STUDY_PROTOCOL.md`](STUDY_PROTOCOL.md) | Authoritative 18-participant study protocol, timeline, facilitator script & consent rules | COMPLETE |
| [`CRITERIA_AND_CONTEXT_MATRIX.md`](CRITERIA_AND_CONTEXT_MATRIX.md) | Stratification criteria (3 experience groups), contexts (device & noise), and 18-person matrix | COMPLETE |
| [`PARTICIPANT_RECRUITMENT.md`](PARTICIPANT_RECRUITMENT.md) | Outreach copy, 5-question eligibility screener, quota logic & consent management | COMPLETE |
| [`TASKS_AND_SUCCESS_CRITERIA.md`](TASKS_AND_SUCCESS_CRITERIA.md) | 5 core feature tasks (T01–T05) covering all 23 FRs with measurable success criteria | COMPLETE |
| [`PARTICIPANT_SESSION_TEMPLATE.md`](PARTICIPANT_SESSION_TEMPLATE.md) | Per-participant evaluation log capturing task times, outcomes, errors, SEQ & SUS ratings | COMPLETE |
| [`OBSERVATION_LOG_TEMPLATE.md`](OBSERVATION_LOG_TEMPLATE.md) | Chronological behavioral observation sheet for concurrent Think-Aloud logging | COMPLETE |
| [`SEQ_QUESTIONNAIRE.md`](SEQ_QUESTIONNAIRE.md) | Standardized 7-point Single Ease Question instrument & benchmark interpretation | COMPLETE |
| [`SUS_QUESTIONNAIRE.md`](SUS_QUESTIONNAIRE.md) | Standard 10-item System Usability Scale instrument, Brooke scoring & grading curve | COMPLETE |
| [`POST_TEST_FEEDBACK_QUESTIONNAIRE.md`](POST_TEST_FEEDBACK_QUESTIONNAIRE.md) | Semi-structured qualitative interview guide (5 core questions & thematic framework) | COMPLETE |
| [`DATA_DICTIONARY.md`](DATA_DICTIONARY.md) | Formal schema definitions for CSV data tables (`sessions`, `tasks`, `sus`, `qualitative`) | COMPLETE |
| [`ANALYSIS_PLAN.md`](ANALYSIS_PLAN.md) | Quantitative formulas (completion, time, errors, SUS) & qualitative synthesis rules | COMPLETE |
| [`RESULTS_REPORT_TEMPLATE.md`](RESULTS_REPORT_TEMPLATE.md) | Comprehensive 14-section final evaluation report template meeting HCI Lab 10 requirements | COMPLETE |
| [`OPEN_RESEARCH_BACKLOG.md`](OPEN_RESEARCH_BACKLOG.md) | Cross-module audit register tracking outstanding empirical research across Modules 02, 03, 06, 09 | COMPLETE |
| [`FIELDWORK_STATUS.md`](FIELDWORK_STATUS.md) | Real-time participant recruitment and session progress dashboard (M09-P01 to M09-P18) | COMPLETE |

---

## 2. Automated Usability Data Analysis Tool

A local Node ESM analysis script is provided in [`scripts/analyze-module09.mjs`](../../../scripts/analyze-module09.mjs):
* **Execution:** `node scripts/analyze-module09.mjs [path-to-data-dir]`
* **RFC 4180 CSV Parser:** Full compliance with quoted fields, embedded commas, escaped quotes (`""`), CRLF/LF line breaks, and malformed row detection.
* **Relational Schema Validation:** Validates required headers, ranges, enums, participant/task ID formats, and foreign-key integrity across `sessions.csv`, `tasks.csv`, `sus.csv`, and `qualitative.csv`.
* **Completion State Detection:** Automatically distinguishes `PENDING_FIELDWORK` (zero records), `PARTIAL_FIELDWORK` (incomplete dataset), and `ANALYSIS_READY` (complete 18-participant cohort).
* **Statistical Metrics:** Calculates global and per-task unassisted/assisted/failed completion rates, time-on-task statistics (mean, median, min, max, std dev), error distributions by category, SEQ stats (mean, median, 1–7 distribution), and SUS psychometrics (neutral imputation for blanks, mean, median, min, max, IQR, and Sauro-Lewis grades).
* **Context-Stratified Analysis:** Comparative breakdowns across experience groups (Groups A/B/C), device types (Laptop vs. Mobile), and noise conditions (Quiet vs. Distracting).
* **Qualitative Aggregation:** Structural validation and category/sentiment frequency counts without console exposure of verbatim quotes or PII.
* **Local Aggregation Output:** Generates aggregate metrics in `private-research-data/module09/analysis/` (gitignored). Zero network calls or external data leakage.

---

## 3. Research Ethics & Data Safety

* **No Data Fabrication:** In strict adherence to scientific integrity principles (DEC-024, DEC-027), no simulated participant data, synthetic SUS scores, or fictitious user quotes are recorded.
* **Data Privacy:** Raw participant notes, audio recordings, and signed consent forms are stored exclusively in local `private-research-data/module09/` (excluded from Git via `.gitignore`).
