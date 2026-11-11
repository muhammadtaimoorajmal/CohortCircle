# Architectural & Project Decision Register: CohortCircle

> **Document Purpose:** Systematic log of architectural, scope, procedural, and research governance decisions across the CohortCircle project lifecycle.

---

## 1. Decision Status Taxonomy

* **[CONFIRMED]:** Formally decided and established; forms active project baseline.
* **[WORKING ASSUMPTION]:** Unvalidated operational baseline; subject to change based on research findings.
* **[RESEARCH QUESTION]:** Explicit open inquiry slated for empirical investigation in upcoming research.
* **[PENDING USER CONFIRMATION]:** Action or decision blocked awaiting explicit input or confirmation from the project owner.

---

## 2. Decision Register

### DEC-001: Standalone Open-Source Product Identity
* **Status:** `[CONFIRMED]`
* **Context:** Determining whether the project is developed as an academic exercise simulator or a standalone software product.
* **Decision:** CohortCircle is engineered as a generalizable, production-grade open-source product for students and independent learners worldwide. All academic lab instructions, assignment numbering, student IDs, and instructor names are strictly excluded from public repository artifacts and application interfaces.
* **Date:** 2026-11-11
* **Impact:** Professional codebase; universal utility; high portfolio and open-source value.

---

### DEC-002: Critical Open Decision — Final Year Project (FYP) Alignment
* **Status:** `[PENDING USER CONFIRMATION]`
* **Context:** The academic course context recommends selecting a project system aligned with the group's undergraduate Final Year Project (FYP) topic.
* **Current State:** The specific undergraduate FYP title and domain have **not yet been supplied** by the repository owner.
* **Action Required:** Product maintainer (Muhammad Taimoor Ajmal) must confirm whether CohortCircle directly aligns with their FYP topic, or if FYP details should be linked in subsequent modules.
* **Integrity Guarantee:** In accordance with project integrity standards, we make **zero unverified claims** regarding FYP alignment until explicit confirmation is provided.
* **Date:** 2026-11-11

---

### DEC-003: Core Product Differentiation via Explainable Compatibility
* **Status:** `[CONFIRMED]`
* **Context:** Avoiding generic social chat apps or uncurated bulletin boards.
* **Decision:** CohortCircle differentiates itself through transparent, rule-based compatibility matching across learning topics, weekly availability, study styles (silent co-study, collaborative problem-solving, discussion-based, peer teaching, exam prep), format, and group size. Opaque black-box AI claims are explicitly rejected in favor of auditable matching rules.
* **Date:** 2026-11-11
* **Impact:** High user trust, transparent UX, and clear mental models for learners.

---

### DEC-004: Frontend Architecture & Technology Stack
* **Status:** `[CONFIRMED]`
* **Context:** Selecting development stack balancing performance, accessibility, ease of contribution, and local reproducibility.
* **Decision:** Use React 18+ with Vite build tooling, JavaScript/JSX, and CSS Modules. Testing via Vitest, React Testing Library, and Playwright. Node.js v24.x LTS as the verified runtime environment.
* **Date:** 2026-11-11
* **Impact:** Fast development feedback loop, zero CSS-in-JS runtime tax, accessible DOM control.

---

### DEC-005: Local-First Storage Architecture for Prototype Lifecycle
* **Status:** `[CONFIRMED]`
* **Context:** Managing data persistence during design, development, and usability evaluation phases without introducing external backend maintenance overhead.
* **Decision:** Implement a robust LocalStorage service adapter with pre-seeded sample data fixtures and reset controls. Backend APIs and cloud databases are excluded from the initial prototype scope.
* **Date:** 2026-11-11
* **Impact:** 100% portable, zero-cost deployment, instantaneous response times, zero privacy leakage of student data to third-party cloud servers.

---

### DEC-006: Deliberate Scope Exclusions for Initial Product
* **Status:** `[CONFIRMED]`
* **Context:** Preventing scope creep during the 10-module lifecycle.
* **Decision:** The following features are explicitly out of scope for the initial release:
  * In-app real-time audio/video calls (external meeting links are used instead).
  * WebSocket real-time chat infrastructure (group coordination occurs via scheduled sessions and agendas).
  * Direct two-way external calendar sync (ICS calendar download may be considered post-v1.0).
  * Payment gateways or monetization mechanics.
