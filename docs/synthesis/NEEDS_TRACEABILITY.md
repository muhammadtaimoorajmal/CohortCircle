# Needs Traceability & Requirements Alignment Matrix: CohortCircle

> **Governance Standard:** Bidirectional Traceability Engineering (ISO/IEC/IEEE 29148)  
> **Status:** **PROVISIONAL TRACEABILITY BASELINE (PENDING EMPIRICAL FIELDWORK CONFIRMATION)**  
> **Traceability Notice:** In this pre-fieldwork stage, synthesized user needs (`NEED-001` to `NEED-008`) represent grounded hypotheses mapped from our research questions (`RQ-01` to `RQ-08`) and preliminary domain analysis. They will be formally confirmed or updated upon ingesting genuine field data.

---

## 1. Master Traceability Pipeline (Research to Requirements)

The matrix below maps each Core Research Question through to Initial Codes, Affinity Clusters, Synthesized User Needs, Proto-Personas, and the 23 Functional Requirements:

| RQ ID | Analytical Code | Affinity Cluster | Synthesized User Need | Proto-Persona Alignment | Mapped Functional Requirements | Empirical Source Anchor (Pending) |
|---|---|---|---|---|---|---|
| **RQ-01** | `CODE-DISC-COLD`, `CODE-DISC-FILTER` | Cluster 01: Discovery | **NEED-001:** Learners need to discover study groups by exact course subject and syllabus topic without broadcast messaging anxiety. | `PROTO-LEARN-01`, `PROTO-LEARN-02` | `FR-005` (Directory), `FR-006` (Search), `FR-007` (Filters) | `INT-01`, `INT-06`, `SUR-Q04` |
| **RQ-02** | `CODE-ROLE-ABSENCE`, `CODE-GROUP-CAP` | Cluster 05: Formation | **NEED-002:** Circle hosts need simple tools to launch study circles with explicit capacity caps and joining rules. | `PROTO-HOST-01` | `FR-016` (Creation), `FR-017` (Settings), `FR-019` (Roster) | `INT-05`, `OBS-02` |
| **RQ-03** | `CODE-SCHED-FATIGUE`, `CODE-TIME-CONFLICT` | Cluster 04: Schedule | **NEED-003:** Learners and hosts need automated schedule matching to eliminate protracted back-and-forth messaging. | `PROTO-LEARN-01`, `PROTO-HOST-01` | `FR-003` (Availability), `FR-009` (Compatibility), `FR-020` (Scheduler) | `SUR-Q05`, `INT-04` |
| **RQ-04** | `CODE-STYLE-MISMATCH`, `CODE-MODE-DIVIDE` | Cluster 03: Study Style | **NEED-004:** Learners need to match based on preferred study mode (silent focus vs. vocal debate) to prevent habit friction. | `PROTO-LEARN-01`, `PROTO-LEARN-02` | `FR-002` (Style Pref), `FR-007` (Style Filters), `FR-010` (Breakdown) | `OBS-01`, `INT-01`, `SUR-Q03` |
| **RQ-05** | `CODE-MOMENTUM-DROP`, `CODE-CADENCE-LOSS` | Cluster 07: Commitment | **NEED-005:** Groups need clear session agendas and attendance tracking to prevent early momentum loss and group collapse. | `PROTO-HOST-01`, `PROTO-LEARN-02` | `FR-020` (Agendas), `FR-021` (RSVP), `FR-022` (Dashboard) | `INT-05`, `SUR-Q07` |
| **RQ-06** | `CODE-EXPECT-OPACITY`, `CODE-PREJOIN-INFO` | Cluster 02: Goals & Topics | **NEED-006:** Learners need transparent pre-joining circle charters (pace, rules, expectations) before committing their time. | `PROTO-LEARN-01`, `PROTO-LEARN-02` | `FR-012` (Circle View), `FR-014` (Intro Notes), `FR-010` (Breakdown) | `INT-03`, `SUR-Q08` |
| **RQ-07** | `CODE-TOOL-BURDEN`, `CODE-CHAT-NOISE` | Cluster 06: Coordination | **NEED-007:** Learners need centralized session dates and locations isolated from noisy social chat channels. | `PROTO-LEARN-01`, `PROTO-HOST-01` | `FR-020` (Session Cards), `FR-022` (Dashboard) | `OBS-02`, `INT-01`, `INT-05` |
| **RQ-08** | `CODE-TRUST-TRANSPARENCY` | Cluster 08: Trust & Safety | **NEED-008:** Learners need explainable, rule-based compatibility scoring that justifies why a circle is recommended. | `PROTO-LEARN-01`, `PROTO-LEARN-02` | `FR-009` (Score Engine), `FR-010` (Explainability Modal) | `INT-01`, `SUR-Q08` |

