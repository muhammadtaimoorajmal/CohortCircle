# Post-Task Single Ease Question (SEQ) Instrument & Guide

> **Instrument Reference:** Post-Task Subjective Usability Assessment  
> **Theoretical Framework:** Sauro & Dumas (2009); ISO 9241-11 Usability Ergonomics.  
> **Target Benchmark:** Mean SEQ &ge; 5.5 / 7.0.  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`

---

## 1. Instrument Rationale & Administration Protocol

The **Single Ease Question (SEQ)** is a standardized 1-item psychometric post-task rating instrument used to measure the participant’s perceived task difficulty immediately after attempting a task.

### Administration Rules:
1. **Timing:** Present the SEQ question immediately after the participant declares task completion or abandonment, and *before* starting any subsequent task or qualitative debrief.
2. **Independence:** Do not discuss whether the task was successful or point out errors before asking the question.
3. **Format:** Administer either orally, on a printed card, or via digital prompt.
4. **Verbatim Prompt:**  
   *"Overall, how easy or difficult was this task to complete?"*

---

## 2. Standard 7-Point Rating Scale

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      SINGLE EASE QUESTION (SEQ)                        │
├────────────────────────────────────────────────────────────────────────┤
│ "Overall, how easy or difficult was this task to complete?"            │
│                                                                        │
│   [ 1 ]  Very Difficult                                                │
│   [ 2 ]  Difficult                                                     │
│   [ 3 ]  Somewhat Difficult                                            │
│   [ 4 ]  Neutral                                                       │
│   [ 5 ]  Somewhat Easy                                                 │
│   [ 6 ]  Easy                                                          │
│   [ 7 ]  Very Easy                                                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Recording Sheet (Per Participant)

| Task ID | Task Domain | SEQ Score (1–7) | Verbal Rationale / Spontaneous Comment |
|:---:|---|:---:|---|
| **T01** | Learner Profile & Study Preferences | `[   ]` | *"________________________________________"* |
| **T02** | Curated Discovery & Compatibility | `[   ]` | *"________________________________________"* |
| **T03** | Circle Details & Membership Workflows | `[   ]` | *"________________________________________"* |
| **T04** | Host Circle Creation & Management | `[   ]` | *"________________________________________"* |
| **T05** | Session Scheduling, RSVP & Dashboard | `[   ]` | *"________________________________________"* |

---

## 4. Quantitative Analysis & Benchmark Interpretation

### 4.1 Statistical Calculation
For a sample of $N$ valid responses on Task $T_k$:

$$\overline{\text{SEQ}}_{T_k} = \frac{1}{N} \sum_{i=1}^{N} \text{SEQ}_{i, T_k}$$

$$\text{Overall } \overline{\text{SEQ}} = \frac{1}{5 \cdot N} \sum_{k=1}^{5} \sum_{i=1}^{N} \text{SEQ}_{i, T_k}$$

### 4.2 Benchmark Thresholds (Sauro & Dumas Standard):
* **&ge; 5.5 / 7.0 (Target Benchmark Achieved):** High perceived ease; task flow is intuitive and fluent.
* **4.5 to 5.4 (Marginal Ease):** Acceptable, but indicates minor friction, hesitation, or cognitive load.
* **< 4.5 (Friction Alert):** Task exhibits substantial interaction obstacles, confusing terminology, or navigation breakdowns requiring priority design remediation.
