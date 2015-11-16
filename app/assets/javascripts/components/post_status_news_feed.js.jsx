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
               constant: FriendzConstants.WALL_POST_CREATED};
    ApiUtil.request(request)
    this.setState({value: ""})
  },

  render: function () {
    var value = this.state.value

    return (
      <div style={{width: "90%"}} className={this.props.className + "status-form status-form-n"}>
        <div className={'post-label'} ><span className={"glyphicon glyphicon-pencil"}></span> Post Status</div>
        <div className={"inner-post-box"}>
          <ProfilePicture source={LoginStore.user().profPic} style={{overflow: "hidden",height: "80px", width: "80px"}}/>
          <div style={{float: "left", width: "calc(100% - 90px)"}}>
            <textarea
              style={{paddingLeft: "10px", paddingTop: "10px", width: "100%"}}
              onChange={this.handleChange}
              className={"status-text"}
              placeholder={"Let your friends know what's up."}
              value={value}>
            </textarea>
          </div>
          <button style={{width: "11%", position: "absolute", bottom: "1px", left: "537px"}} className={"status-button"} onClick={this.submitForm}>Post</button>
        </div>
      </div>)
  }
})

//LoginStore.user().profPic
