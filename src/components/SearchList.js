/************************************
List Pane is the box that contains:
The Search Component, the List Component
*************************************/

const React = require('react');

const Search = require('./Search.js');
const data       = require('../data');

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
//This was in App.js originall but it seems to be necessary in both.
 componentWillReceiveProps(nextProps) {
    this.setState({
      snippets: nextProps.snippets 
    });
 },
   
  filterSnippets(e) {
    let searchValue       = e.target.value.toLowerCase();
    let searchValueLength = searchValue.length;

    if ( !searchValue ) this.clearFilter();

    let filtered = this.state.snippets.filter((snippet, index) => {
      let fragment = snippet.title.slice(0, searchValueLength).toLowerCase();
      return fragment === searchValue;
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

    let filteredList = this.state.filtered ? this.state.filtered: this.state.snippets;

    let snippets = filteredList.map((snippet, index) => {
      let id = snippet.id;
      let snippets = this.state.snippets;

      return (

        <li 
          className="single-snippet" 
          key={index}
          onClick={this.props.setActive.bind(null, id, snippets)} >

            <div className="single-snippet-content">
              <h2>{snippet.title}</h2>
              <p>{snippet.text}</p>
            </div>


        </li>
      );
    });

    return (

      <div className="searchlist-container">
        <Search filter={this.filterSnippets} />

        <div className="list-container">  
          <ul className="snippet-ul">{snippets}</ul>
        </div>

      </div>  
    );
  }
});

module.exports = SearchList;
