const React = require('react');

const PanelControls = require('./PanelControls');

const EmptyMode = React.createClass({
  render() {
    return(
      <div className="panel-mode">
        <div className="selected-mode">
          <div className="empty-snippet-mode">
            <span className="empty-greeting">Don&#39;t forget to be awesome!</span>
          </div>
        </div>

        <PanelControls mode='empty' />
      </div>
    );
  }
});

module.exports = EmptyMode;
