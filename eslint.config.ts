import eslint from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
  eslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
      },
    },
  },
  {
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 10,
          multiline: { max: 1 },
        },
      ],
      'vue/html-self-closing': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-v-html': 'error',
      'vue/require-prop-types': 'error',
      'vue/attributes-order': 'error',
      'vue/multi-word-component-names': 'off',

      'no-console': 'off',
      'no-restricted-globals': ['error', 'event'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: 'error',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '*.config.js'],
  },
];
