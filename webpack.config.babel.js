import glob from 'glob';
import path from 'path';
const MinifyPlugin = require('babel-minify-webpack-plugin');

const SRC_RESOURCES_DIR = './src/main/resources';
const SRC_ASSETS_DIR = `${SRC_RESOURCES_DIR}/assets`;
const DST_RESOURCES_DIR = './build/resources/main';
const ASSETS_ES6_GLOB = glob.sync(`${SRC_ASSETS_DIR}/**/*.{es,es6,jsx}`);
const ES6_GLOB = glob.sync(`${SRC_RESOURCES_DIR}/**/*.{es,es6,jsx}`, { absolute: false, ignore: ASSETS_ES6_GLOB });

let entry = ES6_GLOB.reduce((entries, entry) => Object.assign(entries, {[
    entry.replace(`${SRC_RESOURCES_DIR}/`, '').replace(/\.(es6?|jsx)/, '.js')
]: entry}), {});
//entry['assets/js/scripts.js'] = `${SRC_ASSETS_DIR}/js/scripts.es6`;


const WEBPACK_CONFIG = {
  entry,
  externals: [
    /\/lib\/xp\/.+/
  ],
  devtool: false, // Don't waste time generating source-maps
  output: {
    path: path.join(__dirname, DST_RESOURCES_DIR), // Must be absolute
    filename: "[name]",
    libraryTarget: 'commonjs'
  },
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
            'array-includes',
            'optimize-starts-with',
            'transform-object-rest-spread'
          ],
          presets: [
            [
              'env', {
                modules: false, // Let minifyer handle modules...
                //modules: 'commonjs', // commonjs is the default
                targets: {
                  // browserlist combined by OR clause
                  // https://github.com/ai/browserslist
                  browsers: ["last 2 versions", "not ie <= 10"],
                },
                useBuiltIns: 'usage', // won't work before babel-preset-env-2.x
                debug: true,
              }
            ],
            'react' // Currently doesn't accept options.
          ]
        }
      }
    ] // loaders
  }, // module
  /*node: {
    console: false,
    global: true, // Needed by babel-polyfill, but didn't help :(
    process: true,
    __filename: "mock",
    __dirname: "mock",
    Buffer: true,
    setImmediate: true
  },*/
  plugins: [
    /*new MinifyPlugin({ //minifyOpts
    }, { //pluginOpts
    }) // MinifyPlugin*/
  ] // plugins
};
export default WEBPACK_CONFIG;
