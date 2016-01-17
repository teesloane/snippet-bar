const React = require('react');


const SearchBar = React.createClass({
  propTypes: {
    filterSnippets: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      showClearButton: false,
      KEY: {
        esc: 27
      }
    };
  },

  toggleClearButton(event) {
    this.state.showClearButton = event.target.value.length > 0;

    this.props.filterSnippets(event);
  },

  clearSearchBar() {
    this.refs.search.value     = '';
    this.state.showClearButton = false;

    this.props.filterSnippets();
  },

  onKeyDown(event) {
    let keyPressed = event.which;

    if (keyPressed === this.state.KEY.esc) this.clearSearchBar();
  },

  render() {
    let clearButton = null;

    if (this.state.showClearButton) {
      clearButton = (
        <button className="search-bar-clear-button" onClick={this.clearSearchBar}>
          <i className="fa fa-times-circle"></i>
        </button>
      );
    }

    return (
      <div className="search-bar">
        <input
          type="text"
          ref="search"
          className="search-bar-field"
          placeholder="Search..."
          onChange={this.toggleClearButton}
          onKeyDown={this.onKeyDown} />

        {clearButton}
      </div>
    );
  }
});

module.exports = SearchBar;
