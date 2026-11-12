# Software Architecture Specification: CohortCircle

> **Document Status:** IMPLEMENTED & PERSISTENT FUNCTIONAL PRODUCT (MODULE 08)<br>
> **Implementation Scope:** Complete functional business logic for all 23 Functional Requirements (FR-001 to FR-023), versioned browser local persistence (`cohortcircle_state_v1`), deterministic 5-factor compatibility matching engine, Error Boundary fault tolerance, and comprehensive automated test suite (58 passing tests across 9 suites).

---

## 1. Architectural Goals & System Overview

CohortCircle is engineered as a responsive, client-side Single Page Application (SPA). The primary architectural objectives are:

1. **High Accessibility (a11y):** Native semantic DOM elements, full keyboard navigability, visible high-contrast focus rings, and WCAG 2.2 Level AA target contrast ratios.
2. **Deterministic, Explainable Matching:** Fast, transparent client-side compatibility calculations with explicit mathematical scoring and factor breakdowns. Zero opaque AI claims.
3. **Centralized Source of Truth & Local-First Persistence:** Single authoritative state engine (`AppContext.jsx`) backed by a resilient, versioned localStorage persistence service (`storageService.js`). Survives full browser reloads with automatic recovery from corrupted storage.
4. **Resilience & Fault Tolerance:** React Error Boundary (`ErrorBoundary.jsx`) preventing full-screen crashes upon encountering isolated rendering errors.
5. **Feature-Oriented Architecture:** Clear division of services (`storageService.js`, `compatibilityService.js`, `validationService.js`), utilities (`idUtils.js`, `dateUtils.js`, `profileUtils.js`), layout components, domain components, and pages.
6. **Single-User Demonstration Scope:** Standalone client-side application designed for usability testing and demonstration without external backend, database, payment, or multi-user sync infrastructure.

---

## 2. Technology Stack Selection & Rationales

| Layer / Concern | Technology Selection | Rationale |
|---|---|---|
| **Runtime Environment** | Node.js v24.x LTS | Stable, high-performance modern JavaScript execution environment. |
| **Frontend Framework** | React 19 (JavaScript / JSX) | Declarative UI rendering, component reusability, mature ecosystem, and strong community accessibility tooling. |
| **Build & Dev Tooling** | Vite 6 | Near-instant startup, native ESM development, optimized production bundling via Rollup with minimal configuration overhead. |
| **Styling Solution** | CSS Modules (`*.module.css`) | True component-scoped styling without runtime overhead, standard CSS syntax, seamless CSS variable theming, and zero vendor lock-in. |
| **State Management** | Central React Context + Hooks | Single authoritative source of truth across all 12 page routes. No divergent local arrays or conflicting domain counts. |
| **Data Persistence** | Versioned Web Storage API (`localStorage`) | Self-contained, schema-validated browser storage (`cohortcircle_state_v1`) with fallback to deep-cloned synthetic seed. |
| **Compatibility Engine** | Pure Mathematical Service | Deterministic 5-factor weighted formula (Topic 35%, Schedule 25%, Style 20%, Modality 10%, Capacity 10%). |
| **Input Validation** | Pure Validation Service | Validates text lengths, charters, safe URLs (rejects `javascript:`), and prevents past session scheduling. |
| **Unit & Integration Testing**| Vitest 3.0 + React Testing Library | Fast Vite-native unit testing runner paired with user-behavior-centric component testing following accessibility best practices. |

---

## 3. Domain Entity Models & Authoritative Relationships

The application data model centers around five authoritative domain entities managed centrally in `AppContext.jsx`:

```
┌──────────────────┐           1..* ┌──────────────────┐
│     Learner      │───────────────│    Membership    │
└──────────────────┘                └─────────┬────────┘
         │                                    │ *..1
         │ 1..* (Host)                        ▼
         │                          ┌──────────────────┐
         └─────────────────────────>│   StudyCircle    │
                                    └─────────┬────────┘
                                              │ 1..*
                                              ├──────────────────────┐
                                              ▼                      ▼
                                    ┌──────────────────┐   ┌──────────────────┐
                                    │   StudySession   │   │   JoinRequest    │
                                    └──────────────────┘   └──────────────────┘
```

