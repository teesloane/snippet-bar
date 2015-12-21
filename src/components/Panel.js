/************************************
Panel with 3 modes:
Empty, Edit, Add
*************************************/

const React = require('react');

const PanelControls = require('./PanelControls');
const data = require('../data');

const EditMode  = require('./EditMode');
const EmptyMode = require('./EmptyMode');
const AddMode   = require('./AddMode');

const Panel = React.createClass({

  propTypes: {
    activeMode      :     React.PropTypes.string.isRequired,
    setMode         :     React.PropTypes.func.isRequired,
    modes           :     React.PropTypes.object.isRequired,
    activeSnippet   :     React.PropTypes.object,
    saveSnippet     :     React.PropTypes.func.isRequired,
    showNotification:     React.PropTypes.func,
    deleteSnippet   :     React.PropTypes.func
  },

  setContent() {
    let activeMode = this.props.activeMode;
    let modes      = this.props.modes;

    if (activeMode === modes.empty) {
      return <EmptyMode setMode={this.props.setMode} />;
    }
    else if (activeMode === modes.edit) {
      return <EditMode 
        activeSnippet={this.props.activeSnippet} 
        setMode={this.props.setMode} 
        showNotification={this.props.showNotification} 
        deleteSnippet={this.props.deleteSnippet} />;
    }
    else if (activeMode === modes.add){
      return <AddMode saveSnippet={this.props.saveSnippet} setMode={this.props.setMode} />;
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

module.exports = Panel;
