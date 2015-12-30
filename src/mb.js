const ipcRenderer = require('electron').ipcRenderer;

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

function preferences() {
  console.log('made it to mb');
  ipcRenderer.send('show-prefs');
}

module.exports = {
  quit,
  preferences
};
