var PostStatusFormN = React.createClass ({
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
    // ApiUtil.createMessage(message, FriendzConstants.STATUS_POSTED);
    request = {url: "api/messages",
               method: "POST",
               data: {message: message},
               constant: FriendzConstants.STATUS_POSTED};
    ApiUtil.request(request)
    this.setState({value: ""})
  },

  render: function () {
    var value = this.state.value

    return (
      <div style={{width: "90%"}} className={this.props.className + "status-form status-form-n"}>
        <ProfilePicture source={LoginStore.user().profPic} style={{background: "white",height: "150px", width: "150px"}}/>
        <div style={{float: "left", width: "calc(100% - 150px)"}}>
          <textarea
            style={{height: "114px", width: "100%"}}
            onChange={this.handleChange}
            className={"status-text"}
            placeholder={"Let your friends know what's up."}
            value={value}>
          </textarea>
          <br></br>
          <br></br>
          <button style={{width: "11%", position: "absolute", bottom: "3px", left: "88.6%"}} className={"status-button"} onClick={this.submitForm}>Post</button>
        </div>
      </div>)
  }
})
