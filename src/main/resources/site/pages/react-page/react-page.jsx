import React from 'react';
import { renderToString } from 'react-dom/server';
import { getContent as getCurrentContent } from '/lib/xp/portal';
import Region from '../../../lib/components/Region.jsx';


export function get() {
  return {
    body: renderToString(
      <html>
        <head />
        <body>
          <Region name='page' regions={getCurrentContent().page.regions} />
        </body>
      </html>
    ),
    contentType: 'text/html; charset=utf-8'
  }; // return
} // export function get()
