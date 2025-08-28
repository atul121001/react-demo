import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',
            '^@acme/.*'  // Allow @acme path mappings
          ],
          depConstraints: [
            // Simplified - rely on custom ESLint rules for import restrictions
          ],
        },
      ],
    },
  },
  // Custom rule: Prevent modules from importing other modules
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@acme/remote*'],
              message: 'Modules cannot import from other modules. Only shell apps can import modules.',
            },
          ],
        },
      ],
    },
  },
  // Override: Allow shell apps to import modules (disable the restriction)
  {
    files: ['apps/**/*.ts', 'apps/**/*.tsx', 'packages/**/*.ts', 'packages/**/*.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx', 
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];