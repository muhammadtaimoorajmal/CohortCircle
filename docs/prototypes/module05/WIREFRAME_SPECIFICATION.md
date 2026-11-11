# CohortCircle — Low-Fidelity Wireframe Specification

* **Product:** CohortCircle
* **Tagline:** Find your people. Learn together.
* **Document Purpose:** Visual and architectural design system specification for the low-fidelity digital wireframe prototype (Module 05).
* **Aesthetic Focus:** Deliberate grayscale wireframe visual language for structural, layout, and interaction usability testing.

---

## 1. Design Philosophy & Low-Fidelity Rationale

In human-computer interaction (HCI) and user-centered design, the primary objective of low-fidelity wireframing is to evaluate structural layout, information hierarchy, user mental models, and interactive workflows without the confounding influence of high-fidelity visual styling (Buxton, 2007; Nielsen Norman Group).

### Core Principles:
1. **Aesthetic Neutrality:** Deliberately avoiding brand colors, custom illustrations, or decorative graphics prevents test participants from focusing on superficial aesthetic preferences, channeling attention toward content clarity and task efficiency.
2. **Affordance Clarity:** Every interactive element (buttons, tabs, inputs, cards) possesses clear physical affordances (borders, focus indicators, press states, hover feedback) so users understand what can be manipulated.
3. **No Color-Only Information:** In strict adherence to WCAG 2.2 Success Criterion 1.4.1 (Use of Color), no state, status, or validation message relies exclusively on hue. All statuses incorporate clear textual labels, badges, or typographic distinctions.
4. **Structural Fidelity:** While visually unembellished, the prototype maintains high structural fidelity—form inputs, buttons, modals, data tables, and navigation links behave as a real software system.

---

## 2. Grayscale Design Tokens & Color Palette

The interface operates entirely within a calibrated neutral grayscale spectrum meeting or exceeding WCAG 2.2 AA and AAA contrast requirements:

| Token Name | Hex Value | Usage & Application | Contrast vs. Background |
|---|---|---|---|
| `--bg` | `#f8f9fa` | Application canvas and viewport background | N/A (Base Canvas) |
| `--surface` | `#ffffff` | Primary card, panel, and modal background | 1.05:1 vs Canvas |
| `--surface-alt` | `#f1f3f5` | Alternate table headers, wizard tabs, secondary panels | 1.08:1 vs Canvas |
| `--surface-hover`| `#e9ecef` | Hover state for interactive cards and table cells | 1.15:1 vs Canvas |
| `--border-light` | `#dee2e6` | Subtle internal dividers and card header separators | 1.25:1 vs Canvas |
| `--border-mid` | `#adb5bd` | Default input and card structural borders | 2.10:1 vs Canvas |
| `--border-dark` | `#343a40` | High-contrast borders, headers, primary buttons | 9.75:1 vs Canvas |
| `--text-main` | `#212529` | Primary headings, body copy, form input text | 14.1:1 vs Canvas (AAA) |
| `--text-secondary`| `#495057` | Secondary body text, table cell labels | 7.9:1 vs Canvas (AAA) |
| `--text-muted` | `#6c757d` | Help text, timestamps, secondary metadata | 4.8:1 vs Canvas (AA) |
| `--text-inverse` | `#ffffff` | Text on inverted badges, dark buttons, banner | 14.1:1 vs Dark (AAA) |
| `--focus-ring` | `#000000` | Universal 2px keyboard focus outline | 21.0:1 vs Canvas (AAA) |

---

## 3. Typography Scale & Hierarchy

The wireframe employs a clean, native system font stack to guarantee zero external network dependencies, instantaneous rendering, and platform-native typography:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

| Element | Size | Weight | Line Height | Role & Application |
|---|---|---|---|---|
| **Page Title (`h1`)** | 24px | 700 (Bold) | 1.25 | Primary screen title on page headers |
| **Section Title (`h2`)** | 18px | 700 (Bold) | 1.30 | Major card titles, modal headings, wizard steps |
| **Card Title (`h3`)** | 15px–16px | 700 (Bold) | 1.35 | Circle card headings, inner section headers |
| **Body Copy (`p`, `div`)** | 15px | 400 (Regular)| 1.50 | Standard descriptions, instructions, charter text |
| **Form Labels (`label`)** | 13px | 600 (Semibold)| 1.40 | Form field labels with required asterisks |
| **Secondary Metadata** | 12px–13px | 400 (Regular)| 1.40 | Timestamps, schedules, capacities, seat counts |
| **Badges & Tags** | 11px | 600 (Semibold)| 1.00 | Uppercase contextual status indicators |
| **Monospace / Code** | 12px | 500 (Medium)| 1.40 | Technical identifiers, session IDs, data badges |

---

## 4. Spacing System & Grid Layouts

Layouts adhere to an 8-pixel modular spatial grid to maintain consistent visual rhythm:

