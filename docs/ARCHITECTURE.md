# Software Architecture Specification: CohortCircle

> **Document Status:** ESTABLISHED HIGH-FIDELITY ARCHITECTURAL FOUNDATION (MODULE 07)<br>
> **Implementation Scope:** Full React 19 + Vite client application foundation established with 12 interactive routes, design tokens, component library, and automated testing suite.

---

## 1. Architectural Goals & System Overview

CohortCircle is engineered as a responsive, client-side Single Page Application (SPA). The primary architectural objectives are:

1. **High Accessibility (a11y):** Native semantic DOM elements, full keyboard navigability, and zero reliance on heavy inaccessible component wrappers.
2. **Deterministic, Transparent Matching:** Fast client-side compatibility calculations with explicit mathematical scoring and explanations.
3. **Decoupled State & Local-First Persistence:** Robust state architecture supporting reactive UI updates with seamless browser local persistence for zero-backend prototype deployment.
4. **Feature-Sliced Modularity:** Codebase organized around high-cohesion domain features rather than monolithic layer files.
5. **High Ergonomics & Fast Feedback:** Vite-powered ESM development environment with instant Hot Module Replacement (HMR).

---

## 2. Technology Stack Selection & Rationales

| Layer / Concern | Technology Selection | Rationale |
|---|---|---|
| **Runtime Environment** | Node.js v24.x LTS | Stable, high-performance modern JavaScript execution environment. |
| **Frontend Framework** | React 18 / 19 (JavaScript) | Declarative UI rendering, component reusability, mature ecosystem, and strong community accessibility tooling. |
| **Build & Dev Tooling** | Vite | Near-instant startup, native ESM development, optimized production bundling via Rollup with minimal configuration overhead. |
| **Styling Solution** | CSS Modules (`*.module.css`) | True component-scoped styling without runtime overhead, standard CSS syntax, seamless CSS variable theming, and zero vendor lock-in. |
| **State Management** | React Context + Custom Hooks | Clean, predictable unidirectional state flow without complex external boilerplate (Redux/MobX). Decoupled storage adapters. |
| **Data Persistence** | Web Storage API (LocalStorage + Adapter) | Self-contained, zero-infrastructure persistence for standalone usability evaluation and demonstration without backend dependencies. |
| **Unit & Component Testing**| Vitest + React Testing Library | Fast Vite-native unit testing runner paired with user-behavior-centric component testing following accessibility best practices. |
| **End-to-End Testing** | Playwright | Robust browser automation across Chromium, Firefox, and WebKit for validating critical multi-step user task flows. |

---

## 3. Domain Entity Models

The application data model centers around five core domain entities:

