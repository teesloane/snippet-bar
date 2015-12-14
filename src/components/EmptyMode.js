const React = require('react');

const PanelControls = require('./PanelControls');

const EmptyMode = React.createClass({
  propTypes: {
    setMode: React.PropTypes.func.isRequired
  },

  render() {
    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="empty-snippet-mode">
           <span className="empty-greeting">"Random Classic Movie Quote Here."</span>
           </div>
       </div>

       <PanelControls mode='empty' setMode={this.props.setMode} />
      </div>
    );
  }
});

module.exports = EmptyMode;