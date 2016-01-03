const fs = require('fs');

const filePaths = {
  'snippets': __dirname + '/storage/snippets.json',
  'settings': __dirname + '/storage/settings.json'
};

const noop = () => {};

let localSnippets = [];

function read(file, callback = noop) {
  if (!file || !filePaths.hasOwnProperty(file)) return;

  fs.readFile(filePaths[file], (err, data) => {
    if (err) throw err;

    let jData = JSON.parse(data);

    if (file === 'snippets') localSnippets = jData;

    callback(jData);
  });
}

function write(file, data, callback = noop) {
  if (!data || !file || !filePaths.hasOwnProperty(file)) return;

  let sData = JSON.stringify(data, null, 2);

  fs.writeFile(filePaths[file], sData, (err) => {
    if (err) throw err;

    if (file === 'snippets') localSnippets = data;

    callback(sData);
  });
}

function snippetExists(text = '') {
  return text.length && localSnippets && localSnippets.some(snippet => text === snippet.text);
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
  snippetExists,
  settingsModel,
  snippetModel
};
