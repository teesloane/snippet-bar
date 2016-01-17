const data = require('../data');

const SnippetActions = require('../actions/SnippetActions');
const SettingsActions = require('../actions/SettingsActions');

const noop = function(){};

module.exports = {
  readSnippets(callback = noop) {
    data.read('snippets', snippets => {
      SnippetActions.load(snippets);
      callback(snippets);
    });
  },

  readSettings(callback = noop) {
    data.read('settings', settings => {
      SettingsActions.load(settings);
      callback(settings);
    });
  }
};
