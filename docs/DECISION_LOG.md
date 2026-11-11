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

## 3. Active Research Questions for Module 02

1. **RQ-01:** What is the relative weight that learners place on schedule availability versus study style compatibility when deciding whether to join a peer group?
2. **RQ-02:** Do introverted learners experience greater discovery friction, and does a request-to-join flow with introductory notes provide sufficient psychological safety?
3. **RQ-03:** How do students currently resolve conflicts between members who want quiet focus versus those who prefer active conversation?
