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
      headEnd: [
        `<link rel="stylesheet" href="${assetUrl({path: 'bootstrap/css/bootstrap.min.css'})}">`,
        //'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">',

        // Optional theme
        `<link rel="stylesheet" href="${assetUrl({path: 'bootstrap/css/bootstrap-theme.min.css'})}">`
        //'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">'
      ],
      bodyEnd: [
        `<script type="text/javascript" src="${assetUrl({path: 'babel-standalone/babel.min.js'})}"></script>`,

        `<script type="text/javascript" src="${assetUrl({path: 'react/react.production.min.js'})}"></script>`,
        //'<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.min.js"></script>',

        `<script type="text/javascript" src="${assetUrl({path: 'react-dom/react-dom.production.min.js'})}"></script>`,
        //'<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react-dom.min.js"></script>',

        `<script type="text/javascript" src="${assetUrl({path: 'react-bootstrap/react-bootstrap.min.js'})}"></script>`,
        //'<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.32.4/react-bootstrap.min.js"></script>',
        `<script>

        </script>`,
        `<script type="text/jsx">
const Alert = ReactBootstrap.Alert;
${TestComponentClass}
${TestComponentFunction}
ReactDOM.render(
  <div>
    <Alert bsStyle="warning"><strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.</Alert>
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
