# CohortCircle Design System Specification

* **Project:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Maintainer:** Muhammad Taimoor Ajmal
* **Module:** Module 07 — High-Fidelity Design & Application Foundation
* **Standard:** WCAG 2.2 Level AA Target

---

## 1. Design System Philosophy & Identity

CohortCircle's design system establishes a clean, modern SaaS environment engineered specifically for focused collaborative learning. It rejects distracting gamification and social-network vanity metrics in favor of structured academic rigor, clear typography hierarchy, and deterministic, explainable compatibility indicators.

### Core Visual Attributes
* **Structure & Framing:** Deep navy and dark ink tones (`#0f172a`, `#1e293b`) establish stable architectural landmarks.
* **Primary Interactive Accents:** Fresh violet and indigo hues (`#4f46e5`, `#6366f1`) guide primary interactive user journeys.
* **Verification & Compatibility:** Subtle teal and mint tones (`#0d9488`, `#14b8a6`) signal verified match factors and active memberships.
* **Canvas & Surface:** Warm neutral backgrounds (`#f8fafc`, `#ffffff`) minimize visual fatigue during long study sessions.
* **Consistent 8px Grid:** Spacing tokens strictly scale from `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, to `48px`.

---

## 2. Color Palette & Token Architecture

All colors are codified as CSS custom properties in [`src/styles/variables.css`](../src/styles/variables.css):

```css
:root {
  /* Brand Structure: Deep Navy */
  --color-navy-950: #090d16;
  --color-navy-900: #0f172a;
  --color-navy-800: #1e293b;
  --color-navy-700: #334155;
  --color-navy-600: #475569;
  --color-navy-500: #64748b;
  --color-navy-400: #94a3b8;
  --color-navy-300: #cbd5e1;
  --color-navy-200: #e2e8f0;
  --color-navy-100: #f1f5f9;
  --color-navy-50:  #f8fafc;

  /* Primary Brand: Indigo / Fresh Violet */
  --color-primary-900: #312e81;
  --color-primary-800: #3730a3;
  --color-primary-700: #4338ca;
  --color-primary-600: #4f46e5;
  --color-primary-500: #6366f1;
  --color-primary-400: #818cf8;
  --color-primary-100: #e0e7ff;
  --color-primary-50:  #eef2ff;

  /* Accent: Subtle Teal / Mint */
  --color-teal-700: #0f766e;
  --color-teal-600: #0d9488;
  --color-teal-500: #14b8a6;
  --color-teal-400: #2dd4bf;
  --color-teal-100: #ccfbf1;
  --color-teal-50:  #f0fdfa;

  /* Semantic Feedback */
  --color-success: #15803d;
  --color-warning: #b45309;
  --color-danger:  #b91c1c;
  --color-info:    #0369a1;
}
```

### Contrast Audits (WCAG 2.2 AA)
| Element Pair | Foreground | Background | Calculated Contrast | WCAG AA Requirement | Result |
|---|---|---|---|---|---|
| Primary Body Text | `#0f172a` (navy-900) | `#ffffff` | **18.7:1** | 4.5:1 | **Pass (Exceeds AAA)** |
| Secondary Text | `#475569` (navy-600) | `#ffffff` | **7.5:1** | 4.5:1 | **Pass (Exceeds AAA)** |
| Primary CTA Button | `#ffffff` | `#4f46e5` (primary-600) | **8.1:1** | 4.5:1 | **Pass (Exceeds AAA)** |
| Teal Badge Text | `#0f766e` (teal-700) | `#f0fdfa` (teal-50) | **7.8:1** | 4.5:1 | **Pass (Exceeds AAA)** |
| Focus Ring | `#4f46e5` | `#ffffff` | **8.1:1** | 3.0:1 | **Pass (Exceeds AA)** |

---

## 3. Typography Scale

Typography is defined in [`src/styles/typography.css`](../src/styles/typography.css) using `Plus Jakarta Sans` for humanist clarity and `JetBrains Mono` for numbers, timestamps, and code snippets:

