import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  prettier,

  {
    files: ['**/*.ts', '**/*.js'],

    languageOptions: {
      parser: tsparser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
      },
    },

    env: {
      node: true,
      es2021: true,
    },

    plugins: {
      '@typescript-eslint': tseslint,
    },

    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
