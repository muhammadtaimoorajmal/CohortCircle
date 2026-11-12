# Summative Evaluation Research Data Dictionary

> **Document Purpose:** Precise data definitions, field names, valid ranges, and relational schemas for all Module 09 usability data collection files.  
> **Schema Consumer:** [`scripts/analyze-module09.mjs`](../../../scripts/analyze-module09.mjs) automated analysis engine.  
> **Storage Path:** `private-research-data/module09/data/` (strictly excluded from Git).

---

## 1. File Structure Overview

All raw de-identified experimental data is stored in standard RFC 4180 CSV format across three relational tables:

```
private-research-data/module09/data/
├── sessions.csv    # Session metadata (18 rows: 1 per participant)
├── tasks.csv       # Task execution records (90 rows: 18 participants × 5 tasks)
├── sus.csv         # SUS survey responses (18 rows: 1 per participant)
└── qualitative.csv # Coded qualitative feedback and verbatim quotes
```

---

## 2. Table: `sessions.csv` (Participant Session Metadata)

Captures participant demographics, context stratification, device specs, and session status.

| Field Name | Type | Valid Values / Format | Description | Required |
|---|---|---|---|:---:|
| `participant_id` | String | `M09-P01` to `M09-P18` | Unique anonymous participant identifier | YES |
| `experience_group`| Enum | `Group A`, `Group B`, `Group C` | Participant study experience stratum | YES |
| `weekly_study_hours`| Float | $\ge 0.0$ | Self-reported weekly peer study hours | YES |
| `device_context` | Enum | `Laptop`, `Mobile` | Hardware device category assigned | YES |
| `device_model` | String | e.g., `MacBook Pro 14`, `Pixel 7` | Specific testing hardware | NO |
| `viewport_width` | Integer| $\ge 320$ | Browser viewport width in CSS pixels | YES |
| `viewport_height`| Integer| $\ge 480$ | Browser viewport height in CSS pixels | YES |
| `environment` | Enum | `Quiet`, `Distracting` | Ambient testing environment condition | YES |
| `task_sequence` | Enum | `Seq A`, `Seq B`, `Seq C`, `Seq D`, `Seq E` | Latin-square task order assigned | YES |
| `consent_verified`| Boolean| `true`, `false` | Informed consent confirmed before start | YES |
| `session_date` | Date | `YYYY-MM-DD` | Date evaluation was conducted | YES |
| `session_duration`| Integer| $\ge 0$ | Total session duration in minutes | YES |
| `status` | Enum | `Completed`, `Partial`, `Terminated` | Overall session completion status | YES |

---

## 3. Table: `tasks.csv` (Task Execution & SEQ Metrics)

Captures effectiveness, efficiency, error counts, and post-task ease for each task attempt ($18 \times 5 = 90$ records).

| Field Name | Type | Valid Values / Format | Description | Required |
|---|---|---|---|:---:|
| `participant_id` | String | `M09-P01` to `M09-P18` | Foreign key referencing `sessions.csv` | YES |
| `task_id` | Enum | `T01`, `T02`, `T03`, `T04`, `T05` | Task identifier | YES |
| `sequence_position`| Integer| `1` to `5` | Chronological order task was presented | YES |
| `start_time` | String | `HH:MM:SS` | Task start timestamp | YES |
| `end_time` | String | `HH:MM:SS` | Task completion/abandonment timestamp | YES |
| `duration_seconds`| Integer| $0$ to $300$ | Elapsed time on task in seconds | YES |
| `outcome` | Enum | `Unassisted`, `Assisted`, `Failed` | Task completion outcome | YES |
| `assist_count` | Integer| $\ge 0$ | Number of facilitator assistance hints | YES |
| `err_crit` | Integer| $\ge 0$ | Critical / unrecoverable errors | YES |
| `err_non` | Integer| $\ge 0$ | Non-critical / recoverable errors | YES |
| `err_click` | Integer| $\ge 0$ | Dead clicks or unclickable target taps | YES |
| `err_nav` | Integer| $\ge 0$ | Navigation disorientation occurrences | YES |
| `err_model` | Integer| $\ge 0$ | Mental-model mismatch instances | YES |
| `seq_score` | Integer| `1` to `7` | Single Ease Question rating (1=Hard, 7=Easy) | YES |
| `notes` | String | Free text | Key observer behavioral notes | NO |

---

## 4. Table: `sus.csv` (System Usability Scale Ratings)

Captures individual item ratings and computed composite SUS score for each participant ($18$ records).

| Field Name | Type | Valid Values | Description | Required |
|---|---|:---:|---|:---:|
| `participant_id` | String | `M09-P01` to `M09-P18` | Foreign key referencing `sessions.csv` | YES |
| `q1` | Integer | `1` to `5` | Raw rating: Frequently use | YES |
| `q2` | Integer | `1` to `5` | Raw rating: Unnecessarily complex | YES |
| `q3` | Integer | `1` to `5` | Raw rating: Easy to use | YES |
| `q4` | Integer | `1` to `5` | Raw rating: Need technical support | YES |
| `q5` | Integer | `1` to `5` | Raw rating: Well integrated functions | YES |
| `q6` | Integer | `1` to `5` | Raw rating: Inconsistency | YES |
| `q7` | Integer | `1` to `5` | Raw rating: Learn very quickly | YES |
| `q8` | Integer | `1` to `5` | Raw rating: Cumbersome to use | YES |
| `q9` | Integer | `1` to `5` | Raw rating: Felt confident | YES |
| `q10` | Integer | `1` to `5` | Raw rating: Learn a lot before starting | YES |
| `sus_score` | Float | `0.0` to `100.0` | Calculated composite score: $\sum C_i \times 2.5$ | YES |

---

## 5. Table: `qualitative.csv` (Coded Feedback & Quotes)

Captures participant interview comments, categorized usability issues, and user improvement recommendations.

| Field Name | Type | Valid Values | Description | Required |
|---|---|---|---|:---:|
| `feedback_id` | String | `FDB-001` upwards | Unique qualitative comment identifier | YES |
| `participant_id` | String | `M09-P01` to `M09-P18` | Participant citation | YES |
| `task_id` | Enum | `T01`–`T05`, `GLOBAL` | Associated task or whole-system feedback | YES |
| `theme_category` | Enum | `Discovery`, `Compatibility`, `Governance`, `Scheduling`, `Layout` | Thematic category | YES |
| `sentiment` | Enum | `Positive`, `Neutral`, `Critical` | Participant sentiment tone | YES |
| `verbatim_quote` | String | Quotation text | Anonymous participant quote | YES |
| `severity` | Enum | `Critical`, `Major`, `Minor`, `Cosmetic` | Usability impact rating | YES |
| `suggested_action`| String | Proposed remediation | Interface enhancement recommendation | YES |
