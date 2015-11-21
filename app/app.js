var ipc = require('ipc');

function quit() {
  ipc.send('mb.app', 'quit');
}

module.exports = {
  quit: quit
};
