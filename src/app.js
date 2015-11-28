//Libraries / Modules / Ext Files:

const React = require('react');
const ReactDOM = require('react-dom');
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');
const HelloWorld = require('./HelloWorld');


// Read the 'database' and do something with it:

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
