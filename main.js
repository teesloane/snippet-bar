var ipc = require('ipc');
var menubar = require('menubar');

var config = {
  dir: './app',
  icon: './app/static/img/brackets.png',
  width: 600,
  height: 370,
  'always-on-top': true
};

var mb = menubar(config);

// Quit when all windows are closed.
mb.app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    mb.app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
mb.app.on('ready', function() {

  ipc.on('mb-app', function(event, arg) {
    if (arg === "quit") {
      console.log('goodbye!');
      mb.app.quit();
    } else if (arg === "config") {
      // send config
    }

    // event.sender.send('asynchronous-reply', 'pong');
  });
});
