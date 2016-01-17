const AppDispatcher = require('../dispatcher/AppDispatcher');
const SnippetBarConstants = require('../constants/SnippetBarConstants');

const noop = function(){};

module.exports = {
  load(snippets) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.LOAD_SNIPPETS,
      snippets
    });
  },

  create(values, callback = noop) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_CREATE,
      values,
      callback
    });
  },

  update(values, callback = noop) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_UPDATE,
      values,
      callback
    });
  },

  destroy(callback = noop) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_DELETE,
      callback
    });
  },

  setActive(id) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_SET_ACTIVE,
      id
    });
  },

  setMode(mode) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.MODE_SET_ACTIVE,
      mode
    });
  }
};