---

## 2. Requirements Support & Validation Status Audit

We review the 23 Functional Requirements (`FR-001` to `FR-023`) and 15 Non-Functional Requirements (`NFR-xxx`) established in `docs/PRODUCT_REQUIREMENTS.md` against our synthesis baseline:

### 2.1 Supported by Synthesis Baseline (High Priority)
* **`FR-001` to `FR-004` (Learner Profiles & Preferences):** Directly support `NEED-001`, `NEED-003`, and `NEED-004`. Critical for calculating explainable compatibility.
* **`FR-005` to `FR-008` (Discovery & Filtering):** Directly address `NEED-001` and `NEED-004`, resolving the lecture hall cold-discovery problem.
* **`FR-009` to `FR-011` (Transparent Compatibility Engine):** Directly address `NEED-008`. Core product differentiator over generic chat tools.
* **`FR-012` to `FR-015` (Circle Views & Joining Workflows):** Directly support `NEED-006`, providing psychological safety for `PROTO-LEARN-02`.
* **`FR-016` to `FR-019` (Circle Creation & Host Controls):** Directly empower `PROTO-HOST-01` to maintain small, curated cohorts.
* **`FR-020` to `FR-023` (Sessions, RSVPs, Dashboard, Persistence):** Directly address `NEED-005` and `NEED-007`, resolving scheduling fatigue.

### 2.2 Requirements Requiring Empirical Fieldwork Calibration
* **`FR-010` (Compatibility Weights $W_1$ to $W_5$):** The exact weight distribution ($W_1=0.35, W_2=0.25, W_3=0.20, W_4=0.12, W_5=0.08$) requires empirical calibration using Borda count rankings from `SUR-DATA` (Question 08).
* **`FR-014` (Request-to-Join vs. Direct Join):** Needs interview confirmation (`INT-05`, `INT-06`) on whether learners perceive introductory notes as a protective filter or an excessive barrier to entry.

### 2.3 Non-Functional Requirements (15 NFRs) Alignment
* **Accessibility (`NFR-A11Y-01` to `04`):** WCAG 2.2 Level AA compliance ensures barrier-free access for diverse learners.
* **Responsiveness (`NFR-RESP-01` to `02`):** Direct support for commuter students using mobile devices while in transit (`PROTO-LEARN-01`).
* **Usability (`NFR-USE-01` to `03`):** SUS &ge; 80 and SEQ &ge; 5.5 targets ensure that the platform eliminates rather than adds cognitive load.
* **Performance (`NFR-PERF-01` to `02`):** Instant client-side filtering preserves focus during time-constrained study.
* **Privacy (`NFR-PRIV-01` to `02`):** Local-first storage guarantees zero personal data leakage, directly supporting `NEED-008`.
* **Reliability & Compatibility (`NFR-REL-01`, `NFR-COMP-01`):** Fault-tolerant evergreen browser support ensures frictionless campus utility.

---

## 3. Governance Register & FYP Decision Tracking

* **Critical Open Decision `DEC-002` (FYP Alignment):** Maintained strictly as **`[PENDING USER CONFIRMATION]`**. Zero unverified assertions regarding undergraduate Final Year Project topic alignment are made in this document.
