const EventEmitter = require('events').EventEmitter;
const assign = require('react/lib/Object.assign');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SnippetBarConstants = require('../constants/SnippetBarConstants');

const data = require('../data');

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


let SettingsStore = assign({}, EventEmitter.prototype, {
  getLanguages,
  getSyntax,

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

SettingsStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case SnippetBarConstants.LOAD_SETTINGS:
      if (action.settings) _syntax = action.settings.syntaxHighlighting;
      break;

    case SnippetBarConstants.SYNTAX_TOGGLE:
      toggleSyntax();
      SettingsStore.emitChange();
      break;
  }
});

module.exports = SettingsStore;
