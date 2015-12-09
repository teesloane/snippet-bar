/************************************
Search box housed in the SearchList
*************************************/

const React = require('react');

const Search = React.createClass({
  render() {
    return(
      <div className="search-bar">

        <input 
          type="text" 
          placeholder="Search..." 
          onChange={this.props.filter}
        />
      </div>


    );
  }
});

module.exports = Search;