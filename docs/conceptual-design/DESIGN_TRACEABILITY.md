# Conceptual Design & Requirements Traceability Matrix: CohortCircle

> **Governance Category:** Verification & Requirements Coverage  
> **Status:** **COMPLETE BIDIRECTIONAL TRACEABILITY (23 FRs & 15 NFRs COVERED)**  
> **Integrity Notice:** Mappings confirm that the proposed conceptual designs comprehensively address all documented requirements without omission or unauthorized scope creep.

---

## 1. Functional Requirements Coverage Matrix (FR-001 to FR-023)

| FR ID | Requirement Statement | Proposed Conceptual Screen / Component | Relevant Workflow | Concrete Interface Behavior | Acceptance Scenario Reference | Conceptual Design Status |
|---|---|---|---|---|---|---|
| **FR-001** | Profile creation & editing (Name, Bio, Topics, Language). | `/profile/preferences` &rarr; Bio & Topics Card | `FLOW-01` | Form inputs with real-time tag pill generation for subjects. | `SCEN-01` (Precondition) | `SPECIFIED & TRACED` |
| **FR-002** | Study style specification (Silent, Problem, Discussion, Teach, Exam). | `/profile/preferences` &rarr; Study Style Selector | `FLOW-01` | Multi-select styled checkboxes with explanatory tooltips. | `SCEN-02` (Main Path) | `SPECIFIED & TRACED` |
| **FR-003** | Weekly availability matrix (7 days &times; Morning/Aft/Eve). | `/profile/preferences` &rarr; 7x3 Interactive Grid | `FLOW-01` | Keyboard-accessible toggle grid with visible state highlighting. | `SCEN-01` (Precondition) | `SPECIFIED & TRACED` |
| **FR-004** | Modality (Online/In-Person/Flex) & group size cap preferences. | `/profile/preferences` &rarr; Modality & Cap Slider | `FLOW-01` | Segmented pill control for format; slider (2–8) with accessible label. | `FLOW-01` (Step 5) | `SPECIFIED & TRACED` |
| **FR-005** | Browsable directory of active study circles. | `/explore` &rarr; Responsive Circle Grid | `FLOW-02` | Card catalog rendering title, subject, format, schedule, and match score. | `SCEN-01` (Step 1) | `SPECIFIED & TRACED` |
| **FR-006** | Real-time text-based search across title, subject, and description. | `/explore` &rarr; Search Bar Input | `FLOW-02` | Client-side debounced text filtering (&le; 100ms response). | `SCEN-01` (Step 2) | `SPECIFIED & TRACED` |
| **FR-007** | Multi-criteria filtering (Subject, Style, Format, Day, Status). | `/explore` &rarr; Filter Pill Bar & Drawer | `FLOW-02` | Dynamic pill toggles applying logical `AND` across criteria. | `SCEN-01` (Step 3) | `SPECIFIED & TRACED` |
| **FR-008** | Single-action control to reset all active filters to default. | `/explore` &rarr; "Reset Filters" Action Button | `FLOW-02` | Instantly clears pills and search queries, restoring full directory. | `FLOW-02` (Alt Path 2B) | `SPECIFIED & TRACED` |
| **FR-009** | Compute transparent percentage compatibility score (0–100%). | Circle Card & Profile &rarr; Match Badge | `FLOW-03` | Client-side weighted formula execution ($W_1$ to $W_5$ weights). | `SCEN-02` (Step 2) | `SPECIFIED & TRACED` |
| **FR-010** | Explainable breakdown highlighting exact alignment factors. | `Modal: Compatibility Breakdown` | `FLOW-03` | Factor score bars and human-readable explanation sentence. | `SCEN-02` (Step 4) | `SPECIFIED & TRACED` |
| **FR-011** | Sort discovery results by highest compatibility score. | `/explore` &rarr; Sort Dropdown Selector | `FLOW-02` | Descending sort ordering cards by compatibility index. | `SCEN-02` (Step 1) | `SPECIFIED & TRACED` |
| **FR-012** | Detailed circle view (Charter, Goals, Host, Schedule, Rules). | `/circle/:id` &rarr; Detailed Profile Shell | `FLOW-03` | Comprehensive layout with syllabus goals, member list, and venue. | `SCEN-01` (Step 5) | `SPECIFIED & TRACED` |
| **FR-013** | Direct join flow for open circles with single confirmation. | `/circle/:id` &rarr; "Join Circle" Button | `FLOW-03` | Instant enrollment for open circles with seat count increment. | `SCEN-01` (Step 7) | `SPECIFIED & TRACED` |
| **FR-014** | Request-to-join flow for moderated circles with intro note. | `Modal: Join Request Application` | `FLOW-03` | Textarea prompt for 1-sentence note; creates pending `JoinRequest`. | `SCEN-02` (Step 7–10) | `SPECIFIED & TRACED` |
| **FR-015** | Graceful leave circle control returning capacity to group. | `/circle/:id` & `/dashboard` &rarr; "Leave Circle" | `FLOW-03` | Confirmation dialog; updates member record and frees up group seat. | `FLOW-03` (Leave Action) | `SPECIFIED & TRACED` |
| **FR-016** | 4-step wizard to create study circle with capacity cap. | `/host/create-circle` &rarr; Creation Wizard | `FLOW-04` | Progressive disclosure wizard validating required fields and caps (2–8). | `SCEN-03` (Step 1–4) | `SPECIFIED & TRACED` |
| **FR-017** | Host circle settings modification (Charter, Cap, Modality). | `/host/circle/:id/manage` &rarr; Settings Form | `FLOW-04` | Editable form allowing host to update details; syncs immediately. | `SCEN-03` (Alt Path 3B) | `SPECIFIED & TRACED` |
| **FR-018** | Membership request moderation interface (Approve / Reject). | `/host/circle/:id/requests` &rarr; Mod Queue | `FLOW-04` | Card review queue showing applicant note with Approve/Decline actions. | `SCEN-03` (Step 6–9) | `SPECIFIED & TRACED` |
| **FR-019** | Member management and removal from circle roster. | `/host/circle/:id/members` &rarr; Roster Table | `FLOW-04` | Host roster controls with confirmation dialog for member removal. | `FLOW-04` (Step 5) | `SPECIFIED & TRACED` |
| **FR-020** | Session creation with date, time, duration, agenda, and URL. | `Modal: Schedule Study Session` | `FLOW-05` | Form with agenda textarea, duration picker, and venue/link field. | `SCEN-04` (Step 1–4) | `SPECIFIED & TRACED` |
| **FR-021** | Session RSVP tracking (Attending / Tentative / Declined). | Session Card &rarr; Segmented RSVP Buttons | `FLOW-05` | 1-click attendance toggle updating real-time attendee list. | `SCEN-04` (Step 6–8) | `SPECIFIED & TRACED` |
| **FR-022** | Personal study dashboard (My Circles, Sessions, Requests). | `/dashboard` &rarr; Centralized Dashboard Hub | `FLOW-05` | Chronological session timeline, active circles grid, pending tray. | `SCEN-01`, `SCEN-04` | `SPECIFIED & TRACED` |
| **FR-023** | Local demo-state reset and sample-data seeding utility. | `/settings/data` &rarr; Data Utility Controls | `FLOW-05` | Controls to load pre-seeded sample data or wipe state to clean slate. | `FLOW-05` (Reset Action) | `SPECIFIED & TRACED` |

