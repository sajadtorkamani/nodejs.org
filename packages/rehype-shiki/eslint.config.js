import globals from 'globals';

import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        // Allow nullish syntax (i.e. "?." or "??"),
        // and top-level await
        ecmaVersion: 'latest',
      },
      globals: globals.nodeBuiltin,
    },
    rules: {
      // Shiki's export isn't named, it's a re-export
      'import-x/named': 'off',
    },
  },
];
