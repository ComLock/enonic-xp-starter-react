import {sanitize} from '/lib/xp/common';
import {getResource, readText} from '/lib/xp/io';
import {assetUrl, getComponent} from '/lib/xp/portal';


const TestComponentClass = readText(getResource(resolve('./TestComponentClass.jsx')).getStream());
const TestComponentFunction = readText(getResource(resolve('./TestComponentFunction.jsx')).getStream());


export function get() {
  const {path} = getComponent();
  const id = sanitize(path);
  const text = 'Hello World';
  return {
    body: `<div id="${id}"/>`, // body
    contentType: 'text/html; charset=utf-8', // contentType
    pageContributions: {
      bodyEnd: [
        `<script type="text/javascript" src="${assetUrl({path: 'babel-standalone/babel.min.js'})}"></script>`,
        `<script type="text/javascript" src="${assetUrl({path: 'react/react.production.min.js'})}"></script>`,
        `<script type="text/javascript" src="${assetUrl({path: 'react-dom/react-dom.production.min.js'})}"></script>`,
        `<script type="text/jsx">
${TestComponentClass}
${TestComponentFunction}
ReactDOM.render(
  <div>
    <TestComponentClass text="${text}"/>
    <TestComponentFunction text="${text}"/>
  </div>,
  document.getElementById('${id}')
);
</script>`.replace(/\n[\t ]*/g, '')
      ] // bodyEnd
    } // pageContributions
  }; // return
} // export function get
