# Architectural Concept Alternatives: CohortCircle

> **Governance Category:** Ideation & Solution Space Exploration  
> **Status:** **FOUR DISTINCT CONCEPT MODELS DEVELOPED**  
> **Integrity Notice:** Concepts are formulated to explore genuinely distinct interaction models and information structures before committing to a final design.

---

## 1. Concept Overview & Divergence Matrix

To avoid premature design convergence, four genuinely distinct conceptual directions were developed, each prioritizing a different primary user mental model and operational center of gravity:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Conceptual Alternatives Spectrum                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
[Concept A: Compatibility]   [Concept B: Community]     [Concept C: Session First]
 Match-Centric Algorithm     Forum & Directory Centric  Calendar & Event Centric
                                    │
                                    ▼
                         [Concept D: Host-Led Hub]
                          Facilitator & Tool Centric
```

---

## 2. Concept A — Compatibility First (The Matchmaker Model)

### 2.1 Central Idea
A personalized, recommendation-driven experience where learners first declare their granular study profiles (topics, preferred study methods, weekly recurring availability grid, modality, and group size cap). The system operates as an intelligent matchmaking engine, calculating and ranking circles by an explainable compatibility index.

### 2.2 Target User Roles
* **Primary:** `PROTO-LEARN-01` (Independent Problem-Solver with tight schedule constraints) and `PROTO-LEARN-02` (Hesitant learner seeking optimal group alignment).
* **Secondary:** Circle hosts who benefit from inbound applicants who already match their charter.

### 2.3 Core Workflow
1. User completes a 3-step Study Preference Wizard on initial entry.
2. User lands on a personalized "Top Matches" feed with dynamic compatibility badges (e.g., *"94% Compatible"*).
3. Clicking a compatibility badge reveals a visual factor breakdown (Topic: 100%, Schedule: 90%, Study Style: Exact Match).
4. User selects a circle, reviews its detailed charter, and clicks "Join" or "Request Membership".

### 2.4 Main Screens & Conceptual Areas
* **Profile Setup Wizard:** Interactive availability grid and study style selector.
* **Compatibility Discovery Feed:** Curated card list ordered by compatibility score with explainability modals.
* **Circle Profile View:** Transparent criteria alignment summary alongside group syllabus.

### 2.5 Advantages
* Eliminates decision fatigue by surfacing high-probability matches upfront.
* Provides immediate psychological safety: learners understand *why* a group suits them before reaching out.
* High relevance for commuter students with rigid schedule constraints.

### 2.6 Limitations
* Heavy upfront profile setup barrier: users cannot immediately browse circles without entering preferences.
* Vulnerable to cold-start density: if few circles exist locally, recommendations may feel sparse or over-weighted.

### 2.7 Accessibility Implications
* The interactive availability grid must be fully navigable via keyboard (`Tab`, arrow keys, `Space` to toggle blocks) and announce slot states via `aria-pressed`.
* Compatibility percentage badges must maintain &ge; 4.5:1 contrast and not rely solely on color (e.g., green/yellow) to convey match strength.

### 2.8 Relationship to Requirements
* Directly addresses `FR-001`–`FR-004` (Profile/Preferences), `FR-009`–`FR-011` (Compatibility Engine), and `FR-012` (Circle View).
* Underspecifies host session management and recurring cadence tools (`FR-020`, `FR-021`).

### 2.9 Risks & Assumptions
* *Assumption:* Learners know their preferred study style in advance and can articulate it accurately.
* *Risk:* Users may abandon the product if mandatory profile onboarding feels too tedious.

---

## 3. Concept B — Community First (The Open Directory & Commons)

### 3.1 Central Idea
An open, exploratory directory modeled after academic forums and departmental commons. Discovery is organized primarily around broad academic subjects, courses, and open discussion circles, emphasizing immediate browsing with zero onboarding gates.

### 3.2 Target User Roles
* **Primary:** `PROTO-LEARN-02` (Discussion Seeker) and exploratory campus learners seeking peer community.
* **Secondary:** Casual study groups and large open student cohorts.

### 3.3 Core Workflow
1. User lands directly on a public, browsable course and subject directory without login or profile barriers.
2. User browses by subject category (e.g., "Computer Science", "Economics", "Natural Sciences").
3. User applies free-text keyword search and filter pills to locate open circles.
4. User joins open circles instantly with a single click and accesses community discussion boards.

### 3.4 Main Screens & Conceptual Areas
* **Global Explore Directory:** Hierarchical category tree and searchable card catalog.
* **Subject Commons Page:** Aggregated feed of active circles, open questions, and study topics within a domain.
* **Open Circle Lounge:** General discussion thread, shared resource links, and open roster.

### 3.5 Advantages
* Zero friction on initial entry; instant gratification for browsing learners.
* Fosters a vibrant community feel; accommodates broad, interdisciplinary learning topics.
* Highly effective for finding open, large cohorts.

### 3.6 Limitations
* Lacks personalized compatibility filtering; does not prevent mismatches in study styles or schedules.
* Susceptible to chatter noise, unvetted members, and the same broadcast fatigue observed in Discord/WhatsApp.
* Neglects the needs of introverted learners (`PROTO-LEARN-01`) who seek small, focused micro-circles.

### 3.7 Accessibility Implications
* Category trees and breadcrumbs must utilize semantic hierarchical markup (`<nav>`, `aria-expanded`).
* Infinite-scroll feeds can trap keyboard focus; paginated or load-more controls are required (`NFR-A11Y-02`).

### 3.8 Relationship to Requirements
* Excels at `FR-005`–`FR-008` (Discovery, Search, Multi-Filter).
* Conflicts with `FR-009`–`FR-011` (Explainable Compatibility) and lacks structured moderation controls (`FR-018`).

### 3.9 Risks & Assumptions
* *Assumption:* Learners are willing to self-organize without automated compatibility guidance.
* *Risk:* Groups degrade into chaotic chat rooms with high drop-off rates (`CODE-MOMENTUM-DROP`).

---

## 4. Concept C — Session First (The Event & Calendar Engine)

### 4.1 Central Idea
A coordination-centric model organized around specific, upcoming study events. Instead of searching for persistent "circles", learners search for concrete study sessions happening this week (e.g., *"Algorithms Midterm Prep — Thursday 6pm — Library Room 204"*).

### 4.2 Target User Roles
* **Primary:** Deadline-driven students preparing for specific exams or weekly problem set milestones.
* **Secondary:** Hosts seeking immediate RSVPs for a scheduled campus room booking.

### 4.3 Core Workflow
1. User lands on an interactive Calendar & Session Timeline showing upcoming study events across campus.
2. User filters sessions by date, time window (e.g., "Tonight after 5pm"), and course.
3. User reviews session details: agenda, host, current attendee count, and open seats.
4. User clicks "RSVP Attending"; the session is saved to their personal dashboard calendar.

### 4.4 Main Screens & Conceptual Areas
* **Interactive Study Timeline / Calendar View:** Day/Week calendar displaying open study sessions.
* **Session Detail Card:** Time, duration, location/meeting URL, structured agenda, and RSVP list.
* **Session Creation Modal:** Quick event scheduler with agenda inputs and attendee caps.

### 4.5 Advantages
* Eliminates scheduling back-and-forth completely: times and venues are fixed upfront.
* High accountability: members RSVP for concrete, time-boxed study appointments.
* Solves the immediate "I need someone to study with tonight" acute pain point.

### 4.6 Limitations
* High friction in creating long-term group cohesion; treats peer learning as transactional events rather than sustainable relationships.
* Poor support for persistent study circles that maintain ongoing syllabi across a full semester.

### 4.7 Accessibility Implications
* Complex calendar grids are notoriously difficult for screen readers; requires an accessible tabular or chronological list fallback view (`NFR-A11Y-04`).
* High reliance on date/time formatting requiring localized, accessible time notation.

### 4.8 Relationship to Requirements
* Strongly implements `FR-020` (Session Creation) and `FR-021` (RSVP Tracking).
* Weakly supports `FR-012`–`FR-015` (Persistent Circle Charters & Memberships) and `FR-001`–`FR-004` (Learner Profiles).

### 4.9 Risks & Assumptions
* *Assumption:* Hosts are willing to book rooms and publish times before knowing if anyone will attend.
* *Risk:* Empty sessions create a ghost-town perception if attendance is low.

---

## 5. Concept D — Host-Led Study Hub (The Structured Facilitator Model)

### 5.1 Central Idea
An operational hub designed around the student facilitator / host (`PROTO-HOST-01`). The platform treats study circles as curated mini-academies with structured charters, strict capacity caps, applicant vetting, and explicit host governance.

### 5.2 Target User Roles
* **Primary:** `PROTO-HOST-01` (Peer tutors, active student organizers, study group leaders).
* **Secondary:** Committed learners seeking structured, well-run study groups with clear rules.

### 5.3 Core Workflow
1. Host utilizes a comprehensive Circle Creation Wizard to establish a circle charter, goals, ground rules, and capacity limits.
2. Prospective members discover the circle and submit a "Request to Join" accompanied by a personal introductory note.
3. Host reviews incoming applications in a moderation dashboard, accepting compatible candidates.
4. Host publishes recurring session agendas, assigns prep tasks, and manages attendance rosters.

### 5.4 Main Screens & Conceptual Areas
* **Host Control Center:** Dashboard showing managed circles, pending join requests, and attendance statistics.
* **Circle Creation Wizard:** Multi-step wizard enforcing charters, rules, and capacities.
* **Membership Moderation Queue:** Review interface displaying applicant bios, notes, and approval actions.
* **Session Governance Console:** Agenda builder and participant management tools.

### 5.5 Advantages
* Maximizes group quality and commitment: filters out free-riders and unaligned members.
* Strong psychological safety: every member knows the group is curated and facilitated with clear norms.
* Prevents groups from collapsing due to lack of leadership.

### 5.6 Limitations
* Asymmetric burden: heavily reliant on a small pool of proactive student hosts.
* Slower onboarding for regular learners: requires waiting for host approval rather than instant joining.

### 5.7 Accessibility Implications
* Multi-step wizards must support keyboard step progression and announce validation errors clearly (`NFR-A11Y-02`, `NFR-USE-03`).
* Moderation action dialogs (Approve / Reject) must clearly convey state changes to assistive tech.

### 5.8 Relationship to Requirements
* Strongly implements `FR-016`–`FR-019` (Host Facilitation & Moderation Controls).
* Risks neglecting casual learners who prefer lightweight, direct-join groups (`FR-013`).

### 5.9 Risks & Assumptions
* *Assumption:* A sufficient ratio of learners are willing to act as hosts (`RISK-SYN-03`).
* *Risk:* Applicants may experience rejection fatigue if multiple hosts decline their join requests.
