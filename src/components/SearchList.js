const React = require('react');

const SearchBar  = require('./SearchBar');
const SearchItem = require('./SearchItem');

const SearchList = React.createClass({
  propTypes: {
    snippets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    setMode:  React.PropTypes.func.isRequired,
    activeSnippet: React.PropTypes.object,
    setActive: React.PropTypes.func
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
    let searchValue = event ? event.target.value.toLowerCase().trim() : null;

    if (!searchValue) {
      this.clearFilter();
      return;
    }

    let filtered = this.state.snippets.filter(snippet => {
      // joined by a character unlikely to be inputted by the user
      let tagsString = snippet.tags.join('|');

      let titleMatch = snippet.title.toLowerCase().indexOf(searchValue) > -1;
      let tagsMatch  = null;
      let textMatch  = null;

      if (!titleMatch) tagsMatch = tagsString.indexOf(searchValue) > -1;
      if (!titleMatch && !tagsMatch) textMatch = snippet.text.toLowerCase().indexOf(searchValue) > -1;

      // order of importance
      return titleMatch || tagsMatch || textMatch;
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
          setActive={this.props.setActive}
          setMode={this.props.setMode}/>
      );
    });

    return (
      <div className="searchlist-container">
        <SearchBar filterSnippets={this.filterSnippets} />

        <div className="list-container">
          <ul className="snippet-ul">{snippets}</ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchList;
