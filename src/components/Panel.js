/************************************
Panel with 3 modes:
Empty, Edit, Add
*************************************/

const React = require('react');

const PanelControls = require('./Panel-Controls')

const Panel = React.createClass({

  getInitialState() {
    return {
      icons: {
        add:           

          <button id="new-snippet"  title="add">
            <i className="fa fa-plus fa-2x"></i>
          </button>,

        edit:           

          <button id="edit-snippet" title="edit">
            <i className="fa fa-pencil fa-2x"></i>
          </button>,

        settings:           

          <button id="settings">
            <i className="fa fa-cog fa-2x"></i>
          </button>,

        copy: 

          <button id="copy-snippet">
            <i className="fa fa-clone fa-2x"></i>
          </button>,

        save:    

          <button id="save-snippet">
            <i className="fa fa-floppy-o fa-2x"></i>
          </button>,

        empty:           

          <button id="empty-snippet">
            <i className="fa fa-times fa-2x"></i>
          </button>,
      }
    }

  },


  propTypes: {
    activeMode: React.PropTypes.string.isRequired,
    setMode:    React.PropTypes.func.isRequired,
    modes:      React.PropTypes.object.isRequired
  },

  setContent() {
    let activeMode = this.props.activeMode;
    let modes      = this.props.modes;

    if (activeMode === modes.empty) {
      return <EmptyMode icons={this.state.icons} />;
    }
    else if (activeMode === modes.edit) {
      return <EditMode icons={this.state.icons} />;
    }
    else if (activeMode === modes.add){
      return <AddMode icons={this.state.icons} />;
    }
  },

  render() {

    let panelContent = this.setContent();

    return(
      <div className="panel-container">
        <div className="panel-mode">{panelContent}</div>
        

      </div>
    );
  }
});

// Preview Pane Modes

const EmptyMode = React.createClass({



  getInitialState() {

    let icon = this.props.icons;

    return {
      icons: {
        empty: icon.empty,
        add: icon.add,
        settings: icon.settings
      }
    }
  },

  render() {
    let icons = this.state.icons;

    return(

      <div className="panel-mode">

        <div className="selected-mode">
         <span>"What's up? You should make a snippet or something!"</span>
       </div>

       <PanelControls icons={icons} />

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