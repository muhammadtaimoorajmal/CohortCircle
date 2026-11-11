# Synthesis Limitations & Risk Disclosure: CohortCircle

> **Governance Principle:** Scientific Transparency & Methodological Rigor  
> **Status:** **ACTIVE RISK LOG & BOUNDARY DISCLOSURE (MODULE 03)**

---

## 1. Primary Methodological Boundary: Pre-Fieldwork Status

The foremost limitation of the current synthesis deliverables is that **empirical fieldwork in Module 02 remains pending real-world participant data collection**.

Consequently, all synthesized artifacts—including affinity clusters, empathy quadrants, user journeys, and personas—operate as **structured behavioral hypotheses (Proto-Models)** rather than empirically proven scientific facts.

---

## 2. Identified Analytical Risks & Potential Biases

| Risk Identifier | Potential Vulnerability | Root Cause | Built-In Mitigation Strategy |
|---|---|---|---|
| **RISK-SYN-01** | **Confirmation Bias in Proto-Personas** | Proto-personas may over-reflect common academic assumptions (e.g., that all STEM students want silent co-study). | Strict empirical validation plan ([`PERSONA_VALIDATION_PLAN.md`](PERSONA_VALIDATION_PLAN.md)) with explicit falsification conditions. |
| **RISK-SYN-02** | **Cold-Start Platform Assumption** | Assuming learners will immediately find active local circles in their exact course without addressing initial platform density. | Designing flexible discovery filters that support broad subject categories and hybrid micro-circles (`FR-007`). |
| **RISK-SYN-03** | **Facilitator Scarcity Bias** | Assuming a sufficient number of students will willingly take on the Host role (`PROTO-HOST-01`) rather than only seeking to join. | Empowering circles with lightweight co-hosting privileges and zero-pressure single-session coordination (`FR-019`). |
| **RISK-SYN-04** | **Self-Reporting Discrepancy** | Students in surveys may claim they study 6 hours weekly with peers, while contextual inquiry may reveal much lower active collaborative time. | Methodological triangulation: Cross-referencing survey metrics (`SUR-DATA`) with real-world observational field notes (`OBS-01` to `03`). |
| **RISK-SYN-05** | **Demographic Skew Risk** | Initial campus outreach may inadvertently recruit primarily CS/engineering students, under-representing humanities learners (`PROTO-LEARN-02`). | Explicit recruitment quotas in [`docs/research/RECRUITMENT_AND_SAMPLING.md`](../research/RECRUITMENT_AND_SAMPLING.md) requiring minimum 2 non-STEM students. |

---

## 3. Scope Boundaries Maintained

To safeguard development integrity and prevent premature architectural expansion:
* **No Premature Feature Creep:** No video calling, real-time WebSocket chat, or payment rails have been introduced to accommodate proto-personas.
* **No Faux Validation Claims:** The project explicitly declines to claim that user needs are "proven" until empirical interview transcripts and survey datasets are analyzed.
* **Preservation of FYP Alignment Status:** Maintained `DEC-002` strictly as `[PENDING USER CONFIRMATION]`.
