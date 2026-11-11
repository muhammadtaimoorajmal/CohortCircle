# User Research & Empirical Investigation Toolkit: CohortCircle

> **Module Status:** **RESEARCH INSTRUMENTATION PREPARED — EMPIRICAL FIELDWORK PENDING**  
> **Governance Notice:** In adherence to research integrity and open-source software standards, all protocols, recruitment criteria, interview scripts, survey questions, observation matrices, and qualitative codebooks in this directory are fully instrumented. **Zero data or participant records are fabricated.** Fieldwork data collection will take place strictly during authorized empirical research activities.

---

## 1. Overview & Purpose

Module 02 of the CohortCircle project lifecycle is dedicated to empirical user research. The objective is to replace preliminary working assumptions with verified, grounded evidence regarding how university students and independent learners discover, evaluate, form, and sustain collaborative study circles.

This directory houses the complete operational toolkit used by researchers and observers to execute, record, code, and synthesize field data without compromising participant privacy or methodological rigor.

---

## 2. Core Research Questions (RQs)

All investigative instruments in this toolkit are designed to address eight central research inquiries:

| Research Question ID | Research Inquiry | Primary Investigation Method |
|---|---|---|
| **RQ-01** | How do learners currently search for, evaluate, and select potential study partners? | Semi-Structured Interviews (`INT`), Survey (`SUR`) |
| **RQ-02** | How do learners initiate, structure, and organize new study groups? | Semi-Structured Interviews (`INT`), Contextual Inquiry (`OBS`) |
| **RQ-03** | What are the root causes of scheduling friction and meeting drop-offs? | Survey (`SUR`), Semi-Structured Interviews (`INT`) |
| **RQ-04** | How do differing study styles (silent vs. collaborative vs. discussion) affect group cohesion and success? | Contextual Inquiry (`OBS`), Interviews (`INT`), Survey (`SUR`) |
| **RQ-05** | Why do informal study groups lose momentum and dissolve after 1–2 sessions? | Semi-Structured Interviews (`INT`), Survey (`SUR`) |
| **RQ-06** | What specific information (syllabus, style, schedule, expectations) do learners require *before* requesting to join a group? | Semi-Structured Interviews (`INT`), Survey (`SUR`) |
| **RQ-07** | How do learners currently navigate communication breakdowns across tools like WhatsApp, Discord, and campus forums? | Contextual Inquiry (`OBS`), Interviews (`INT`) |
| **RQ-08** | What design mechanisms (transparency, rule explanations, role clarity) would establish user trust in a compatibility-matching platform? | Semi-Structured Interviews (`INT`), Usability Ideation |

---

## 3. Toolkit Deliverables Directory

The research toolkit is modularly organized into the following verified operational documents:

| Document | Purpose & Description |
|---|---|
| [`RECRUITMENT_AND_SAMPLING.md`](RECRUITMENT_AND_SAMPLING.md) | Sampling strategy, recruitment screener, participant diversity criteria (STEM/Humanities, commuter/residential), and outreach scripts. |
| [`CONTEXTUAL_INQUIRY_PROTOCOL.md`](CONTEXTUAL_INQUIRY_PROTOCOL.md) | Observational fieldwork protocol across 3 natural sites (Library, Study Lounge, Cafeteria) across 5 behavioral dimensions. |
| [`INTERVIEW_GUIDE.md`](INTERVIEW_GUIDE.md) | 4-phase semi-structured interview script (25–35 mins) with 10 non-leading core questions and structured follow-up probes. |
| [`SURVEY_INSTRUMENT.md`](SURVEY_INSTRUMENT.md) | 8-question exploratory survey questionnaire covering demographics, Likert-scale pain points, and feature prioritization. |
| [`FIELD_NOTE_TEMPLATE.md`](FIELD_NOTE_TEMPLATE.md) | Standardized time-stamped template for recording raw field observations (`OBS-01`, `OBS-02`, `OBS-03`). |
| [`INTERVIEW_NOTE_TEMPLATE.md`](INTERVIEW_NOTE_TEMPLATE.md) | De-identified note-taking and qualitative coding sheet for student interviews (`P-01` to `P-07`, `INT-01` to `INT-07`). |
| [`SURVEY_CODEBOOK.md`](SURVEY_CODEBOOK.md) | Quantitative data dictionary, variable definitions, measurement scales, and analysis statistical recipe. |
| [`QUALITATIVE_ANALYSIS_PROTOCOL.md`](QUALITATIVE_ANALYSIS_PROTOCOL.md) | 9-step thematic analysis workflow, initial candidate codebook, affinity mapping rules, and triangulation guidelines. |
| [`EVIDENCE_REGISTER.md`](EVIDENCE_REGISTER.md) | Master traceability register linking raw evidence IDs to findings, user needs (`NEED-XXX`), and hypothesis statuses. |
| [`FIELDWORK_STATUS.md`](FIELDWORK_STATUS.md) | Real-time status monitor tracking recruitment progress, session completion, and field milestones. |

---

## 4. Evidence Traceability & Identifier Taxonomy

To guarantee strict scientific traceability from raw observation to functional requirements, all empirical items utilize standardized identifier families:

```
[OBS-XXX]  Contextual Observation Record (e.g., OBS-01: Central Library observation)
[INT-XXX]  Semi-Structured Interview Record (e.g., INT-01: Interview with participant P-01)
[SUR-XXX]  Survey Item / Statistical Metric (e.g., SUR-Q05: Schedule friction rating)
[NEED-XXX] Grounded User Need (Synthesized from validated empirical evidence)
[HYP-XXX]  Working Research Hypothesis (Subject to empirical validation or refutation)
```

### Research Lifecycle Status Definitions
Every protocol, record, and finding must carry an explicit status tag:
* `NOT STARTED`: Instrument or workflow conceived but not yet documented.
* `INSTRUMENT PREPARED`: Documentation, scripts, and validation criteria fully prepared and verified.
* `FIELDWORK PENDING`: Awaiting physical execution of interviews, observation, or survey distribution with real participants.
* `COLLECTED`: Raw empirical data gathered, de-identified, and securely logged.
* `ANALYZED`: Thematic coding and statistical tabulation executed.
* `VALIDATED`: Supported by triangulated, verifiable empirical evidence across multiple sources.
* `INCONCLUSIVE`: Gathered evidence is conflicting, insufficient, or statistically non-significant.

---

## 5. Public Repository Privacy & Ethical Standards

* **Zero PII on GitHub:** Under no circumstances are student names, contact info, student IDs, or raw recordings pushed to this repository.
* **Local Storage Isolation:** All unredacted field notes and physical consent sheets must reside exclusively in the local, Git-ignored `private-research-data/` folder.
* **Consent Requirement:** Every participant must execute the informed consent agreement documented in [`../RESEARCH_ETHICS.md`](../RESEARCH_ETHICS.md) prior to session initiation.
