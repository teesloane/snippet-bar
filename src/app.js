const React    = require('react');
const ReactDOM = require('react-dom');

const SnippetBarUtils = require('./utils/SnippetBarUtils');

const App = require('./components/App');

SnippetBarUtils.readSnippets();
SnippetBarUtils.readSettings();

ReactDOM.render(
  <App />,
  document.getElementById('react-mount')
);
