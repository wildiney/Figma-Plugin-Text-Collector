import tseslint from 'typescript-eslint'
import figmaPlugin from '@figma/eslint-plugin-figma-plugins'

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'code.js', 'eslint.config.js', 'vitest.config.ts'],
  },
  tseslint.configs.recommended,
  figmaPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
)
