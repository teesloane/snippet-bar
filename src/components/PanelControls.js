const React = require('React');

var PanelControls = React.createClass({
  propTypes: {
    mode:          React.PropTypes.string.isRequired,
    setMode:       React.PropTypes.func,
    createSnippet: React.PropTypes.func
  },

  showButtons() {
    let mode = this.props.mode;

    if (mode === 'edit') {
      let copy = (
        <button 
          key="1"
          id="copy-snippet"
          title="Copy Snippet"> 
          <i className="fa fa-clone fa-2x"></i>
        </button>
      );

      let save = (
        <button 
          key="2"
          id="save-snippet"
          title="Save">
            <i className="fa fa-floppy-o fa-2x"></i>
        </button>
      );

      let del = (
        <button
          key="3"
          id="delete-snippet"  
          title="delete Snippet">
          <i className="fa fa-trash fa-2x"></i>
        </button>
      );

      let add = (
        <button 
          key="4"
          id="new-snippet"  
          title="New Snippet"
          onClick={this.props.setMode.bind(null, 'add')}>
              <i className="fa fa-plus fa-2x"></i>
          </button>
      );

      return [
        copy,
        save,
        del,
        add
      ];

    } else if (mode === 'empty') {
      let add = (
        <button 
          key="1"
          id="new-snippet"  
          title="New Snippet"
          onClick={this.props.setMode.bind(null, 'add')}>
              <i className="fa fa-plus fa-2x"></i>
          </button>
      );

      return add;

    } else if (mode === 'add') {
      let copy = (
        <button 
          key="1"
          id="copy-snippet"
          title="Copy Snippet"> 
          <i className="fa fa-clone fa-2x"></i>
        </button>
      );

      let save = (
        <button 
          type="submit"
          key="2"
          id="save-snippet"
          title="Save"
          onClick={this.createSnippet}>
            <i className="fa fa-floppy-o fa-2x"></i>
        </button>
      );

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