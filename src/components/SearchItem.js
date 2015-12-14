const React = require('react');

const SearchItem = React.createClass({
  propTypes: {
    snippet:   React.PropTypes.object.isRequired,
    setActive: React.PropTypes.func.isRequired
  },

  render() {
    let snippet = this.props.snippet;

    return (
      <li className="single-snippet" onClick={this.props.setActive.bind(null, snippet.id)}>
          <div className="single-snippet-content">
            <h2>{snippet.title}</h2>
            <p>{snippet.tags.join(', ')}</p>
          </div>
      </li>
    );
  }
});

module.exports = SearchItem;
