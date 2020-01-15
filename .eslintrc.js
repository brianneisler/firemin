module.exports = {
  root: true,
  extends: [
    'prettier',
  ],
  plugins: [
    'import',
    'prettier',
    'sort-destructure-keys',
    'sort-imports-es6-autofix',
    "sort-keys-fix"
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  globals: {
    example: "readonly"
  },
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  rules: {
    'array-bracket-spacing': [
      'error',
      'never',
      {
        objectsInArrays: false,
        arraysInArrays: false
      }
    ],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'comma-dangle': ['error', 'never'],
    'curly': 'error',
    'eol-last': 'error',
    'for-direction': 'error',
    'func-names': 'off',
    'getter-return': 'error',
    'id-length': ['error', {'min': 2, 'max': 50, 'properties': 'never', 'exceptions': ['e', 'i', 'n', 't', 'x', 'y', 'z', '_', '$']}],
    'no-alert': 'error',
    'no-async-promise-executor': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
    'no-debugger': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-else-return': 'error',
    'no-empty': 'off',
    'no-func-assign': 'error',
    'no-import-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-misleading-character-class': 'error',
    'no-obj-calls': 'error',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'object-curly-newline': 'off',
    'object-shorthand': 'off',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
        'avoidEscape': true
      }
    ],
    'semi': ['error', 'never'],
    'spaced-comment': 'error',
    'strict': ['error', 'never'],
    'import/default': 'error',
    'import/first': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'prettier/prettier': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': ['error', {
      'ignoreCase': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
    }],
    'sort-keys-fix/sort-keys-fix': 'error'
  }
}
