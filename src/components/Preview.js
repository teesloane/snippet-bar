/************************************
Preview Pane with 4 modeS:
Empty, New, Edit, Preview
*************************************/

const React = require('react');

const Preview = React.createClass({

  getInitialState() {
    return {

      faEditSave: false,
      selectedMode: <EmptyMode />,
    // these are temporary ways to display the modes while developing
      modes: {
        emptyMode: <EmptyMode />,
        editMode: <EditMode />,
        newMode: <NewMode />
      },
    }
  },

  createSnippetMode() {

    this.setState({
      selectedMode: <NewMode />
    });
    
  },

  editSave(e) {
    this.setState({
      faEditSave: !this.state.faEditSave
    });
  },

  render() {

    var EditSaveBtn = this.state.faEditSave ? 
      <button onClick={this.editSave} id="save-snippet">
        <i className="fa fa-floppy-o fa-2x"></i>
      </button> : 

      <button onClick={this.editSave} id="edit-snippet">
        <i className="fa fa-pencil fa-2x"></i>
      </button>;

    return(
      <div className="preview-container"> 
        <div className="preview-mode">
          {this.state.selectedMode}
        </div>
        
        <div className="preview-controls">
          <button id="copy-snippet"><i className="fa fa-clone fa-2x"></i></button>
          <button id="edit-snippet" >{EditSaveBtn}
          <button id="new-snippet" onClick={this.createSnippetMode}><i className="fa fa-plus fa-2x"></i></button>
          <button id="settings"><i className="fa fa-cog fa-2x"></i></button>
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
        </div>
      </div>
    );
  }
});


const NewMode = React.createClass({
  render() {
    return(
      <div className="preview-mode new-mode">
        <input className="search-bar" type="text" placeholder="Title" />
        <input className="search-bar" type="tags" placeholder="Tags" />
      </div>
    );
  }
});

module.exports = Preview;



