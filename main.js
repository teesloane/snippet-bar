var menubar = require('menubar');
var ipc = require('ipc');

var mb = menubar({
  dir: './app',
  width: 600,
  height: 370,
  'always-on-top': true
});
var app = mb.app;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // close app
  ipc.on('asynchronous-message', function(event, arg) {
    console.log(arg);  // prints "ping"
    if (arg === "quit") {
      app.quit();
    }
    // event.sender.send('asynchronous-reply', 'pong');
  });

});
