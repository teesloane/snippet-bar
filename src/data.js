const fs = require('fs');

const filePaths = {
  'snippets': __dirname + '/storage/snippets.json',
  'settings': __dirname + '/storage/settings.json'
};

const noop = () => {};

function read(file, callback = noop) {
  if (!file || !filePaths.hasOwnProperty(file)) return;

  fs.readFile(filePaths[file], (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data));
  });
}

function write(file, data, callback = noop) {
  if (!data || !file || !filePaths.hasOwnProperty(file)) return;

  let jData = JSON.stringify(data, null, 2);

  fs.writeFile(filePaths[file], jData, (err) => {
    if (err) throw err;

    callback(jData);
  });
}

function settingsModel(syntaxHighlighting) {
  if (typeof syntaxHighlighting === 'undefined') return null;
  
  return {
    syntaxHighlighting
  };
}

function snippetModel(title = 'untitled', text, tags = [], lang = 'text') {
  if (!text) return null;

  let now = Date.now();

  let snippet = {
    id:    'ID' + now,
    title: title,
    text:  text,
    tags:  tags,
    lang:  lang
  };

  return snippet;
}

module.exports = {
  read,
  write,
  settingsModel,
  snippetModel
};
