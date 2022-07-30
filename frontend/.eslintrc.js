module.exports = {
  root: true,
  env: {
    node: true,
  },

  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  rules: {
    // Allow call constructor starting with a lower-case letter using key word 'new'
    'new-cap': ['error', { newIsCap: false }],

    // recommended by Vetur
    'vue/html-self-closing': 'off',

    // Disable max-len
    'max-len': 'off',

    // we don't want it
    semi: ['error', 'never'],

    // add parens ony when required in arrow function
    'arrow-parens': ['error', 'as-needed'],

    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    'linebreak-style': 'off',

    // add new line above comment
    'newline-before-return': 'error',

    'global-require': 'off',

    // import
    'import/newline-after-import': 2,
    'import/no-unresolved': 2,
    'import/named': 2,
    'import/default': 2,
    'import/no-self-import': 2,
    'import/export': 2,
    'import/first': 2,
    'import/no-duplicates': 2,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}
