module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: [
      './tsconfig.json',
      './cypress/tsconfig.json'
    ],
  },
  rules: {
    'no-console': 0,
    'react/prop-types': 0,
    'spaced-comment': ['error', 'always', {
      'markers': ['/']
    }],
  },
  overrides: [
    {
      files: ['cypress/integration/my/*'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true,
      },
    }
  ],
};

