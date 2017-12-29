// Cannot read property "__core-js_shared__" from undefined
//import 'core-js/modules/es6.map';
//import 'core-js/es6/map';
//import 'core-js/fn/map';
//import 'core-js/library/es6/map';
//import 'core-js/library/fn/map';

//import 'babel-polyfill'; // Cannot set property "core" of undefined

//var Map = require('es6-map'); // It’s safest to use es6-map as a ponyfill – a polyfill which doesn’t touch global objects
//require('es6-map/implement'); // If you want to make sure your environment implements Map globally
//var Map = require('es6-map/polyfill'); // If you strictly want to use the polyfill even if the native Map exists
//import {default as Map} from 'es6-map/polyfill'; // Cannot read property "call" from undefined

import { renderToString } from 'react-dom/server';


export function get() {
  return {
    body: renderToString(
      <html>
        <body>
          <h1>Hello world</h1>
        </body>
      </html>
    ),
    contentType: 'text/html; charset=utf-8'
  }; // return
} // export function get()