* **Date:** 2026-11-11
* **Impact:** Clear engineering focus on discovery, compatibility, and session planning.

---

### DEC-007: Working Problem Statement as an Unvalidated Hypothesis
* **Status:** `[WORKING ASSUMPTION]`
* **Context:** Stating the problem solved by CohortCircle.
* **Decision:** The working problem hypothesis is formally recorded as unvalidated: *"University and independent learners need a reliable way to discover and coordinate compatible study groups because finding peers with matching learning goals, availability and preferred study styles can be fragmented and difficult."*
* **Date:** 2026-11-11
* **Impact:** Prevents premature confirmation bias; guides Module 02 empirical research design.

---

### DEC-008: Usability Evaluation Scale & Context Matrix
* **Status:** `[CONFIRMED]`
* **Context:** Sizing the sample population and environmental parameters for summative usability evaluation.
* **Decision:** Establish an exact target of 18 distinct participants for Module 09 summative testing across balanced device (Laptop vs. Mobile) and ambient conditions (Quiet vs. Distracting), evaluated against SUS, SEQ, task completion, and error rate.
* **Date:** 2026-11-11
* **Impact:** Methodologically sound, statistically meaningful usability evaluation following human factors standards.

---

### DEC-009: Public Repository Privacy Boundary & Local Data Isolation
* **Status:** `[CONFIRMED]`
* **Context:** Operating research documentation within a public GitHub repository without exposing participant PII, raw recordings, or unredacted transcripts.
* **Decision:** Strict isolation between public repository files and local-only research assets. Created `private-research-data/` in `.gitignore` for raw audio (`*.raw.audio`), raw transcripts, and signed consent sheets. Public repository files contain only operational protocols, blank templates, and de-identified aggregate summaries using aliases (`P-01`, `INT-01`, `OBS-01`).
* **Date:** 2026-11-11
* **Impact:** Full protection of participant privacy; 100% compliance with ethical computing standards and public open-source repository governance.

---

### DEC-010: Triangulated Empirical Research Architecture & 8 Core Research Questions
* **Status:** `[CONFIRMED]`
* **Context:** Structuring empirical inquiry to comprehensively evaluate study group behaviors and failure modes.
* **Decision:** Formulated 8 core research questions (`RQ-01` through `RQ-08`) addressed through triangulated methodology: Contextual Inquiry across 3 sites (`OBS-01` Library, `OBS-02` Lounge, `OBS-03` Cafeteria), Semi-Structured Interviews with 5–7 students (`INT-01` to `INT-07`), and an Exploratory Survey (planning target: 30–50 responses).
* **Date:** 2026-11-11
* **Impact:** Multi-method validation preventing single-source bias.

---

### DEC-011: Core Sampling Cohort & Supplementary Group Distinction
* **Status:** `[CONFIRMED]`
* **Context:** Defining the qualifying participant cohort for qualitative interviews.
* **Decision:** The core qualitative sample requires 5 to 7 enrolled university students across STEM, humanities, and business, with balanced representation of residential and commuter students. Independent learners may participate as a supplementary group, but cannot replace the required core student sample.
* **Date:** 2026-11-11
* **Impact:** Ensures grounded relevance to university learning realities while accommodating self-paced learners.

---

### DEC-012: Reconciled Non-Functional Requirements Count (15 NFRs)
* **Status:** `[CONFIRMED]`
* **Context:** Reconciling discrepancy between some Module 01 summaries stating 11 NFRs and the actual 15 NFRs defined in `docs/PRODUCT_REQUIREMENTS.md`.
* **Decision:** Confirmed 15 non-functional requirements (4 Accessibility, 2 Responsiveness, 3 Usability, 2 Performance, 1 Reliability, 2 Privacy, 1 Browser Compatibility) and aligned all summary metrics across the repository.
* **Date:** 2026-11-11
* **Impact:** Complete internal document consistency and auditability.

---

### DEC-013: Pre-Synthesis Evidence Audit & Framework Branch Activation
* **Status:** `[CONFIRMED]`
* **Context:** Determining whether empirical records exist in local storage (`private-research-data/`) prior to persona formulation.
* **Decision:** Following a formal audit confirming 0 raw interview transcripts and 0 survey responses, activate Branch B (Framework Mode). Fully instrument the affinity mapping, empathy, and persona structures without fabricating empirical records.
* **Date:** 2026-11-11
* **Impact:** Uncompromising scientific integrity; zero fake findings or fabricated interviews.

