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
  let jData = JSON.parse(data);

  fs.writeFile(snippetsPath, jData, 'utf8', (err) => {
    if (err) throw err;

    callback(jData);
  });
}

function snippetModel(newTitle, newText, newTagArray) {


  console.log('this is snippet model');
  // if (!newTitle || !newText) return null;

  // let now = Date.now();

  // let snippet = {
  //   id:      now,
  //   title:   newTitle,
  //   text:    newText,
  //   tags:    newTags,
  //   history: [],
  //   rank:    0,
  //   created: now,
  //   updated: now
  // };

  // return snippet;
}


module.exports = {
  read,
  write,
  snippetModel
};
