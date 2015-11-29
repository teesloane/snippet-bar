/******************************
Render React Components to page
*******************************/

const React    = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('react-mount')
);
