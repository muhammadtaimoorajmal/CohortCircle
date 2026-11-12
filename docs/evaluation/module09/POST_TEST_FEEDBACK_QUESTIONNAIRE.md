# Semi-Structured Post-Test Feedback Questionnaire & Interview Guide

> **Instrument Reference:** Post-Test Qualitative Debrief Protocol  
> **Methodology:** Semi-structured qualitative interview (7–10 minutes)  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Privacy Note:** Transcripts and signed consent stored in `private-research-data/module09/` (gitignored).

---

## 1. Interview Objective & Facilitator Conduct

The post-test interview gathers **qualitative depth, mental-model insights, and user suggestions** following the completion of the five benchmark tasks and the SUS questionnaire.

### Facilitator Conduct Guidelines:
* **Maintain Absolute Neutrality:** Never defend the design, explain why a feature works a certain way, or justify usability defects.
* **Probe Without Leading:**
  * *Leading (Avoid):* "Did you like how easy the compatibility breakdown was?"
  * *Neutral (Proper):* "What was your impression of the compatibility score and the breakdown modal?"
* **Capture Exact Language:** Write down participant phrases verbatim. If audio recording was consented, review recordings to transcribe key quotes accurately.

---

## 2. Core Interview Questions & Probes

### Question 1: Overall Impression & Value Proposition
* *"Now that you have navigated CohortCircle, what is your overall impression of the platform? What felt most intuitive or useful?"*
  * *Probe:* Did the distinction between solo studying and peer circles make sense?
  * *Probe:* Did anything surprise you about the interface?

### Question 2: Pain Points, Friction & Hesitation
* *"What aspect of the application caused the greatest hesitation, confusion, or frustration while working through the tasks?"*
  * *Probe:* Were there moments when you felt lost or wondered where to click next?
  * *Probe:* How did you find the experience on this device (laptop / mobile phone)?

### Question 3: Compatibility Engine Clarity & Trust
* *"Throughout the application, you saw match percentages (e.g., 94% Match) and a compatibility breakdown. How clear and trustworthy did those numbers feel to you?"*
  * *Probe:* Did the five factors (topics, schedule, study style, format, group size) feel like the right things to match on?
  * *Probe:* Would you trust this match score when choosing a real study group?

### Question 4: Role Switching & Management Mental Models
* *"You experienced both the Learner view and the Host view (creating circles, reviewing applicants, scheduling sessions). How easy was it to understand the difference between being a member and being a facilitator?"*
  * *Probe:* Was the switch between Learner and Host clear?
  * *Probe:* Did the circle creation wizard feel structured or too long?

### Question 5: Top Priority Improvement
* *"If you could recommend one specific change or improvement before using CohortCircle with your actual classmates or friends, what would it be?"*
  * *Probe:* What would make you want to use this every week?

---

## 3. Qualitative Coding & Thematic Analysis Framework

Qualitative interview responses and Think-Aloud transcripts will be analyzed using a 4-tier thematic coding taxonomy:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   QUALITATIVE THEME TAXONOMY                           │
├─────────┬──────────────────────────────────────────────────────────────┤
│ Theme 1 │ Discovery & Compatibility Matching Comprehension             │
│ Theme 2 │ Circle Governance, Host Controls & Psychological Safety      │
│ Theme 3 │ Scheduling Synchronization & Timetable Usability             │
│ Theme 4 │ Mobile Responsiveness, Layout Hierarchy & Navigation         │
└─────────┴──────────────────────────────────────────────────────────────┘
```

For each identified theme in the final analysis report:
1. **Verbatim Evidence:** Direct participant quotes referenced by `M09-Pxx`.
2. **Frequency:** Number of participants raising the issue ($k / 18$).
3. **Severity:** Critical, Major, Minor, or Cosmetic.
4. **Actionable Remediation:** Proposed UI refinement for Module 10.
