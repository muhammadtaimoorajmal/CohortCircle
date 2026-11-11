# Product Lifecycle Roadmap: CohortCircle

> **Lifecycle Governance:** 10-Module User-Centered Engineering Sequence  
> **Current Module:** **Module 02: Real User Research (Active — Instrumentation Prepared & Fieldwork Pending)**
> **Stopping Policy:** Work strictly halts at the boundary of each module. Transition to the subsequent module requires owner review and explicit authorization.

---

## The 10-Module Implementation Sequence

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      10-MODULE IMPLEMENTATION LIFECYCLE                  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
   ┌─────────────────────────────────┴─────────────────────────────────┐
   ▼                                                                   ▼
[Phase 1: Discovery & Strategy]                        [Phase 2: Interaction Design]
   M01: Product Foundation (COMPLETED)                    M04: Ideation & Conceptual Design
   M02: Real User Research (ACTIVE)                       M05: Low-Fidelity Prototyping
   M03: Research Synthesis & Personas (NOT STARTED)       M06: Formative Usability Evaluation
                                     │
   ┌─────────────────────────────────┴─────────────────────────────────┐
   ▼                                                                   ▼
[Phase 3: Implementation]                              [Phase 4: Validation & Release]
   M07: High-Fidelity Design Foundation                   M09: Summative Usability Evaluation (18 Participants)
   M08: Functional Product Development                    M10: Improvements & Open-Source Release
