# Figma Plugin — Text Collector

A Figma and FigJam plugin to collect all text from the current page or from a selection of frames, and copy it to the clipboard.

## Features

- Collect all text nodes from the entire current page
- Collect text nodes from selected frames only
- Deduplicates repeated texts automatically
- Works in both Figma and FigJam

## Installation

This plugin is not yet published to the Figma Community. To use it locally:

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Build the plugin: `pnpm build`
4. In Figma, go to **Plugins → Development → Import plugin from manifest...**
5. Select the `manifest.json` file from this project

## Usage

1. Open a Figma or FigJam file
2. Run the plugin via **Plugins → Development → Text Collector**
3. Click one of the buttons:
   - **Coletar texto da página** — collects all texts from the current page
   - **Coletar texto dos frames selecionados** — collects texts from the selected frames
4. The collected texts appear in the text area, one per line
5. Click **Copiar texto** to copy everything to the clipboard

## Development

**Requirements:** Node.js, pnpm

```bash
pnpm install       # install dependencies
pnpm build         # compile code.ts → code.js
pnpm watch         # watch mode (recompiles on change)
pnpm lint          # run ESLint
pnpm lint:fix      # run ESLint with auto-fix
pnpm test          # run unit tests
pnpm test:watch    # run tests in watch mode
```

After running `pnpm build`, reload the plugin in Figma (**Plugins → Development → Text Collector → Reload plugin**) to apply changes.

## Project Structure

```
├── code.ts              # Plugin logic (runs in Figma sandbox)
├── code.js              # Compiled output (generated, do not edit)
├── ui.html              # Plugin UI (runs in sandboxed iframe)
├── manifest.json        # Figma plugin manifest
├── src/
│   ├── collector.ts     # Pure text collection logic (used in tests)
│   └── __tests__/
│       └── collector.test.ts
├── tsconfig.json        # TypeScript config for plugin build
├── tsconfig.eslint.json # TypeScript config for ESLint parser
├── eslint.config.js     # ESLint flat config (ESLint 9)
└── vitest.config.ts     # Vitest config
```

## Tech Stack

- **TypeScript** — plugin logic (`code.ts`) and tests
- **ESLint 9** with `typescript-eslint` and `@figma/eslint-plugin-figma-plugins`
- **Vitest** — unit tests
- **pnpm** — package manager
