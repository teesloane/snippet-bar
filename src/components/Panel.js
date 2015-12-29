/************************************
Panel with 3 modes:
Empty, Edit, Add
*************************************/

const React = require('react');

const PanelControls = require('./PanelControls');
const data = require('../data');

const PreviewMode = require('./PreviewMode');
const EmptyMode   = require('./EmptyMode');
const AddMode     = require('./AddMode');
const EditMode    = require('./EditMode');

const Panel = React.createClass({
  propTypes: {
    activeMode:       React.PropTypes.string.isRequired,
    setMode:          React.PropTypes.func.isRequired,
    activeSnippet:    React.PropTypes.object,
    updateSnippet:    React.PropTypes.func.isRequired,
    saveSnippet:      React.PropTypes.func.isRequired,
    showNotification: React.PropTypes.func,
    deleteSnippet:    React.PropTypes.func
  },

  setContent() {
    let activeMode = this.props.activeMode;

    if (activeMode === 'edit') {
      return <EditMode
        activeSnippet={this.props.activeSnippet}
        setMode={this.props.setMode}
        showNotification={this.props.showNotification}
        deleteSnippet={this.props.deleteSnippet}
        updateSnippet={this.props.updateSnippet} />;
    }
    else if (activeMode === 'preview') {
      return <PreviewMode
        activeSnippet={this.props.activeSnippet}
        setMode={this.props.setMode}
        showNotification={this.props.showNotification}
        deleteSnippet={this.props.deleteSnippet} />;
    }
    else if (activeMode === 'add'){
      return <AddMode saveSnippet={this.props.saveSnippet} setMode={this.props.setMode} />;
    }
    else {
      return <EmptyMode setMode={this.props.setMode} />;
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
