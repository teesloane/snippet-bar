/******************
Data CRUD
*******************/

const fs = require('fs');

const snippetsPath = __dirname + '/storage/snippets.json';

function read(callback) {
  fs.readFile(snippetsPath, 'utf8', (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data));
  });
}

function write(data, callback) {
  if (!data) return;

  let jData = JSON.stringify(data, null, 2);

  fs.writeFile(snippetsPath, jData, 'utf8', (err) => {
    if (err) throw err;

    callback(jData);
  });
}

function snippetModel(title = 'untitled', text, tags = []) {
  if (!text) return null;

  let now = Date.now();

  let snippet = {
    id:      'ID' + now,
    title:   title,
    text:    text,
    tags:    tags
  };

  return snippet;
}


module.exports = {
  read,
  write,
  snippetModel
};
