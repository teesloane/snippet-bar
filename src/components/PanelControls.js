const React = require('react');
const Clipboard = require('clipboard');

const PanelButton = require('./PanelButton');

const PanelControls = React.createClass({
  propTypes: {
    mode:          React.PropTypes.string.isRequired,
    setMode:       React.PropTypes.func.isRequired,
    createSnippet: React.PropTypes.func
  },

  componentDidUpdate(){
    new Clipboard('.copy-btn');
  },

  copySnippet() {
    this.props.showNotification("Snippet Copied!");
  },

  editSnippet() {
    console.log('placeholder: this function will make the text area editable');
    this.props.showNotification("YOU ");
  },

  deleteSnippet() {
    console.log('placeholder: this function will delete a snippet');
    this.props.showNotification("Snippet Deleted!");
  },

  showButtons() {
    let mode = this.props.mode;

    let copy = <PanelButton kind="copy" click={this.copySnippet} key="1"/>;
    let edit = <PanelButton kind="edit" click={this.editSnippet} key="2"/>;
    let del  = <PanelButton kind="del" click={this.deleteSnippet} key="3"/>;
    let add  = <PanelButton kind="add" click={this.props.setMode.bind(null, 'add')} key="4"/>;
    let save = <PanelButton kind="save" type="submit" click={this.createSnippet} key="5" />;

    if (mode === 'empty')      return add;
    else if (mode === 'edit')  return [copy, edit, del, add];
    else if (mode === 'add')   return [copy, save];
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
