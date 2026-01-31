## Architectural Overview

### Astro vs React Responsibilities

| Layer     | Responsibility                                   |
|-----------|--------------------------------------------------|
| **Astro** | Page layout, section structure, server rendering |
| **React** | State, user events, scrolling, dynamic content   |
| **CSS**   | Positioning, sizing, responsiveness, animation   |

**Browser APIs (`window`, `document`) must never be used in Astro frontmatter.**

---

🧩 Component Breakdown

---

### `index.astro` – Page Skeleton

**Purpose**

- Defines the overall page structure
- Separates landing section from report section
- Does not manage state or scrolling

**Key concepts**

- Landing section uses `.landing` and fills `100vh`
- Reports are rendered via `<ReportSection client:load />`
- All centering logic for page 1 lives here

---

### `ReportSection.jsx` – State & Scroll Controller (Critical)

This is the **core logic component**.

**Responsibilities**

- Stores generated graphs
- Controls visibility of reports
- Triggers smooth scroll when reports appear
- Ensures reports section fills one viewport

**Key behaviors**

- Receives graphs from `CSVUpload`
- Injects a placeholder graph if none exist
- Scrolls reports section into view using `scrollIntoView`
- Prevents layout shifts when zooming or resizing

---

### `CSVUpload.jsx` – User Input

**Responsibilities**

- CSV file selection
- “Generate Report” action
- Calls `onReportGenerated(graphs)`

**Design rule**

- No layout logic
- No scrolling logic
- No visibility control

This keeps the component reusable and predictable.

---

### `GraphCarousel.jsx` – Responsive Graph Display

**Responsibilities**

- Displays graphs in a responsive layout
- Shows placeholder image when no graphs exist

**Design choices**

- Flexbox with wrapping
- `clamp()` for responsive sizing
- No fixed widths
- No viewport positioning

---

### `ScrollReveal.astro` – Visual Enhancement

**Purpose**

- Adds fade/slide-in animation when elements enter viewport
- Cosmetic only (safe to remove)

---

## 🎨 Styling Philosophy (`global.css`)

### Core Principles

- No Tailwind
- No absolute positioning
- No fixed pixel layouts
- Layout flows naturally

---

### Key Layout Classes

#### `.landing`

```css
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 100vh;
