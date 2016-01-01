// TODO: Enable Tabbing in TextArea
// TODO: Bring Language into Create Snippet (and pass to )

const React = require('react');

const Tags           = require('./Tags');
const PanelControls  = require('./PanelControls');
const LanguageSelect = require('./LanguageSelect');

const AddMode = React.createClass({
  propTypes: {
    setMode:     React.PropTypes.func.isRequired,
    saveSnippet: React.PropTypes.func,
    languages:   React.PropTypes.array,
    syntax:      React.PropTypes.bool
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

    console.log ('the passed in language is ' + values.lang)

    this.props.saveSnippet(values);
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

              <div
                className="show-hide-languages">
                <LanguageSelect
                  languages={this.props.languages}
                  syntax={this.props.syntax}
                  ref="languages"/>
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
              setMode={this.props.setMode}
              showNotification={this.props.showNotification} />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddMode;
