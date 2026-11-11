# Conceptual Design & Information Architecture: CohortCircle

> **Lifecycle Milestone:** Module 04 of 10  
> **Status:** **CONCEPTUAL DESIGN BASELINE ESTABLISHED**  
> **Governance Notice:** Grounded in the project requirements (`FR-001` to `FR-023`, `NFR-001` to `NFR-015`) and provisional research synthesis (`PROTO-LEARN-01`, `PROTO-LEARN-02`, `PROTO-HOST-01`). In accordance with research integrity, all conceptual design decisions are classified as documented requirements, provisional hypotheses, design proposals, or technical constraints. **Zero false claims of completed usability validation are made.**

---

## 1. Overview & Purpose

Module 04 bridges the gap between problem synthesis and physical prototyping. The objective is to systematically explore diverse structural concepts for study group formation, select an optimal unified architecture, map intuitive mental models, and define end-to-end task flows and wireflows covering all core user journeys.

This directory houses the comprehensive conceptual design specifications for CohortCircle, providing a complete structural blueprint for the low-fidelity prototyping in Module 05 and high-fidelity component architecture in Module 07.

---

## 2. Decision Classification Taxonomy

To ensure intellectual honesty and methodological rigor, every design choice in this module is explicitly classified into one of four governance tiers:

* **`[REQ-DOC]` Documented Requirement:** Direct derivation from confirmed functional specifications (`FR-001`–`FR-023`) or non-functional criteria (`NFR-xxx`).
* **`[HYP-RES]` Provisional Research Hypothesis:** Grounded in provisional behavioral models (`PROTO-LEARN-01`, `PROTO-LEARN-02`, `PROTO-HOST-01`) or journey friction analyses, subject to empirical validation.
* **`[PROP-DES]` Design Proposal:** Proposed interaction pattern, layout hierarchy, or navigational convention formulated to maximize usability and clarity.
* **`[TECH-CON]` Technical Constraint:** Driven by client-side local persistence, modern browser standards, or accessibility benchmarks (WCAG 2.2 Level AA).

---

## 3. Conceptual Design Deliverables Directory

The conceptual design package comprises eleven operational specifications:

| Deliverable | Focus & Scope |
|---|---|
| [`CONCEPT_ALTERNATIVES.md`](CONCEPT_ALTERNATIVES.md) | Exploration of four distinct conceptual models (Compatibility-First, Community-First, Session-First, Host-Led Hub). |
| [`CONCEPT_SELECTION.md`](CONCEPT_SELECTION.md) | Structured 8-criteria trade-off comparison matrix and documented selection rationale for the Unified Workspace model. |
| [`STORYBOARDS.md`](STORYBOARDS.md) | 6-frame visual narrative storyboards across four core user situations (Discovery, Compatibility, Circle Creation, Session Management). |
| [`USER_SCENARIOS.md`](USER_SCENARIOS.md) | In-depth operational scenarios detailing preconditions, success paths, alternative flows, and recovery mechanisms. |
| [`INFORMATION_ARCHITECTURE.md`](INFORMATION_ARCHITECTURE.md) | Unified sitemap, navigation hierarchy, role-based access matrix, and page-to-requirement mapping supporting Learner and Host roles. |
| [`USER_TASK_FLOWS.md`](USER_TASK_FLOWS.md) | Detailed step-by-step logic for the five core tasks (Profile, Discovery, Compatibility/Join, Host Management, Session/Dashboard). |
| [`WIREFLOWS.md`](WIREFLOWS.md) | Complete Mermaid wireflow diagrams for all five workflows, explicitly handling edge cases, errors, and recovery paths. |
| [`MENTAL_MODEL_MAPPING.md`](MENTAL_MODEL_MAPPING.md) | Translation matrix mapping user expectations and existing mental models to interface metaphors and terminology. |
| [`DESIGN_TRACEABILITY.md`](DESIGN_TRACEABILITY.md) | Comprehensive coverage matrix verifying that all 23 FRs and 15 NFRs are fully addressed in the proposed design. |
| [`DESIGN_LIMITATIONS.md`](DESIGN_LIMITATIONS.md) | Transparent disclosure of design assumptions, edge-case trade-offs, and usability test questions for subsequent modules. |
| [`docs/handovers/MODULE_04_HANDOFF.md`](../handovers/MODULE_04_HANDOFF.md) | Authoritative handoff report, quality assurance verification, and Module 05 transition gate. |

---

## 4. Conceptual Architecture: The Unified Workspace

The selected architecture unifies **compatibility-first discovery** with **structured circle hosting** and **session coordination** into a single cohesive web application:

```
┌────────────────────────────────────────────────────────────────────────┐
│               CohortCircle Unified Workspace Concept                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
[Explore & Compatibility]   [Circle Management & Rosters]   [Session Planning & RSVP]
  - Explainable Matching      - Host Moderation Controls      - Clear Meeting Agendas
  - Multi-Criteria Filtering  - Introductory Notes            - Real-Time Attendee List
  - Subject/Style Badges      - Capacity Caps (2–8)           - Personal Dashboard
```
