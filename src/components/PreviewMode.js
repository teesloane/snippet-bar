const React = require('react');
const hljs  = require('highlight.js');

const PanelControls = require('./PanelControls');

hljs.configure({
  languages: [
    'xml', 'bash', 'clojure', 'coffeescript', 'cpp', 'cs', 'markdown', 'dart', 'django', 'dockerfile', 'elixir', 'elm', 'ruby', 'erlang', 'fsharp', 'go', 'groovy', 'haml', 'handlebars',
    'haskell', 'java', 'javascript', 'json', 'julia', 'less', 'lisp', 'lua', 'makefile', 'perl', 'objectivec', 'ocaml', 'php', 'processing', 'prolog', 'python', 'r', 'rust', 'scala', 'scheme',
    'scss', 'sql', 'swift', 'typescript', 'vim', 'yaml'
  ]
});

const PreviewMode = React.createClass({
  propTypes: {
    activeSnippet: React.PropTypes.object,
    setMode:       React.PropTypes.func.isRequired,
    deleteSnippet: React.PropTypes.func,
    syntax:        React.PropTypes.bool
  },

  render() {
    let activeSnippet = this.props.activeSnippet;
    let text          = null;
    let language      = '';
    let syntax        = this.props.syntax;


        if (activeSnippet) {
          text     = activeSnippet.text;
          language = ' ' + hljs.highlightAuto(activeSnippet.text).language;
        }


    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="preview-snippet-mode">
            <pre className={"snippet-text copy-text" + language}  ref={
              code => {
                if (syntax){
                  if (code) hljs.highlightBlock(code);                }
                else if(!syntax) {
                  return null;
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
