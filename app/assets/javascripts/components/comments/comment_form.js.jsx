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
    COMMENT_CONSTANT = FriendzConstants.COMMENT_CREATED + "_ON_" + this.props.message.type + this.props.message.id;
    console.log(COMMENT_CONSTANT)

    ApiUtil.create({url: "api/comments",
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
