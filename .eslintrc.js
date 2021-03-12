module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
 parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    project: './tsconfig.json'
  },
  rules:  {
    "padded-blocks": ["error", { "classes": "always" }],
    "space-before-function-paren": ["error", "never"],
    "@typescript-eslint/no-parameter-properties": 0,
    "space-before-function-paren": ["error", "always"],
    "@typescript-eslint/restrict-template-expressions": 0
  },
};
