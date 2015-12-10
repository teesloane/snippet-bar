/************************************
Adds buttons to the bottom of panel:
buttons change mode / etc
*************************************/
/*
 Add Buttons
 Add Classes


/ for later button bind shit:
onClick={this.props.setMode.bind(null, 'edit')}
onClick={this.props.setMode.bind(null, 'add')}
 
*/



var PanelControls = React.createClass({
  

  render() {
    return(

      <div className="preview-controls">
          <button id="copy-snippet">
            <i className="fa fa-clone fa-2x"></i>
          </button>

          <button id="edit-snippet" title="edit">
            <i className="fa fa-pencil fa-2x"></i>
          </button>

          <button id="new-snippet"  title="add">
            <i className="fa fa-plus fa-2x"></i>
          </button>

          <button id="settings">
            <i className="fa fa-cog fa-2x"></i>
          </button>
      </div>
    );
  }
});

module.exports = PanelControls;