---

### DEC-014: Explicit Proto-Persona Classification & Role Architecture
* **Status:** `[CONFIRMED]`
* **Context:** Designing personas prior to the completion of empirical fieldwork.
* **Decision:** All personas authored in Module 03 (`PROTO-LEARN-01`, `PROTO-LEARN-02`, and `PROTO-HOST-01`) are formally designated as `UNVALIDATED PROTO-PERSONAS`. They represent structured behavioral hypotheses across 6 spectrum axes, subject to empirical validation or falsification.
* **Date:** 2026-11-11
* **Impact:** Transparent boundary between domain hypotheses and verified empirical profiles.

---

### DEC-015: Anti-Fictionalization Standards in User Modeling
* **Status:** `[CONFIRMED]`
* **Context:** Deciding visual, demographic, and narrative formats for user personas.
* **Decision:** Strictly prohibit fictional stock portraits, fabricated personal names, arbitrary ages, and fictional biographies. Personas are modeled around behavioral archetypes, study styles, and systemic friction points.
* **Date:** 2026-11-11
* **Impact:** High professional credibility; alignment with advanced HCI and goal-directed design standards.

---

### DEC-016: Bidirectional Traceability Pipeline
* **Status:** `[CONFIRMED]`
* **Context:** Connecting research inquiries with product scope and user modeling.
* **Decision:** Maintain unbroken traceability connecting `RQ-01`–`08` &rarr; Evidence Sources &rarr; Analytical Codes &rarr; 10 Affinity Clusters &rarr; User Needs (`NEED-001`–`008`) &rarr; Proto-Personas &rarr; 23 Functional Requirements (`FR-001`–`023`).
* **Date:** 2026-11-11
* **Impact:** Complete auditability from user needs through to software requirements.

---

### DEC-017: Selection of the Unified CohortCircle Workspace Architecture
* **Status:** `[CONFIRMED PROVISIONAL DESIGN DIRECTION]`
* **Context:** Selecting an optimal conceptual model among four alternatives (Compatibility-First, Community-First, Session-First, Host-Led Hub).
* **Decision:** Formally select the Unified Workspace model combining compatibility-first discovery with flexible circle hosting and structured session coordination, scoring 4.95/5.0 across an 8-criteria weighted trade-off matrix.
* **Date:** 2026-11-11
* **Impact:** 100% functional requirement coverage (`FR-001`–`023`); balanced learner and host ergonomics.

---

### DEC-018: Progressive Disclosure of Profile Preferences
* **Status:** `[CONFIRMED]`
* **Context:** Deciding whether profile setup should block initial directory browsing.
* **Decision:** Allow unauthenticated or new users to freely browse and search the circle directory immediately, while progressively inviting them to configure study preferences to unlock personalized compatibility scoring and sorting.
* **Date:** 2026-11-11
* **Impact:** Minimizes onboarding bounce rates while preserving high-value matchmaking utility.

---

### DEC-019: Contextual Dual-Role Architecture
* **Status:** `[CONFIRMED]`
* **Context:** Managing learner vs. host permissions without requiring separate accounts or complex role-switching modals.
* **Decision:** Implement role permissions contextually per-circle. A user operates as a primary learner in joined circles, while accessing facilitator controls for circles they own via the persistent "Host Hub".
* **Date:** 2026-11-11
* **Impact:** Fluid UX; zero account-switching friction; supports student peer-leaders effectively.

---

### DEC-020: Structured Agenda & 1-Click RSVP Session Architecture
* **Status:** `[CONFIRMED]`
* **Context:** Designing session scheduling to prevent study group flakiness and momentum drop.
* **Decision:** Require explicit session agendas during scheduling and provide 1-click RSVP toggles (Attending / Declined) with real-time attendee lists displayed on the session cards.
* **Date:** 2026-11-11
* **Impact:** Direct mitigation of `CODE-MOMENTUM-DROP` and `CODE-SCHED-FATIGUE` without external calendar dependencies.

---

