const ipcRenderer = require('electron').ipcRenderer;

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

module.exports = {
  quit
};
