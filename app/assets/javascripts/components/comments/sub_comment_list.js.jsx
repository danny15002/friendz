var SubCommentList = React.createClass({
    // TODO: move comment created listeners from comment to here
  getInitialState: function () {
    return {comments: []}
  },
  componentDidMount: function () {
    CommentStore.addChangeListener(
      FriendzConstants.COMMENTS_RECEIVED, this.fetchCommentList);
    CommentStore.addChangeListener(
      FriendzConstants.INNER_POST_CREATED_OR_CHANGED, this.ifInnerPostsChange);
    // CommentStore.addChangeListener(
    //     FriendzConstants.UPDATE_SUBCOMMENTS
    //   )
  },
  componentWillUnmount: function () {
    CommentStore.removeChangeListener(
      FriendzConstants.COMMENTS_RECEIVED, this.fetchCommentList);
    CommentStore.removeChangeListener(
      FriendzConstants.INNER_POST_CREATED_OR_CHANGED, this.ifInnerPostsChange);
  },

  fetchCommentList: function () {
    type = this.props.type;
    c_id = parseInt(this.props.c_id);
    this.setState({comments: CommentStore.getComments(c_id, type)});
  },

  ifInnerPostsChange: function () {
    console.log("sub comm callback")
    type = this.props.type;
    c_id = parseInt(this.props.c_id);
    this.setState({comments: CommentStore.getComments(c_id, type)});
  },

  render: function () {
    var replyFunction = "";
    if (this.props.replyFunction) {
      replyFunction = this.props.replyFunction
    }
    return(
      <div className={"comment-list"}>
          <ul>
            {this.state.comments.map(function (comment) {
              return (<li>
                <Comment
                  className={""}
                  key={comment.id}
                  message={comment}
                  level={this.props.level}
                  replyFunction={replyFunction}
                  />
              </li>)
            }.bind(this))}
          </ul>
      </div>
    )
  }
})
