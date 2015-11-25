const React = require('react');

class HelloWorld extends React.Component {
  // temporary work-around for babel bug
  constructor(props) {
    super(props);
  }

  state = {
    message: 'Hello World'
  }

  render() {
    return <h1>{this.state.message}</h1>;
  }
}

module.exports = HelloWorld;
