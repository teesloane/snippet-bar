const data = require('../data');

const SnippetActions = require('../actions/SnippetActions');
const SettingsActions = require('../actions/SettingsActions');

module.exports = {
  readSnippets() {
    data.read('snippets', SnippetActions.load);
  },

  readSettings() {
    data.read('settings', SettingsActions.load);
  }
};
