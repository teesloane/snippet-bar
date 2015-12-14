const React = require('react');

const SearchItem = React.createClass({
  propTypes: {
    snippet:   React.PropTypes.object.isRequired,
    setActive: React.PropTypes.func.isRequired
  },

  render() {
    let snippet = this.props.snippet;

    return (
      <li className="search-item" onClick={this.props.setActive.bind(null, snippet.id)}>
          <div className="search-item-body">
            <h2 className="search-item-title">
              <a href="javascript:;">{snippet.title}</a>
            </h2>
            
            <p className="search-item-tags">{snippet.tags.join(', ')}</p>
          </div>
      </li>
    );
  }
});

module.exports = SearchItem;
