# Research Ethics, Participant Rights & Privacy Protocol

> **Applicability:** All empirical research activities conducted across the CohortCircle project lifecycle, including Module 02 (Contextual Inquiry, Semi-Structured Interviews, Exploratory Survey) and Module 09 (Summative Usability Testing).
> **Repository Context:** CohortCircle is a **public open-source repository**. All public artifacts must adhere to strict de-identification standards to guarantee participant confidentiality and psychological safety.

---

## 1. Ethical Governance Principles

CohortCircle adheres strictly to established ethical codes for human-centered computing research, including the ACM Code of Ethics and the ethical principles of the Declaration of Helsinki for human-subject research:

1. **Informed & Explicit Consent:** Every participant must receive full, plain-language disclosure regarding study objectives, procedures, and data handling before participating.
2. **Voluntary Participation & Right to Withdraw:** Participation is completely voluntary. Any participant may decline to answer any question, pause the session, or withdraw at any point without penalty, social awkwardness, or need for justification.
3. **Data Minimization:** Only data strictly necessary for understanding peer learning workflows and evaluating usability will be collected. We strictly avoid asking for contact details, home addresses, official student IDs, or academic transcripts.
4. **Anonymization & Pseudonymization:** Raw research logs, interview notes, and survey data will be de-identified immediately upon collection, replacing real names with standardized coded identifiers (e.g., `P-01`, `P-02`, `INT-01`, `OBS-01`).
5. **No Commercial or Third-Party Data Transfer:** Collected data will never be sold, licensed, or shared with commercial entities, third-party advertisers, or external brokers.

---

## 2. Public Repository Privacy Boundary & Data Isolation

Because CohortCircle is hosted in a **publicly accessible Git repository**, the boundary between private research records and public documentation is absolute:

### 2.1 Strictly Prohibited in Version Control
The following materials must **NEVER** be committed or pushed to Git under any circumstances:
* Signed physical or digital consent forms.
* Real participant names, phone numbers, or email addresses.
* Institutional student identification numbers or staff IDs.
* Raw audio recordings (`*.raw.audio`, `*.mp3`, `*.wav`, `*.m4a`).
* Raw, unredacted interview transcripts containing identifying names or locations.
* Screen recordings or photographs capturing identifiable faces, surrounding peers, or personal device screens (e.g., private messages, personal tabs).
* Unredacted observer field notes.

### 2.2 Local Isolation Protocol (`private-research-data/`)
* All physical consent documents, raw audio files, and unredacted source records must be stored exclusively inside the local directory:
  ```text
  private-research-data/
  ```
* This folder is explicitly declared in the root `.gitignore` manifest and blocked from version control tracking.
* Only de-identified, aggregated, or explicitly consented and re-identification-screened summaries may be incorporated into public documentation files in `docs/research/`.

---

## 3. Participant Privacy & Recording Protocols

### 3.1 Audio & Screen Recording Opt-In
* Recording (audio or screen interaction) is **strictly optional and never mandatory**.
* Observers/interviewers must request separate, explicit verbal and written consent before initiating any recording device.
* If a participant declines recording, the session proceeds seamlessly using manual handwritten or typed notes with zero hesitation.
* No video of participants' faces or surroundings will ever be recorded; screen capture is restricted strictly to the application interface during usability tasks.

### 3.2 Photography & Contextual Inquiry Rules
* In campus public spaces (libraries, common study lounges, cafeterias), observations focus strictly on spatial workflows, tool interactions, and behavioral patterns.
* No identifiable faces or personal screen contents (e.g., personal emails or private chats) will be photographed or transcribed.
* If an accidental photo contains an identifiable person, it must be deleted immediately.

### 3.3 Data Retention & Secure Disposal
* Raw audio recordings will be transcribed into anonymized markdown notes within 5 business days of collection.
* Once transcription and de-identification are verified, raw audio files stored in `private-research-data/` will be permanently erased.
* De-identified research notes will be archived in the project research records using anonymized identifiers (`INT-01`, `OBS-01`, `SUR-01`).

---

## 4. Participant Informed Consent Agreement Template

Below is the standardized consent agreement presented to participants prior to interview or usability testing sessions:

```text
================================================================================
                    COHORTCIRCLE RESEARCH CONSENT FORM
================================================================================

Project Title: CohortCircle User Research & Usability Evaluation
Principal Researcher: Muhammad Taimoor Ajmal
Project Contact: taimoorajmal00@gmail.com
Public Project Repository: https://github.com/muhammadtaimoorajmal/CohortCircle

PURPOSE OF THE STUDY:
You are invited to participate in a research study aimed at understanding how
learners discover, form, manage, and coordinate peer study groups, and
evaluating the usability of the CohortCircle web application.

VOLUNTARY PARTICIPATION:
Your participation in this study is entirely voluntary. You may choose not to
participate, skip any questions, take breaks, or stop your participation at any
time without any negative consequence or academic impact.

WHAT YOU WILL BE ASKED TO DO:
Depending on the session, you will be invited to participate in:
  - An interview discussing your study habits and study group experiences (25-35 minutes)
  - Or a usability evaluation where you perform specific tasks using a prototype (25-35 minutes)

CONFIDENTIALITY & DATA PROTECTION:
All information collected during this study will be kept strictly confidential.
Your name and identifiable details will NEVER appear in any published report,
public open-source repository, or presentation. A coded pseudonym (e.g., P-01)
will be used to represent your feedback. Raw notes and recordings are maintained
exclusively in private local storage and are destroyed following analysis.

RECORDING PERMISSION (OPTIONAL):
[  ] I consent to audio recording of this session solely for note-taking and analysis.
[  ] I do NOT consent to audio recording. (Session will proceed with manual notes only.)

QUOTATION PERMISSION (OPTIONAL):
[  ] I consent to having anonymous, de-identified excerpts from my interview
     quoted in public open-source project documentation.
[  ] I prefer that no direct quotations be used, only aggregate thematic summaries.

PARTICIPANT CONFIRMATION:
By signing or verbally confirming below, you acknowledge that you have read and
understood this information and voluntarily agree to participate.

Participant Name: __________________________________________________
Participant Signature / Confirmation: _____________________________
Date: ________________________
================================================================================
```
