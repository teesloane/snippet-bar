const React = require('react');

const SnippetActions = require('../actions/SnippetActions');
const SnippetStore   = require('../stores/SnippetStore');
const SettingsStore  = require('../stores/SettingsStore');

const PanelControls = require('./PanelControls');
const PreviewMode = require('./PreviewMode');
const EmptyMode   = require('./EmptyMode');
const AddMode     = require('./AddMode');
const EditMode    = require('./EditMode');

const Panel = React.createClass({
  propTypes: {
    showNotification: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      modes:      SnippetStore.getModes(),
      activeMode: SnippetStore.getActiveMode()
    }
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        modes:      SnippetStore.getModes(),
        activeMode: SnippetStore.getActiveMode()
      });
    }
  },

  componentDidMount() {
    SnippetStore.addChangeListener(this._onChange);
    SettingsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SnippetStore.removeChangeListener(this._onChange);
    SettingsStore.removeChangeListener(this._onChange);
  },

  enableTabbing() {
    document.querySelector("textarea").addEventListener('keydown',function(e) {
    if (e.keyCode === 9) { // tab was pressed
        // get caret position/selection

        var start = this.selectionStart;
        var end = this.selectionEnd;

        var target = e.target;
        var value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
                    + "    "
                    + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 2;

        // prevent the focus lose
        e.preventDefault();
      }
    },false);
  },

  setContent() {
    let modes      = this.state.modes;
    let activeMode = this.state.activeMode;

    switch (activeMode) {
      case modes.edit:
        return <EditMode showNotification={this.props.showNotification} enableTabbing={this.enableTabbing} />;
        break;

      case modes.preview:
        return <PreviewMode showNotification={this.props.showNotification} />;
        break;

      case modes.add:
        return <AddMode showNotification={this.props.showNotification} enableTabbing={this.enableTabbing} />;
        break;

      default:
        return <EmptyMode />
    }
  },

  render() {
    let panelContent = this.setContent();

    return(
      <div className="panel-container">
        {panelContent}
      </div>
    );
  }
});

module.exports = Panel;
