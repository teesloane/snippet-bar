// TODO: Enable Tabbing in TextArea

const React = require('react');

const Tags           = require('./Tags');
const PanelControls  = require('./PanelControls');
const LanguageSelect = require('./LanguageSelect');

const AddMode = React.createClass({
  propTypes: {
    setMode:     React.PropTypes.func.isRequired,
    saveSnippet: React.PropTypes.func,
    languages:   React.PropTypes.array
  },

  createSnippet(event) {
    event.preventDefault();

    let title = this.refs.title.value.trim();
    let tags  = this.refs.tags.state.tags;
    let text  = this.refs.text.value;

    let values = {};

    if (title)       values.title = title;
    if (tags.length) values.tags  = tags;
    if (text)        values.text  = text;

    this.props.saveSnippet(values);
  },

  render() {
    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <form className="add-snippet-mode" onSubmit={this.createSnippet}>

            <div className="title-and-language">
              <input id="new-snippet-title" className="add-field" type="text" ref="title" placeholder="Title" />

              <LanguageSelect languages={this.props.languages} />

            </div>

            <Tags max="5" ref="tags" />

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
