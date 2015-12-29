const React  = require('react');
const update = require('react-addons-update');

const Tags = React.createClass({
  propTypes: {
    tags:        React.PropTypes.array,
    max:         React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    maxlength:   React.PropTypes.number,
    placeholder: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      placeholder: 'Add a tag...',
      maxlength:   20
    };
  },

  getInitialState() {
    return {
      tags: [],
      KEY:  {
        backspace: 8,
        tab:       9,
        enter:     13
      },
      // only allow letters, numbers and spaces inbetween words
      INVALID_CHARS: /[^a-zA-Z0-9 ]/g
    };
  },

  componentDidMount() {
    this.setTags(this.props.tags);
  },

  componentWillReceiveProps(nextProps) {
    this.setTags(nextProps.tags);
  },

  setTags(tags) {
    if (tags && tags.length) this.setState({ tags });
  },

  onKeyDown(event) {
    let keyPressed = event.which;

    if (keyPressed === this.state.KEY.enter ||
        (keyPressed === this.state.KEY.tab && event.target.value)) {
      event.preventDefault();
      this.updateTags(event);
    } else if (keyPressed === this.state.KEY.backspace) {
      let tags = this.state.tags;

      if (!event.target.value && tags.length) {
        this.deleteTag(tags[tags.length - 1]);
      }
    }
  },

  clearInvalidChars(event) {
    let value = event.target.value;

    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '');
    } else if (value.length > this.props.maxlength) {
      event.target.value = value.substr(0, this.props.maxlength);
    }
  },

  updateTags(event) {
    if (!this.props.max ||
        this.state.tags.length < parseInt(this.props.max)) {
      let value = event.target.value;

      if (!value) return;

      let tag = value.trim().toLowerCase();

      if (tag && this.state.tags.indexOf(tag) < 0) {
        this.setState({
          tags: update(
            this.state.tags,
            {
              $push: [tag]
            }
          )
        });
      }
    }

    event.target.value = '';
  },

  deleteTag(tag) {
    let index = this.state.tags.indexOf(tag);

    if (index >= 0) {
      this.setState({
        tags: update(
          this.state.tags,
          {
            $splice: [[index, 1]]
          }
        )
      });
    }
  },

  focusInput(event) {
    let children = event.target.children;

    if (children.length) children[children.length - 1].focus();
  },

  render() {
    let tags = this.state.tags.map((tag, index) => {
      return (
        <span className="tag" key={index}>
          <span className="tag-value">{tag}</span>
          <button type="button" className="tag-delete-button" onClick={this.deleteTag.bind(null, tag)}>x</button>
        </span>
      );
    });

    let placeholder = !this.props.max || tags.length < this.props.max ? this.props.placeholder : '';

    return (
      <div className="tags" onClick={this.focusInput}>
        {tags}
        <input type="text" className="tags-input" placeholder={placeholder} onKeyDown={this.onKeyDown} onKeyUp={this.clearInvalidChars} />
      </div>
    );
  }
});

module.exports = Tags;
