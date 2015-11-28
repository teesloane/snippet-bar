const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('react-mount')
);

//
// testing data stuff
//

var data = require('./data');

data.readFile(snippets => {
  console.log(snippets[0].title);
});
