/************************************
Adds buttons to the bottom of panel:
buttons change mode / etc
*************************************/
/*
 Add Buttons
 Add Classes


/ for later button bind shit:
onClick={this.props.setMode.bind(null, 'edit')}
onClick={this.props.setMode.bind(null, 'add')}e
 
*/



var PanelControls = React.createClass({
  

  render() {

    let icons = this.props.icons;

    return(

      <div className="panel-controls">

          {icons.icon1}
          {icons.icon2}
          {icons.icon3}
          {icons.icon4}

      </div>
    );
  }
});

module.exports = PanelControls;