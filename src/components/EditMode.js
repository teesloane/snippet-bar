const React = require('react');

const PanelControls = require('./PanelControls');

const EditMode = React.createClass({
  propTypes: {
    activeSnippet: React.PropTypes.object,
    setMode:       React.PropTypes.func.isRequired
  },

  render() {
    let activeSnippet = this.props.activeSnippet;
    let text = null;

    if ( activeSnippet ) {
      text = activeSnippet.text
    }

    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="edit-snippet-mode">
            <textarea className="copy-text" value={text} readOnly="true"></textarea>
          </div>

          <PanelControls mode="edit" setMode={this.props.setMode} showNotification={this.props.showNotification} />
       </div>
      </div>
    );
  }
});

module.exports = EditMode;
