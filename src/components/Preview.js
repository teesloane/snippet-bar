/************************************
Panel with 3 modes:
Empty, Edit, Add
*************************************/

const React = require('react');

const PanelControls = require('./Panel-Controls')

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

    let panelContent = this.setContent();

    return(
      <div className="preview-container">
        <div className="preview-mode">{panelContent}</div>
        

      </div>
    );
  }
});

// Preview Pane Modes

const EmptyMode = React.createClass({
  render() {
    return(

      <div className="preview-mode">
      
        <div className=" selected-mode">
         <span>"What's up? You should make a snippet or something!"</span>
       </div>

       <PanelControls />

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