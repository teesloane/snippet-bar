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
    hljs.configure({
      // select which languages that HLJS can detect from:
      languages: this.props.languages
    });

    let activeSnippet = this.props.activeSnippet;
    let text          = null;
    let language      = '';
    let syntax        = this.props.syntax;

    if (activeSnippet) {
      text     = activeSnippet.text;
    }

    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="preview-snippet-mode">
            <pre className={"snippet-text copy-text " + activeSnippet.lang}  ref={
              code => {
                //if statement responds to whether highlighting is enabled or disabled
                if (syntax){
                  if (code) hljs.highlightBlock(code);
                }
                else if(!syntax) {
                }
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
