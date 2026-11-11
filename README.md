# CohortCircle

> **Find your people. Learn together.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: High-Fidelity Foundation](https://img.shields.io/badge/Status-Module%2007%20React%20Foundation-blue.svg)](#project-roadmap)
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

## Getting Started & Development

### Prerequisites
* **Node.js:** v24.x LTS (compatible with v20+)
* **npm:** v11.x (or modern npm)

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/muhammadtaimoorajmal/CohortCircle.git
cd CohortCircle
npm install
```

### Running the Local Development Server
Launch the Vite development server with instant Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will launch and be available at:
```text
http://localhost:5173
```

### Running Automated Tests
Run the Vitest route and component test suite:
```bash
npm run test
```

### Static Analysis & Linting
Run ESLint flat configuration check:
```bash
npm run lint
```

### Building for Production
Generate the optimized production bundle in `dist/`:
```bash
npm run build
npm run preview
```

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
| **05** | **Low-Fidelity Prototyping** | Standalone interactive digital wireframe (12 screens), tokens, and formative evaluation toolkit | **Completed** |
| **06** | **Formative Usability Evaluation** | Heuristic evaluation, cognitive walkthroughs, and prototype remediation | **Completed** *(Expert Inspected; Participant Validation Pending)* |
| **07** | **High-Fidelity Design & Application Foundation** | Real React 19 + Vite client app, design system tokens, 12 interactive routes | **Active** *(Foundation Established & Verified)* |
| **08** | **Functional Product Development** | State management, compatibility engine, session scheduling, and local persistence | *Not Started* |
| **09** | **Summative Usability Evaluation** | Rigorous 18-participant task evaluation (SUS, SEQ, completion rate, error analysis) | *Not Started* |
| **10** | **Analysis, Improvements & Final Release** | Evaluation synthesis, interface polish, and open-source release packaging | *Not Started* |

---

## Repository Structure

```text
CohortCircle/
├── index.html                 # HTML5 entry with fonts & meta
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Deterministic lockfile
├── vite.config.js             # Vite & Vitest configuration
├── eslint.config.js           # Modern ESLint configuration
├── .editorconfig              # Editor consistency configuration
├── .gitignore                 # Version control exclusions
├── LICENSE                    # MIT open-source license
├── README.md                  # Project overview and public documentation
├── src/                       # High-fidelity React application source
│   ├── main.jsx               # Application DOM entry mount
│   ├── App.jsx                # Router & AppProvider wrapper
│   ├── app/                   # AppRouter (12 routes) & AppShell layout
│   ├── components/            # Atomic primitives (Button, Card, Modal, Input)
│   ├── context/               # In-memory reactive state engine (AppContext)
│   ├── data/                  # Synthetic demo dataset (demoData.js)
│   ├── pages/                 # 12 core screen interfaces (public, learner, host, sessions)
│   ├── styles/                # CSS custom properties & global typography
│   └── test/                  # Automated Vitest test suite (setup.js, App.test.jsx)
└── docs/                      # Architectural, requirements, and research governance
    ├── ARCHITECTURE.md        # Technical architecture, domain models, and data flows
    ├── DECISION_LOG.md        # Architectural decision records (DEC-001 through DEC-032)
    ├── DESIGN_SYSTEM.md       # High-fidelity design tokens, contrast audits & components
    ├── TESTING.md             # Automated test strategy and verification results
    ├── PROBLEM_HYPOTHESIS.md  # Unvalidated problem statement and validation criteria
    ├── PRODUCT_REQUIREMENTS.md# Functional (23 FRs) and Non-Functional (15 NFRs) specs
    ├── PROJECT_CHARTER.md     # Product identity, scope boundaries, and core principles
    ├── PROJECT_ROADMAP.md     # Detailed 10-module execution lifecycle and dependencies
    ├── PROJECT_STATE.md       # Current phase tracking and health indicators
    ├── RESEARCH_ETHICS.md     # Research participant rights, consent protocol, and privacy
    ├── RESEARCH_PLAN.md       # Triangulated research methodology and summative plan
    ├── research/              # Module 02 Operational Research Toolkit (11 files)
    ├── synthesis/             # Module 03 Synthesis & Persona Framework (10 files)
    ├── conceptual-design/     # Module 04 Conceptual Design & Architecture (11 files)
    ├── prototypes/            # Module 05 Low-Fidelity Interactive Wireframes (8 files)
    ├── evaluation/            # Module 06 Formative Usability Evaluation (7 files)
    └── handovers/             # Verified module handoff reports (MODULE_01 to 07)
```

---

## Project Limitations & Research Boundaries

* **Local-First In-Memory Demonstration:** In Module 07, application state (circles, sessions, applicants, profile modifications) is maintained in-memory via React Context. Data modifications persist across client navigation but reset upon full browser reload unless restored via the Demo Data Console. Full persistent local storage synchronization will be implemented in Module 08.
* **Deterministic Matching:** Compatibility scores are computed using explicit mathematical weight heuristics rather than non-deterministic machine learning.
* **Empirical Fieldwork Status:** Research protocols and formative usability testing packets are prepared; empirical participant trials remain pending physical recruitment.

---

## Contributing

CohortCircle is an open-source project welcoming contributions that uphold our core design principles:
1. Ensure all new components comply with WCAG 2.2 AA accessibility standards.
2. Maintain zero external runtime UI frameworks; use CSS Modules and local SVGs.
3. Write automated unit/integration tests with Vitest for new feature journeys.
4. Run `npm run lint` and `npm run test` before submitting pull requests.

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).

Copyright &copy; 2026 Muhammad Taimoor Ajmal.
