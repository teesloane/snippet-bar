/******************
React Parent App
*******************/

const React      = require('react');

const mb         = require('../mb');
const data       = require('../data');
const SearchList = require('./SearchList');
const Preview    = require('./Preview');

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
      <div className="container">
        <SearchList items={this.state.snippets} />
        <Preview />
        
      </div>

      // <button onClick={mb.quit}>Quit</button>

    );
  }
});

module.exports = App;
