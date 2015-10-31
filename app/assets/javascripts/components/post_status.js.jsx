var PostStatusForm = React.createClass ({
  getInitialState: function () {
    return {value: undefined}
  },

  handleChange: function(event) {
    // TODO handle at back end, reject empty string.
    this.setState({value: event.target.value});
  },
  submitForm: function() {

    var from_id = LoginStore.user().id
    var to_id = from_id;
    if (this.props.userId) {
      to_id = this.props.userId;
    }
    var message = {to_id: to_id,
                 from_id: from_id,
                 body: this.state.value,
                 public: true};
    ApiUtil.createMessage(message, FriendzConstants.WALL_POST_CREATED);
    // console.log(message);
    this.setState({value: ""})
  },

  render: function () {
    var value = this.state.value

    return (
      <div className={this.props.className + " status-form"}>
        <textarea
          onChange={this.handleChange}
          className={"status-text"}
          placeholder={"Let your friends know what's up."}
          value={value}>
        </textarea>
        <br></br>
        <br></br>
        <button className={"status-button"} onClick={this.submitForm}>Post</button>
      </div>)
  }
})
