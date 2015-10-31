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

    // var constant = FriendzConstants.WALL_POST_CREATED; // TODO: WALL POST COMMENTED ON IN THIS CASE, NEED MORE GENERAL CONSTANT NAME

    if (this.props.commentableType === "Comment") {
      constant = FriendzConstants.INNER_POST_CREATED_OR_CHANGED;
    }

    ApiUtil.request({url: "api/comments",
                    method: 'POST',
                    data: {comment: comment},
                    constant: constant})
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
