const React = require('react');
const hljs  = require('highlight.js');

const PanelControls = require('./PanelControls');

const EditMode = React.createClass({
  propTypes: {
    activeSnippet: React.PropTypes.object,
    setMode:       React.PropTypes.func.isRequired,
    deleteSnippet: React.PropTypes.func
  },

  render() {
    let activeSnippet = this.props.activeSnippet;
    let text          = null;

    if ( activeSnippet ) {
      text = activeSnippet.text;
    }

    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="preview-snippet-mode">
            <pre className="snippet-text copy-text" ref={
              code => {
                if (code) hljs.highlightBlock(code);
              }
            }>
              <code>{text}</code>
            </pre>
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
