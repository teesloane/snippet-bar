const React = require('react');

const SnippetActions = require('../actions/SnippetActions');

const Tags           = require('./Tags');
const PanelControls  = require('./PanelControls');
const LanguageSelect = require('./LanguageSelect');

const AddMode = React.createClass({
  propTypes: {
    showNotification: React.PropTypes.func.isRequired,
    enableTabbing:    React.PropTypes.func.isRequired
  },

  componentDidMount(){
    this.props.enableTabbing();
  },

  createSnippet(event) {
    event.preventDefault();

    let title = this.refs.title.value.trim();
    let tags  = this.refs.tags.state.tags;
    let text  = this.refs.text.value;
    let language = this.refs.languages.state.language;
    let values = {};

    if (title)       values.title = title;
    if (tags.length) values.tags  = tags;
    if (text)        values.text  = text;
    if (language)    values.lang  = language;

    SnippetActions.create(values, () => {
      this.props.showNotification('Snippet Created!');
    });
  },

  render() {
    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <form className="add-snippet-mode" onSubmit={this.createSnippet}>

            <div className="title-and-language">
              <input
                id="new-snippet-title"
                className="add-field"
                type="text"
                ref="title"
                placeholder="Title" />

              <div className="show-hide-languages">
                <LanguageSelect ref="languages"/>
              </div>
            </div>

            <Tags
              max="5"
              ref="tags" />

            <textarea
              id="new-snippet-text"
              className="add-textarea copy-text"
              placeholder="Add a Snippet..."
              ref="text"></textarea>

            <PanelControls
              mode="add"
              showNotification={this.props.showNotification} />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddMode;
