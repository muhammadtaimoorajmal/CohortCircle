# CohortCircle

> **Find your people. Learn together.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Conceptual Design](https://img.shields.io/badge/Status-Module%2004%20Conceptual%20Design-blue.svg)](#project-roadmap)
[![Target Standard](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA%20Target-brightgreen.svg)](#accessibility--design-principles)

CohortCircle is an open-source collaborative learning platform created to solve the friction of finding and coordinating compatible study groups. By moving beyond unstructured chat groups and static bulletin boards, CohortCircle empowers university students and independent learners to discover peers with matching goals, aligned schedules, and complementary study habits.

---

## The Challenge

Peer learning significantly improves comprehension, accountability, and academic resilience. However, organizing effective study circles remains fragmented and inefficient:

* **Mismatch in Study Formats:** Some students thrive in silent co-working environments; others seek energetic debate, hands-on problem solving, or structured exam drilling.
* **Coordination Overhead:** Finding mutual free time across modern academic and work schedules often devolves into frustrating back-and-forth messaging.
* **Lack of Accountability:** Informal chat groups frequently lose momentum due to ambiguous expectations, unassigned roles, and irregular session routines.
* **Opaque Discovery:** Existing platforms lack transparent mechanisms to explain *why* two learners or groups are suited to collaborate.

---

## Our Distinctive Approach: Explainable Compatibility

CohortCircle prioritizes **compatibility-first discovery** backed by transparent, deterministic matching rules rather than unexplainable algorithms.

Groups and learners are evaluated across multi-dimensional criteria:

1. **Subjects & Learning Topics:** Exact course, domain, and syllabus coverage.
2. **Learning Objectives & Experience Level:** Foundations, intermediate mastery, or advanced application.
3. **Preferred Study Styles:**
   * *Silent Co-Study* — Focused accountability sessions with minimal verbal distraction.
   * *Collaborative Problem Solving* — Live collaborative debugging, exercise sets, and lab work.
   * *Discussion-Based Learning* — Conceptual debate, literature review, and group deconstruction.
   * *Peer Teaching* — Reciprocal concept presentations and guided walkthroughs.
   * *Examination Preparation* — Timed question drills, flashcard rounds, and mock testing.
4. **Schedule & Time Availability:** Weekly recurring availability windows and meeting cadences.
5. **Format & Modality:** Online sessions, in-person campus study, or flexible hybrid setups.
6. **Session Duration & Cadence:** Short bursts (45m), standard blocks (90m), or extended study marathons (120m+).
7. **Preferred Language:** Primary working communication language.
8. **Group Capacity:** Intimate micro-circles (2–4 members) up to collaborative cohorts (5–8 members).

Every recommendation provides a transparent breakdown explaining exactly why a circle fits a learner's criteria.

---

## Core Product Capabilities

* **Learner Study Profiles:** Define your focus topics, recurring availability blocks, and preferred study styles.
* **Curated Study Circles:** Browse, search, and filter study circles with rich multi-criteria filters.
* **Compatibility Breakdown:** View a clear compatibility index detailing overlap in schedule, style, and goals.
* **Circle Creation & Facilitation:** Empower hosts to set clear circle charters, expected pacing, and member caps.
* **Session Scheduling & RSVPs:** Schedule upcoming sessions, provide structured agendas, and track member RSVPs.
* **Personal Learning Dashboard:** Track active circles, upcoming study dates, and pending circle requests in one unified view.

---

## Architectural Direction

CohortCircle is built as a responsive, accessible client-side application designed for seamless performance across desktop and mobile devices:

* **Frontend Framework:** React (JavaScript / modern JSX)
* **Build Tooling:** Vite (rapid ESM-based development and optimized production bundling)
* **Styling System:** CSS Modules for encapsulated, maintainable, and standard-compliant styles
* **Component Architecture:** Reusable atomic primitives and feature-driven component slices
* **State & Persistence:** Decoupled application state with resilient browser-local persistence for the standalone prototype
* **Quality & Testing:** Vitest and React Testing Library for component verification; Playwright for cross-browser journeys
* **Target Runtime:** Node.js 24 LTS

---

## Accessibility & Design Principles

CohortCircle adheres to human-centered design principles and digital inclusion standards:

* **WCAG 2.2 AA Compliance:** High-contrast color palettes (minimum 4.5:1 for body copy), legible typography, visible focus rings, and proper semantic document landmarks.
* **Keyboard Navigability:** Full functional support for keyboard-only interactions and accessible screen-reader labels.
* **Responsive Layouts:** Seamless adaptation across smartphones, tablets, and desktop displays.
* **Privacy by Design:** Local-first data architecture, minimal data collection, and zero tracking of personal identifiers.

---

## Project Roadmap

The development of CohortCircle follows an empirical, user-centered 10-module engineering lifecycle:

| Module | Title | Primary Focus | Status |
|---|---|---|---|
| **01** | **Product Foundation & Project Definition** | Scope charter, problem hypothesis, requirements engineering, and governance | **Completed** |
| **02** | **Real User Research** | Operational research toolkit, contextual inquiry, student interviews, and exploratory survey | **Active** *(Instruments Prepared; Fieldwork Pending)* |
| **03** | **Research Synthesis & Personas** | Affinity mapping, empathy maps, proto-personas, and user journey flows | **Completed** *(Framework Prepared; Synthesis Pending)* |
| **04** | **Ideation & Conceptual Design** | Information architecture, user task flows, wireflows, and mental models | **Completed** |
| **05** | **Low-Fidelity Prototyping** | Paper prototypes, interactive wireframes, and usability exploration | *Not Started* |
| **06** | **Formative Usability Evaluation** | Heuristic evaluation, cognitive walkthroughs, and early interaction testing | *Not Started* |
| **07** | **High-Fidelity Design & Application Foundation** | Design tokens, accessible UI component library, and Vite client scaffolding | *Not Started* |
| **08** | **Functional Product Development** | State management, compatibility engine, session scheduling, and local persistence | *Not Started* |
| **09** | **Summative Usability Evaluation** | Rigorous 18-participant task evaluation (SUS, SEQ, completion rate, error analysis) | *Not Started* |
| **10** | **Analysis, Improvements & Final Release** | Evaluation synthesis, interface polish, and open-source release packaging | *Not Started* |

---

## Repository Structure

```text
CohortCircle/
├── .editorconfig              # Editor consistency configuration
├── .gitignore                 # Version control exclusions (with local private-research-data/)
├── LICENSE                    # MIT open-source license
├── README.md                  # Project overview and public documentation
└── docs/                      # Architectural, requirements, and research governance
    ├── ARCHITECTURE.md        # Technical architecture, domain models, and data flows
    ├── DECISION_LOG.md        # Architectural decision records and risk log
    ├── PROBLEM_HYPOTHESIS.md  # Unvalidated problem statement and validation criteria
    ├── PRODUCT_REQUIREMENTS.md# Functional (23 FRs) and Non-Functional (15 NFRs) specs
    ├── PROJECT_CHARTER.md     # Product identity, scope boundaries, and core principles
    ├── PROJECT_ROADMAP.md     # Detailed 10-module execution lifecycle and dependencies
    ├── PROJECT_STATE.md       # Current phase tracking and health indicators
    ├── RESEARCH_ETHICS.md     # Research participant rights, consent protocol, and privacy
    ├── RESEARCH_PLAN.md       # Triangulated research methodology and summative plan
    ├── research/              # Module 02 Operational Research Toolkit
    │   ├── README.md          # Research toolkit overview and identifier taxonomy
    │   ├── RECRUITMENT_AND_SAMPLING.md # Sampling matrix, screener, and outreach
    │   ├── CONTEXTUAL_INQUIRY_PROTOCOL.md # 3-site observation protocol across 5 dimensions
    │   ├── INTERVIEW_GUIDE.md # 4-phase semi-structured interview script (25-35m)
    │   ├── SURVEY_INSTRUMENT.md # 8-question exploratory survey questionnaire
    │   ├── FIELD_NOTE_TEMPLATE.md # Standardized observation recording template
    │   ├── INTERVIEW_NOTE_TEMPLATE.md # De-identified interview notes and coding sheet
    │   ├── SURVEY_CODEBOOK.md # Quantitative variable dictionary & Borda ranking
    │   ├── QUALITATIVE_ANALYSIS_PROTOCOL.md # 9-step thematic analysis & codebook
    │   ├── EVIDENCE_REGISTER.md # Master traceability matrix connecting RQs to evidence
    │   └── FIELDWORK_STATUS.md # Real-time recruitment and fieldwork execution monitor
    ├── synthesis/             # Module 03 Synthesis & Persona Framework
    │   ├── README.md          # Synthesis overview and audit summary
    │   ├── EVIDENCE_AUDIT.md  # Audit of local research records & gate decision
    │   ├── AFFINITY_MAPPING.md# 10-dimension clustering framework & card schema
    │   ├── EMPATHY_MAPS.md    # Learner & Host empathy maps with hypothesis pointers
    │   ├── PERSONA_DEVELOPMENT.md # 6 behavioral axes & anti-fictionalization rules
    │   ├── PERSONA_CATALOG.md # Unvalidated proto-personas (PROTO-01, 02, Host)
    │   ├── USER_JOURNEY_MAPS.md # End-to-end 8-stage peer learning journey & Mermaid
    │   ├── NEEDS_TRACEABILITY.md # Traceability matrix (RQs -> Needs -> FRs)
    │   ├── SYNTHESIS_LIMITATIONS.md # Boundary disclosure & risk mitigation
    │   └── PERSONA_VALIDATION_PLAN.md # Protocol for empirical elevation
    ├── conceptual-design/     # Module 04 Conceptual Design & Architecture
    │   ├── README.md          # Conceptual design overview & decision taxonomy
    │   ├── CONCEPT_ALTERNATIVES.md # 4 distinct concept models evaluated
    │   ├── CONCEPT_SELECTION.md # 8-criteria trade-off matrix & selection rationale
    │   ├── STORYBOARDS.md     # 4 visual narrative storyboards (6 frames each)
    │   ├── USER_SCENARIOS.md  # 4 operational scenarios (SCEN-01 to SCEN-04)
    │   ├── INFORMATION_ARCHITECTURE.md # Unified sitemap, navigation & role access
    │   ├── USER_TASK_FLOWS.md # 5 complete core task flows (FLOW-01 to FLOW-05)
    │   ├── WIREFLOWS.md       # 5 Mermaid wireflow diagrams with full error paths
    │   ├── MENTAL_MODEL_MAPPING.md # Translation matrix across 8 core domain concepts
    │   ├── DESIGN_TRACEABILITY.md # 100% bidirectional coverage (23 FRs & 15 NFRs)
    │   └── DESIGN_LIMITATIONS.md # Assumptions & formative test inquiries
    └── handovers/
        ├── MODULE_01_HANDOFF.md # Module 01 verification and baseline handoff
        ├── MODULE_02_HANDOFF.md # Module 02 research instrumentation handoff
        ├── MODULE_03_HANDOFF.md # Module 03 synthesis framework handoff
        └── MODULE_04_HANDOFF.md # Module 04 conceptual design handoff
```

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).

Copyright &copy; 2026 Muhammad Taimoor Ajmal.
