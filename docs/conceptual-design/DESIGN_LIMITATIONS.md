# Conceptual Design Limitations & Usability Inquiries: CohortCircle

> **Governance Category:** Design Boundaries & Pre-Evaluation Risk Log  
> **Status:** **LIMITATIONS LOGGED & INVESTIGATION QUESTIONS ESTABLISHED**

---

## 1. Primary Design Limitations & Assumptions

1. **Unvalidated Proto-Persona Foundation:**  
   Because empirical user research fieldwork is pending participant recruitment and collection, all interaction flows, mental model mappings, and scenario scripts are built upon the unvalidated proto-personas (`PROTO-LEARN-01`, `PROTO-LEARN-02`, `PROTO-HOST-01`). If empirical research reveals fundamentally different student behaviors, these task flows must be refactored.
2. **Local Storage Density Boundaries:**  
   The standalone client-side architecture relies on browser local storage. While ideal for privacy, speed, and offline usability evaluation, it assumes a single browser session context. Multi-user collaboration across separate physical devices requires pre-seeded demonstration accounts or data export/import utilities until post-v1.0 cloud synchronization is introduced.
3. **Simulated Host Moderation in Single-User Testing:**  
   In a standalone local prototype, when a user submits a join request as a learner, approving that request requires either switching to the host profile or observing an automated mock approval state. The design addresses this by providing an instant "Persona Switcher" in the evaluation toolbar for testing.

---

## 2. Key Usability Inquiries for Low-Fidelity Testing (Module 05 & 06)

During formative usability testing in upcoming modules, the following interaction design questions must be empirically evaluated:

* **Inquiry 01 (Compatibility Explainability Comprehension):**  
  Do learners understand the 5-factor breakdown modal, or do they perceive the compatibility score as an arbitrary grade? Does the explanation build trust or add cognitive clutter?
* **Inquiry 02 (Availability Grid Input Ergonomics):**  
  Is the 7 &times; 3 weekly availability grid intuitive to toggle via keyboard and touch, or do users prefer simple dropdown selections (e.g., "Weekday Evenings")?
* **Inquiry 03 (Request Note Friction):**  
  Does requiring an introductory note on moderated circles discourage hesitant or introverted learners from applying, or does it provide a reassuring feeling of quality?
* **Inquiry 04 (Dual-Role Navigation Clarity):**  
  Do users easily understand that they can host circles via the "Host Hub" while simultaneously participating as regular members in other circles via "My Dashboard"?

---

## 3. Governance Register & FYP Decision Tracking

* **Critical Open Decision `DEC-002` (FYP Alignment):**  
  Maintained strictly as **`[PENDING USER CONFIRMATION]`** in [`docs/DECISION_LOG.md`](../DECISION_LOG.md). Zero unverified assertions regarding undergraduate Final Year Project topic alignment are made in this design specification.
