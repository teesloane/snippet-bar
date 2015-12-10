/******************
React Parent App
*******************/

const React      = require('react');

const mb         = require('../mb');
const data       = require('../data');
const SearchList = require('./SearchList');
const Panel      = require('./Panel');

const App = React.createClass({
  getInitialState() {
    return {
      snippets: [],
      activeSnippet: null,
      activeMode: 'empty',
      modes: {
        empty: 'empty',
        edit:  'edit',
        add:   'add'
      }
    }
  },

  componentDidMount() {
    data.read(snippets => {
      this.setState({
        snippets
      });
    });
  },

  setMode(mode) {
    // check if mode is a property of modes object
    let availableMode = this.state.modes[mode];

    if (availableMode) {
      this.setState({
        activeMode: availableMode
      });
    }
  },

  render() {
    return (
      <div className="container">
        <SearchList snippets={this.state.snippets} />
        <Panel activeMode={this.state.activeMode} modes={this.state.modes} setMode={this.setMode} />
      </div>

      // <button onClick={mb.quit}>Quit</button>
    );
  }
});

module.exports = App;
