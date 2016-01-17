const AppDispatcher = require('../dispatcher/AppDispatcher');
const SnippetBarConstants = require('../constants/SnippetBarConstants');

module.exports = {
  load(settings) {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.LOAD_SETTINGS,
      settings
    });
  },

  syntaxToggle() {
    AppDispatcher.dispatch({
      actionType: SnippetBarConstants.SYNTAX_TOGGLE
    });
  }
};
