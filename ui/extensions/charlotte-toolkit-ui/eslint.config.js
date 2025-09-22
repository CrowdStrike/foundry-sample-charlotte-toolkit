import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';
import security from 'eslint-plugin-security';
import unicorn from 'eslint-plugin-unicorn';
import yml from 'eslint-plugin-yml';
import yamlParser from 'yaml-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';

export default [
  // Base JavaScript recommended configuration
  js.configs.recommended,
  
  // Main TypeScript and React configuration
  {
    name: 'charlotte-toolkit/main',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        fetch: 'readonly',
        CustomEvent: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLInputElement: 'readonly',
        btoa: 'readonly',
        Blob: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      'import-x': importX,
      'security': security,
      'unicorn': unicorn
    },
    rules: {
      // TypeScript rules
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      
      // React rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Import rules (simplified due to TypeScript resolver issues)
      'import-x/order': 'off', // Disable due to resolver issues
      'import-x/no-duplicates': 'off', // Disable due to resolver issues
      'import-x/no-unused-modules': 'off',
      'import-x/no-cycle': 'off', // Disable due to resolver issues
      'import-x/no-self-import': 'off', // Disable due to resolver issues
      'import-x/first': 'off',
      'import-x/newline-after-import': 'off',
      
      // Security rules
      ...security.configs.recommended.rules,
      'security/detect-object-injection': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      
      // General code quality
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'no-return-await': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'object-shorthand': 'error',
      'no-useless-return': 'error',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      
      // Modern JavaScript features
      'prefer-destructuring': ['error', {
        'array': true,
        'object': true
      }, {
        'enforceForRenamedProperties': false
      }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import-x/resolver': {
        typescript: true,
        node: true
      }
    }
  },
  
  // Unicorn recommended configuration (modern JavaScript best practices)
  {
    name: 'charlotte-toolkit/unicorn',
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      unicorn: unicorn
    },
    rules: {
      ...unicorn.configs.recommended.rules,
      // Override specific unicorn rules for React/TypeScript
      'unicorn/filename-case': [
        'error',
        {
          'cases': {
            'camelCase': true,
            'pascalCase': true
          }
        }
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          'ignore': [
            'props',
            'ref',
            'params',
            'args',
            'e',
            'i',
            'prev',
            'func',
            'utils'
          ]
        }
      ],
      'unicorn/no-null': 'off', // TypeScript uses null
      'unicorn/prefer-module': 'off', // Not applicable for browser bundles
      'unicorn/prefer-global-this': 'off', // Browser environments use window
      'unicorn/no-array-for-each': 'off', // forEach is common in React
      'unicorn/prefer-string-replace-all': 'off', // replace is fine for simple cases
      'unicorn/switch-case-braces': 'off', // Allow simple switch cases
      'unicorn/numeric-separators-style': 'off', // Too aggressive for this project
      'unicorn/catch-error-name': 'off', // Allow 'e' for error parameters
      'unicorn/prefer-ternary': 'off', // if statements are sometimes clearer
      'unicorn/consistent-function-scoping': 'off', // React patterns are different
      'unicorn/no-negated-condition': 'off', // Sometimes negated conditions are clearer
      'unicorn/prefer-at': 'off', // .at() not available in all environments
      'unicorn/no-array-callback-reference': 'off', // Common pattern in functional programming
      'unicorn/no-for-loop': 'off', // Sometimes for loops are clearer
      'unicorn/no-lonely-if': 'off', // Sometimes single if statements are clearer
      'unicorn/prefer-single-call': 'off', // Multiple calls can be clearer
      'unicorn/prefer-export-from': 'off', // Direct exports are sometimes clearer
      'unicorn/prefer-spread': 'off', // Array.from has valid use cases
      'unicorn/no-useless-switch-case': 'off', // Default cases have value
      'unicorn/prefer-string-slice': 'off', // substring is valid
      'unicorn/no-zero-fractions': 'off' // 0.0 can be meaningful for readability
    }
  },
  
  // YAML configuration
  {
    name: 'charlotte-toolkit/yaml',
    files: ['**/*.yml', '**/*.yaml'],
    languageOptions: {
      parser: yamlParser
    },
    plugins: {
      yml: yml
    },
    rules: {
      ...yml.configs.standard.rules,
      'yml/no-empty-document': 'off'
    }
  },
  
  // Test files configuration
  {
    name: 'charlotte-toolkit/tests',
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  
  // Configuration files
  {
    name: 'charlotte-toolkit/config',
    files: ['*.config.{ts,js}', '*.config.*.{ts,js}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'import-x/no-default-export': 'off'
    }
  },
  
  // Prettier integration (must be last)
  eslintConfigPrettier
];
