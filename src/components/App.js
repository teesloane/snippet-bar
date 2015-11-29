/******************
React Parent App
*******************/

const React = require('react');

const mb = require('../mb');

class App extends React.Component {
  // temporary work-around for babel bug
  constructor(props) {
    super(props);
  }

  state = {
    message: 'Hello World'
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <button onClick={mb.quit}>Quit</button> 

      </div>
    );
  }
}

module.exports = App;
