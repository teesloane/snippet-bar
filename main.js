const ipcMain = require('electron').ipcMain;
const menubar = require('menubar');
const BrowserWindow = require('browser-window');

const config = {
  openDevTools: false,
  title:        'snippets',
  icon:         './app/static/img/brackets.png',
  iconAlt:      './app/static/img/brackets-alt.png'
};

const mb = menubar({
  dir:             './app',
  icon:            config.icon,
  width:           600,
  height:          370,
  preloadWindow:   true,
  'always-on-top': true
});

// prevent window resizing
mb.setOption('resizable', false);

if (config.openDevTools) {
  mb.on('after-create-window', () => {
    mb.window.openDevTools();
  });
}

// Quit when all windows are closed.
mb.app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    mb.app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
mb.app.on('ready', () => {
  mb.tray.setToolTip(config.title);
  mb.tray.setPressedImage(config.iconAlt);

  ipcMain.on('mb-app', (event, arg) => {
    if (arg === "quit") {
      console.log('goodbye!');
      mb.app.quit();
    }
  });

  var prefsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false
  })

  prefsWindow.loadURL('file://' + __dirname + '/prefs.html')


  ipcMain.on('show-prefs', function() {
    prefsWindow.show()


  })
});
