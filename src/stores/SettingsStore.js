const EventEmitter = require('events').EventEmitter;
const assign = require('react/lib/Object.assign');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SnippetBarConstants = require('../constants/SnippetBarConstants');

const SettingsActions = require('../actions/SettingsActions');

const remote   = require('electron').remote;
const Menu     = remote.Menu;
const MenuItem = remote.MenuItem;
const hljs     = require('highlight.js');

const data = require('../data');
const mb   = require('../mb');

const CHANGE_EVENT = 'change';


//
// Store
//
const _languages = [
  'text',
  'bash',
  'csharp',
  'c++',
  'css',
  'elm',
  'go',
  'html',
  'haskell',
  'java',
  'javascript',
  'json',
  'markdown',
  'obj-c',
  'php',
  'python',
  'ruby',
  'scss'
];
let _syntax = false;


function getLanguages() {
  return _languages;
}

function getSyntax() {
  return _syntax;
}

function toggleSyntax() {
  _syntax = !_syntax;

  let settings = data.settingsModel(_syntax);

  if (settings) data.write('settings', settings);
}

function createElectronMenu() {
  let cog = document.getElementById('cog');

  if (!cog) return;

  let menu = new Menu();

  let separator = new MenuItem({
    type: 'separator'
  });

  let syntax = new MenuItem({
    label:   'Syntax Highlighting',
    type:    'checkbox',
    checked: _syntax,
    click:   SettingsActions.syntaxToggle
  });

  let quit = new MenuItem({
    label: 'Quit',
    click: mb.quit
  });

  menu.append(syntax);
  menu.append(separator);
  menu.append(quit);

  cog.addEventListener('click', event => {
    event.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }, false);
}


let SettingsStore = assign({}, EventEmitter.prototype, {
  getLanguages,
  getSyntax,

  init() {
    hljs.configure({
      languages: _languages
    });

    createElectronMenu();
  },

  emitChange() {
    SettingsStore.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    SettingsStore.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    SettingsStore.removeListener(CHANGE_EVENT, callback);
  }
});

SettingsStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case SnippetBarConstants.LOAD_SETTINGS:
      if (action.settings) {
        _syntax = action.settings.syntaxHighlighting;
        SettingsStore.emitChange();
      }
      break;

    case SnippetBarConstants.SYNTAX_TOGGLE:
      toggleSyntax();
      SettingsStore.emitChange();
      break;
  }
});

module.exports = SettingsStore;
