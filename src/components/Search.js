/************************************
Search box housed in the SearchList
*************************************/

const React = require('react');

const Search = React.createClass({

  propTypes: {
    filter: React.PropTypes.func.isRequired
  },

  render() {
    return(
      <div className="search-bar">

        <input 
          className="search-snippets"
          type="text" 
          placeholder="Search..." 
          onChange={this.props.filter}
        />
      </div>


    );
  }
});

module.exports = Search;