import glob from 'glob';
import path from 'path';


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
  output: {
    path: path.join(__dirname, DST_RESOURCES_DIR), // Must be absolute
    filename: "[name]",
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.(es6?|jsx?)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        /*query: {
          presets: [ 'env', 'react' ]
        }*/
      }
    ] // loaders
  } // module
};
export default WEBPACK_CONFIG;
