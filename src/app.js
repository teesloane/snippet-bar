//Libraries / Modules / Ext Files:

const React = require('react');
const ReactDOM = require('react-dom');
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');
const HelloWorld = require('./HelloWorld');


// Read the 'database' and do something with it:

/*******************************************************
Attempt 1 at reading json data
This returns data, but not the data from the data.json file.
********************************************************/

// function showData(callback) {
//   fs.readFile(__dirname + '/data.json', function(err, data) {
//     if (err) return callback(err);
//     callback(null, data)
//   });
// }

// showData(function (err, data) {
//   console.log(data);
// })

// console.log(__dirname + '/data.json');

/*******************************************************
Attempt 2 at reading json data; this return a console error: 
" Uncaught SyntaxError: Unexpected token { " < -- wtf?!
********************************************************/

var snippets;

fs.readFile(__dirname + '/data.json', 'utf8', function (err, data) {
  if (err) throw err;
  snippets = JSON.parse(data);
});

console.log(snippets);  


//Render some React!

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('react-mount')
);

//For Quitting the App:

function quit() {
  ipcRenderer.send('mb-app', 'quit');
}

module.exports = {
  quit
};