### DEC-021: Low-Fidelity Digital Wireframe Implementation Strategy
* **Status:** `[CONFIRMED]`
* **Context:** Choosing the implementation technology stack for the Module 05 low-fidelity prototype.
* **Decision:** Implement the prototype as a standalone, self-contained single-page HTML document (`docs/prototypes/module05/index.html`) using semantic HTML5, embedded CSS, and vanilla JavaScript without external npm packages, Node runtime dependencies, or backend infrastructure. Keep the repository root clean for production React application establishment in Module 07.
* **Date:** 2026-11-11
* **Impact:** Immediate portability; executes via `file:///` protocol in any browser; zero installation or build overhead for usability testing.

---

### DEC-022: Grayscale Aesthetic System & No Color-Only Communication
* **Status:** `[CONFIRMED]`
* **Context:** Defining the visual language and accessibility parameters for low-fidelity prototyping.
* **Decision:** Strictly restrict interface styling to neutral grayscale design tokens (`#ffffff` through `#212529`), explicit 1px/2px structural borders, and boxy wireframe placeholders. All status indicators, tags, and validation states must incorporate explicit textual labels in strict compliance with WCAG 2.2 Level AA Criterion 1.4.1 (Use of Color).
* **Date:** 2026-11-11
* **Impact:** Prevents superficial aesthetic bias during user evaluation; maximizes testing focus on layout, hierarchy, and interaction mechanics.

---

### DEC-023: In-Memory Demonstration Data Engine with Togglable Empty States
* **Status:** `[CONFIRMED]`
* **Context:** Managing state transitions, data mutations, and empty-state evaluations without a persistent database.
* **Decision:** Implement a centralized in-memory reactive state engine pre-seeded with 5 illustrative study circles, active memberships, and upcoming sessions. Equip the prototype with Screen 12 (Demo Data Engine) allowing 1-click state reset, initial seed restoration, and togglable empty-state views for Dashboard and My Circles.
* **Date:** 2026-11-11
* **Impact:** Enables deterministic, repeatable test sessions during usability studies with zero data leakage or session cross-contamination.

---

### DEC-024: Formative Evaluation Instrumentation Without Fabricated Results
* **Status:** `[CONFIRMED]`
* **Context:** Preparing evaluation instruments for formative usability testing.
* **Decision:** Author comprehensive benchmark task scripts (Tasks 01–05), Think-Aloud facilitator guidelines, observation sheets, and SUS questionnaires in Module 05, while strictly prohibiting the fabrication of completed test scores, participant observations, or survey results. Empirical evaluation is reserved exclusively for Module 06.
* **Date:** 2026-11-11
* **Impact:** Preserves absolute scientific integrity; establishes clear lifecycle phase boundaries.

---

