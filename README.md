# DIGITAL DOUBLE // Living Computational Portfolio
**Devesh Dixit — Computer Science & Engineering Undergraduate**
*GLA University (2025 – 2029)*

An experimental, generative, and interactive digital portfolio that treats personal software engineering, defensive cybersecurity inquiries, and verified achievements as a living computational sculpture.

---

## 1. Concept & Artistic Direction

Traditional developer websites present static cards or generic dashboard widgets. **DIGITAL DOUBLE** re-envisions the portfolio as an interactive digital sculpture and computational art installation:

- **The Living Sculpture**: A 3D WebGL centerpiece constructed with Three.js featuring an icosahedral crystalline nucleus, concentric orbital strata, dynamic particle fields, and interactive data nodes.
- **Museum & Editorial Palette**: A restrained palette composed of obsidian (`#08090c`), slate-graphite, burnished bronze, and muted champagne gold (`#d4af37`), avoiding generic neon cyberpunk cliches.
- **2D Generative Fallback**: If WebGL is unavailable or if `prefers-reduced-motion` is active, an equivalent 2D generative HTML5 Canvas kinetic sculpture renders with identical node connections.
- **The Signature Interaction (REVEAL)**: Selecting any node smoothly deconstructs the sculpture layer, revealing the underlying architectural problem statement, AST traversal patterns, tech stack, and verified source links without losing spatial context.
- **Dual Display Modes**:
  1. `[ ARTWORK ]`: Full 3D/2D living computational sculpture installation with spatial discovery.
  2. `[ DOSSIER ]`: A lightning-fast, high-contrast, distraction-free portfolio designed for technical recruiters and hiring managers with zero WebGL overhead.

---

## 2. Five Connected Modes of Discovery

| Mode | Title | Description |
|---|---|---|
| **Mode A** | **THE FORM** | The opening installation chamber: The living computational sculpture with real-time rotation, raycasting, and strata filtering (`Intelligence`, `Security`, `Systems`, `Evidence`). |
| **Mode B** | **THE STRUCTURE** | Relational knowledge topology graph connecting repositories, tools, and algorithms. Features search, category filters, and an accessible tabular list view. |
| **Mode C** | **THE WORKS** | Curated, bespoke architectural compositions for real projects: *MedGuard AI* (Computer Vision), *SecureCode AI* (SAST AST visitor), *A.E.T.H.E.R* (Gemini Live Audio), *VoidDrop* (WebRTC P2P AES-256), *Shivansh Krashi*, *Ai-Researcher*, and *PGFinder*. |
| **Mode D** | **THE EVIDENCE** | Factual activity stream featuring live GitHub telemetry, LeetCode algorithmic record (`darkfire1`), Root-Me security labs, and authenticated Unstop certificates with document modals. |
| **Mode E** | **THE HUMAN** | Calm personal narrative, GLA University academic coursework, skills matrix strictly backed by repository evidence, and direct contact options. |

---

## 3. Truthful Provenance & Data Providers

In accordance with strict integrity principles, **no numbers, certificates, or CTF scores are ever fabricated**:

- **GitHub Provider**: Queries public GitHub API (`https://api.github.com/users/Dixitdevesh`). Features in-memory/localStorage caching (15-min TTL) and graceful rate-limit fallbacks with direct links.
- **LeetCode Integration**: Direct authenticated profile attribution for user `darkfire1`. Surfaces practicing domains without fake rank claims.
- **Root-Me & Security Labs**: Displays authorized ethical training areas (Linux privilege escalation, network packets, OWASP SAST) with direct links.
- **Unstop & Competition Credentials**: Authenticated national hackathon certificates (EY Techathon 6.0, Devcation Hack 'N' Solve, Gemini QuizOff, Paranox 2.0) with verifiable preview links and stored document assets.

---

## 4. Gamification: Chronicle of Discovery

Gamification is driven by curiosity rather than arbitrary XP or fake levels:
- **Discovery Trail**: Tracks explored nodes in local storage (`localStorage`).
- **Sculpture Finishes**: Unlocks responsive shader finishes as you explore (*Obsidian & Gold*, *Deep Bronze*, *Spectral Alabaster*, *Cosmic Carbon*).
- **Zero Gating**: Important portfolio content, resume downloads, and contact channels are never locked behind unlocks.
- **Reset Mechanism**: Instant reset button available inside the drawer.

---

## 5. Technology Stack

- **Framework**: React 19 + TypeScript (Strict mode enabled)
- **3D Graphics Engine**: Three.js (Procedural geometries, raycasting, Euler damping, ACESFilmic tone mapping)
- **Styling**: Tailwind CSS v4 + Custom design tokens
- **Animations**: Framer Motion (Restrained cubic-bezier easing)
- **Icons**: Lucide React
- **Build Tool**: Vite 8.3

---

## 6. Installation & Development

### Prerequisites
- Node.js 18+ installed

### Setup
```bash
# Clone the repository
git clone https://github.com/Dixitdevesh/Portfolio.git

# Navigate into project directory
cd Portfolio-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build
```bash
# Typecheck and compile bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Keyboard Navigation & Accessibility

- `Tab` / `Shift+Tab`: Full keyboard focus through all links, filters, and actions.
- `ESC`: Instantly closes the REVEAL layer and returns to the macro composition.
- `ArrowLeft` / `ArrowRight`: Cycles between sculptural nodes while in REVEAL mode.
- `prefers-reduced-motion`: Automatically switches to static/calm rendering.
- `Accessible List Mode`: Available in Mode B for screen readers and high-speed scannability.

---

## 8. License & Attribution

Designed and engineered by **Devesh Dixit** (GLA University).  
Licensed under the [MIT License](LICENSE).
