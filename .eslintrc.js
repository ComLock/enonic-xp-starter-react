module.exports = {

  extends: [
    'airbnb-base',
    //'plugin:react/recommended'
    'standard-react'
  ],

  globals: {
    // Nashorn
    Java: false,

    // Enonic XP
    app: false,
    log: false,
    resolve: false,
    __: false
  }, // globals

  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
    }],
    'function-paren-newline': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': ['off'],
    'spaced-comment': ['off']
  } // rules

} // module.exports
