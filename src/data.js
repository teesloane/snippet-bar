const fs = require('fs');

const filePath = '/storage/snippets.json';

function readFile(callback) {
  fs.readFile(__dirname + filePath, 'utf8', (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data));
  });
}

module.exports = {
  readFile
};
