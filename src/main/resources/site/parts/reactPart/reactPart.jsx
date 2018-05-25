import React from 'react';
import { renderToString } from 'react-dom/server';


export function get() {
  return {
    body: renderToString(
      <h1>React part</h1>
    ),
    contentType: 'text/html; charset=utf-8'
  }; // return
} // export function get()
