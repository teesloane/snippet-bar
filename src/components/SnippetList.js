/************************************
Displays the database of 
snippets in a scrollable list.
*************************************/

const React = require('react');
const Data  = require('../data');


class SnippetList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SnippetList';
    }
    render() {
        return <div>I am the Snippet List</div>;
    }
}


module.exports = SnippetList;





