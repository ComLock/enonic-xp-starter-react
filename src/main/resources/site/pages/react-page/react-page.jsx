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
