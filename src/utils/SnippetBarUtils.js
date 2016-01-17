const data = require('../data');

const noop = function(){};

module.exports = {
  readSnippets(callback = noop) {
    data.read('snippets', callback);
  },

  readSettings(callback = noop) {
    data.read('settings', callback});
  }
};
