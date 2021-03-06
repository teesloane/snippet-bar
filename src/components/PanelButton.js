const React = require('react');

const PanelButton = React.createClass({
  propTypes: {
    kind:  React.PropTypes.string.isRequired,
    type:  React.PropTypes.string,
    click: React.PropTypes.func
  },

  getInitialState() {
    return {
      defaultKind: 'standard',
      kinds: {
        copy: {
          text: 'copy',
          icon: 'fa fa-clone fa-2x',
          title: 'Copy Snippet'
        },
        edit: {
          text: 'edit',
          icon: 'fa fa-pencil fa-2x',
          title: 'Edit Snippet'
        },
        update: {
          text: 'update',
          icon: 'fa fa-floppy-o fa-2x',
          title: 'Update Snippet'
        },
        save: {
          text: 'save',
          icon: 'fa fa-floppy-o fa-2x',
          title: 'Edit Snippet'
        },
        add: {
          text: 'new',
          icon: 'fa fa-plus fa-2x',
          title: 'New Snippet'
        },
        del: {
          text: 'delete',
          icon: 'fa fa-trash fa-2x',
          title: 'Delete Snippet'
        }
      }
    };
  },

  getKind() {
    let kindProp = this.props.kind;

    if(kindProp in this.state.kinds) {
      return kindProp;
    }

    return this.state.defaultKind;
  },

  click(event) {
    if (!this.props.type) {
      event.stopPropagation();
    }

    if (this.props.click) {
      this.props.click(event);
    }
  },

  render() {
    let kind          = this.getKind();
    let text          = 'standard';
    let icon          = 'standard-icon';
    let title         = '';
    let type          = this.props.type === 'submit' ? 'submit' : 'button';
    let dataClipboard = {};

    if (kind !== this.state.defaultKind) {
      let kindObj = this.state.kinds[kind];

      text  = kindObj.text;
      icon  = kindObj.icon;
      title = kindObj.title;

      if (kind === 'copy') {
        dataClipboard['data-clipboard-action'] = 'copy';
        dataClipboard['data-clipboard-target'] = '.copy-text';
      }
    }

    return (
      <button
        {...dataClipboard}
        type={type}
        className={kind + "-btn"}
        title={title}
        onClick={this.click}>
        <i className={icon}></i>
        <span className="button-text">{text}</span>
      </button>
    );
  }

});

module.exports = PanelButton;
