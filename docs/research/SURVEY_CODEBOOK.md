# Survey Data Codebook & Dictionary: CohortCircle

> **Usage:** Variable definitions, encoding schemas, validation rules, and statistical analysis standards for the Exploratory Survey dataset.  
> **Status:** **CODEBOOK ESTABLISHED — EMPIRICAL DATASET PENDING**

---

## 1. Dataset Architecture & Storage Specification

* **Primary Raw Dataset Path:** `private-research-data/survey_responses.raw.csv` *(Git-ignored local storage)*
* **De-Identified Public Summary Path:** `docs/research/SURVEY_ANALYSIS_SUMMARY.md` *(Aggregate metrics only)*
* **Row Identifier:** `SUR-RESP-[001 to N]`
* **Missing Value Convention:** `NA` (System missing / Skipped optional field)

---

## 2. Quantitative Variable Dictionary

| Variable Name | Question ID | Conceptual Label | Data Type | Permissible Values / Code Mapping | Measurement Level |
|---|---|---|---|---|---|
| `resp_id` | Metadata | Unique Anonymous Record ID | String | Format: `SUR-RESP-XXX` | Nominal (Key) |
| `consent_ack` | Screener | Consent Confirmation | Boolean | `1` = Consented (`0` = Terminated) | Nominal |
| `acad_field` | Q01 | Primary Academic Field | Categorical (Integer) | `1` = CS/SE/IT<br>`2` = Engineering<br>`3` = Math/Stats<br>`4` = Natural Sciences<br>`5` = Business/Economics<br>`6` = Humanities/Arts<br>`7` = Social Sciences<br>`8` = Health/Medicine<br>`9` = Other (Text specified in `acad_field_other`) | Nominal |
| `acad_field_other`| Q01-Text | Other Academic Field (Verbatim) | String | Free-form text (Sanitized, no names) | Nominal |
| `grp_hours_weekly`| Q02 | Weekly Peer Study Hours | Categorical (Ordinal) | `1` = 0 hrs (Solitary)<br>`2` = 1–3 hrs<br>`3` = 4–6 hrs<br>`4` = 7–10 hrs<br>`5` = >10 hrs | Ordinal |
| `style_silent` | Q03 | Preferred Style: Silent Co-Study | Binary Indicator | `0` = Not Selected, `1` = Selected | Nominal |
| `style_problem` | Q03 | Preferred Style: Problem Solving | Binary Indicator | `0` = Not Selected, `1` = Selected | Nominal |
| `style_discuss` | Q03 | Preferred Style: Discussion | Binary Indicator | `0` = Not Selected, `1` = Selected | Nominal |
| `style_teach` | Q03 | Preferred Style: Peer Teaching | Binary Indicator | `0` = Not Selected, `1` = Selected | Nominal |
| `style_examprep`| Q03 | Preferred Style: Exam Prep | Binary Indicator | `0` = Not Selected, `1` = Selected | Nominal |
| `frict_topic_diff`| Q04 | Difficulty Locating Same Topic | Integer (1–5) | `1` = Never<br>`2` = Rarely<br>`3` = Sometimes<br>`4` = Often<br>`5` = Constantly | Ordinal / Interval Likert |
| `frict_sched_diff`| Q05 | Difficulty Aligning Schedules | Integer (1–5) | `1` = Never<br>`2` = Rarely<br>`3` = Sometimes<br>`4` = Often<br>`5` = Constantly | Ordinal / Interval Likert |
| `frict_habit_diff`| Q06 | Frustration Over Mismatched Habits | Integer (1–5) | `1` = Never<br>`2` = Rarely<br>`3` = Sometimes<br>`4` = Often<br>`5` = Constantly | Ordinal / Interval Likert |
| `frict_momentum` | Q07 | Groups Fizzling Out Early | Integer (1–5) | `1` = Never<br>`2` = Rarely<br>`3` = Sometimes<br>`4` = Often<br>`5` = Constantly | Ordinal / Interval Likert |
| `rank_sched_match`| Q08_A | Rank: Schedule Overlap | Integer (1–5) | `1` = Most Important &rarr; `5` = Least Important | Ordinal Rank |
| `rank_style_match`| Q08_B | Rank: Study Style Match | Integer (1–5) | `1` = Most Important &rarr; `5` = Least Important | Ordinal Rank |
| `rank_group_size` | Q08_C | Rank: Group Size Limits | Integer (1–5) | `1` = Most Important &rarr; `5` = Least Important | Ordinal Rank |
| `rank_agenda` | Q08_D | Rank: Session Agenda Clarity | Integer (1–5) | `1` = Most Important &rarr; `5` = Least Important | Ordinal Rank |
| `rank_modality` | Q08_E | Rank: In-Person vs. Online Fit | Integer (1–5) | `1` = Most Important &rarr; `5` = Least Important | Ordinal Rank |

---

## 3. Data Validation & Quality Rules

1. **Range Validation:** All Likert items (`frict_*`) must strictly fall in integer range $[1, 5]$. Any value outside this range triggers an entry exception.
2. **Rank Integrity:** In Question 08 (`rank_*`), the permutation of values across the five variables must equal $\{1, 2, 3, 4, 5\}$ with zero duplicate ranks per respondent.
3. **Style Selection Cap:** The sum of binary indicators $(\text{style\_silent} + \dots + \text{style\_examprep})$ must be between 1 and 2.
4. **Sanitization:** Free-text inputs in `acad_field_other` must be scrubbed of personal names, professor names, or university identification.

---

## 4. Derived Metric Formulations

### Borda Count Weight Calculation for Q08 Ranking:
To transform ordinal rank data into empirical weighting coefficients for the compatibility engine ($W_1$ to $W_5$ in `docs/ARCHITECTURE.md`):

$$\text{Points}(r) = 6 - r \quad (\text{where } r \in \{1, 2, 3, 4, 5\})$$

$$\text{Borda Score}(F) = \sum_{j=1}^{N} (6 - r_{j,F})$$

$$\text{Normalized Weight } W_F = \frac{\text{Borda Score}(F)}{\sum_{\text{all factors}} \text{Borda Score}}$$
