/************************************
Displays the database of 
snippets in a scrollable list.
*************************************/

const React = require('react');
const Data  = require('../data');

/* Below I managed to Pull data from the JSON object and stuffs it in Arrays.

How can I access the data now stored in the arrays if everything
has to be within the Data.readFile function to keep it async?
Should this be set up in the `getInitialState()` property of the component?

If we can pull the data out and have access to it in the component render(), then we can map over the arrays and assign it to <li>'s.
*/


Data.readFile(snippets => {
  let snippetTitle = [];
  let snippetText = [];

  snippets.forEach(snippet => {
    snippetTitle.push(snippet.title);
    snippetText.push(snippet.text);
  });

  console.log(snippetTitle);
  console.log(snippetText);
});


class SnippetList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SnippetList';
    }

    render() {
        return <div>{this.displayName}</div>;
    }
}


module.exports = SnippetList;





