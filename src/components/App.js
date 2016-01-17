const React = require('react');

const SearchList = require('./SearchList');
const Panel      = require('./Panel');

const App = React.createClass({
  showNotification(message) {
    let overlay      = this.refs.overlay;
    let notification = this.refs.notification;

    overlay.style.zIndex      = 10;
    notification.style.zIndex = 11;

    notification.textContent = message;

    setTimeout(() => {
      overlay.style.zIndex      = -1;
      notification.style.zIndex = -2;
    }, 1000);
  },

  render() {
    return (
      <div className="container">
        <div id="overlay" ref="overlay"></div>
        <div id="notification" ref="notification"></div>

        <SearchList />
        <Panel showNotification={this.showNotification} />
      </div>
    );
  }
});

module.exports = App;
