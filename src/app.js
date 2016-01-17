const React    = require('react');
const ReactDOM = require('react-dom');

const SnippetBarUtils = require('./utils/SnippetBarUtils');
const SettingsStore   = require('./stores/SettingsStore');

const App = require('./components/App');

SnippetBarUtils.readSnippets();
SnippetBarUtils.readSettings(SettingsStore.init);

ReactDOM.render(
  <App />,
  document.getElementById('react-mount')
);