```

---

## Detailed Module Breakdown

### Module 01: Product Foundation, Problem Definition & Project Governance *(COMPLETED)*
* **Objective:** Establish the foundational product identity, scope boundaries, problem hypothesis, requirements baseline, architecture blueprint, and open-source repository governance.
* **Core Deliverables:**
  * Project Charter, Problem Hypothesis, and Requirements Specification.
  * Research Strategy & Usability Evaluation Matrix Blueprint.
  * Software Architecture & Domain Model Proposal.
  * Public Open-Source Repository Baseline (`README.md`, `LICENSE`, `.editorconfig`, `.gitignore`).
  * Module 01 Handoff Report and Decision Log.
* **Input Dependencies:** Initial domain observations and project charter guidelines.
* **Acceptance Conditions:** All 15 Module 01 acceptance criteria verified; repository pushed to remote; explicit unvalidated flag on hypothesis; no fabricated research.
* **Status:** Completed, committed (`560a577`), and pushed to GitHub main branch.

---

### Module 02: Real User Research *(ACTIVE)*
* **Objective:** Prepare operational research instruments, recruit authentic student participants, and conduct empirical field investigations into study group behaviors, friction points, and mental models.
* **Core Deliverables:**
  * Operational Research Toolkit: 11 protocols, guides, templates, codebooks, and registers in [`docs/research/`](research/README.md).
  * Contextual inquiry protocols and field notes from 3 authentic student environments (`OBS-01` Library, `OBS-02` Lounge, `OBS-03` Cafeteria).
  * Semi-structured interview guide (25–35 min) and transcribed notes for 5–7 university students (`P-01` to `P-07`, `INT-01` to `INT-07`).
  * Exploratory survey instrument (8 questions), codebook, and quantitative response dataset (`SUR-DATA`).
  * Qualitative analysis protocol and master evidence traceability register (`docs/research/EVIDENCE_REGISTER.md`).
  * Module 02 Handoff Report (`docs/handovers/MODULE_02_HANDOFF.md`).
* **Input Dependencies:** Module 01 approved research plan and ethics consent protocols.
* **Acceptance Conditions:** All research instruments prepared and verified; private data isolation in `.gitignore`; zero fabricated data; empirical evidence validating, refining, or pivoting the working hypothesis.
* **Status:** Research Instrumentation Prepared — Empirical Fieldwork Pending.

---

### Module 03: Research Synthesis & Personas
* **Objective:** Synthesize raw empirical data into structured behavioral artifacts and user representations.
* **Core Deliverables:**
  * Affinity diagrams grouping empirical findings into thematic clusters.
  * Empathy maps for primary (Learner) and secondary (Host) user profiles.
  * Evidence-grounded user personas reflecting verified field behaviors (no fictional bios).
  * User journey maps highlighting emotional highs and friction points in study group formation.
* **Input Dependencies:** Completed empirical datasets from Module 02.
* **Acceptance Conditions:** Direct traceability between raw quotes/observations and synthesized persona goals and pain points.

---

### Module 04: Ideation & Conceptual Design
* **Objective:** Explore solution spaces, define system information architecture, and map intuitive user task flows.
* **Core Deliverables:**
  * Information Architecture (IA) sitemap and content hierarchy.
  * End-to-end user task flows for the 5 core benchmark workflows.
  * Wireflows illustrating screen transitions and decision forks.
  * Mental model mapping aligning user expectations with interface concepts.
* **Input Dependencies:** Synthesized user journeys and validated requirements from Module 03.
* **Acceptance Conditions:** Task flows support all 5 candidate benchmark evaluation tasks without dead ends or ambiguous branches.

---

### Module 05: Low-Fidelity Prototyping
* **Objective:** Rapidly materialize conceptual designs into low-fidelity paper and interactive wireframe prototypes for early structural testing.
* **Core Deliverables:**
  * Paper sketches and schematic wireframes for core screens (Dashboard, Discovery, Circle Profile, Creation Wizard, Session Scheduler).
  * Low-fidelity clickable wireframe prototype connecting all key task paths.
  * Formative evaluation test script and observer guide.
* **Input Dependencies:** Approved information architecture and task flows from Module 04.
* **Acceptance Conditions:** Prototype covers all 5 benchmark usability tasks with navigable low-fidelity interaction states.

---

### Module 06: Formative Usability Evaluation
* **Objective:** Identify early structural flaws, terminology confusion, and layout frictions prior to committing to high-fidelity code.
* **Core Deliverables:**
  * Heuristic evaluation report applying Nielsen’s 10 Usability Heuristics.
  * Cognitive walkthrough results with target representative learners.
  * Severity-rated usability issue log (Catastrophic, Major, Minor, Cosmetic).
  * Actionable design revisions matrix for high-fidelity design.
* **Input Dependencies:** Clickable low-fidelity prototype from Module 05.
* **Acceptance Conditions:** All identified Major and Catastrophic issues have verified design remediation proposals.

---

### Module 07: High-Fidelity Design & Application Foundation
* **Objective:** Establish the visual design system, accessibility tokens, component library, and Vite-React client foundation.
* **Core Deliverables:**
  * Comprehensive design token specification (color contrast, typography scales, spacing).
  * Accessible UI component primitives (Button, Card, Modal, Badge, Form Controls).
  * Initialized Vite-React project scaffold with CSS Modules and routing shell.
  * Accessibility audit verifying WCAG 2.2 Level AA compliance on design tokens.
* **Input Dependencies:** Remediated design specifications from Module 06.
* **Acceptance Conditions:** Clean build; zero linter errors; verified color contrast &ge; 4.5:1; fully operable keyboard navigation on primitive components.

---

### Module 08: Functional Product Development
* **Objective:** Implement complete end-to-end interactive capabilities, state management, compatibility algorithms, and browser persistence.
* **Core Deliverables:**
  * Fully interactive implementation of all functional requirements (FR-001 through FR-023).
  * Transparent rule-based compatibility engine with explainable criteria breakdown.
  * Local-first persistence engine with sample seed data utility.
  * Comprehensive unit tests (Vitest) and end-to-end journey tests (Playwright).
* **Input Dependencies:** Component foundation from Module 07 and architecture specification.
* **Acceptance Conditions:** All 5 usability evaluation task paths are 100% functional; zero faux buttons; test suite passes without regressions.

---

### Module 09: Summative User Participation Evaluation
* **Objective:** Execute formal usability benchmarking with 18 distinct participants across varied device and environmental contexts.
* **Core Deliverables:**
  * Summative test execution across 18 participants using the Latin-square allocation matrix.
  * Quantitative usability metrics: System Usability Scale (SUS), Single Ease Question (SEQ), Task Completion Rates, Time-on-Task.
  * Qualitative observation logs, user quotes, and error analysis.
  * Environmental impact analysis (Laptop vs. Mobile, Quiet vs. Distracting).
* **Input Dependencies:** Stable, functional application release from Module 08.
* **Acceptance Conditions:** Verified data from 18 genuine participants; calculation of mean SUS (target &ge; 80) and SEQ (target &ge; 5.5); comprehensive error categorization.

---

### Module 10: Analysis, Improvements & Final Release
* **Objective:** Synthesize evaluation results, implement verified UX refinements, and package the final open-source product release.
* **Core Deliverables:**
  * Final Usability & HCI Evaluation Report triangulating quantitative and qualitative findings.
  * Interface polish and usability bug fixes addressing summative feedback.
  * Final open-source software release tagged on GitHub (`v1.0.0`).
  * Comprehensive developer and deployment documentation.
* **Input Dependencies:** Evaluation findings and recommendations from Module 09.
* **Acceptance Conditions:** Verified resolution of high-severity usability issues; complete documentation; public release readiness.
