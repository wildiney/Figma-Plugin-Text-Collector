# Figma Plugin - Text Collector

A Figma/FigJam plugin that collects all text nodes from the current page or from a selection and copies them to the clipboard.

## Architecture

This is a standard Figma plugin with two execution contexts:

- **`code.ts`** — runs in the Figma plugin sandbox (no DOM access). Compiled to `code.js` by TypeScript.
- **`ui.html`** — runs in a sandboxed iframe (has DOM access). Communicates with `code.ts` via `postMessage`.
- **`src/collector.ts`** — pure logic module extracted from `code.ts`, used only for unit testing (not imported by the plugin build).

## Build & Dev Commands

```bash
pnpm build          # compile code.ts → code.js (tsc)
pnpm watch          # watch mode
pnpm lint           # ESLint
pnpm lint:fix       # ESLint with auto-fix
pnpm test           # run unit tests (vitest)
pnpm test:watch     # vitest in watch mode
```

> **Use pnpm.** This project uses pnpm and has a `pnpm-lock.yaml`. Do not use npm or yarn.

## Plugin Message Protocol

Communication between `code.ts` and `ui.html` uses typed messages:

| Direction | `type` | Payload | Description |
|---|---|---|---|
| UI → Plugin | `collect-all` | — | Collect all texts from current page |
| UI → Plugin | `collect-selection` | — | Collect texts from selected frames |
| UI → Plugin | `copy` | — | (reserved) trigger copy |
| UI → Plugin | `close` | — | Close the plugin |
| Plugin → UI | `show-text` | `{ content: string }` | Deliver collected text |
| Plugin → UI | `copy-to-clipboard` | — | (reserved) trigger clipboard copy |

## TypeScript Configuration

There are two tsconfigs:

- **`tsconfig.json`** — plugin build only, includes `code.ts`. Does not include `src/` to avoid bundling test code into the plugin output.
- **`tsconfig.eslint.json`** — extends `tsconfig.json`, includes `src/**/*.ts` for linting. Used only by the ESLint parser.

## Testing

Unit tests live in `src/__tests__/`. Tests cover the pure logic in `src/collector.ts` using mocked Figma-like node objects (plain JS objects with `type` and optional `children`/`characters` fields).

Run with `pnpm test`.

## ESLint

Uses ESLint 9 flat config (`eslint.config.js`). Configured with:
- `typescript-eslint` recommended rules
- `@figma/eslint-plugin-figma-plugins` recommended rules (Figma-specific lint rules)

## Security

Run `pnpm audit` to check for vulnerabilities. The lockfile should always resolve to 0 known vulnerabilities.
