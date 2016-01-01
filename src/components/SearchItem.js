const React = require('react');

const SearchItem = React.createClass({
  propTypes: {
    snippet:   React.PropTypes.object.isRequired,
    isActive:  React.PropTypes.bool,
    setActive: React.PropTypes.func.isRequired,
    activeMode:   React.PropTypes.string
  },

  render() {
    let snippet = this.props.snippet;
    let activeMode = this.props.activeMode;
    let isActiveClass = '';

/* CHANGED:  does not show selected snippet if in Add Mode. */
    if (activeMode === 'preview' || activeMode === 'edit') {
      isActiveClass = this.props.isActive ? ' is-active' : '';
    }

    return (
      <li className={"search-item" + isActiveClass} onClick={this.props.setActive.bind(null, snippet.id)}>
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
