import glob from 'glob';
import path from 'path';
//import webpack from 'webpack';
//import PolyfillsPlugin from 'webpack-polyfills-plugin';
//const MinifyPlugin = require('babel-minify-webpack-plugin');

const SRC_RESOURCES_DIR = './src/main/resources';
const SRC_ASSETS_DIR = `${SRC_RESOURCES_DIR}/assets`;
const DST_RESOURCES_DIR = './build/resources/main';
const ASSETS_ES6_GLOB = glob.sync(`${SRC_ASSETS_DIR}/**/*.{es,es6,jsx}`);
const ES6_GLOB = glob.sync(`${SRC_RESOURCES_DIR}/**/*.{es,es6,jsx}`, { absolute: false, ignore: ASSETS_ES6_GLOB });

const entry = ES6_GLOB.reduce((entries, e) => Object.assign(entries, {
  [e.replace(`${SRC_RESOURCES_DIR}/`, '').replace(/\.(es6?|jsx)/, '.js')]: [
  // TypeError: Cannot read property "__core-js_shared__" from undefined (com.enonic.xp.resource.ResourceProblemException)
  // var store = global[SHARED] || (global[SHARED] = {});
  //'core-js/fn/map',
    e
  ]
}), {});
//entry['assets/js/scripts.js'] = `${SRC_ASSETS_DIR}/js/scripts.es6`;


const WEBPACK_CONFIG = {
  entry,
  externals: [
    /\/lib\/xp\/.+/
  ],
  devtool: false, // Don't waste time generating source-maps
  output: {
    path: path.join(__dirname, DST_RESOURCES_DIR), // Must be absolute
    filename: '[name]',
    libraryTarget: 'commonjs'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(es6?|jsx?)$/,
        exclude: /(node_modules)/, // Avoid $export is not a function when transform-runtime
        loader: 'babel-loader',
        options: {
          babelrc: false,
          compact: false,
          minified: false,
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-object-assign',
            'array-includes'
          ],
          presets: [
            /*[
              '@babel/preset-env', {
                useBuiltIns: false // false means polyfill not required runtime
              }
            ],*/
            '@babel/preset-react'
          ]
        }
      }
    ] // loaders
  }/*, // module
  node: {
    console: false,
    global: true, // Needed by babel-polyfill, but didn't help :(
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true
  },*/
  /*plugins: [
    {
      apply: compiler => {
        compiler.parser.plugin('expression global', () => {
          this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()");
          return true;
        });
      }
    },
    new webpack.ProvidePlugin({
      //Map: 'core-js/fn/map'
      //Map: 'imports-loader?this=>global!exports-loader?global.Map!core-js/fn/map'
      Map: 'es6-map' // Cannot read property "call" from undefined
      //Map: 'es6-map/polyfill'
    }),
    new PolyfillsPlugin([
      'Map'
    ]),
    new MinifyPlugin({ //minifyOpts
    }, { //pluginOpts
    }) // MinifyPlugin
  ]*/ // plugins
};
export default WEBPACK_CONFIG;
