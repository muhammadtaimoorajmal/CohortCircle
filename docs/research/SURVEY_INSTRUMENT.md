# Exploratory Survey Instrument: CohortCircle

> **Method:** Quantitative & Attitudinal Online Survey Questionnaire  
> **Status:** **INSTRUMENT PREPARED — FIELDWORK PENDING**  
> **Sampling Target:** Planning Target of 30–50 Student & Learner Responses *(Planning target only; not a completed sample)*  
> **Privacy Guarantee:** Completely anonymous. Zero collection of names, phone numbers, email addresses, or student IDs.

---

## 1. Survey Overview & Administration Guide

This questionnaire is formatted for digital deployment across modern survey platforms (Google Forms, LimeSurvey, Qualtrics, or Microsoft Forms). It collects quantitative behavioral data to validate or challenge patterns observed in qualitative interviews (`INT-01`–`07`) and contextual inquiry (`OBS-01`–`03`).

* **Estimated Completion Time:** 4 to 6 minutes
* **Target Respondent Profile:** Current university students and self-directed adult learners.
* **Distribution Channels:** Student community Slack/Discord servers, library bulletin links, and peer academic networks.

---

## 2. Participant Introduction & Informed Consent Block

```text
================================================================================
          COHORTCIRCLE STUDENT STUDY HABITS & PEER LEARNING SURVEY
================================================================================

Welcome! We are conducting an open-source research study to understand how
university students and independent learners discover, organize, and sustain
peer study groups.

Your insights will directly guide the design of CohortCircle, an open-source,
accessible collaborative learning platform.

WHAT TO EXPECT:
- The survey consists of 8 brief questions and takes approximately 4–6 minutes.
- Participation is 100% voluntary. You may exit the survey at any time.
- This survey is completely anonymous. We do NOT collect your name, email,
  phone number, IP address, or student identification number.
- Data collected will only be presented in aggregate form in public open-source
  research documentation.

CONSENT CONFIRMATION:
[ ] I confirm that I am a university student or active learner, and I voluntarily
    consent to participate in this anonymous research survey.
================================================================================
```

---

## 3. Questionnaire Specification

### Section A: Academic Profile & Study Baseline

#### Question 01 (Academic Discipline / Track)
* **Prompt:** "What is your primary academic discipline or learning area?"
* **Question Type:** Single-Select Dropdown with "Other" option.
* **Options:**
  1. Computer Science / Software Engineering / IT
  2. Engineering (Mechanical, Electrical, Civil, etc.)
  3. Mathematics / Statistics / Data Science
  4. Natural Sciences (Biology, Chemistry, Physics)
  5. Business, Management & Economics
  6. Humanities, Arts & Literature
  7. Social Sciences & Psychology
  8. Health Sciences & Medicine
  9. Other (Please specify): `[Text Input]`

---

#### Question 02 (Weekly Group Study Frequency)
* **Prompt:** "During a typical academic semester, how many hours per week do you spend studying collaboratively with peers?"
* **Question Type:** Single-Select Radio Button.
* **Options:**
  1. 0 hours (I study exclusively on my own)
  2. 1 to 3 hours per week
  3. 4 to 6 hours per week
  4. 7 to 10 hours per week
  5. More than 10 hours per week

---

#### Question 03 (Preferred Study Style)
* **Prompt:** "Which study format do you find most productive when working with peers? (Select your top 1–2 preferred styles)"
* **Question Type:** Multi-Select Checkbox (Maximum 2 selections allowed).
* **Options:**
  1. **Silent Co-Study:** Working quietly alongside peers on individual tasks for accountability and mutual focus with minimal speaking.
  2. **Collaborative Problem-Solving:** Actively working through problem sets, lab exercises, or code debugging together in real-time.
  3. **Discussion-Based Learning:** Debating conceptual topics, reviewing lecture notes, and questioning assumptions out loud.
  4. **Peer Teaching:** Explaining concepts to one another or taking turns presenting slides/topics.
  5. **Examination Preparation:** Timed mock tests, flashcard drilling, and rapid-fire quiz rounds.

