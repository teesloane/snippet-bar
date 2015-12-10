/************************************
Panel with 4 modeS:
Empty, Edit, Add
*************************************/

const React = require('react');

const Panel = React.createClass({
  propTypes: {
    activeMode: React.PropTypes.string.isRequired,
    setMode:    React.PropTypes.func.isRequired,
    modes:      React.PropTypes.object.isRequired
  },

  setContent() {
    let activeMode = this.props.activeMode;
    let modes      = this.props.modes;

    if (activeMode === modes.empty) {
      return <EmptyMode />;
    }
    else if (activeMode === modes.edit) {
      return <EditMode />;
    }
    else if (activeMode === modes.add){
      return <AddMode />;
    }
  },

  render() {
    // var EditSaveBtn = this.state.faEditSave ?
    //   <button onClick={this.editSave} id="save-snippet">
    //     <i className="fa fa-floppy-o fa-2x"></i>
    //   </button> :
    //
    //   <button onClick={this.editSave} id="edit-snippet">
    //     <i className="fa fa-pencil fa-2x"></i>
    //   </button>;

    let panelContent = this.setContent();

    return(
      <div className="preview-container">
        <div className="preview-mode">{panelContent}</div>

        <div className="preview-controls">
          <button id="copy-snippet">
            <i className="fa fa-clone fa-2x"></i>
          </button>

          <button id="edit-snippet" onClick={this.props.setMode.bind(null, 'edit')} title="edit">
            <i className="fa fa-pencil fa-2x"></i>
          </button>

          <button id="new-snippet" onClick={this.props.setMode.bind(null, 'add')} title="add">
            <i className="fa fa-plus fa-2x"></i>
          </button>

          <button id="settings">
            <i className="fa fa-cog fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
});

// Preview Pane Modes

const EmptyMode = React.createClass({
  render() {
    return(
      <div className="preview-mode empty-mode">
        <span>"What's up? You should make a snippet or something!"</span>
      </div>
    );
  }
});

const EditMode = React.createClass({
  render() {
    return(
      <div className="preview-mode">
        <div>
          Edit Exclaim
        </div>
      </div>
    );
  }
});


const AddMode = React.createClass({
  render() {
    return(
      <div className="preview-mode new-mode">
        <input className="search-bar" type="text" placeholder="Title" />
        <input className="search-bar" type="tags" placeholder="Tags" />
      </div>
    );
  }
});

module.exports = Panel;
