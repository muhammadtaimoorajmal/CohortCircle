# Concept Evaluation & Architecture Selection: CohortCircle

> **Governance Category:** Architectural Trade-off Analysis & Design Selection  
> **Status:** **PROVISIONAL DESIGN SELECTION CONFIRMED (RECOMMENDED UNIFIED WORKSPACE)**  
> **Integrity Notice:** The selection below represents an informed architectural synthesis combining the highest-leverage attributes of the four concept models. It is a provisional design recommendation grounded in requirement coverage, not an empirical claim of validated user consensus.

---

## 1. Multi-Criteria Trade-off Evaluation Matrix

Each of the four concept models (`A`, `B`, `C`, `D`) was systematically evaluated across eight critical architectural and human factors criteria on a standardized 5-point scale ($1 = \text{Poor / Inadequate}, 5 = \text{Exceptional / Comprehensive}$):

| Evaluation Criteria | Weight | Concept A: Compatibility First | Concept B: Community First | Concept C: Session First | Concept D: Host-Led Hub | Selected Unified Workspace |
|---|---|---|---|---|---|---|
| **1. Functional Requirement Coverage** *(FR-001 to FR-023)* | 20% | 4 / 5 | 3 / 5 | 3 / 5 | 4 / 5 | **5 / 5 (100% Coverage)** |
| **2. Discoverability & Browsing Ease** | 15% | 4 / 5 | 5 / 5 | 4 / 5 | 3 / 5 | **5 / 5 (Dual Browse & Match)** |
| **3. Workflow Clarity & Low Cognitive Load** | 15% | 4 / 5 | 3 / 5 | 4 / 5 | 4 / 5 | **5 / 5 (Step-by-Step Journeys)** |
| **4. Digital Accessibility (WCAG 2.2 AA)** | 10% | 4 / 5 | 4 / 5 | 3 / 5 | 4 / 5 | **5 / 5 (Semantic & Keyboard-First)** |
| **5. Compatibility Explainability** | 15% | 5 / 5 | 1 / 5 | 2 / 5 | 3 / 5 | **5 / 5 (Rule-Based Modals)** |
| **6. Implementation Feasibility (Local Storage)** | 10% | 4 / 5 | 5 / 5 | 4 / 5 | 4 / 5 | **5 / 5 (Local Storage Optimized)** |
| **7. Privacy & Data Minimization** | 5% | 4 / 5 | 3 / 5 | 4 / 5 | 5 / 5 | **5 / 5 (Zero PII / Local First)** |
| **8. Learner vs. Host Role Balance** | 10% | 3 / 5 | 3 / 5 | 3 / 5 | 3 / 5 | **5 / 5 (Unified Dual-Role Model)** |
| **Weighted Composite Score** | **100%** | **4.05 / 5.0** | **3.35 / 5.0** | **3.30 / 5.0** | **3.70 / 5.0** | **4.95 / 5.0 (Optimal)** |

---

## 2. Comparative Analysis of Individual Alternatives

### Why Concept A Alone is Insufficient
While Concept A delivers industry-leading compatibility matching and explainability, it imposes an upfront preference barrier. Users who want to casually inspect available circles before creating a profile are blocked. Furthermore, it treats groups as static rosters, lacking dynamic session planning tools.

### Why Concept B Alone Fails the Problem Statement
Concept B provides effortless browsing, but completely neglects the core thesis of CohortCircle: that unstructured chat groups and broad forums fail due to mismatched study habits and scheduling chaos (`PROBLEM_HYPOTHESIS.md`). Without compatibility scoring and capacity caps, Concept B repeats the exact failure modes of WhatsApp and Discord.

### Why Concept C Alone is Too Transactional
Concept C excels at answering "Where can I study tonight?", but treats peer learning as one-off episodic events. Real educational mastery requires sustained group continuity, mutual trust, and shared syllabi across an entire academic semester.

### Why Concept D Alone Excludes Reluctant Learners
Concept D provides excellent structure and host controls, but places too high an administrative burden on facilitators and creates excessive friction (approval queues) for introverted or novice learners seeking open micro-circles.

---

## 3. The Selected Architecture: The Unified CohortCircle Workspace

To achieve complete requirement coverage and resolve the trade-offs of the isolated concepts, the design lead formally selects the **Unified CohortCircle Workspace**.

```
┌────────────────────────────────────────────────────────────────────────┐
│               The Selected Unified Architecture Model                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
[Compatibility-First Discovery]   [Flexible Circle Architecture]  [Session & Agenda Coordination]
 (from Concept A)                 (from Concepts B & D)           (from Concept C)
 - Multi-criteria match score     - Open OR Moderated circles     - Scheduled session cards
 - Explainable breakdown modal    - Host controls & member caps   - Clear agendas & venue links
 - Non-blocking preference setup  - Clear charters & syllabi       - One-click RSVP tracking
```

### 3.1 Documented Selection Rationale:
1. **Unification of Dual Roles (`[REQ-DOC]`):** A single user account can simultaneously act as a primary learner in an Algorithms circle and a secondary facilitator in a Web Systems circle without switching context.
2. **Progressive Disclosure of Profiles (`[PROP-DES]`):** Users can immediately browse the open circle directory without mandatory onboarding, but are invited to declare study preferences to unlock personalized compatibility scoring and sorting.
3. **Hybrid Joining Policies (`[REQ-DOC]`):** Supports both **Direct Join** for open informal circles (`FR-013`) and **Request-to-Join** with introductory notes for curated cohorts (`FR-014`).
4. **End-to-End Operational Lifecycle (`[PROP-DES]`):** Connects discovery, evaluation, joining, scheduling, agenda-setting, and RSVP tracking into one unified Personal Study Dashboard (`FR-022`).
5. **Zero Backend Requirement (`[TECH-CON]`):** All matching calculations, session RSVPs, and profile updates operate entirely client-side via LocalStorage adapters, ensuring instant responses and total data privacy.

---

## 4. Architectural Decision Log Alignment

* **Decision Status:** `[CONFIRMED PROVISIONAL DESIGN DIRECTION]`
* **Logged Decision:** Recorded as `DEC-017` in [`docs/DECISION_LOG.md`](../DECISION_LOG.md).
* **Next Lifecycle Stage:** Storyboards, detailed user scenarios, and information architecture will be built strictly upon this Unified Workspace model.
