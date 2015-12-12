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
  propTypes: {
    icons: React.PropTypes.object.isRequired
  },

  render() {
    let icons = this.props.icons;

    let icon1 = null;
    let icon2 = null;
    let icon3 = null;
    let icon4 = null;

    if (Object.keys(icons).length) {
      icon1 = icons.icon1;
      icon2 = icons.icon2;
      icon3 = icons.icon3;
      icon4 = icons.icon4;
    }

    console.log(this.props.icons);

    return(

      <div className="panel-controls">

          {icon1}
          {icon2}
          {icon3}
          {icon4}

      </div>
    );
  }
});

module.exports = PanelControls;