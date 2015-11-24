let React = require('react');
let ReactDOM = require('react-dom');
let ipcRenderer = require('electron').ipcRenderer;

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('react-mount')
);

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

module.exports = {
  quit
};
