const React = require('react');

const Button = React.createClass({

  propTypes: {
    kind: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    onClick: React.PropTypes.func

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

          save: {
            text: 'save',
            icon: 'fa fa-floppy-o fa-2x', //<
            title: 'Edit Snippet'
          },

          add: {
            text: 'add',
            icon: 'fa fa-plus fa-2x', //<
            title: 'Edit Snippet'
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

    return this.state.defaultKind; // < return a standard button if something is missing?
  },

  click(event) {
    if (!this.props.type) {
      event.stopPropagation(); // ?
    }

    if (this.props.onClick) {
      this.props.onClick.call(null, event); // ?
    }
  },


  render() {

    let kind = this.getKind();
    let text = 'standard';
    let icon = 'standard-icon';
    let title = '';
    let type = this.props.type === 'submit' ? 'submit' : 'button';

    if (kind !== this.state.defaultKind) {

      // not sure what this if statement is for...

      let kindObj = this.state.kinds[kind];

      text = kindObj.text;
      icon = kindObj.icon;
      title = kindObj.title;

    }

    return (

      <button 
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

module.exports = Button;

