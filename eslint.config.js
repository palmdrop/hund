import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    languageOptions: {
      globals: globals.node
    },
    files: ['scripts/*.{js,mjs,cjs}']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      indent: ['error', 2],
      'no-multi-spaces': 'error'
    }
  },
  eslintConfigPrettier
];
