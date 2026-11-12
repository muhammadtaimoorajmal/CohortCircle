# Post-Test System Usability Scale (SUS) Instrument & Guide

> **Instrument Reference:** Post-Test Standardized Usability Scale<br>
> **Theoretical Foundation:** Brooke (1996); Bangor, Kortum & Miller (2008); Sauro & Lewis (2016).<br>
> **Target Benchmark:** Mean SUS &ge; 80.0 / 100 (`NFR-USE-01`). Distinct from the Sauro & Lewis Grade A cutoff of 80.3.<br>
> **Repository:** `muhammadtaimoorajmal/CohortCircle`

---

## 1. Instrument Rationale & Administration Protocol

The **System Usability Scale (SUS)** is a 10-item questionnaire providing a global assessment of perceived system usability, learnability, and satisfaction.

### Administration Rules:
1. **Timing:** Administer immediately following the completion of all five evaluation tasks (T01 through T05), and *before* the open-ended qualitative debrief.
2. **Neutrality:** The participant must complete the questionnaire independently. The facilitator must not explain, defend, or clarify items. If the participant hesitates, instruct them to mark their immediate instinctive reaction.
3. **Response Completeness:** Participants must respond to all 10 items. If an item is accidentally left blank, the standard imputation rule assigns a neutral score of 3 (contribution of 2), although complete responses are strongly required.

---

## 2. Standard 10-Item Questionnaire

*Response Scale: 1 = Strongly Disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly Agree*

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SYSTEM USABILITY SCALE (SUS)                                    │
├────┬──────────────────────────────────────────────────────────┬───┬───┬───┬───┬───┤
│ #  │ Statement                                                │ 1 │ 2 │ 3 │ 4 │ 5 │
├────┼──────────────────────────────────────────────────────────┼───┼───┼───┼───┼───┤
│ 1  │ I think that I would like to use CohortCircle frequently.│[ ]│[ ]│[ ]│[ ]│[ ]│
│ 2  │ I found CohortCircle unnecessarily complex.              │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 3  │ I thought CohortCircle was easy to use.                  │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 4  │ I think that I would need the support of a technical     │   │   │   │   │   │
│    │ person to be able to use CohortCircle.                   │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 5  │ I found the various functions in CohortCircle were       │   │   │   │   │   │
│    │ well integrated.                                         │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 6  │ I thought there was too much inconsistency in            │   │   │   │   │   │
│    │ CohortCircle.                                            │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 7  │ I would imagine that most people would learn to use      │   │   │   │   │   │
│    │ CohortCircle very quickly.                               │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 8  │ I found CohortCircle very cumbersome to use.             │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 9  │ I felt very confident using CohortCircle.                │[ ]│[ ]│[ ]│[ ]│[ ]│
│ 10 │ I needed to learn a lot of things before I could get     │   │   │   │   │   │
│    │ going with CohortCircle.                                 │[ ]│[ ]│[ ]│[ ]│[ ]│
└────┴──────────────────────────────────────────────────────────┴───┴───┴───┴───┴───┘
```

---

## 3. Mathematical Scoring Algorithm

SUS items alternate between positively and negatively phrased statements to mitigate acquiescence and extreme response bias:

### 3.1 Item Contribution Computation
* **For Odd-Numbered Items (1, 3, 5, 7, 9):**
  $$C_i = R_i - 1$$
* **For Even-Numbered Items (2, 4, 6, 8, 10):**
  $$C_i = 5 - R_i$$

Where $R_i \in \{1, 2, 3, 4, 5\}$ is the participant's raw rating. Each item contribution $C_i$ ranges from $0$ to $4$.

### 3.2 Participant Composite SUS Score
The sum of the 10 item contributions is multiplied by 2.5 to convert the score to a standard **0 to 100 scale**:

$$\text{SUS} = 2.5 \times \sum_{i=1}^{10} C_i$$

---

## 4. Aggregate Usability Grading & Benchmark Norms

### 4.1 Benchmark Targets vs. Empirical Grade Scale:
* **CohortCircle Target Benchmark (`NFR-USE-01`):** $\overline{\text{SUS}} \ge 80.0 / 100$.
* **Industry Average Baseline:** $\approx 68.0 / 100$ (Sauro, 2011).
* **Empirical Scale Distinction:** Note that the project target of $\ge 80.0$ is an operational milestone threshold, distinct from the standardized Sauro & Lewis (2016) curved Grade A cutoff of $80.3$ (top 10th percentile). A score of $80.0$ reflects an above-average system at the Grade B / Grade A boundary.

### 4.2 Score Interpretation & Grade Curve (Sauro & Lewis, 2016):
* **90.0 – 100.0:** Grade **A+** (Exceptional, top 5th percentile usability).
* **80.3 – 89.9:** Grade **A** (Excellent usability; top 10th percentile).
* **74.1 – 80.2:** Grade **B** (Good / above average usability; project target of 80.0 falls at the upper boundary).
* **68.0 – 74.0:** Grade **C** (Average / marginal; clear friction points present).
* **51.0 – 67.9:** Grade **D** (Poor usability; major design remediation necessary).
* **0.0 – 50.9:** Grade **F** (Unacceptable; critical product failure).

---

## 5. Reporting & Integrity Rules

1. **Every Valid Response Disclosed:** All 18 participant scores will be tabulated in the final results report when collected.
2. **Statistical Transparency:** Report Mean, Median, Standard Deviation, Minimum, Maximum, and Interquartile Range (IQR).
3. **Zero Fabrication:** Questionnaires remain blank until authentic participants complete evaluations during scheduled fieldwork.
