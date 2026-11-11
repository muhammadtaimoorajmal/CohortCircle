# CohortCircle — Module 05: Low-Fidelity Interactive Wireframe Prototype

* **Product:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Repository:** [https://github.com/muhammadtaimoorajmal/CohortCircle](https://github.com/muhammadtaimoorajmal/CohortCircle)
* **Maintainer & Lead:** Muhammad Taimoor Ajmal
* **Lifecycle State:** Module 05 of 10 — Low-Fidelity Prototyping
* **Implementation Location:** [`docs/prototypes/module05/index.html`](index.html)

---

## 1. Prototype Overview & Purpose

Module 05 transitions the approved Module 04 conceptual design into an interactive, navigable digital wireframe prototype. The objective is to validate structural layouts, information hierarchy, task flows, mental model mappings, and core interaction patterns before committing to high-fidelity visual design or production frontend architecture.

This prototype is intentionally **low-fidelity**:
* **Grayscale Palette:** Removes color distraction and aesthetic subjectivity, directing evaluation focus toward layout, hierarchy, and usability.
* **Semantic Structure:** Implements native HTML5 elements, ARIA landmarks, and keyboard accessibility patterns.
* **In-Memory State Engine:** Uses self-contained vanilla JavaScript to simulate realistic state transitions (directory search, multi-criteria filtering, 4-step wizard, join requests, RSVP updates) without network overhead or backend infrastructure.
* **Zero Runtime Dependencies:** Operates out-of-the-box by opening [`docs/prototypes/module05/index.html`](index.html) directly in any modern desktop or mobile web browser.

---

## 2. Directory Inventory

This package contains the following authoritative documentation and prototype assets:

| File | Purpose & Focus |
|---|---|
| [`index.html`](index.html) | Standalone interactive digital wireframe prototype covering Screens 01 through 12 and Flows 01 through 05. |
| [`README.md`](README.md) | Architectural overview, setup instructions, navigation guide, and printing specifications. |
| [`WIREFRAME_SPECIFICATION.md`](WIREFRAME_SPECIFICATION.md) | Design tokens, typography hierarchy, grayscale color palette, 8px grid spacing, and component anatomy. |
| [`SCREEN_INVENTORY.md`](SCREEN_INVENTORY.md) | Comprehensive functional specification of all 12 wireframe screens and accessible modal dialogs. |
| [`TASK_COVERAGE_MATRIX.md`](TASK_COVERAGE_MATRIX.md) | Verification matrix tracing all 23 Functional Requirements (`FR-001`–`FR-023`) and 15 Non-Functional Requirements to prototype screens. |
| [`FORMATIVE_TEST_SCRIPT.md`](FORMATIVE_TEST_SCRIPT.md) | Usability testing instrument specifying 5 benchmark evaluation tasks for Module 06 formative testing. |
| [`OBSERVER_GUIDE.md`](OBSERVER_GUIDE.md) | Protocol for evaluation facilitators, including Think-Aloud guidelines, neutral moderation, error taxonomy, and observation logging. |
| [`ACCESSIBILITY_CHECKLIST.md`](ACCESSIBILITY_CHECKLIST.md) | Accessibility compliance audit against WCAG 2.2 AA standards (keyboard navigation, focus indicators, contrast, ARIA). |

---

## 3. How to Run and Interact with the Prototype

### Method 1: Direct File System Access (Zero Setup)
1. Navigate to the repository root in your operating system file manager.
2. Open [`docs/prototypes/module05/index.html`](index.html) with any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari).
3. The file executes instantly using the `file:///` protocol. No web server, Node.js installation, or network connection is required.

### Method 2: Local Static File Server (Optional)
If running inside a development environment or terminal:
```bash
# Python 3
python -m http.server 8000 --directory docs/prototypes/module05

# Or Node.js (npx serve)
npx serve docs/prototypes/module05
```
Open `http://localhost:8000` in your web browser.

---

