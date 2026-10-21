import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import a11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  ...astro.configs.recommended,
  ...a11y.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      astro,
      'jsx-a11y': a11y,
    },
    rules: {
      'astro/no-set-html-directive': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
    },
  },
  {
    files: ['**/*.astro'],
    plugins: {
      astro,
    },
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astro.configs.recommended.rules,
    },
  },
];
