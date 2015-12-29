const React = require('react');
const hljs  = require('highlight.js');

const PanelControls = require('./PanelControls');

const EditMode = React.createClass({
  propTypes: {
    activeSnippet: React.PropTypes.object,
    setMode:       React.PropTypes.func.isRequired,
    deleteSnippet: React.PropTypes.func
  },

  createText() {
    return {
      __html: hljs.highlightAuto(this.props.activeSnippet.text).value
    };
  },

  render() {
    let activeSnippet = this.props.activeSnippet;
    let text          = null;

    if ( activeSnippet ) {
      text = this.createText();
    }

    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="preview-snippet-mode">
            <div className="copy-text" dangerouslySetInnerHTML={text}></div>
          </div>

          <PanelControls
            mode="preview"
            setMode={this.props.setMode}
            showNotification={this.props.showNotification}
            deleteSnippet={this.props.deleteSnippet}/>
        </div>
      </div>
    );
  }
});

module.exports = EditMode;
