const React = require('react');

const PanelControls = require('./PanelControls');

const AddMode = React.createClass({
  createSnippet(event) {
    event.preventDefault();

    let title = this.refs.title.value.trim();

    let tags = this.refs.tags.value
      .split(',')
      .filter(tag => tag.length)
      .map(tag => tag.trim().toLowerCase());

    let text = this.refs.text.value;

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
            <input id="new-snippet-title" className="" type="text" ref="title" placeholder="Title" />
            <input id="new-snippet-tags" className="" type="tags" ref="tags" placeholder="Tags" />
            <textarea id="new-snippet-text" placeholder="put your snipz here" ref="text"></textarea>
          

            <PanelControls mode="add" createSnippet={this.createSnippet} />
          </form>  
        </div>

        
      </div>
    );
  }
});

module.exports = AddMode;