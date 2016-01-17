const React = require('react');

const SnippetActions = require('../actions/SnippetActions');


const SearchItem = React.createClass({
  propTypes: {
    snippet:  React.PropTypes.object.isRequired,
    isActive: React.PropTypes.bool
  },

  render() {
    let snippet       = this.props.snippet;
    let isActiveClass = this.props.isActive ? ' is-active' : '';

    return (
      <li className={"search-item" + isActiveClass} onClick={SnippetActions.setActive.bind(null, snippet.id)}>
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
