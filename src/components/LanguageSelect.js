const React  = require('react');
const update = require('react-addons-update');

const LanguageSelect = React.createClass({
  propTypes: {
    languages: React.PropTypes.array,
    syntax:    React.PropTypes.bool,
    editLang:  React.PropTypes.string
  },

  getInitialState() {
    return {
      language: null
    }
  },

  componentDidMount() {
    this.getSelectedLanguage();
    this.setLang(this.props.editLang);
    console.log (this.setLang);
  },

//copying setTags(tags) to try and make lang load saved selection in edit mode.
  setLang(lang) {
    if (lang && lang.length) this.setState({ language: lang });
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
    console.log(languages);
    let display = null;

    let languageChoices = languages.map((language, index) => {
      // sets the  "selected" lang in the <select> element when editing
       if (language === this.props.editLang) {
        return <option selected="selected" key={index}> {language} </option>;
      }

      else {
        return <option key={index}> {language} </option>;
      }
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
        default={this.props.editLang}
        style={display}
        className="new-languages"
        onChange={this.getSelectedLanguage}>
          {languageChoices}
      </select>
    );
  }
});

module.exports = LanguageSelect;
