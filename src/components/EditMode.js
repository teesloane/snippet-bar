const React = require('react');

const Tags          = require('./Tags');
const PanelControls = require('./PanelControls');
const LanguageSelect = require('./LanguageSelect');

const EditMode = React.createClass({
  propTypes: {
    setMode:       React.PropTypes.func.isRequired,
    activeSnippet: React.PropTypes.object,
    updateSnippet: React.PropTypes.func.isRequired,
    languages:   React.PropTypes.array,
    syntax:      React.PropTypes.bool
  },

  updateSnippet(event) {
    event.preventDefault();

    let title = this.refs.title.value.trim();
    let tags  = this.refs.tags.state.tags;
    let text  = this.refs.text.value;
    let language = this.refs.languages.state.language

    if (language === 'none') {
      language = 'nohighlight'
    }

    let values = {};

    if (title)       values.title = title;
    if (tags.length) values.tags  = tags;
    if (text)        values.text  = text;
    if (language)    values.lang  = language;

    this.props.updateSnippet(values);
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
              defaultValue={this.props.activeSnippet.title}
              type="text"
              ref="title"
              placeholder="Title" />

            <div
              className="show-hide-languages">
              <LanguageSelect
                languages={this.props.languages}
                syntax={this.props.syntax}
                editLang={this.props.activeSnippet.lang}
                ref="languages" />
            </div>
          </div>

            <Tags
              max="5"
              ref="tags"
              tags={this.props.activeSnippet.tags} />

            <textarea
              id="new-snippet-text"
              className="add-textarea copy-text"
              placeholder="Add a Snippet..."
              defaultValue={this.props.activeSnippet.text}

              ref="text"></textarea>

            <PanelControls
              mode="edit"
              setMode={this.props.setMode}
              showNotification={this.props.showNotification} />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = EditMode;
