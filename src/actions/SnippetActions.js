const AppDispatcher = require('../dispatcher/AppDispatcher');
const SnippetBarConstants = require('../constants/SnippetBarConstants');

module.exports = {
  load(snippets) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.LOAD_SNIPPETS,
      snippets
    });
  },

  create(values) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_CREATE,
      values
    });
  },

  update(values) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_UPDATE,
      values
    });
  },

  destroy() {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SNIPPET_DELETE
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
