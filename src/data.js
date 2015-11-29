/******************
Read + Write Model
*******************/

const fs = require('fs');
const filePath = '/storage/snippets.json';

function readFile(callback) {
  fs.readFile(__dirname + filePath, 'utf8', (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data));
  });
}

/******************
Snippet Config
*******************/

function snippetModel(title = "untitled", text, tags = []) {
  let snippet = {};
  let now = Date.now();

  if (!text) return null;

  snippet.id = now;
  snippet.title = title;
  snippet.text = text;
  snippet.tags = tags;
  snippet.rank = 0;
  snippet.created = now; 
  snippet.updated = now; 

  return snippet;
}


module.exports = {
  readFile,
  snippetModel
};


