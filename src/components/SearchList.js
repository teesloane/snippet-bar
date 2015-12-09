/************************************
List Pane is the box that contains:
The Search Component, the List Component
*************************************/

const React = require('react');

const Search = require('./Search.js')

const SearchList = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },

  render() {
    let items = this.props.items.map((item, index) => {
      return (

        <li key={index}>{item.title}</li>
      );
    });

    return (
      <div className="list-container">
        <Search />
        <ul>{items}</ul>
      </div>
    );
  }
});

module.exports = SearchList;