### DEC-025: Formative Usability Evaluation Methodology & Research Integrity Policy
* **Status:** `[CONFIRMED]`
* **Context:** Establishing formative usability evaluation methodology and maintaining strict research integrity boundaries during Module 06.
* **Decision:** Apply dual-method expert inspection (Nielsen's 10 Heuristics and Persona-Based Analytical Cognitive Walkthroughs) across Screens 01–12 and Tasks 01–05. Maintain explicit distinction between analytical predictions and empirical user observations. Document actual participant testing as pending fieldwork recruitment, and provide blank data-collection templates (`PARTICIPANT_SESSION_TEMPLATE.md`).
* **Date:** 2026-11-11
* **Impact:** Absolute scientific integrity; zero fabricated SUS scores or fictitious participant quotes.

---

### DEC-026: Low-Fidelity Prototype Usability Repair Strategy
* **Status:** `[CONFIRMED]`
* **Context:** Deciding which formative usability issues should be remediated immediately in the low-fidelity prototype vs. deferred to high-fidelity design.
* **Decision:** Safely remediate critical interaction and validation issues in `docs/prototypes/module05/index.html` (Scope A: `UX-001` wizard cancel confirmation, `UX-002` applicant decline confirmation, `UX-003` past date prevention, `UX-004` dynamic profile completeness, `UX-005` cell label clarity, `UX-006` CTA standardization, `UX-007` contextual scheduler default, `UX-008` availability presets, `UX-010` `aria-describedby` linkage, `UX-011` policy badge explanations, `UX-012` bottom save CTA, `UX-013` secondary reset) while strictly preserving its grayscale wireframe aesthetic. Defer structural layout and visual styling (`UX-009`) to Module 07.
* **Date:** 2026-11-11
* **Impact:** Hardens the prototype for empirical participant testing without premature visual bloat.

---

### DEC-027: Explicit Status Declaration Policy for Incomplete Fieldwork
* **Status:** `[CONFIRMED]`
* **Context:** Formally declaring the completion status of Module 06 in handoff and governance documentation when empirical participant testing is pending.
* **Decision:** Formally declare milestone status as `MODULE 06 EXPERT INSPECTION COMPLETED — PARTICIPANT VALIDATION PENDING`. Prohibit false declarations of complete empirical testing until 5–7 consenting human participants have completed evaluations.
* **Date:** 2026-11-11
* **Impact:** Complete transparency; strict compliance with open-source project standards.

---

### DEC-028: Formative Error Severity Taxonomy Standard
* **Status:** `[CONFIRMED]`
* **Context:** Standardizing severity ratings for usability defects identified during formative evaluation.
* **Decision:** Adopt a 4-tier severity taxonomy: CATASTROPHIC (workflow blocked/data loss), MAJOR (key task blocked or heavy workaround required), MINOR (confusion or recoverable friction), and COSMETIC (minor visual/verbal inconsistency).
* **Date:** 2026-11-11
* **Impact:** Objective prioritization of design revisions for Module 07.

---

### DEC-029: React 19 & Vite Architecture Baseline for Module 07
* **Status:** `[CONFIRMED]`
* **Context:** Selecting the production technology stack and build tooling for the real CohortCircle frontend application.
* **Decision:** Implement the application using React 19, Vite 6, and React Router 7. Provide full client-side routing across 12 required interfaces with Node 24 target compatibility.
* **Date:** 2026-11-11
* **Impact:** Modern ESM performance, fast dev server startup, robust automated testing via Vitest and Testing Library.

---

### DEC-030: Component-Scoped Styling via CSS Modules & Brand Tokens
* **Status:** `[CONFIRMED]`
* **Context:** Implementing the visual design system without heavy external CSS frameworks or vendor lock-in.
* **Decision:** Adopt CSS Modules (`*.module.css`) paired with standard CSS custom properties in `src/styles/variables.css`. Incorporate deep navy/dark ink (`#0f172a`), fresh violet/indigo (`#4f46e5`), subtle teal (`#0d9488`), and an 8px spatial grid.
* **Date:** 2026-11-11
* **Impact:** 100% encapsulated styles, zero runtime CSS-in-JS overhead, WCAG 2.2 AA compliant contrast (18.7:1 for body copy).

---

### DEC-031: Local In-Memory State Engine with Synthetic Demonstration Dataset
* **Status:** `[CONFIRMED]`
* **Context:** Providing responsive client-side state across 12 screens before backend integration in Module 08.
* **Decision:** Implement a centralized `AppContext` provider initialized with realistic synthetic demo data (`src/data/demoData.js`) covering varied subjects (Algorithms, HCI Studio, Distributed Systems, Math Proofs, Language Exchange). Provide factory reset and seed restoration in the Settings page.
* **Date:** 2026-11-11
* **Impact:** Zero external backend dependency; fluid interactivity; absolute privacy isolation with synthetic identities.

---

### DEC-032: Resolution of Tablet Layout Defect UX-009 via Adaptive Layouts
* **Status:** `[CONFIRMED]`
* **Context:** Resolving usability defect `UX-009` (tablet viewport column crowding) identified during Module 06.
* **Decision:** Implement responsive CSS breakpoints where tablet viewports (768px–1024px) automatically collapse the sidebar to an icon-only rail (76px), stack dashboard and profile columns, and wrap multi-criteria filters cleanly.
* **Date:** 2026-11-11
* **Impact:** Fluid tablet usability across iPad portrait and landscape orientations without horizontal scroll or layout collision.

---

## 3. Active Research Questions for Module 02

1. **RQ-01:** What is the relative weight that learners place on schedule availability versus study style compatibility when deciding whether to join a peer group?
2. **RQ-02:** Do introverted learners experience greater discovery friction, and does a request-to-join flow with introductory notes provide sufficient psychological safety?
3. **RQ-03:** How do students currently resolve conflicts between members who want quiet focus versus those who prefer active conversation?
