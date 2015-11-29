/******************
Interface with Menubar (to quit etc)
*******************/

const ipcRenderer = require('electron').ipcRenderer;

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

module.exports = {
  quit
};
