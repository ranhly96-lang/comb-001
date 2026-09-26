# COMB / 001 — The Entanglement

COMB is an experimental, single-page interactive artwork about the parts of memory that overlap and cannot be entirely separated. It grew from a dream phrase: “reflecting the parts of human memory that stick together.” The artwork offers a composed field of fragments, five conceptual principles, and a private place to leave a short trace.

## Run locally

Requires Node.js 22.13+ and pnpm 11 (the Sites environment can install it). From this directory:

```bash
pnpm install
pnpm dev
```

Open the address printed by the dev server. For production validation:

```bash
pnpm exec tsc --noEmit
pnpm lint
GITHUB_PAGES=1 GITHUB_REPOSITORY=ranhly96-lang/comb-001 pnpm exec next build --webpack
```

The static site is exported to `out/`. A push to `main` runs the checks and deploys it with GitHub Actions to GitHub Pages. The repository name supplies the project subpath, so links and assets work under `/comb-001/`. No backend, AI model, account, or API key is needed.

## Experience

- Switch among 简体中文, English, and 日本語 at any point. The selected language persists in this browser.
- In the memory field, drag one fragment onto another, or select two fragments in sequence. Keyboard users can tab to a fragment and press Enter or Space. An encounter leaves a connection and a short echo. Connections can be revisited, removed individually, or cleared.
- Sound is off by default. Turning it on enables a quiet synthesized tone only when a connection is formed.
- In “What remains?”, write a short note and save it locally, export TXT or JSON, or delete it. The note stays in this browser and is not automatically uploaded.

## Structure

- `app/`: single page, layout, global visual system
- `src/i18n/`: centralized, typed dictionaries and locale configuration
- `src/data/`: composed fragment positions and relationship identity
- `src/features/memory-field/`: interaction and visual traces
- `src/features/reflection/`: local note and exports
- `docs/`: concept, writing rules, and implementation notes

See [CONCEPT.md](docs/CONCEPT.md), [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md), and [IMPLEMENTATION.md](docs/IMPLEMENTATION.md).
