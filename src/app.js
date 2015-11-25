const React = require('react');
const ReactDOM = require('react-dom');
const ipcRenderer = require('electron').ipcRenderer;

const HelloWorld = require('./HelloWorld');

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('react-mount')
);

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

module.exports = {
  quit
};
