var CommentForm = React.createClass({
  getInitialState: function () {
    return {value: ""};
  },
  handleChange: function (event) {
    this.setState({value: event.target.value})
  },
  submitForm: function () {
    var comment = {
      body: this.state.value,
      commentable_id: this.props.id,
      commentable_type: this.props.commentableType,
      user_id: LoginStore.user().id
    };

    ApiUtil.request({url: "api/comments",
                    method: 'POST',
                    data: {comment: comment},
                    constant: FriendzConstants.COMMENT_CREATED})
    this.setState({value: ""})
  },
  render: function () {
    return(
      <div>
        <div >
          <textarea style={{width: "100%"}} placeholder={"Leave a comment."} onChange={this.handleChange} value={this.state.value}/>
          <button className={"comment-button"} onClick={this.submitForm}>Submit</button>
        </div>
      </div>
    )
  }
});
