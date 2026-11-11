# Product Lifecycle Roadmap: CohortCircle

> **Lifecycle Governance:** 10-Module User-Centered Engineering Sequence  
> **Current Module:** **Module 05: Low-Fidelity Prototyping (Completed & Verified)**
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
   M01: Product Foundation (COMPLETED)                    M04: Ideation & Conceptual Design (COMPLETED)
   M02: Real User Research (ACTIVE - FIELDWORK PENDING)   M05: Low-Fidelity Prototyping (COMPLETED)
   M03: Research Synthesis & Personas (COMPLETED)         M06: Formative Usability Evaluation (NOT STARTED)
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

### Module 02: Real User Research *(ACTIVE — FIELDWORK PENDING)*
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
* **Status:** Research Instrumentation Prepared & Committed (`9ca03e1`) — Empirical Fieldwork Pending.

---

### Module 03: Research Synthesis & Personas *(COMPLETED — FRAMEWORK PREPARED)*
* **Objective:** Synthesize raw empirical data into structured behavioral artifacts, empathy maps, proto-personas, and user journey flows.
* **Core Deliverables:**
  * Synthesis Toolkit: 10 operational specifications in [`docs/synthesis/`](synthesis/README.md).
  * Evidence availability audit and local storage pre-synthesis gate (`docs/synthesis/EVIDENCE_AUDIT.md`).
  * Affinity mapping framework (10 dimensions, card schema, Mermaid topology).
  * 6-quadrant empathy maps for Learner and Host roles with hypothesis pointers.
  * Behavioral spectrum axes and persona development methodology without demographic stereotyping.
  * Three unvalidated proto-personas (`PROTO-LEARN-01`, `PROTO-LEARN-02`, `PROTO-HOST-01`).
  * End-to-end 8-stage user journey map with emotional valence curve.
  * Bidirectional needs traceability matrix (`NEED-001`–`008` mapped to 23 FRs and 15 NFRs).
  * Persona validation plan with operational falsification and elevation criteria.
  * Module 03 Handoff Report (`docs/handovers/MODULE_03_HANDOFF.md`).
* **Input Dependencies:** Completed empirical datasets or framework instrumentation from Module 02.
* **Acceptance Conditions:** Pre-synthesis audit executed; zero fabricated findings; explicit `UNVALIDATED PROTO-PERSONA` labeling; complete traceability matrix established.
* **Status:** Framework Prepared, Committed (`474b0d9`), and Verified — Empirical Synthesis Pending Fieldwork Collection.

---

### Module 04: Ideation & Conceptual Design *(COMPLETED)*
* **Objective:** Explore solution spaces, select optimal architecture, define system information architecture, map intuitive task flows and wireflows, and bridge user mental models.
* **Core Deliverables:**
  * Conceptual Design Toolkit: 11 operational specifications in [`docs/conceptual-design/`](conceptual-design/README.md).
  * Four distinct concept models evaluated across 8 weighted criteria (`CONCEPT_ALTERNATIVES.md`, `CONCEPT_SELECTION.md`).
  * Four 6-frame visual narrative storyboards across core user situations (`STORYBOARDS.md`).
  * Four detailed operational scenarios with failure recovery paths (`USER_SCENARIOS.md`).
  * Unified Information Architecture, Mermaid sitemap, and role-based access matrix (`INFORMATION_ARCHITECTURE.md`).
  * Five complete user task flows with step-by-step logic (`USER_TASK_FLOWS.md`).
  * Five Mermaid wireflows with exhaustive error handling and state recovery paths (`WIREFLOWS.md`).
  * Mental model mapping across 8 core domain concepts (`MENTAL_MODEL_MAPPING.md`).
  * 100% requirements traceability matrix covering 23 FRs and 15 NFRs (`DESIGN_TRACEABILITY.md`).
  * Conceptual design limitations and formative usability test questions (`DESIGN_LIMITATIONS.md`).
  * Module 04 Handoff Report (`docs/handovers/MODULE_04_HANDOFF.md`).
* **Input Dependencies:** Synthesized user journeys, proto-personas, and requirements baseline from Module 01–03.
* **Acceptance Conditions:** All 4 concepts evaluated; unified workspace selected; 5 task flows and wireflows completed; all 23 FRs and 15 NFRs traced; zero false validation claims.
* **Status:** Completed, verified, and ready for low-fidelity prototyping.

---

### Module 05: Low-Fidelity Prototyping *(COMPLETED & VERIFIED)*
* **Objective:** Rapidly materialize conceptual designs into low-fidelity paper and interactive wireframe prototypes for early structural testing.
* **Core Deliverables:**
  * Standalone, self-contained interactive digital wireframe prototype ([`docs/prototypes/module05/index.html`](prototypes/module05/index.html)) with zero external dependencies.
  * Structural wireframe design tokens and typography specification ([`docs/prototypes/module05/WIREFRAME_SPECIFICATION.md`](prototypes/module05/WIREFRAME_SPECIFICATION.md)).
  * Full 12-screen functional inventory and modal dialog specification ([`docs/prototypes/module05/SCREEN_INVENTORY.md`](prototypes/module05/SCREEN_INVENTORY.md)).
  * Complete requirements traceability matrix covering 23 FRs and 15 NFRs ([`docs/prototypes/module05/TASK_COVERAGE_MATRIX.md`](prototypes/module05/TASK_COVERAGE_MATRIX.md)).
  * Formative evaluation testing script with 5 benchmark tasks for Module 06 ([`docs/prototypes/module05/FORMATIVE_TEST_SCRIPT.md`](prototypes/module05/FORMATIVE_TEST_SCRIPT.md)).
  * Neutral facilitation and think-aloud observer guide ([`docs/prototypes/module05/OBSERVER_GUIDE.md`](prototypes/module05/OBSERVER_GUIDE.md)).
  * WCAG 2.2 Level AA accessibility compliance audit ([`docs/prototypes/module05/ACCESSIBILITY_CHECKLIST.md`](prototypes/module05/ACCESSIBILITY_CHECKLIST.md)).
  * Module 05 Handoff Report ([`docs/handovers/MODULE_05_HANDOFF.md`](handovers/MODULE_05_HANDOFF.md)).
* **Input Dependencies:** Approved information architecture and task flows from Module 04.
* **Acceptance Conditions:** Prototype covers all 5 benchmark usability tasks with navigable low-fidelity interaction states; zero dead navigation paths; WCAG 2.2 AA verified.
* **Status:** Completed, verified, and ready for Module 06 formative usability testing.

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
