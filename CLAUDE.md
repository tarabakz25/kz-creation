# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev       # Start dev server at localhost:4321
bun build     # Build production site to ./dist/
bun preview   # Preview production build locally
```

## Tech Stack

- **Astro** - Static site generator with SSR support
- **React 19** - UI components (client:load for interactivity)
- **TypeScript** - Strict mode
- **Tailwind CSS** - Styling
- **GSAP** - Page transition animations
- **marked** - Markdown to HTML conversion

## Architecture: Feature-Sliced Design (FSD)

This project uses Feature-Sliced Design. Dependency flow is strictly downward: `pages → features → shared`

```
src/
├── features/       # Independent business features (no cross-feature imports)
│   ├── app/       # Core: NavigationProvider, PageTransitionProvider, App root
│   └── index/     # Homepage: BlogCard, BlogDetail, blog listing
├── pages/         # Astro file-based routing (thin layer, delegates to features)
├── shared/        # Reusable across features
│   ├── layouts/   # Layout.astro (base HTML structure)
│   ├── ui/        # Header, Footer
│   └── components/# PageTransition (GSAP animations)
└── content/       # Astro Content Collections (blog/*.md)
```

**Import rules:**
- Use path alias `~/` for `./src/` (e.g., `import X from "~/features/app/App"`)
- Features import from shared only, never from other features
- Shared cannot import from features

## Key Patterns

**SPA Navigation:** Uses two context providers:
- `NavigationContext` - Client-side routing with History API, manages currentPath/currentParams
- `PageTransitionProvider` - GSAP fade animations on route changes

**Blog System:**
- Content defined in `src/content/config.ts` (title, description, pubDate)
- Posts stored as Markdown in `src/content/blog/`
- API routes at `/api/blog/[id].json` serve post data with extracted headings
- BlogDetail component renders article with TOC sidebar

**Fonts:** Custom fonts via Typekit (futura-pt, noto-sans-jp) - configured in Layout.astro
