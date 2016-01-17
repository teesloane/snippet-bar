const React = require('react');
const hljs  = require('highlight.js');

const SnippetStore  = require('../stores/SnippetStore');
const SettingsStore = require('../stores/SettingsStore');

const PanelControls = require('./PanelControls');

const PreviewMode = React.createClass({
  propTypes: {
    showNotification: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      activeSnippet: SnippetStore.getActiveSnippet(),
      languages:     SettingsStore.getLanguages(),
      syntax:        SettingsStore.getSyntax()
    };
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        activeSnippet: SnippetStore.getActiveSnippet(),
        languages:     SettingsStore.getLanguages(),
        syntax:        SettingsStore.getSyntax()
      });
    }
  },

  componentDidMount() {
    SnippetStore.addChangeListener(this._onChange);
    SettingsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SnippetStore.removeChangeListener(this._onChange);
    SettingsStore.removeChangeListener(this._onChange);
  },

  render() {
    let activeSnippet = this.state.activeSnippet;
    let syntax        = this.state.syntax;
    let text          = null;
    let language      = '';

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
            showNotification={this.props.showNotification} />
        </div>
      </div>
    );
  }
});

module.exports = PreviewMode;