---

## 2. Non-Functional Requirements Coverage Matrix (15 NFRs)

| NFR ID | Category | Requirement Standard | Conceptual Design Implementation | Verification Benchmark in Subsequent Modules |
|---|---|---|---|---|
| **NFR-A11Y-01** | Accessibility | Minimum 4.5:1 text contrast ratio (3.0:1 large text). | High-contrast token palette specified in design system architecture. | Automated Axe / Lighthouse audit (Module 07). |
| **NFR-A11Y-02** | Accessibility | Complete keyboard navigability (`Tab`, `Space`, `Enter`, `Esc`). | All wireflows and modals include explicit keyboard focus and escape traps. | Manual keyboard traversal testing (Module 07/08). |
| **NFR-A11Y-03** | Accessibility | Distinct, high-visibility focus indicators on all controls. | High-visibility 2px focus ring token with offset specified. | Visual CSS inspection across all interactive elements. |
| **NFR-A11Y-04** | Accessibility | Semantic HTML landmarks, explicit labels, and ARIA live regions. | Semantic layout markup (`<header>`, `<nav>`, `<main>`, `<dialog>`, `aria-live`). | Screen reader walkthroughs (NVDA / VoiceOver). |
| **NFR-RESP-01** | Responsiveness | Flawless rendering from 320px (mobile) to 2560px (desktop). | Fluid grid system; stackable card layouts; responsive top navigation. | Viewport resizing tests across mobile/tablet/desktop. |
| **NFR-RESP-02** | Responsiveness | Minimum 44 &times; 44 CSS px touch targets on mobile viewports. | Form controls, filter pills, and icon buttons adhere to 44px hit-box sizing. | Touch-target audits on mobile devices. |
| **NFR-USE-01** | Usability | System Usability Scale (SUS) target &ge; 80 / 100. | Clean mental model mapping, low cognitive load, explainable matching. | Summative 18-participant usability testing (Module 09). |
| **NFR-USE-02** | Usability | Single Ease Question (SEQ) target &ge; 5.5 / 7.0 across core tasks. | 5 simplified task flows with progressive disclosure and clear CTAs. | Post-task ratings across Tasks T01–T05 (Module 09). |
| **NFR-USE-03** | Usability | Error prevention, destructive action confirmation, undo paths. | Explicit confirmation dialogs for leaving circles, canceling, or reset. | Heuristic evaluation & walkthroughs (Module 06). |
| **NFR-PERF-01** | Performance | First Contentful Paint (FCP) &le; 1.5 seconds. | Zero heavy framework bloat; lightweight Vite bundling; CSS Modules. | Simulated 3G network lighthouse throttling audits. |
| **NFR-PERF-02** | Performance | In-memory search & filter response time &le; 100 milliseconds. | Client-side debounced array filtering on local collection. | Performance profiler benchmarks on 1,000 mock items. |
| **NFR-REL-01** | Reliability | React Error Boundaries preventing full-screen crashes. | Isolated error boundary wrappers for discovery feed, modals, and scheduler. | Unit tests injecting intentional render exceptions. |
| **NFR-PRIV-01** | Privacy | Zero collection or storage of phone numbers, addresses, or IDs. | Data models (`Learner`, `Circle`) completely exclude sensitive PII. | Security & data schema audit. |
| **NFR-PRIV-02** | Privacy | Local-first browser storage; complete user control over deletion. | Browser Web Storage API with full local reset control (`FR-023`). | Offline functionality and local storage clearing tests. |
| **NFR-COMP-01** | Compatibility | Identical behavior across evergreen browsers (Chrome, Edge, FF, Safari). | Modern standard CSS (Flexbox/Grid); standard ES2022 JavaScript; zero vendor CSS-in-JS. | Cross-browser automated Playwright tests (Module 08). |