### 3.1 `Learner` Entity (Authoritative Current User)
Represents the active user profile:
```javascript
{
  id: "usr-current",
  name: "Alex Rivera",
  handle: "@arivera",
  initials: "AR",
  role: "learner",                   // "learner" | "host"
  bio: "string",
  academicLevel: "Undergraduate Senior",
  primaryLanguage: "English",
  avatarColor: "#4f46e5",
  topics: ["Algorithms & Data Structures", "Human-Computer Interaction", ...],
  studyStyles: ["Collaborative Problem Solving", "Discussion-Based Learning"],
  availability: {
    Mon: ["Evening (6 PM - 10 PM)"],
    Tue: ["Evening (6 PM - 10 PM)"],
    // ... 7 days x 3 time windows
  },
  preferredModality: "Hybrid",       // "Online" | "In-Person" | "Hybrid"
  preferredCapacity: "4–6 peers",
  profileCompleteness: 92,           // Dynamically computed (0-100)
  stats: {
    circlesJoined: 3,
    sessionsAttended: 14,
    hoursLearned: 28,
    activeStreakWeeks: 4
  }
}
```

### 3.2 `StudyCircle` Entity
Represents a collaborative peer learning group:
```javascript
{
  id: "circle-alg-01",
  title: "Algorithms & LeetCode Problem Solvers",
  slug: "algorithms-leetcode-problem-solvers",
  category: "Computer Science",
  subject: "Algorithms & Data Structures",
  description: "string (min 20 chars)",
  charter: "string (min 20 chars)",
  host: {
    id: "usr-host-01",
    name: "Elena Rostova",
    handle: "@erostova",
    initials: "ER",
    avatarColor: "#0d9488",
    role: "Circle Facilitator"
  },
  membersCount: 5,                   // Synchronized with authoritative Memberships count
  maxCapacity: 6,                    // Enforced: maxCapacity >= membersCount
  joiningPolicy: "moderated",        // "open" | "moderated" | "closed"
  studyStyle: "Collaborative Problem Solving",
  modality: "Online",                // "Online" | "In-Person" | "Hybrid"
  cadence: "Weekly",
  meetingTime: "Tuesdays & Thursdays, 7:00 PM – 8:30 PM",
  schedule: {
    days: ["Tue", "Thu"],            // Structured meeting days
    timeSlot: "Evening (6 PM - 10 PM)",
    startTime: "19:00",
    endTime: "20:30"
  },
  tags: ["Algorithms", "Data Structures", "Tech Interview Prep"],
  isJoined: true,                    // Derived from memberships
  isHostedByMe: false                // Derived: host.id === currentUser.id
}
```

### 3.3 `Membership` Entity (Authoritative Roster)
Prevents roster and capacity drift across views:
```javascript
{
  id: "mem-dis-01",
  circleId: "circle-dis-03",
  userId: "usr-current",
  name: "Alex Rivera",
  handle: "@arivera",
  initials: "AR",
  avatarColor: "#4f46e5",
  role: "Circle Facilitator (You)",
  isHost: true,                      // Host cannot be removed
  joinedAt: "2026-11-12T13:00:00.000Z"
}
```

