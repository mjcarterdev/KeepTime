module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // 'react/react-in-jsx-scope': 0,
    // 'react/button-has-type': 'off',
    // 'global-require': 'off',
    // 'jsx-quotes': 'prefer-single',
  },
};
