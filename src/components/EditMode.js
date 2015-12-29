const React = require('react');

const Tags          = require('./Tags');
const PanelControls = require('./PanelControls');

const EditMode = React.createClass({
  propTypes: {
    setMode: React.PropTypes.func.isRequired,
    activeSnippet: React.PropTypes.object
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
            <input
              id="new-snippet-title"
              className="add-field"
              defaultValue={this.props.activeSnippet.title}
              type="text"
              ref="title"
              placeholder="Title" />

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
              createSnippet={this.createSnippet}
              setMode={this.props.setMode}
              showNotification={this.props.showNotification} />

          </form>
        </div>
      </div>
    );
  }
});

module.exports = EditMode;