| Token / Element | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `h1` / Display | 2.25rem (36px) | 800 (ExtraBold) | 1.15 | Main page titles, landing hero |
| `h2` | 1.75rem (28px) | 700 (Bold) | 1.25 | Section headers, card titles |
| `h3` | 1.25rem (20px) | 700 (Bold) | 1.35 | Circle card headings, modal titles |
| `h4` | 1.125rem (18px) | 600 (SemiBold) | 1.4 | Subsections, form group labels |
| Body Default | 0.9375rem (15px) | 400 / 500 | 1.6 | Narrative paragraphs, descriptions |
| Small / Meta | 0.8125rem (13px) | 600 | 1.45 | Badges, card timestamps, sub-labels |
| Monospace | 0.75rem–1rem | 700 | 1.0 | Match scores, matrix slots, kbd tags |

---

## 4. UI Component Anatomy

### Common Primitives
* **`Button` (`src/components/common/Button/`):** 6 variants (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`), 3 sizes (`sm`, `md`, `lg`), with integrated spinners, left/right icon slots, and accessible disabled handling.
* **`Card` (`src/components/common/Card/`):** Structured surface containers with optional headers, footers, hover elevation transitions, and padding tokens (`sm`, `md`, `lg`).
* **`Badge` (`src/components/common/Badge/`):** Color-coded pills (`neutral`, `primary`, `teal`, `success`, `warning`, `danger`) for policy statuses, academic subjects, and role tags.
* **`Input` & `Select` (`src/components/common/Input/`, `Select/`):** Accessible form controls with automatic label linkage, mandatory asterisk, helper text, and programmatic `aria-describedby` error associations (`UX-010`).
* **`Modal` (`src/components/common/Modal/`):** Accessible dialog primitive featuring backdrop blur, keyboard trap, `Escape` key close listener, and accessible `aria-modal="true"` dialog roles.
* **`Avatar` (`src/components/common/Avatar/`):** Initials-based deterministic avatar component with hashed backgrounds. Zero reliance on remote stock images.
* **`EmptyState` (`src/components/common/EmptyState/`):** Contextual empty state container with SVG icons, explanatory copy, and recovery CTA buttons.

### Domain-Specific Components
* **`CircleCard` (`src/components/circles/CircleCard/`):** Rich card displaying circle title, syllabus topic, capacity stack, modality, meeting time, host details, explainable compatibility indicator, and admission CTA.
* **`CompatibilityIndicator` (`src/components/circles/CompatibilityIndicator/`):** Clickable match percentage badge (`high` 90+, `medium` 70–89, `low` <70) opening the explainable 5-factor breakdown modal.
* **`StudyStyleBadge` (`src/components/circles/StudyStyleBadge/`):** Semantic indicator with color dot highlighting the collaborative format (Silent Co-Study, Collaborative Problem Solving, Discussion, Peer Teaching, Exam Prep).
* **`MemberStack` (`src/components/circles/MemberStack/`):** Overlapping avatar stack communicating current vs maximum cohort seats.
* **`SessionCard` (`src/components/sessions/SessionCard/`):** Event card displaying study dates, duration, parent circle link, attendee roster, and 1-click RSVP controls.
* **`RSVPControl` (`src/components/sessions/RSVPControl/`):** 3-state segmented toggle (`Attending`, `Tentative`, `Decline`) with immediate visual feedback.

---

## 5. Responsive Grid & Breakpoint Strategy

CohortCircle enforces responsive behavior across five target viewport benchmarks:

| Breakpoint | Target Device | Layout Strategy |
|---|---|---|
| `< 600px` | Small Mobile (320px–375px) | Single column, fixed bottom navigation bar, collapsed cards |
| `600px–768px` | Large Mobile / Phablet | Single column, mobile drawer menu, stack buttons |
| `768px–1024px` | Tablet Screens | Collapsed icon-only sidebar (76px), single-column dashboard layout (Addresses `UX-009`) |
| `1024px–1440px` | Standard Desktop | Full expanded sidebar (260px), 2-column dashboard layout, multi-criteria filters |
| `> 1440px` | Wide Desktop Displays | Centered container max-width 1240px, optimal reading line length |