```
Space Tokens:
  4px  (0.25rem) — Micro padding, badge offsets, border radiuses
  8px  (0.50rem) — Tight gap, form field vertical padding, small gaps
  12px (0.75rem) — Medium gap, card header padding, badge margins
  16px (1.00rem) — Standard grid gap, input margins, card padding
  20px (1.25rem) — Wide card padding, section separators
  24px (1.50rem) — Page header margin, modal container padding
  32px (2.00rem) — Major section vertical margins
  48px (3.00rem) — Top/bottom application spacing
```

### Layout Grid Templates:
* **Container Max Width:** `1140px` (centered horizontally with `margin: 0 auto;`).
* **Sidebar Layout (`grid-sidebar`):** `280px` fixed filter/logistics column + `1fr` flexible content column. Drops to single column on viewports &le; `860px`.
* **Two-Column Grid (`grid-2`):** `1fr 1fr` with `20px` gutter. Used on Dashboard and Review panels.
* **Three-Column Grid (`grid-3`):** `1fr 1fr 1fr` with `16px` gutter. Used for Host statistics widgets.

---

## 5. UI Component Anatomy & Wireframe Patterns

### 5.1 Application Header & Navigation Shell
* **Prototype Disclosure Banner:** Sits above application header; dark surface (`#343a40`), white text, contains the active context badge (`LEARNER` / `HOST / FACILITATOR`), a context toggle button, and access to the Demo Data Engine.
* **Brand Lockup:** Contains a circular dashed wireframe mark `[CC]` + application title "CohortCircle" + tagline "Find your people. Learn together."
* **Primary Navigation Bar:** Accessible `<nav>` containing five persistent links (`Dashboard`, `Explore Circles`, `My Circles`, `Host Workspace`, `My Profile`). Active link is demarcated by a 3px dark bottom border and `background: var(--surface-alt)`.

### 5.2 Wireframe Cards
* **Standard Card:** 1px solid border (`#adb5bd`), 4px border radius, white surface, 18px padding. Used for circle listings, form groupings, and member rosters.
* **Dashed Card (`card-wireframe-dashed`):** 1px or 2px dashed border (`#343a40`), light-gray surface (`#f1f3f5`). Used for conceptual placeholders, illustrative compatibility explainers, and empty state containers.

### 5.3 Buttons & Interactive Controls
* **Primary Button (`btn-primary`):** Solid dark background (`#343a40`), white text, 1px black border. Used for primary actions: Save Profile, Join Circle, Create Circle, Publish Session.
* **Secondary Button (`btn-secondary`):** Light-gray background (`#f1f3f5`), dark text, 1px border (`#adb5bd`). Used for inspection, cancellation, filter resetting, and secondary paths.
* **Danger Button (`btn-danger`):** Charcoal background (`#212529`), white text. Used for destructive confirmations (Leave Circle, Remove Member, Clear Demo State).
* **Segmented Control:** Group of contiguous bordered buttons for mutual exclusion (e.g., RSVP states: `Attending`, `Tentative`, `Decline`). Active selection receives inverted dark styling.

### 5.4 Form Controls & Inline Validation
* **Form Inputs & Selects:** 1px solid neutral border (`#adb5bd`), 8px padding, 14px font size. On `:focus-visible`, border darkens and receives 2px black focus ring.
* **Required Indicators:** Bold asterisks (`<span class="req">*</span>`) next to required field labels.
* **Inline Error Messages:** Displayed immediately beneath invalid fields with a prominent border, bold text, and light-pink background (`#f8d7da`), rendered conditionally upon validation failure.

### 5.5 Weekly Availability Matrix (7 &times; 3 Grid)
* **Structure:** Table with 7 columns (Mon–Sun) and 3 rows (Morning 8am–12pm, Afternoon 12pm–5pm, Evening 5pm–9pm).
* **Interaction:** Clicking any cell toggles between `OPEN` (selected, dark background `#343a40`, white text) and `—` (unselected, white background).
* **Keyboard Accessibility:** Each cell possesses `tabindex="0"`, `role="button"`, and dynamic `aria-pressed` state attributes.

### 5.6 Accessible Modal Dialogs
* **Backdrop:** Semi-transparent dark overlay (`rgba(0, 0, 0, 0.6)`) preventing interaction with background elements.
* **Dialog Box:** High-contrast 2px solid border, 580px maximum width, internal vertical scrolling (`max-height: 90vh; overflow-y: auto;`).
* **Keyboard Trapping & Dismissal:** Implements `aria-modal="true"`, focus transfer upon open, and global `Escape` key dismissal.

### 5.7 Empty States
* **Visual Metaphor:** Dashed circular icon placeholder with count `0` or `?`, bold heading, explanatory secondary paragraph, and direct primary action button (e.g., "Explore Circles" or "Clear All Filters").

---

## 6. Print Stylesheet Specification

The prototype incorporates an automated print media query (`@media print`) ensuring that any screen can be printed as an executive wireframe document:
* Suppresses top prototype banner, application header navigation, interactive action buttons, and toast notifications.
* Forces pure white backgrounds and high-contrast black borders.
* Preserves card layout structure, table grids, and information hierarchy.
* Applies `page-break-after: always;` to multi-section wireframe specifications.
