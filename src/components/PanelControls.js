const React = require('react');

const Btn = require('./PanelButtons');

const PanelControls = React.createClass({
  propTypes: {
    mode:          React.PropTypes.string.isRequired,
    setMode:       React.PropTypes.func,
    createSnippet: React.PropTypes.func
  },

  copyFn() {
    alert('placeholder: this fn will copy snippet text');
  },

  editFn() {
    alert('placeholder: this function will make the text area editable');
  },

  deleteFn() {
    alert('placeholder: this function will delete a snippet');
  },

  showButtons() {
    let mode = this.props.mode;

    if (mode === 'edit') {

      let copy = <Btn kind="copy" onClick={this.copyFn}  />
      let edit = <Btn kind="edit" onClick={this.editFn}/>
      let del  = <Btn kind="del"  onClick={this.deleteFn}/>
      let add  = <Btn kind="add" onClick={this.props.setMode.bind(null,'add')} />

      return [
        copy,
        edit,
        del,
        add
      ];

    } else if (mode === 'empty') {
        let add  = <Btn kind="add" onClick={this.props.setMode.bind(null,'add')} />

      return add;

    } else if (mode === 'add') {
       let copy = <Btn kind="copy" onClick={this.copyFn}  />
       let save = <Btn kind="save" type="submit" onClick={this.createSnippet}  />


      return [
        copy,
        save
      ];
    }
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