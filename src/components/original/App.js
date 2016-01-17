const React  = require('react');
const update = require('react-addons-update');
const hljs   = require('highlight.js');

const remote   = require('electron').remote;
const Menu     = remote.Menu;
const MenuItem = remote.MenuItem;

const mb         = require('../mb');
const data       = require('../data');
const SearchList = require('./SearchList');
const Panel      = require('./Panel');

const languages = [
  'text',
  'bash',
  'csharp',
  'c++',
  'css',
  'elm',
  'go',
  'html',
  'haskell',
  'java',
  'javascript',
  'json',
  'markdown',
  'obj-c',
  'php',
  'python',
  'ruby',
  'scss'
];

hljs.configure({ languages });


const App = React.createClass({
  getInitialState() {
    return {
      languages,
      snippets:      [],
      activeSnippet: null,
      activeMode:    'empty',
      modes:         {
        empty:   'empty',
        preview: 'preview',
        add:     'add',
        edit:    'edit'
      },
      syntax: false
    };
  },

  componentDidMount() {
    data.read('settings', settings => {
      data.read('snippets', snippets => {
        this.setState({
          snippets,
          syntax: settings.syntaxHighlighting
        }, () => {
          this.createElectronMenu();
        });
      });
    });
  },

  // Enables / Disables Syntax Highlighing and resets State.
  toggleSyntax() {
    this.setState({
    	syntax: !this.state.syntax
    }, () => {
      let settings = data.settingsModel(this.state.syntax);

      if (settings) data.write('settings', settings);
    });
  },

  // Creates a menu when clicking on the Cog Icon.
  createElectronMenu() {
    let cog = document.getElementById('cog');
    let menu = new Menu();

    let separator = new MenuItem({
      type: 'separator'
    });

    let syntax = new MenuItem({
      label: 'Syntax Highlighting',
      type: 'checkbox',
      checked: this.state.syntax,
      click: this.toggleSyntax
    });

    let quit = new MenuItem({
      label: 'Quit',
      click: mb.quit
    });

    menu.append(syntax);
    menu.append(separator);
    menu.append(quit);

    cog.addEventListener('click', event => {
      event.preventDefault();
      menu.popup(remote.getCurrentWindow());
    }, false);
  },

  //Returns a snippet with a unique ID.
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

  // Determines the active Snippet to display
  setActive(id) {
    let activeSnippet = this.state.activeSnippet;
    let snippet = this.getSnippetById(id);

    if (!activeSnippet || activeSnippet.id !== snippet.id) {
      this.setState({
        activeSnippet: snippet,
        activeMode:    'preview'
      });
    }
  },

  // Sets the mode in Panel.js
  setMode(mode) {
    let availableMode = this.state.modes[mode];

    if (availableMode) {
      // clear the activeSnippet if entering 'add' mode
      let snippet = availableMode === 'add' ? null : this.state.activeSnippet;

      this.setState({
        activeMode:    availableMode,
        activeSnippet: snippet
      });
    }
  },

  //Edits the snippet when in EditMode. Is triggered by the Save icon (a submit button)
  updateSnippet(values) {
    let userValues    = data.snippetModel(values.title, values.text, values.tags, values.lang);
    let snippets      = this.state.snippets;
    let activeSnippet = this.state.activeSnippet;

    if (!userValues) return;

    for (let i = 0; i < snippets.length; i++) {
      if (activeSnippet.id === snippets[i].id) {
        this.setState({
          snippets: update(
            this.state.snippets,
            {
              [i]: {
                title: { $set: userValues.title },
                text:  { $set: userValues.text },
                tags:  { $set: userValues.tags },
                lang:  { $set: userValues.lang }
              }
            }
          )
        }, () => {
          //Callback of set State to write the changes to the same Snippet.
          data.write('snippets', this.state.snippets, () => {
            this.showNotification("Snippet Updated");

            this.setState({
              activeSnippet: this.getSnippetById(activeSnippet.id),
              activeMode: 'preview'
            });
          });
        });

        break;
      }
    }
  },

  /*Saves Snippet, as triggered by the Submit Button (Save Icon) in Add Mode.
   The arg 'values' is passed in when called in AddMode.js by createSnippet */
  saveSnippet(values) {
    let isDuplicate = data.snippetExists(values.text);

    if (isDuplicate) return;

    let snippet = data.snippetModel(values.title, values.text, values.tags, values.lang);

    if (snippet) {
      this.setState({
        snippets: update(
          this.state.snippets,
          {
            $push: [snippet]
          }
        )
      }, () => {
        data.write('snippets', this.state.snippets, () => {
          this.showNotification("Snippet Saved");

          this.setState({
            activeSnippet: this.getSnippetById(snippet.id),
            activeMode: 'preview'
          });
        });
      });
    }
  },

  deleteSnippet(e) {
    let activeSnippet = this.state.activeSnippet;
    let snippets      = this.state.snippets;
    let i             = 0;

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
          activeMode:    'empty'

        }, () => {
          data.write('snippets', this.state.snippets, () => {
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

    notification.textContent = message;

    setTimeout(() => {
      overlay.style.zIndex      = -1;
      notification.style.zIndex = -2;
    }, 1000)
  },

  render() {
    return (
      <div className="container">
        <div id="overlay" ref="overlay"></div>
        <div id="notification" ref="notification"></div>

        <SearchList
          snippets={this.state.snippets}
          activeSnippet={this.state.activeSnippet}
          setActive={this.setActive} />

        <Panel
          activeMode={this.state.activeMode}
          modes={this.state.modes}
          languages={this.state.languages}
          syntax={this.state.syntax}
          activeSnippet={this.state.activeSnippet}
          setMode={this.setMode}
          updateSnippet={this.updateSnippet}
          saveSnippet={this.saveSnippet}
          showNotification={this.showNotification}
          deleteSnippet={this.deleteSnippet} />
      </div>
    );
  }
});

module.exports = App;