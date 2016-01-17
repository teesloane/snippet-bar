const React = require('react');
const hljs  = require('highlight.js');

const PanelControls = require('./PanelControls');
const PreviewMode = React.createClass({
  propTypes: {
    activeSnippet: React.PropTypes.object,
    setMode:       React.PropTypes.func.isRequired,
    deleteSnippet: React.PropTypes.func,
    syntax:        React.PropTypes.bool,
    languages:     React.PropTypes.array
  },

  render() {
    let activeSnippet = this.props.activeSnippet;
    let text          = null;
    let language      = '';
    let syntax        = this.props.syntax;

    if (activeSnippet) {
      text     = activeSnippet.text;
      language = (!syntax || activeSnippet.lang === 'text' ? 'nohighlight' : activeSnippet.lang);
    }

    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="preview-snippet-mode">
            <pre className={"snippet-text copy-text " + language}
              ref={
                preElement => {
                  if (preElement) hljs.highlightBlock(preElement);
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

module.exports = PreviewMode;
