const React  = require('react');
const update = require('react-addons-update');

const LanguageSelect = React.createClass({
  propTypes: {
    languages: React.PropTypes.array
  },


  render() {
    let languages = this.props.languages;

    let languageChoices = languages.map((language, index) => {
      return <option key={index}> {language} </option>;
    });


    return(
      <select className="new-languages">
        {languageChoices}
      </select>
    );
  }

});

module.exports = LanguageSelect;
