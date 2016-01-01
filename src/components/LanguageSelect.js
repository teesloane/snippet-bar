const React  = require('react');
const update = require('react-addons-update');

const LanguageSelect = React.createClass({
  propTypes: {
    languages: React.PropTypes.array,
    syntax:    React.PropTypes.bool
  },

  render() {
    let languages = this.props.languages;
    let display = null;

    let languageChoices = languages.map((language, index) => {
      return <option key={index}> {language} </option>;
    });

    /* Show / Hide <select>language</select> based on whether or not syntax highlighting is on */

    if (this.props.syntax) {
      display = {
        display: 'flex'
      }
    }

    else if (!this.props.syntax) {
      display = {
        display: 'none'
      }
    }

    return(
      <select style={display} className="new-languages">
        {languageChoices}
      </select>
    );
  }

});

module.exports = LanguageSelect;
