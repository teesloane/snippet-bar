const ipcRenderer = require('electron').ipcRenderer;

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

function about() {
  ipcRenderer.send('show-about');
}

module.exports = {
  quit,
  about
};