## 4. Key Interactive Capabilities & Role Switching

The prototype includes an in-memory reactive state manager simulating dual **Learner** and **Host / Facilitator** roles:

1. **Role Switcher:** Located in the top prototype disclosure banner (`Switch to Host View` / `Switch to Learner View`). Allows instantaneous evaluation of learner discovery and host circle administration within a single browser session.
2. **Real-Time Directory Search (< 100ms):** Typing in the keyword filter on Screen 03 dynamically filters study circles across title, subject domain, and charter description without page reloads.
3. **Multi-Criteria Filter Engine:** Combine subject domain, study style, meeting modality, joining policy, and capacity filters with logical `AND` semantics.
4. **Explainable Compatibility Breakdown:** Click "Inspect Factor Breakdown" on any circle detail screen to inspect the transparent 5-factor weighted scoring model (Subject: 30%, Study Style: 25%, Schedule: 20%, Modality: 15%, Group Size: 10%).
5. **Interactive 4-Step Circle Creation Wizard:** Progressive step-by-step wizard validating required inputs, learning objectives, recurring schedule, cohort capacity (2–8 learners), and joining policy.
6. **Host Moderation Console:** Accept or decline pending applicant requests, view applicant introductory notes, and manage the cohort member roster.
7. **Session Coordination & RSVP:** Facilitators can schedule structured study sessions with timed agendas; members can update their RSVP attendance (`Attending`, `Tentative`, `Declined`) with live attendee count updates.
8. **Demonstration Data Utility:** Screen 12 allows instant restoration of the default 5-circle demonstration dataset or clearing state to test empty screen layouts.

---

## 5. Keyboard Navigation & Accessibility Patterns

The prototype has been engineered to comply with WCAG 2.2 AA accessibility standards:
* **Skip to Main Content:** Press `Tab` upon initial page load to reveal the accessible skip navigation link.
* **Visible Focus Indicators:** Every interactive element features a prominent 2px solid black focus indicator (`outline: 2px solid #000; outline-offset: 2px;`).
* **Modal Dialog Keyboard Trap & Escape:** Pressing the `Escape` key immediately closes any active modal dialog (Join Request, Session Scheduler, Compatibility Breakdown, Leave Circle confirmation, Remove Member confirmation).
* **ARIA Landmarks:** Uses `<header role="banner">`, `<nav role="navigation">`, `<main role="main">`, `<footer role="contentinfo">`, `<aside role="complementary">`, and `role="dialog"` with `aria-modal="true"`.
* **Live Notifications:** Uses an accessible polite live region (`#toast-container[aria-live="polite"]`) for screen-reader announced state updates.

---

## 6. How to Print Wireframe Screens

The prototype includes a dedicated `@media print` stylesheet optimized for generating physical paper wireframes or PDF design review artifacts:
1. Navigate to the desired screen (e.g., Learner Dashboard, Explore Directory, Circle Details).
2. Press `Ctrl + P` (Windows/Linux) or `Cmd + P` (macOS).
3. The print stylesheet automatically hides the prototype status banner, application navigation bar, interactive buttons, and toast notifications.
4. Cards and structural wireframe sections are rendered with crisp 1px borders and print page breaks.

---

## 7. Prototype Limitations & Boundaries

* **In-Memory Storage Only:** State changes persist only during the active browser session. Refreshing the browser resets the state to the initial demonstration seed unless restored via the Demo Data Engine.
* **Illustrative Compatibility Scores:** Match percentages (e.g., 94%) are calculated using rule-based heuristics on mock profile data to test interface clarity. They do not represent final production machine-learning models.
* **No Academic Submission Terminology:** In alignment with open-source project standards, this prototype contains zero academic laboratory markers, student IDs, or course codes.
* **Module 06 Boundary:** This prototype prepares formative testing instruments but does NOT include fabricated user testing scores or simulated usability study results. Formative empirical evaluation is reserved exclusively for Module 06.
