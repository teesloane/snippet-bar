/******************
React Parent App
*******************/

const React  = require('react');
const update = require('react-addons-update');

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

  getSnippetById(id) {
    let snippet = null;
    let len     = this.state.snippets.length;
    let i;

    for ( i = 0; i < len; i++) {
      if (this.state.snippets[i].id === id) {
        snippet = this.state.snippets[i];
        break;
      }
    }

    return snippet;
  },

  setActive(id) {
    let activeSnippet = this.getSnippetById(id);

    this.setState({
      activeSnippet: activeSnippet,
      activeMode:    'edit'
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

  saveSnippet(values) {
    let snippet = data.snippetModel(values.title, values.text, values.tags);

    if (snippet) {
      this.setState({
        snippets: update(
          this.state.snippets,
          {
            $push: [snippet]
          }
        )
      }, () => {
        data.write(this.state.snippets, () => {
          console.log('snippet saved');
        });
      });
    }
  },

  deleteSnippet(e) { 

    let activeSnippet = this.state.activeSnippet;
    let snippets = this.state.snippets;
    let i = 0;

    for (i; i < snippets.length; i++) {
      if (snippets[i].id === activeSnippet.id) {

        this.setState({
          snippets: update(
            snippets, 
            { 
              $splice: [[i, 1]] 
            }
          ),

          activeSnippet: null,
          activeMode: 'empty'

        }, () => {
        //2nd parameter of this.setState - this updates state with one less snippet.
          data.write(this.state.snippets, () => {
            console.log('snippet deleted');
            this.showNotification("Snippet Deleted");
          });
        });
        
        break;
      }
    }
  },

  showNotification(message) {

    let overlay      = this.refs.overlay;
    let notification = this.refs.notification;


      overlay.style.zIndex      = 10;
      notification.style.zIndex = 11;

      notification.textContent  = message;

      setTimeout(() => {
        overlay.style.zIndex = -1;
        notification.style.zIndex= -2;
      }, 1000)
  },

  render() {
    return (
      <div className="container">

        <div id="overlay" ref="overlay"></div>
        <div id="notification" ref="notification"></div>
        <div id="confirmation-buttons" ref="confirmationButtons">
          <button> Cancel </button>
          <button> You Sure? </button>
        </div>

        <SearchList
          snippets={this.state.snippets}
          setMode={this.setMode}
          activeSnippet={this.state.activeSnippet}
          setActive={this.setActive} />

        <Panel
          activeMode={this.state.activeMode}
          modes={this.state.modes}
          activeSnippet={this.state.activeSnippet}
          setMode={this.setMode}
          saveSnippet={this.saveSnippet} 
          showNotification={this.showNotification} 
          deleteSnippet={this.deleteSnippet} />

      </div>
    );
  }
});

module.exports = App;
