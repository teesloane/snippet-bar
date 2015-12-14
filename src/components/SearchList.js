const React = require('react');

const SearchItem = require('./SearchItem');

const SearchList = React.createClass({
  propTypes: {
    snippets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  getInitialState() {
    return {
      snippets: [],
      filtered: null
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.snippets) {
      this.setState({
        snippets: nextProps.snippets
      });
    }
  },

  filterSnippets(event) {
    let searchValue = event.target.value.toLowerCase().trim();

    if (!searchValue) {
      this.clearFilter();
      return;
    }

    let searchValues = searchValue.split(' ');

    let filtered = this.state.snippets.filter(snippet => {
      let tagsString = snippet.tags.join('|');

      return searchValues.every(value => {
        let titleMatch = snippet.title.toLowerCase().search(value) > -1;
        let tagsMatch  = tagsString.search(value) > -1;

        return titleMatch || tagsMatch;
      });
    });

    this.setState({
      filtered: filtered
    });
  },

  clearFilter() {
    this.setState({
      filtered: null
    });
  },

  render() {
    let filteredList = this.state.filtered ? this.state.filtered : this.state.snippets;

    let snippets = filteredList.map((snippet, index) => {
      return (
        <SearchItem
          key={index}
          snippet={snippet}
          setActive={this.props.setActive} />
      );
    });

    return (
      <div className="searchlist-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-snippets"
            placeholder="Search..."
            onChange={this.filterSnippets} />
        </div>

        <div className="list-container">
          <ul className="snippet-ul">{snippets}</ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchList;
