const React  = require('react');
const update = require('react-addons-update');

const remote   = require('electron').remote;
const Menu     = remote.Menu;
const MenuItem = remote.MenuItem;

const mb         = require('../mb');
const data       = require('../data');
const SearchList = require('./SearchList');
const Panel      = require('./Panel');

const App = React.createClass({
  getInitialState() {
    return {
      snippets:      [],
      activeSnippet: null,
      activeMode:    'empty',
      syntax:        false,
      modes:         {

        empty:   'empty',
        preview: 'preview',
        add:     'add',
        edit:    'edit'

      }
    }
  },

  componentDidMount() {
    this.createElectronMenu();

    data.read(snippets => {
      this.setState({
        snippets
      });
    });
  },

  toggleSyntax() {
    this.setState({
    	syntax: !this.state.syntax,
      activeMode: 'empty'
    }, () => {
      this.setState({
        activeSnippet: this.getSnippetById(this.state.activeSnippet.id),
        activeMode:    'preview'
      });
    });

    console.log('syntax is ' + this.state.syntax);
  },

  createElectronMenu() {

    let cog = document.getElementById('cog')
    let menu = new Menu();

    let about = new MenuItem({
      label: "About Snippets",
      click: mb.about
    });

    let separator = new MenuItem({
      type: 'separator'
    });

    let syntax = new MenuItem({
      label: 'Syntax Highlighting',
      type: 'checkbox',
      checked: false,
      click: this.toggleSyntax
    });

    let quit = new MenuItem({
      label: 'Quit',
      click: mb.quit
    });


    menu.append(about);
    menu.append(separator);
    menu.append(syntax);
    menu.append(separator);
    menu.append(quit);

    cog.addEventListener('click', event => {
      event.preventDefault();
      menu.popup(remote.getCurrentWindow());
    }, false);
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
      activeMode:    'preview'
    });
  },

  setMode(mode) {
    let availableMode = this.state.modes[mode];

    if (availableMode) {
      this.setState({
        activeMode: availableMode
      });
    }
  },

  updateSnippet(values) {
    let userValues    = data.snippetModel(values.title, values.text, values.tags);
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
                tags:  { $set: userValues.tags }
              }
            }
          )
        }, () => {
          data.write(this.state.snippets, () => {
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
          data.write(this.state.snippets, () => {
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
          setActive={this.setActive}
          appMenu={this.createElectronMenu} />

        <Panel
          activeMode={this.state.activeMode}
          modes={this.state.modes}
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
