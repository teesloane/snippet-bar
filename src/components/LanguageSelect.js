const React  = require('react');

const SettingsStore = require('../stores/SettingsStore');

const LanguageSelect = React.createClass({
  propTypes: {
    editLang:  React.PropTypes.string
  },

  getInitialState() {
    return {
      languages: SettingsStore.getLanguages(),
      syntax:    SettingsStore.getSyntax(),
      language:  null
    }
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        languages: SettingsStore.getLanguages(),
        syntax:    SettingsStore.getSyntax()
      });
    }
  },

  componentDidMount() {
    this.getSelectedLanguage();
    this.setLanguage();

    SettingsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SettingsStore.removeChangeListener(this._onChange);
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
    let languages = this.state.languages;
    let display   = null;

    let languageChoices = languages.map((language, index) => {
      return <option key={index} value={language}>{language}</option>;
    });

    /* Show or Hide the Language <Select> Element */
    display = {
      display: (this.state.syntax ? 'flex' : 'none')
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
