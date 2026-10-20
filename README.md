# Aswin & Soumya — Wedding Invitation

A cinematic, interactive, mobile-first wedding invitation website for **Aswin & Soumya**, celebrating their wedding on **Sunday, 29 November 2026** at Vakathanam and Kothanalloor, Kerala.

Built with **TanStack Start**, **React 19**, **Vite**, and **Tailwind CSS v4**.

---

## Features

- **Tactile 3D Envelope Intro**: Realistic envelope opening sequence with procedural Web Audio synthesis (wax crack, paper whisper, golden harp chimes), vector damask filigree, and a metallic wax seal.
- **Cinematic Emerald Royale Hero**: Video background with smooth typography entrance animation and smooth scroll indicator.
- **Audio Experience**: Ambient wedding music with continuous loop playback, browser policy autoplay recovery, and a gold-trimmed floating play/pause control.
- **Switchable Event Countdown**:
  - **Wedding Ceremony**: 29 November 2026, 11:30 AM IST (`Asia/Kolkata`) at St. Mathews Knanaya Church, Vakathanam.
  - **Post-Wedding Reception**: 29 November 2026, 6:00 PM IST (`Asia/Kolkata`) at St. Mary's Knanaya Catholic Church, Kothanalloor.
  - Live 1-second countdown with smooth fade tab switching and completed-event state handling.
- **Family Details**: Bride and groom family presentation with bespoke serif typography.
- **Editorial Photo Gallery**: Responsive 7-photo masonry grid with full-screen modal lightbox, keyboard navigation (Escape, Left, Right arrows), swipe gestures, and thumbnail carousel.
- **Celebration Cards & Interactive Vector Maps**: Event details accompanied by custom SVG Google Maps previews with directions links.
- **Accessibility & Performance**: Full support for `prefers-reduced-motion`, responsive desktop/mobile layouts, and zero heavy external UI dependencies.

---

## Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR React framework)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **UI Engine**: React 19
- **Bundler**: Vite 8 with Nitro server engine
- **Styling**: Tailwind CSS v4 with custom design tokens (`--ivory`, `--gold`, `--slate-ink`, etc.)
- **Testing**: Vitest with `@testing-library/react`
- **Linting & Code Style**: ESLint 9 + Prettier

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd aswin-soumya-wedding-reverie
npm install
```

### Development Server

Start the local development server at `http://localhost:8080`:

```bash
npm run dev
```

### Production Build

Create an optimized client and server build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Running Tests

Execute the unit and route test suites:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### Code Quality & Formatting

Lint source files:

```bash
npm run lint
```

Format codebase with Prettier:

```bash
npm run format
```

---

## Project Structure

```
├── public/
│   ├── andriih-wedding-wedding-music-601619.mp3 # Canonical background music
│   ├── audio/                                   # Audio fallback directory
│   ├── images/                                  # Couple photos, SVG lotus decor, wax seal
│   ├── videos/
│   │   └── hero.mp4                             # Cinematic cover video
│   ├── favicon.ico / favicon.png                # Brand favicons
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── EventMapPreview.tsx              # Interactive SVG map previews & Google logo
│   │   │   ├── Heading.tsx                      # Eyebrow, serif title & gold lotus divider
│   │   │   └── Reveal.tsx                       # IntersectionObserver scroll entrance primitive
│   │   ├── Announcement.tsx                     # Invitation text, switchable event tabs & countdown
│   │   ├── Closing.tsx                          # Refined golden footer bar with blessings
│   │   ├── Cover.tsx                            # Hero video, text reveal & scroll indicator
│   │   ├── EnvelopeOpening.css                  # 3D envelope layout, flap perspective & damask styles
│   │   ├── EnvelopeOpening.tsx                  # Interactive envelope intro & Web Audio synthesis
│   │   ├── Events.tsx                           # Celebration cards & map integration
│   │   ├── Families.tsx                         # Bride & groom family details
│   │   ├── Gallery.tsx                          # Editorial photo grid & modal lightbox
│   │   └── MusicToggle.tsx                      # Floating audio control button
│   ├── lib/
│   │   ├── utils.ts                             # Class merge utility (cn)
│   │   └── wedding.ts                           # Canonical event dates, venues, families & countdown logic
│   ├── routes/
│   │   ├── __root.tsx                           # Root route shell, HTML head, fonts, error boundary
│   │   └── index.tsx                            # Main page orchestrator (clean & modular)
│   ├── test/
│   │   ├── app-routing.test.tsx                 # Route matching verification
│   │   ├── setup.ts                             # Test environment polyfills
│   │   └── wedding.test.ts                      # Timezone & countdown accuracy tests
│   ├── router.tsx                               # Router instance factory
│   ├── server.ts                                # Server entrypoint & SSR error capture
│   ├── start.ts                                 # TanStack Start client handler
│   └── styles.css                               # Tailwind v4 import & design system tokens
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Event Schedule & Targets

| Event                      | Date                | Time (IST)          | Venue                                            |
| :------------------------- | :------------------ | :------------------ | :----------------------------------------------- |
| **Wedding Ceremony**       | Sunday, 29 Nov 2026 | 11:30 AM – 12:30 PM | St. Mathews Knanaya Church, Vakathanam           |
| **Post-Wedding Reception** | Sunday, 29 Nov 2026 | 6:00 PM             | St. Mary's Knanaya Catholic Church, Kothanalloor |

All date calculations explicitly utilize the `Asia/Kolkata` time zone (`+05:30`) and handle past-event states gracefully.

---

## Deployment

The application is configured to build with Nitro and deploy seamlessly to **Cloudflare Pages / Workers**, **Vercel**, or any Node.js host.

```bash
npm run build
```

Pre-built output is generated in `.output/` ready for hosting.
