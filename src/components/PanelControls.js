const React = require('react');
const Clipboard = require('clipboard');

const SnippetActions = require('../actions/SnippetActions');
const SnippetStore   = require('../stores/SnippetStore')

const PanelButton = require('./PanelButton');

const PanelControls = React.createClass({
  propTypes: {
    mode:             React.PropTypes.string.isRequired,
    showNotification: React.PropTypes.func
  },

  getInitialState() {
    return {
      modes: SnippetStore.getModes()
    };
  },

  componentDidUpdate(){
    new Clipboard('.copy-btn');
  },

  copySnippet() {
    this.props.showNotification("Snippet Copied!");
  },

  confirmDelete() {
    if (confirm("You sure you want to delete this snippet?")) {
      SnippetActions.destroy(() => {
        this.props.showNotification('Snippet Deleted!');
      });
    }
  },

  showButtons() {
    let mode  = this.props.mode;
    let modes = this.state.modes;

    let copy   = <PanelButton kind="copy" key="copy" click={this.copySnippet} />;
    let del    = <PanelButton kind="del"  key="del"  click={this.confirmDelete} />;
    let edit   = <PanelButton kind="edit" key="edit" click={SnippetActions.setMode.bind(null, modes.edit)} />;
    let add    = <PanelButton kind="add"  key="add"  click={SnippetActions.setMode.bind(null, modes.add)} />;
    let save   = <PanelButton kind="save" type="submit" key="save" click={SnippetActions.create} />;
    let update = <PanelButton kind="update" type="submit" key="update" />;

    if      (mode === modes.empty)   return add;
    else if (mode === modes.add)     return save;
    else if (mode === modes.preview) return [copy, edit, del, add];
    else if (mode === modes.edit)    return [update, add];
  },

  render() {
    return(
      <div className="panel-controls">
        {this.showButtons()}
      </div>
    );
  }
});

module.exports = PanelControls;
