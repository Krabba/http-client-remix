/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    // Enforce using "import type" for type-only imports
    '@typescript-eslint/consistent-type-imports': 'error',
  },
}
