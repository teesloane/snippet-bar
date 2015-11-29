/******************
React Parent App
*******************/

const React = require('react');

const mb         = require('../mb');
const data       = require('../data');
const SearchList = require('./SearchList');

const App = React.createClass({
  getInitialState() {
    return {
      snippets: []
    }
  },

  componentDidMount() {
    data.read(snippets => {
      this.setState({
        snippets
      });
    });
  },

  render() {
    return (
      <div>
        <button onClick={mb.quit}>Quit</button>
        <SearchList items={this.state.snippets} />
      </div>
    );
  }
});

module.exports = App;