### 3.4 `StudySession` Entity
Represents a scheduled cohort meeting with synchronized attendance:
```javascript
{
  id: "sess-alg-01",
  circleId: "circle-alg-01",
  circleTitle: "Algorithms & LeetCode Problem Solvers",
  title: "Graph Traversal & Dijkstra Algorithms Deep-Dive",
  date: "2026-11-13",                // Enforced: date >= today
  time: "19:00",
  duration: "90m",
  modality: "Online",
  locationOrLink: "https://meet.cohortcircle.org/alg-graphs-live",
  hostName: "Elena Rostova",
  status: "scheduled",               // "scheduled" | "completed" | "cancelled"
  agenda: [
    { time: "19:00 - 19:15", item: "Check-in and review of prior adjacency list exercises" }
  ],
  rsvpSummary: {                     // Dynamically computed from attendees array
    attending: 4,
    tentative: 1,
    declined: 0,
    currentUserStatus: "attending"   // "attending" | "tentative" | "declined"
  },
  attendees: [
    { name: "Alex Rivera", handle: "@arivera", initials: "AR", status: "attending" },
    { name: "Elena Rostova", handle: "@erostova", initials: "ER", status: "attending" }
  ]
}
```

### 3.5 `JoinRequest` Entity
Represents an admission application to a moderated circle:
```javascript
{
  id: "req-01",
  circleId: "circle-dis-03",
  circleTitle: "Distributed Systems & Cloud Architecture",
  applicant: {
    id: "usr-applicant-01",
    name: "Gabriel Morales",
    handle: "@gmorales",
    initials: "GM",
    avatarColor: "#8b5cf6",
    academicLevel: "Graduate Student",
    compatibilityScore: 91
  },
  requestedAt: "2 hours ago",
  introNote: "Hello! I am taking Advanced Distributed Systems... (min 15 chars)",
  status: "pending"                  // "pending" | "accepted" | "rejected"
}
```

---

## 4. Deterministic Compatibility Engine (`compatibilityService.js`)

CohortCircle evaluates compatibility using a transparent mathematical formula without opaque algorithms:

$$\text{Overall Score} = \text{round}\left( \text{Topic} \times 0.35 + \text{Schedule} \times 0.25 + \text{Style} \times 0.20 + \text{Modality} \times 0.10 + \text{Capacity} \times 0.10 \right)$$

### 4.1 Scoring Factor Breakdown
1. **Topic Alignment (35% weight):**
   - Exact subject match = 100%.
   - Direct syllabus tag match = 95%.
   - Title / keyword substring match = 90%.
   - Token overlap (&ge; 2 tokens) = 85%.
   - Token overlap (1 token) = 70%.
   - Baseline / zero overlap = 20%.
2. **Schedule Overlap (25% weight):**
   - All circle meeting days and time slots free in user availability = 100%.
   - Partial overlap (&ge; 50% of days free) = 80%.
   - Minor overlap (&gt; 0% of days free) = 60%.
   - Meeting schedule conflict = 30%.
3. **Study Style Match (20% weight):**
   - Exact study style match = 100%.
   - Complementary study style pair (e.g., Problem Solving & Discussion) = 80%.
   - Divergent study styles = 45%.
4. **Modality Preference (10% weight):**
   - Exact match (Online/Online, In-Person/In-Person, Hybrid/Hybrid) = 100%.
   - Hybrid learner or hybrid cohort = 92%.
   - Format mismatch (Online vs In-Person) = 40%.
5. **Capacity Fit (10% weight):**
   - Circle max capacity falls within preferred bracket (Micro, Standard, Large) = 100%.
   - Within 1–2 peers of target bracket = 85%.
   - Outside preferred bracket = 60%.

### 4.2 Special Rules & Explainability
- **Host Shortcut:** A circle creator/host is always evaluated with 100% compatibility for their own circle.
- **Explainable Match Reasons:** The service returns human-readable justification tags:
  - *"Direct subject alignment on Algorithms & Data Structures"*
  - *"Overlaps with your Tuesday & Thursday evening availability windows"*
  - *"Matches your preferred Collaborative Problem Solving format"*
- **Availability Warnings:** If a cohort is at maximum capacity, an explicit notice tag is attached.

---

## 5. Storage Persistence Architecture (`storageService.js`)

