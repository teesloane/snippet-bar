// TODO: How does <select> pass info in, without submit?

const React  = require('react');
const update = require('react-addons-update');

const LanguageSelect = React.createClass({
  propTypes: {
    languages: React.PropTypes.array,
    syntax:    React.PropTypes.bool
  },

  getInitialState() {
    return {
      language: null
    }
  },

  componentDidMount() {
    this.getSelectedLanguage();
  },

// Gets the selected Language from the <Select> element.
  getSelectedLanguage() {
    let language = document.getElementById('choose-language');
    let chosen = language.value;

    this.setState({
      language: chosen
    }, function() {console.log("The chosen language is: " + this.state.language);} )
  },

  render() {
    let languages = this.props.languages;
    let display = null;

    let languageChoices = languages.map((language, index) => {
      return <option key={index}> {language} </option>;
    });

    /* Show or Hide the Language <Select> Element */
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
      <select
        id="choose-language"
        style={display}
        className="new-languages"
        onChange={this.getSelectedLanguage}>
          {languageChoices}
      </select>
    );
  }

});

module.exports = LanguageSelect;
