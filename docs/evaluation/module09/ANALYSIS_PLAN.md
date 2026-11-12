# Summative Usability Data Analysis Plan & Methodology

> **Document Purpose:** Prescriptive statistical, comparative, and qualitative analysis procedures for processing Module 09 evaluation data.  
> **Standards:** ISO 9241-11 Usability Metrics, Sauro & Lewis (2016) Quantifying the User Experience.  
> **Engine:** Implemented in [`scripts/analyze-module09.mjs`](../../../scripts/analyze-module09.mjs).  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`

---

## 1. Quantitative Effectiveness Analysis (Task Completion)

Effectiveness measures whether participants achieve their specified goals. To prevent inflationary reporting, **assisted completions are reported explicitly and never merged into unassisted success**.

### 1.1 Completion Metrics
For each task $T_k \in \{T01, \dots, T05\}$ across attempted sessions $N_{\text{attempted}}$:

1. **Unassisted Completion Rate ($C_{\text{unassisted}}$):**
   $$C_{\text{unassisted}} = \frac{S_U}{N_{\text{attempted}}} \times 100\%$$
   *Where $S_U$ is the number of participants achieving the task goal independently without hints.*

2. **Assisted Completion Rate ($C_{\text{assisted}}$):**
   $$C_{\text{assisted}} = \frac{S_A}{N_{\text{attempted}}} \times 100\%$$
   *Where $S_A$ is the number of participants achieving the goal with facilitator intervention.*

3. **Unsuccessful Task Rate ($C_{\text{failed}}$):**
   $$C_{\text{failed}} = \frac{F}{N_{\text{attempted}}} \times 100\%$$
   *Where $F$ is the count of abandoned or timeout tasks.*

4. **Overall Completion Rate ($C_{\text{overall}}$):**
   $$C_{\text{overall}} = C_{\text{unassisted}} + C_{\text{assisted}} = \frac{S_U + S_A}{N_{\text{attempted}}} \times 100\%$$

*Benchmark:* Target $C_{\text{unassisted}} \ge 80\%$, $C_{\text{overall}} \ge 90\%$.

---

## 2. Quantitative Efficiency Analysis (Time on Task)

Efficiency evaluates the resources expended by participants to achieve their goals.

### 2.1 Statistical Parameters
For each task $T_k$, compute:
* **Mean Duration ($\overline{t}$):** $\frac{1}{N} \sum_{i=1}^N t_i$
* **Median Duration ($\tilde{t}$):** 50th percentile (robust to positive skew and extreme values)
* **Standard Deviation ($\sigma_t$):** Measurement of time variance
* **Minimum & Maximum:** Full range of task durations
* **Benchmark Target:** Mean time-on-task $\le 120$ seconds per task.

*Integrity Rule:* Never discard long times or outliers without documenting an unambiguous technical anomaly (e.g., hardware crash).

---

## 3. Error Frequency & Taxonomy Analysis

Errors reflect interaction breakdowns, cognitive friction, and mental-model misalignment.

### 3.1 Error Rates & Breakdown
Compute frequency and rate per task across five standardized categories:
1. **Critical Errors (`ERR-CRIT`):** Unrecoverable missteps leading to failure or uncorrected wrong state.
2. **Non-Critical Errors (`ERR-NON`):** Recoverable slip, form validation error, or incorrect selection immediately fixed.
3. **Dead Clicks (`ERR-CLICK`):** Clicks on non-interactive elements, missing touch hitboxes.
4. **Navigation Disorientation (`ERR-NAV`):** Navigating to the wrong screen, looping through routes.
5. **Mental-Model Mismatches (`ERR-MODEL`):** Misunderstanding system logic (e.g., compatibility calculation rules).

$$\text{Error Frequency Rate} = \frac{\sum \text{Errors on } T_k}{N_{\text{attempted}}}$$

---

## 4. Context-Stratified Comparative Analysis

Compare performance across the balanced context dimensions:

### 4.1 Stratification Comparison Cuts:
* **Device Comparison:** Laptop ($n = 9$) vs. Mobile Phone ($n = 9$).
* **Environment Comparison:** Quiet ($n = 9$) vs. Mildly Distracting ($n = 9$).
* **Experience Group Comparison:** Frequent ($n = 6$) vs. Occasional ($n = 6$) vs. Novice ($n = 6$).

### 4.2 Statistical Humility & Descriptive Reporting:
With a sample of $N = 18$ ($n = 9$ or $n = 6$ per subgroup), analyses must remain strictly **descriptive**. Do not claim formal inferential statistical significance ($p < 0.05$) or broad population causality without a larger sample size. Document observed trends and percentage deltas clearly as exploratory findings.

---

## 5. Subjective Satisfaction Analysis (SEQ & SUS)

### 5.1 Single Ease Question (SEQ)
* Compute Mean and Median SEQ per task.
* Tabulate task ease distribution across the 1–7 scale.
* Benchmark check: $\overline{\text{SEQ}} \ge 5.5 / 7.0$.

### 5.2 System Usability Scale (SUS)
* Calculate individual participant SUS scores using Brooke's algorithm:
  $$\text{SUS} = 2.5 \times \left( \sum_{i \in \text{odd}} (R_i - 1) + \sum_{i \in \text{even}} (5 - R_i) \right)$$
* Compute Mean SUS, Median SUS, Standard Deviation, and Grade (Sauro-Lewis curve).
* Benchmark check: $\overline{\text{SUS}} \ge 80.0 / 100$.

---

## 6. Qualitative Thematic Analysis & Prioritization

Qualitative data from Think-Aloud observations and post-test interviews is structured into actionable themes:

### 6.1 Theme Analysis Structure:
* **Theme Name & Scope:** The specific usability friction or design pattern.
* **Supporting Participant Evidence:** Specific participant codes (`M09-Pxx`) and verified verbatim quotes.
* **Frequency ($k / 18$):** Number of unique participants reporting the issue.
* **Severity Classification:**
  * **Critical:** Prevents task completion or causes severe data corruption.
  * **Major:** Substantially degrades efficiency or creates high cognitive load.
  * **Minor:** Causes brief confusion but participant easily recovers.
  * **Cosmetic:** Superficial visual, typographic, or terminology inconsistency.
* **Actionable Remediation:** Concrete architectural or UI proposal for Module 10 implementation.