```
┌──────────────────┐           1..* ┌──────────────────┐
│     Learner      │───────────────│    Membership    │
└──────────────────┘                └─────────┬────────┘
         │                                    │ *..1
         │ *..1 (Host)                        ▼
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

### 3.1 `Learner` Entity
Represents an individual user profile:
```javascript
{
  id: "uuid-v4",
  name: "string",                 // e.g., "Alex Chen"
  handle: "string",               // e.g., "alexc"
  avatarUrl: "string",            // Optional avatar image or placeholder token
  bio: "string",                  // Personal learning bio & aspirations
  topics: ["string"],             // e.g., ["Data Structures", "Linear Algebra"]
  studyStyles: ["string"],        // e.g., ["silent_co_study", "problem_solving"]
  availability: [                 // Weekly availability slots
    { day: "mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun", slot: "morning"|"afternoon"|"evening" }
  ],
  preferredModality: "online" | "in_person" | "flexible",
  preferredLanguage: "string",    // e.g., "English"
  maxGroupSize: "number"          // e.g., 4
}
```

### 3.2 `StudyCircle` Entity
Represents a collaborative peer learning group:
```javascript
{
  id: "uuid-v4",
  title: "string",                // e.g., "Algorithmic Problem Solvers"
  subject: "string",              // Primary course or subject domain
  description: "string",          // Detailed overview and charter
  learningGoals: ["string"],      // Specific milestone targets
  studyStyle: "string",           // Primary study method (e.g., "collaborative_problem_solving")
  schedule: {
    dayOfWeek: "mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun",
    timeOfDay: "evening",         // morning / afternoon / evening
    cadence: "weekly" | "biweekly",
    durationMinutes: 90
  },
  modality: "online" | "in_person" | "hybrid",
  locationDetails: "string",      // Physical room or meeting platform description
  hostId: "uuid-v4",              // Reference to host Learner
  maxMembers: 6,                  // Capacity limit
  joinPolicy: "open" | "approval_required",
  status: "active" | "full" | "archived",
  tags: ["string"]
}
```

### 3.3 `Membership` Entity
Represents the relationship between a Learner and a Circle:
```javascript
{
  id: "uuid-v4",
  circleId: "uuid-v4",
  learnerId: "uuid-v4",
  role: "host" | "co_host" | "member",
  joinedAt: "ISO-8601-string",
  status: "active" | "left" | "removed"
}
```

### 3.4 `StudySession` Entity
Represents a scheduled collaborative meeting:
```javascript
{
  id: "uuid-v4",
  circleId: "uuid-v4",
  title: "string",                // e.g., "Dynamic Programming Problem Set 3"
  agenda: "string",               // Structured breakdown of session activities
  scheduledDate: "YYYY-MM-DD",
  startTime: "HH:mm",             // 24-hr format
  durationMinutes: 90,
  modality: "online" | "in_person",
  meetingUrlOrVenue: "string",    // URL or physical campus room
  status: "scheduled" | "completed" | "cancelled",
  attendees: [
    { learnerId: "uuid-v4", rsvpStatus: "attending" | "tentative" | "declined" }
  ]
}
```

### 3.5 `JoinRequest` Entity
Represents a moderated application to enter a circle:
```javascript
{
  id: "uuid-v4",
  circleId: "uuid-v4",
  learnerId: "uuid-v4",
  introductoryNote: "string",     // Why learner wants to join and what they bring
  status: "pending" | "approved" | "rejected",
  createdAt: "ISO-8601-string",
  decidedAt: "ISO-8601-string | null"
}
```

---

## 4. Rule-Based Compatibility Engine

Rather than relying on non-deterministic machine learning claims, CohortCircle evaluates compatibility through a transparent, weighted scoring model:

$$\text{Compatibility Score} = \sum_{i=1}^{5} (W_i \times S_i)$$

### 4.1 Scoring Dimensions & Weights
1. **Subject Alignment ($W_1 = 0.35$):** Exact match between circle subject and learner target topics scores 1.0; related tag overlap scores 0.5; unrelated scores 0.0.
2. **Schedule Overlap ($W_2 = 0.25$):** Full match on circle meeting day and time window against learner's declared availability grid scores 1.0; adjacent slot scores 0.5; complete conflict scores 0.0.
3. **Study Style Match ($W_3 = 0.20$):** Identical match between circle primary study style and learner's preferred style scores 1.0; secondary style overlap scores 0.6; divergent scores 0.1.
4. **Modality Preference ($W_4 = 0.12$):** Exact modality match (e.g., both prefer Online or In-Person) scores 1.0; flexible preference scores 0.8; conflicting modalities score 0.0.
5. **Group Size Fit ($W_5 = 0.08$):** Circle max capacity within learner's preferred group limit scores 1.0; minor deviation scores 0.5.

### 4.2 Explainability Output
The engine returns both a numeric index (0–100%) and human-readable explanation tags:
* *"94% Compatibility: Exact topic match in Algorithms, overlapping Thursday evening schedule, and shared focus on collaborative problem-solving."*

---

## 5. Proposed Project Directory Structure

```text
src/
├── app/
│   ├── App.jsx                 # Application root & top-level layout
│   ├── App.module.css          # Core layout grid & shell styles
│   └── routes.jsx              # Client-side route declarations
├── assets/                     # Static icons, logos, and graphics
├── components/                 # Reusable atomic UI components
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── Button.test.jsx
│   ├── Card/
│   ├── Modal/
│   ├── Badge/
│   ├── Input/
│   └── Navigation/
├── context/                    # Application state providers
│   ├── CircleContext.jsx       # Study circle repository & discovery state
│   ├── UserContext.jsx         # Current active learner profile state
│   └── SessionContext.jsx      # Scheduled sessions & RSVP state
├── features/                   # High-cohesion domain features
│   ├── circles/                # Directory, filters, circle creation, circle detail
│   ├── matching/               # Compatibility score engine & breakdown UI
│   ├── sessions/               # Session creation, calendar, agenda, RSVP
│   └── dashboard/              # User dashboard & overview metrics
├── services/                   # Storage adapters & data seeders
│   ├── storageAdapter.js       # LocalStorage abstraction with error fallback
│   └── seedData.js             # Initial sample circles and learners
├── styles/                     # Global design tokens & CSS resets
│   ├── tokens.css              # Color tokens, typography, spacing, shadows
│   ├── reset.css               # Modern CSS reset
│   └── utilities.css           # Accessible screen-reader & layout utilities
└── utils/                      # Helper algorithms
    ├── compatibility.js        # Mathematical matching calculations
    ├── dateUtils.js            # Date formatting & calendar utilities
    └── validators.js           # Form input validation rules
```

---

## 6. Implemented Module 07 Application Structure

In Module 07, the actual root application was established using React 19, Vite 6, and modern CSS Modules:

```text
CohortCircle/
├── index.html                  # HTML5 entry with fonts & meta
├── package.json                # Project dependencies and npm scripts
├── package-lock.json           # Deterministic lockfile
├── vite.config.js              # Vite & Vitest configuration
├── eslint.config.js            # Flat ESLint configuration
└── src/
    ├── main.jsx                # Application DOM entry point
    ├── App.jsx                 # Top-level Router & Provider wrapper
    ├── app/
    │   ├── AppRouter.jsx       # 12-route client routing system
    │   ├── AppShell.jsx        # Authenticated app shell layout
    │   └── AppShell.module.css
    ├── context/
    │   └── AppContext.jsx      # In-memory reactive state engine
    ├── components/
    │   ├── common/             # Button, Card, Badge, Input, Select, Modal, Avatar, Icons
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
    │   └── demoData.js         # Realistic synthetic demonstration dataset
    ├── styles/
    │   ├── variables.css       # Brand design tokens (8px grid, deep navy, indigo, teal)
    │   ├── typography.css      # Plus Jakarta Sans & JetBrains Mono scale
    │   └── global.css          # Global resets, WCAG focus rings, accessibility
    └── test/
        ├── setup.js            # Vitest environment setup
        └── App.test.jsx        # Automated route and component tests
```
