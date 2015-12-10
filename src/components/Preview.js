/************************************
Preview Pane with 4 modeS:
Empty, New, Edit, Preview
*************************************/

const React = require('react');

const Preview = React.createClass({

  getInitialState() {
    return {

    // these are temporary ways to display the modes while developing
      modes: {
        emptyMode: <EmptyMode />,
        editMode: <EditMode />,
        newMode: <NewMode />
      },
    }
  },

  render() {

    return(
      <div className="preview-container"> 
        <div className="preview-mode">
          {this.state.modes.emptyMode}
        </div>
        
        <div className="preview-controls">
          
          <button><i className="fa fa-clone fa-2x"></i></button>
          <button><i className="fa fa-plus fa-2x"></i></button>
        </div>
      </div>
    );
  }
});

// Preview Pane Modes

const EmptyMode = React.createClass({
  render() {
    return(
      <div className="preview-empty-mode">
      </div>
    );
  }
});

const EditMode = React.createClass({
  render() {
    return(
      <div className="preview-preview-mode">
        <div>
        </div>
      </div>
    );
  }
});


const NewMode = React.createClass({
  render() {
    return(
      <div className="preview-empty">
      </div>
    );
  }
});

module.exports = Preview;



