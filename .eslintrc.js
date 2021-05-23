// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest-dom/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['node_modules', 'dist'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
    'jest-dom',
    'jest',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'jest/no-disabled-tests': 'off',
    'jest/no-jasmine-globals': 'off',
    'no-prototype-builtins': 'off',
    'no-console': 2,
    'no-debugger': 2,
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', 'avoid-escape'],
    semi: ['error', 'never'],
  },
}
