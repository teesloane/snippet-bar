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
  
  getSnippetById(id, snippets) {

    let len = snippets.length;
    console.log("id: " + id);
    let snippet = null;
    let i;

    for ( i = 0; i < len; i++) {
      if (snippets[i].id === id) {
        snippet = snippets[i];
        break;
      }
    }

    return snippet;

  },

  setActive(id, snippets) {
    let activeSnippet = this.getSnippetById(id, snippets);

    this.setState({
      activeSnippet: activeSnippet,
      activeMode: 'edit'
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
        <SearchList 
          snippets={this.state.snippets} 
          setMode={this.setMode} 
          activeSnippet={this.state.activeSnippet}
          setActive={this.setActive} />

        <Panel 
          activeMode={this.state.activeMode} 
          modes={this.state.modes} 
          activeSnippet={this.state.activeSnippet}
          setMode={this.setMode} />

      </div>

      // <button onClick={mb.quit}>Quit</button>
    );
  }
});

module.exports = App;
