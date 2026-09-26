# Implementation notes

## Current implementation

Next.js-compatible Vinext starter with React, TypeScript, CSS/Tailwind foundation, and a single client-rendered interactive page. The text is held in typed, centralized dictionaries. Initial language is chosen from a saved preference, then the browser language, then English. Switching changes content, document language, title, and description without navigation or resetting the memory field.

The field contains 20 authored fragments. Pointer dragging to another fragment or sequential selection creates an undirected, unique relationship. Keyboard Enter and Space provide equivalent selection. SVG lines, a warm border, and an echo reflect the relationship. Several relationships can coexist; each can be removed. Field relationships are session state, intentionally reset on reload; a private reflection persists through `localStorage` under `comb.reflection.v1` and can be exported or deleted. Language preference uses `comb.locale.v1`.

Sound is off until enabled by the visitor. It uses a short Web Audio oscillator tone after a relationship is created and no copyrighted recording. Motion is restrained and disabled via `prefers-reduced-motion`. On narrow screens, the field becomes a two-column touch-friendly grid with the same relationship logic.

## Limits

- The visual system uses typography, geometry, and subtle motion instead of film footage or composed audio assets. A later edition may incorporate original licensed imagery and sound.
- Connections are not stored across reloads; only the visitor's written trace and language preference persist.
- Browser storage may be unavailable or cleared. The artwork has no server copy or recovery mechanism.
- The shared-memory principle is expressed as a reading of common material, not a public social feature.
- Client-side locale changes update metadata in the browser; future indexed locale-specific URLs would improve language-targeted search discovery.

## Future direction

Commission original sound and moving-image material, test the field with visitors in each language, and explore how a link can alter a fragment's text or timbre while preserving its prior form. Any later account or sharing system would require a separate, explicit privacy design.