- **Storage Key:** `cohortcircle_state_v1`
- **Schema Version:** `1`
- **Safe Initialization:** On initial launch, deep-clones demonstration fixtures into `localStorage`.
- **Corrupted Storage Recovery:** Catches malformed or unparseable JSON and safely falls back to initial demonstration baseline without crashing the UI.
- **Storage Availability Guard:** Handles private browsing restrictions or quota exceeded exceptions gracefully.
- **Cross-Tab Synchronization:** Listens to `window.addEventListener('storage')` to synchronize updates across browser tabs.
- **Demonstration State Management:**
  - `resetDemoData()`: Restores factory demonstration baseline.
  - `clearLocalData()`: Resets application into a clean empty baseline.

---

## 6. Implemented Module 08 Application Structure

```text
CohortCircle/
├── index.html                  # HTML5 entry with fonts & meta
├── package.json                # Project dependencies and npm scripts
├── package-lock.json           # Deterministic lockfile
├── vite.config.js              # Vite & Vitest configuration
├── eslint.config.js            # Flat ESLint configuration
├── dist/                       # Production build output
└── src/
    ├── main.jsx                # Application DOM entry point
    ├── App.jsx                 # Top-level Router, ErrorBoundary & Provider wrapper
    ├── app/
    │   ├── AppRouter.jsx       # 12-route client routing system
    │   ├── AppShell.jsx        # Authenticated app shell layout
    │   └── AppShell.module.css
    ├── context/
    │   └── AppContext.jsx      # Authoritative state engine with full business logic
    ├── services/
    │   ├── storageService.js   # Versioned localStorage adapter with schema validation
    │   ├── compatibilityService.js # Deterministic 5-factor scoring engine
    │   └── validationService.js    # Input sanitization, safety & constraints
    ├── utils/
    │   ├── dateUtils.js        # Safe local date comparisons
    │   ├── idUtils.js          # Unique entity ID and initials generator
    │   └── profileUtils.js     # Dynamic profile completeness calculator
    ├── components/
    │   ├── common/             # Button, Card, Badge, Input, Select, Modal, Avatar, Icons, ErrorBoundary
    │   ├── layout/             # Sidebar, Topbar, PublicNavbar, Footer, MobileNavigation
    │   ├── circles/            # CircleCard, CompatibilityIndicator, StudyStyleBadge, MemberStack
    │   └── sessions/           # SessionCard, RSVPControl
    ├── pages/
    │   ├── public/             # LandingPage, AboutPage
    │   ├── dashboard/          # DashboardPage
    │   ├── learner/            # ProfilePage, ExplorePage, CircleDetailsPage, MyCirclesPage
    │   ├── host/               # HostDashboardPage, CreateCirclePage, ManageCirclePage
    │   ├── sessions/           # SessionsPage, SessionDetailsPage
    │   ├── settings/           # SettingsPage
    │   └── NotFoundPage.jsx
    ├── data/
    │   └── demoData.js         # Realistic synthetic demonstration dataset & memberships
    ├── styles/
    │   ├── variables.css       # Brand design tokens (8px grid, deep navy, indigo, teal)
    │   ├── typography.css      # Plus Jakarta Sans & JetBrains Mono scale
    │   └── global.css          # Global resets, WCAG focus rings, accessibility
    └── test/
        ├── setup.js            # Vitest environment setup
        ├── App.test.jsx        # Automated route and component tests
        ├── storageService.test.js # Storage persistence & recovery tests
        ├── compatibilityService.test.js # Compatibility engine tests
        ├── validationService.test.js    # Validation & URL safety tests
        ├── profileWorkflows.test.jsx    # Profile & availability tests
        ├── discoveryWorkflows.test.jsx  # Search, filter, and sorting tests
        ├── circleWorkflows.test.jsx     # Join, leave, request, accept, reject tests
        ├── sessionWorkflows.test.jsx    # Scheduling & RSVP integrity tests
        └── integrationWorkflows.test.jsx # Full end-to-end lifecycle integration tests
```