---

### Section B: Group Formation & Coordination Friction

*Scale Definition:*  
Respondents evaluate the frequency with which they experience each challenge using a standardized 5-point Likert frequency scale:
* `1 = Never`
* `2 = Rarely`
* `3 = Sometimes`
* `4 = Often`
* `5 = Constantly`

---

#### Question 04 (Discovery Difficulty: Topic Alignment)
* **Prompt:** "How often do you find it difficult to locate peers who are studying the exact same course, syllabus topics, or technical focus areas that you need help with?"
* **Question Type:** 5-Point Likert Scale (`1: Never` &rarr; `5: Constantly`).

---

#### Question 05 (Coordination Difficulty: Schedule Alignment)
* **Prompt:** "How often do scheduling conflicts (differing class timetables, jobs, commutes) prevent you from organizing a mutually convenient study session with peers?"
* **Question Type:** 5-Point Likert Scale (`1: Never` &rarr; `5: Constantly`).

---

#### Question 06 (Interpersonal Difficulty: Mismatched Habits)
* **Prompt:** "How often do you experience frustration in study groups due to conflicting study habits (e.g., someone wanting to chat when you want quiet, or mismatched pacing and preparation levels)?"
* **Question Type:** 5-Point Likert Scale (`1: Never` &rarr; `5: Constantly`).

---

#### Question 07 (Longevity Failure: Groups Losing Momentum)
* **Prompt:** "How often do informal study groups that you join or start lose momentum and dissolve after only one or two meetings?"
* **Question Type:** 5-Point Likert Scale (`1: Never` &rarr; `5: Constantly`).

---

### Section C: Feature Prioritization & Compatibility Preferences

#### Question 08 (Forced-Rank Feature Prioritization)
* **Prompt:** "When evaluating whether a study group is worth your time, please rank the following five factors in order of importance to you (1 = Most Important, 5 = Least Important):"
* **Question Type:** Drag-and-Drop Ranking Matrix (1 to 5).
* **Items to Rank:**
  * **A. Schedule Overlap:** Meeting times match my weekly availability without awkward conflicts.
  * **B. Study Style Compatibility:** Group matches my preferred working mode (e.g., silent focus vs. vocal discussion).
  * **C. Explicit Group Size Limits:** Cap on participants (e.g., small 3–5 member circles) to prevent crowds.
  * **D. Structured Session Agendas:** Clear goals and topics defined in advance for every meeting.
  * **E. Format Modality Fit:** Explicit agreement on whether sessions are Online, In-Person on campus, or Hybrid.

---

## 4. Survey Completion & Debrief Message

```text
================================================================================
                         THANK YOU FOR PARTICIPATING!
================================================================================

Your response has been recorded anonymously. Your feedback directly shapes
the features, compatibility algorithms, and design choices of CohortCircle.

If you are interested in following the open-source development of this project
or reading our public research synthesis, visit our GitHub repository:
https://github.com/muhammadtaimoorajmal/CohortCircle

Thank you for contributing to better collaborative learning!
================================================================================
```

---

## 5. Statistical Analysis Recipe

When empirical responses are collected during fieldwork, the quantitative analysis will execute the following statistical procedures:
1. **Descriptive Statistics:** Calculate mean, median, standard deviation, and interquartile range for Likert items Q04–Q07.
2. **Frequency Distribution:** Tabulate percentages for academic disciplines (Q01), study hours (Q02), and preferred styles (Q03).
3. **Rank-Order Weighting:** Compute Borda Count scores for Q08 ranking items to determine empirical weights for the compatibility engine ($W_1$ to $W_5$).
4. **Cross-Tabulation:** Cross-reference study style preference (Q03) against perceived habit mismatch frequency (Q06).
