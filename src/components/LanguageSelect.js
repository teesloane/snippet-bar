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
    this.setLanguage();
  },

//copying setTags(tags) to try and make lang load saved selection in edit mode.
  setLanguage() {
    let language = this.props.editLang;

    if (language && language.length) this.setState({ language });
  },

// Gets the selected Language from the <Select> element.
  getSelectedLanguage() {
    let language = this.refs.chooseLanguage.value;

    this.setState({ language });
  },

  render() {
    let languages = this.props.languages;
    let display = null;

    let languageChoices = languages.map((language, index) => {
      return <option key={index} value={language}>{language}</option>;
    });

    /* Show or Hide the Language <Select> Element */
    display = {
      display: (this.props.syntax ? 'flex' : 'none')
    }

    return(
      <select
        id="choose-language"
        ref="chooseLanguage"
        style={display}
        className="new-languages"
        onChange={this.getSelectedLanguage}
        defaultValue={this.props.editLang}>
        {languageChoices}
      </select>
    );
  }
});

module.exports = LanguageSelect;
