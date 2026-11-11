# Persona Development Methodology & Behavioral Axes: CohortCircle

> **Methodology:** Goal-Directed Behavioral Modeling (Cooper, Reimann, Cronin)  
> **Status:** **METHODOLOGY SPECIFIED — BEHAVIORAL MAPPING GROUNDED IN PROTO-PERSONAS**  
> **Anti-Fictionalization Principle:** We strictly prohibit fictional character narratives, arbitrary stock photos, made-up hobbies, or synthetic biographies. Personas are operational models of observed and hypothesized user behaviors, mental models, goals, and systemic friction points.

---

## 1. Behavioral Variables & Spectrum Axes

Rather than grouping learners by demographic stereotypes (age, gender, ethnicity), CohortCircle models users across six critical behavioral and contextual spectrum axes:

```text
AXIS 1: Preferred Study Modality
Silent Co-Study <───────────────────────────────────────────────────────> Vocal Debate & Discussion
(Focus / Accountability)                                                  (Socratic / Conceptual)

AXIS 2: Scheduling Flexibility & Context
Rigid Commuter / Working <──────────────────────────────────────────────> Highly Flexible Residential
(Fixed transit & job slots)                                               (Campus dorm / On-demand)

AXIS 3: Collaboration Initiative
Hesitant / Passive Discovery <──────────────────────────────────────────> Proactive Organizer / Facilitator
(Prefers joining curated groups)                                          (Enjoys convening & leading)

AXIS 4: Academic Pacing & Goal Orientation
Exam / Assignment Deadline Driven <─────────────────────────────────────> Continuous Conceptual Mastery
(Sprint sessions / Practice drills)                                       (Weekly steady cadence)

AXIS 5: Group Size Comfort
Intimate Micro-Circle (2–3 peers) <─────────────────────────────────────> Cohort-Scale Group (6–8 peers)
(Deep trust / High accountability)                                        (Diverse perspectives)

AXIS 6: Digital Tooling Tolerance
Minimalist Single-View <────────────────────────────────────────────────> High-Tolerance Multi-App Juggler
(Dislikes notification noise)                                             (Comfortable across Discord/Notion)
```

---

## 2. Persona Role Architecture

To support the product scope defined in `docs/PRODUCT_REQUIREMENTS.md`, the platform models three distinct behavioral archetypes:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CohortCircle Persona Roles                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
[Primary Role: Learners]                            [Secondary Role: Host]
  ├── PROTO-LEARN-01: Independent Focused Solver      └── PROTO-HOST-01: Cohort Facilitator
  └── PROTO-LEARN-02: Conceptual Discussion Seeker
```

1. **`PROTO-LEARN-01` (Primary Learner — Quantitative Focus & Commuter Constraint):**
   * High demand for silent co-working and paired problem-solving.
   * Tight scheduling constraints due to commute and work.
   * Frustrated by meeting chatter, flakiness, and opaque group expectations.
2. **`PROTO-LEARN-02` (Primary Learner — Qualitative/Conceptual Focus & Discussion Seeker):**
   * High demand for vocal conceptual debate, lecture review, and essay breakdown.
   * Hesitant to cold-message peers in large lecture sections.
   * Seeks structured session agendas to prevent meetings from drifting into casual socializing.
3. **`PROTO-HOST-01` (Secondary Role — Collaborative Circle Facilitator):**
   * Proactive organizer who creates study circles and structures agendas.
   * Frustrated by manual schedule polling and uncommitted members.
   * Demands request moderation controls and real-time attendance RSVP tracking.

---

## 3. Transition Criteria: Proto-Persona to Empirical Persona

To ensure scientific integrity, a proto-persona may only be elevated to a **Verified Empirical Persona** when all four of the following empirical conditions are fulfilled:

| Verification Condition | Target Threshold | Validation Method |
|---|---|---|
| **Qualitative Anchor** | At least 2 distinct participant interviews (`INT-XX`) exhibit the behavioral patterns defined on the axes. | Coded interview transcripts in `private-research-data/` |
| **Observational Corroboration** | The behavioral pattern is observed in at least one contextual inquiry field site (`OBS-XX`). | Time-stamped field notes in `docs/research/` |
| **Quantitative Confirmation** | Survey distributions (`SUR-DATA`) confirm that the persona's core preferences represent &ge; 20% of respondents. | Survey frequency analysis in `docs/research/SURVEY_CODEBOOK.md` |
| **Negative Case Scrutiny** | Contradictory behaviors or outlier habits are explicitly documented and accounted for. | Qualitative audit in `docs/research/QUALITATIVE_ANALYSIS_PROTOCOL.md` |

*If any proto-persona is contradicted or unsupported by empirical fieldwork, it will be revised, merged, or formally retired.*
