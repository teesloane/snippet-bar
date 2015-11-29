/************************************
Displays the database of
snippets in a scrollable list.
*************************************/

const React = require('react');

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
      <ul>{items}</ul>
    );
  }
});

module.exports = SearchList;
