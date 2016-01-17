const React = require('react');

const SnippetStore = require('../stores/SnippetStore');

function getStateFromStores() {
  return {
    snippets: SnippetStore.getSnippets()
  };
}

const TestApp = React.createClass({
  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    SnippetStore.addChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  render() {
    let snippets = this.state.snippets.map(snippet => {
      return <li key={snippet.id}>{snippet.text}</li>;
    });

    return (
      <ol>
        {snippets}
      </ol>
    );
  }
});

module.exports = TestApp;
