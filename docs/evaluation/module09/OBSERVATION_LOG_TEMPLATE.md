# Summative Evaluation Chronological Observation Log Template

> **Instrument Purpose:** Running real-time observational logging template for the facilitator/observer during Module 09 sessions.  
> **Methodology:** Concurrent Think-Aloud (CTA) with behavioral timestamping.  
> **Repository:** `muhammadtaimoorajmal/CohortCircle`  
> **Privacy Note:** Store completed observational logs strictly in local `private-research-data/module09/` (gitignored).

---

## 1. Observer Protocol & Objective Recording Guidelines

* **Record Observable Behaviors, Not Subjective Judgments:**
  * *Subjective (Avoid):* "Participant felt confused by the buttons."
  * *Objective (Proper):* "Participant paused for 18 seconds on Step 2 of wizard, looked back and forth between 'Charter' and 'Norms', clicked 'Cancel' then re-opened wizard."
* **Log Verbatim Think-Aloud Utterances:**
  * Use exact quotation marks when the participant speaks spontaneously.
  * Note tone of voice, sighs, smiles, or gestures if relevant to cognitive load.
* **Classify Errors Immediately:**
  * Use the standard error taxonomy (`ERR-CRIT`, `ERR-NON`, `ERR-CLICK`, `ERR-NAV`, `ERR-MODEL`).
  * If the facilitator must give a hint, log it as an intervention (`ASSIST-1`, `ASSIST-2`).

---

## 2. Chronological Behavioral Observation Sheet

| Timestamp (`MM:SS`) | Participant ID | Task ID | Screen / Component | Observable Action & Behavior | Error Code | Think-Aloud Utterance / Participant Comment |
|:---:|:---:|:---:|---|---|:---:|---|
| `00:15` | `M09-P__` | `T01` | Profile Page | Scrolled down to availability matrix immediately without reading header | — | *"Let's see if my evenings are here."* |
| `00:42` | `M09-P__` | `T01` | Availability Matrix | Clicked individual cells for Mon–Fri evenings before noticing preset button | `ERR-NON` | *"Oh, there's a button for weekday evenings!"* |
| `01:10` | `M09-P__` | `T01` | Profile Form | Typed 'Algorithms' and hit Space; tag did not add; clicked '+' button | `ERR-CLICK` | *"Do I have to press Enter?"* |
| `01:55` | `M09-P__` | `T01` | Bottom Actions | Clicked 'Save Preferences'; banner announced success; reloaded page | — | *"Let's refresh to see if it stayed."* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |
| `____` | `M09-P__` | `T0_` | ____________________ | __________________________________________________ | _______ | *"____________________________________________"* |

---

## 3. Session Error Summary Ledger

At the end of each session, count occurrences across categories:

* **Total Critical Errors (`ERR-CRIT`):** `____` *(Unrecoverable path, data loss, task failure)*
* **Total Non-Critical Errors (`ERR-NON`):** `____` *(Recoverable input error, form validation prompt)*
* **Total Dead Clicks (`ERR-CLICK`):** `____` *(Clicking non-clickable text, missing touch targets)*
* **Total Navigation Disorientation (`ERR-NAV`):** `____` *(Backtracking, wrong sidebar route)*
* **Total Mental-Model Mismatches (`ERR-MODEL`):** `____` *(Misinterpreting feature mechanics)*
* **Total Facilitator Interventions (`ASSIST`):** `____` *(Assistance prompts provided)*
