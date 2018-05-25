//import React from 'react';
//import { renderToString } from 'react-dom/server';
import { getContent as getCurrentContent } from '/lib/xp/portal';

export function get() {
  const currentContent = getCurrentContent();
  const pageComponents = (currentContent.page.regions && currentContent.page.regions.page && currentContent.page.regions.page.components.map(c => `<!--# COMPONENT ${c.path} -->`).join('')) || '';
  //const reactString = pageComponents ? renderToString(pageComponents) : '';
  return {
    body: `<html><head></head><body><div data-portal-region='page'>${pageComponents}</div></body></html>`,
    contentType: 'text/html; charset=utf-8'
  }; // return
} // export function get()
