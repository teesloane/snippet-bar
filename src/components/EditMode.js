const React = require('react');

const SnippetActions = require('../actions/SnippetActions');
const SnippetStore   = require('../stores/SnippetStore');

const Tags           = require('./Tags');
const PanelControls  = require('./PanelControls');
const LanguageSelect = require('./LanguageSelect');

const EditMode = React.createClass({
  propTypes: {
    showNotification: React.PropTypes.func.isRequired,
    enableTabbing:    React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      activeSnippet: SnippetStore.getActiveSnippet()
    };
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        activeSnippet: SnippetStore.getActiveSnippet()
      });
    }
  },

  componentDidMount() {
    this.props.enableTabbing();

    SnippetStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SnippetStore.removeChangeListener(this._onChange);
  },

  updateSnippet(event) {
    event.preventDefault();

    let title = this.refs.title.value.trim();
    let tags  = this.refs.tags.state.tags;
    let text  = this.refs.text.value;
    let language = this.refs.languages.state.language

    let values = {};

    if (title)       values.title = title;
    if (tags.length) values.tags  = tags;
    if (text)        values.text  = text;
    if (language)    values.lang  = language;

    SnippetActions.update(values, () => {
      this.props.showNotification('Snippet Updated!');
    });
  },

  render() {
    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <form className="add-snippet-mode" onSubmit={this.updateSnippet}>

          <div className="title-and-language">
            <input
              id="new-snippet-title"
              className="add-field"
              defaultValue={this.state.activeSnippet.title}
              type="text"
              ref="title"
              placeholder="Title" />

            <div className="show-hide-languages">
              <LanguageSelect ref="languages" />
            </div>
          </div>

            <Tags
              max="5"
              ref="tags"
              tags={this.state.activeSnippet.tags} />

            <textarea
              id="new-snippet-text"
              className="add-textarea copy-text"
              placeholder="Add a Snippet..."
              defaultValue={this.state.activeSnippet.text}
              ref="text"></textarea>

            <PanelControls
              mode="edit"
              showNotification={this.props.showNotification} />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = EditMode;
