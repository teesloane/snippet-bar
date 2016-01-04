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
    deleteSnippet:    React.PropTypes.func,
    syntax:           React.PropTypes.bool,
    languages:        React.PropTypes.array
  },

  enableTabbing() {
    document.querySelector("textarea").addEventListener('keydown',function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection

        var start = this.selectionStart;
        var end = this.selectionEnd;

        var target = e.target;
        var value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
                    + "    "
                    + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 2;

        // prevent the focus lose
        e.preventDefault();
      }
    },false);
  },


  setContent() {
    let activeMode = this.props.activeMode;

    if (activeMode === 'edit') {
      return <EditMode
        activeSnippet={this.props.activeSnippet}
        setMode={this.props.setMode}
        showNotification={this.props.showNotification}
        deleteSnippet={this.props.deleteSnippet}
        languages={this.props.languages}
        syntax={this.props.syntax}
        enableTabbing={this.enableTabbing}
        updateSnippet={this.props.updateSnippet} />;

    }
    else if (activeMode === 'preview') {
      return <PreviewMode
        activeSnippet={this.props.activeSnippet}
        setMode={this.props.setMode}
        showNotification={this.props.showNotification}
        languages={this.props.languages}
        syntax={this.props.syntax}
        deleteSnippet={this.props.deleteSnippet} />;
    }
    else if (activeMode === 'add'){
      return <AddMode
        saveSnippet={this.props.saveSnippet}
        enableTabbing={this.enableTabbing}
        syntax={this.props.syntax}
        languages={this.props.languages}
        setMode={this.props.setMode} />;
    }
    else {
      return <EmptyMode setMode={this.props.setMode} />;
    }
  },

  render() {
    let panelContent = this.setContent();

    return(
      <div className="panel-container">
        {panelContent}
      </div>
    );
  }
});

module.exports = Panel;
