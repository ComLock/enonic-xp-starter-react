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
    'import/extensions': ['off'],
    'import/no-absolute-path': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': ['warn', {
      ignore: [ // Should be same as webpack externals:
        '/lib/xp/.+'
      ]
    }],
    'import/prefer-default-export': ['off'],
    'max-len': ['warn', 160, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'spaced-comment': ['off']
  }, // rules

  settings: {
    /*'import/core-modules': [
      '/lib/xp/portal'
    ]*/
    //'import/ignore': [] // import/no-unresolved has its own ignore
    /*'import/resolver': { // Does not work with externals, and perhaps not babel.js
      'webpack': {
        config: './webpack.config.babel.js'
      }
    }*/
  } // settings

} // module.exports
