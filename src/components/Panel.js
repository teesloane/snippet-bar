/************************************
Panel with 3 modes:
Empty, Edit, Add
*************************************/

const React = require('react');

const PanelControls = require('./Panel-Controls');
const data = require('../data');

const Panel = React.createClass({

  propTypes: {
    activeMode   :     React.PropTypes.string.isRequired,
    setMode      :     React.PropTypes.func.isRequired,
    modes        :     React.PropTypes.object.isRequired,
    activeSnippet:     React.PropTypes.object.isRequired,
    saveSnippet  :     React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {

      snippets: this.props.snippets,
      icons: {
        add:           

          <button 
            onClick={this.props.setMode.bind(null, 'add')} 
            id="new-snippet"  
            title="New Snippet">
              <i className="fa fa-plus fa-2x"></i>
          </button>,

        edit:           

          <button 
            onClick={this.props.setMode.bind(null, 'edit')}
            id="edit-snippet" title="Edit Snippet">
            <i className="fa fa-pencil fa-2x"></i>
          </button>,

        deleteSnippet:

          <button
            id="delete-snippet"  
            title="delete Snippet">
            <i className="fa fa-trash fa-2x"></i>
          </button>,

        settings:           

          <button title="Settings" id="settings">
            <i className="fa fa-cog fa-2x"></i>
          </button>,

        copy: 

          <button title="Copy Snippet" id="copy-snippet">
            <i className="fa fa-clone fa-2x"></i>
          </button>,

        save:    

          <button 
            onClick={this.newSnippet}
            id="save-snippet"
            title="Save"
            >
            <i className="fa fa-floppy-o fa-2x"></i>
          </button>,

        empty:           

          <button id="empty-snippet">
            <i className="fa fa-times fa-2x"></i>
          </button>,
      }
    }

  },


  setContent() {
    let activeMode = this.props.activeMode;
    let modes      = this.props.modes;

    if (activeMode === modes.empty) {
      return <EmptyMode icons={this.state.icons} />;
    }
    else if (activeMode === modes.edit) {
      return <EditMode icons={this.state.icons} activeSnippet={this.props.activeSnippet} />;
    }
    else if (activeMode === modes.add){
      return <AddMode icons={this.state.icons} saveSnippet={this.props.saveSnippet} />;
    }
  },

  render() {

    let panelContent = this.setContent();

    return(
      <div className="panel-container">
        <div className="panel-mode">{panelContent}</div>
      </div>
    );
  }
});

// Preview Pane Modes

const EmptyMode = React.createClass({

  getInitialState() {

    let icon = this.props.icons;

    return {
      icons: {
        icon1: icon.empty,
        icon2: icon.empty,
        icon3: icon.add,
        icon4: icon.settings
      }
    }
  },

  render() {
    let icons = this.state.icons;

    return(

      <div className="panel-mode">
        <div className="selected-mode">
          <div className="empty-snippet-mode">
           <span>"What's up? You should make a snippet or something!"</span>
           </div>
       </div>

       <PanelControls icons={icons} />

      </div>


    );
  }
});

const EditMode = React.createClass({

  getInitialState() {

    let icon = this.props.icons;

    return {
      icons: {
        icon1: icon.copy,
        icon2: icon.deleteSnippet,
        icon3: icon.add,
        icon4: icon.settings
      }
    }
  },

  render() {

    let icons = this.state.icons;
    let activeSnippet = this.props.activeSnippet;
    console.log(activeSnippet);
    let text = null;

    if ( activeSnippet ) {
      text = activeSnippet.text
    }

    return(

      <div className="panel-mode">

        <div className="selected-mode">
          <div className="edit-snippet-mode">
            <textarea value={text}></textarea>
          </div>
       </div>

       <PanelControls icons={icons} />

      </div>
    );
  }
});


const AddMode = React.createClass({

  propTypes: {
    saveSnippet: React.PropTypes.func.isRequired
  },

  getInitialState() {

    let icon = this.props.icons;

    return {
      icons: {
        icon1: icon.copy,
        icon2: icon.save,
        icon3: icon.add,
        icon4: icon.settings
      }
    }
  },

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
    let icons = this.state.icons;

    return(

      <div className="panel-mode">

        <div className="selected-mode">

          <form className="add-snippet-mode" onSubmit={this.createSnippet}>
          <input id="new-snippet-title" className="" type="text" ref="title" placeholder="Title" />
          <input id="new-snippet-tags" className="" type="tags" ref="tags" placeholder="Tags" />
          <textarea id="new-snippet-text" placeholder="put your snipz here" ref="text"></textarea>
          
          <button type="submit">save</button>
          </form>  
        </div>

        <PanelControls icons={icons} />

      </div>
    );
  }
});

module.exports = Panel;