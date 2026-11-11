# CohortCircle

> **Find your people. Learn together.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Foundation Phase](https://img.shields.io/badge/Status-Module%2001%20Foundation-success.svg)](#roadmap)
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

| Module | Title | Primary Focus |
|---|---|---|
| **01** | **Product Foundation & Project Definition** *(Current)* | Scope charter, problem hypothesis, requirements engineering, and governance |
| **02** | **Real User Research** | Contextual inquiry, semi-structured student interviews, and exploratory survey |
| **03** | **Research Synthesis & Personas** | Affinity diagrams, empathy maps, and evidence-grounded user personas |
| **04** | **Ideation & Conceptual Design** | Information architecture, user task flows, and mental model mapping |
| **05** | **Low-Fidelity Prototyping** | Paper prototypes, interactive wireframes, and usability exploration |
| **06** | **Formative Usability Evaluation** | Heuristic evaluation, cognitive walkthroughs, and early interaction testing |
| **07** | **High-Fidelity Design & Application Foundation** | Design tokens, accessible UI component library, and Vite client scaffolding |
| **08** | **Functional Product Development** | State management, compatibility engine, session scheduling, and local persistence |
| **09** | **Summative Usability Evaluation** | Rigorous 18-participant task evaluation (SUS, SEQ, completion rate, error analysis) |
| **10** | **Analysis, Improvements & Final Release** | Evaluation synthesis, interface polish, and open-source release packaging |

---

## Repository Structure

```text
CohortCircle/
├── .editorconfig              # Editor consistency configuration
├── .gitignore                 # Version control exclusions
├── LICENSE                    # MIT open-source license
├── README.md                  # Project overview and public documentation
└── docs/                      # Architectural, requirements, and research governance
    ├── ARCHITECTURE.md        # Technical architecture, domain models, and data flows
    ├── DECISION_LOG.md        # Architectural decision records and risk log
    ├── PROBLEM_HYPOTHESIS.md  # Unvalidated problem statement and validation criteria
    ├── PRODUCT_REQUIREMENTS.md# Functional (FR) and Non-Functional (NFR) specifications
    ├── PROJECT_CHARTER.md     # Product identity, scope boundaries, and core principles
    ├── PROJECT_ROADMAP.md     # Detailed 10-module execution lifecycle and dependencies
    ├── PROJECT_STATE.md       # Current phase tracking and health indicators
    ├── RESEARCH_ETHICS.md     # Research participant rights, consent protocol, and privacy
    ├── RESEARCH_PLAN.md       # Contextual inquiry, interview scripts, and survey design
    └── handovers/
        └── MODULE_01_HANDOFF.md # Module 01 verification, checklist, and phase handoff
```

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).

Copyright &copy; 2026 Muhammad Taimoor Ajmal.
