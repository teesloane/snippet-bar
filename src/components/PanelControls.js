const React = require('react');
const Clipboard = require('clipboard');

const PanelButton = require('./PanelButton');

const PanelControls = React.createClass({
  propTypes: {
    mode:             React.PropTypes.string.isRequired,
    setMode:          React.PropTypes.func.isRequired,
    showNotification: React.PropTypes.func,
    deleteSnippet:    React.PropTypes.func
  },

  componentDidUpdate(){
    new Clipboard('.copy-btn');
  },

  copySnippet() {
    this.props.showNotification("Snippet Copied!");
  },

  confirmDelete() {
    if (confirm("You sure you want to delete this?")) {
      this.props.deleteSnippet();
    }
  },

  showButtons() {
    let mode = this.props.mode;

    let copy = <PanelButton kind="copy" click={this.copySnippet} key="1"/>;
    let edit = <PanelButton kind="edit" click={this.props.setMode.bind(null, 'edit')} key="2"/>;
    let del  = <PanelButton kind="del" click={this.confirmDelete} key="3"/>;
    let add  = <PanelButton kind="add" click={this.props.setMode.bind(null, 'add')} key="4"/>;
    let save = <PanelButton kind="save" type="submit" click={this.saveSnippet} key="5" />;
    let update = <PanelButton kind="update" type="submit" key="6" />;

    if (mode === 'empty')      return add;
    else if (mode === 'preview') return [copy, edit, del, add];
    else if (mode === 'edit')  return [update, add];
    else if (mode === 'add')   return [save, copy];
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
