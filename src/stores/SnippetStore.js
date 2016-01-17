const EventEmitter = require('events').EventEmitter;
const assign = require('react/lib/Object.assign');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SnippetBarConstants = require('../constants/SnippetBarConstants');

const data = require('../data');

const CHANGE_EVENT = 'change';
const noop = function(){};


//
// Store
//
const _modes = {
  empty:   'empty',
  preview: 'preview',
  add:     'add',
  edit:    'edit'
};
let _activeMode = 'preview';
let _activeSnippet = null;
let _snippets = [];


function getModes() {
  return _modes;
}

function getActiveMode() {
  return _activeMode;
}

function setActiveMode(mode, callback = noop) {
  let availableMode = _modes[mode];

  if (availableMode) {
    if (availableMode === 'add') resetActiveSnippet();

    _activeMode = availableMode;

    callback();
  }
}

function getActiveSnippet() {
  return _activeSnippet;
}

function setActiveSnippet(id, callback = noop) {
  let snippet = getSnippetById(id);

  if (!_activeSnippet || _activeSnippet.id !== snippet.id) {
    _activeSnippet = snippet;

    callback();
  }
}

function resetActiveSnippet() {
  _activeSnippet = null;
}

function getSnippets() {
  return _snippets;
}

function getSnippetById(id) {
  let snippet = null;
  let len = _snippets.length;

  for (let i = 0; i < len; i++) {
    if (_snippets[i].id === id) {
      snippet = _snippets[i];
      break;
    }
  }

  return snippet;
}

function create(values, callback = noop) {
  let isDuplicate = data.snippetExists(values.text);

  if (isDuplicate) return;

  let snippet = data.snippetModel(values.title, values.text, values.tags, values.lang);

  if (snippet) {
    _snippets.push(snippet);

    data.write('snippets', _snippets, () => {
      setActiveSnippet(snippet.id);
      setActiveMode(_modes.preview);

      callback();
    });
  }
}

function update(values, callback) {
  let userValues = data.snippetModel(values.title, values.text, values.tags, values.lang);

  if (!userValues) return;

  for (let i = 0; i < _snippets.length; i++) {
    if (_activeSnippet.id === _snippets[i].id) {

      _snippets[i].title = userValues.title;
      _snippets[i].text = userValues.text;
      _snippets[i].tags = userValues.tags;
      _snippets[i].lang = userValues.lang;

      data.write('snippets', _snippets, () => {
        setActiveSnippet(_activeSnippet.id);
        setActiveMode(_modes.preview);

        callback();
      });

      break;
    }
  }
}

function destroy(callback) {
  let len = _snippets.length;

  for (let i = 0; i < len; i++) {
    if (_snippets[i].id === _activeSnippet.id) {
      resetActiveSnippet();
      setActiveMode(_modes.empty);

      data.write('snippets', _snippets, callback);

      break;
    }
  }
}


let SnippetStore = assign({}, EventEmitter.prototype, {
  getModes,
  getActiveMode,
  getActiveSnippet,
  getSnippets,
  getSnippetById,

  emitChange() {
    SnippetStore.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    SnippetStore.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    SnippetStore.removeListener(CHANGE_EVENT, callback);
  }
});

SnippetStore.dispatchToken = AppDispatcher.register(action => {
  switch(action.actionType) {
    case SnippetBarConstants.LOAD_SNIPPETS:
      if (action.snippets) {
        _snippets = action.snippets;
        SnippetStore.emitChange();
      }
      break;

    case SnippetBarConstants.SNIPPET_CREATE:
      create(action.values, () => {
        action.callback();
        SnippetStore.emitChange();
      });
      break;

    case SnippetBarConstants.SNIPPET_UPDATE:
      update(action.values, () => {
        action.callback();
        SnippetStore.emitChange();
      });
      break;

    case SnippetBarConstants.SNIPPET_DELETE:
      destroy(() => {
        action.callback();
        SnippetStore.emitChange();
      });
      break;

    case SnippetBarConstants.SNIPPET_SET_ACTIVE:
      setActiveSnippet(action.id, SnippetStore.emitChange);
      break;

    case SnippetBarConstants.MODE_SET_ACTIVE:
      setActiveMode(action.mode, SnippetStore.emitChange);
      break;
  }
});

module.exports = SnippetStore;
