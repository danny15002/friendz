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
    request={url: 'api/comments',
             method: 'GET',
             data: {commentable_type: this.props.type,
                    commentable_id: this.props.c_id},
             constant: FriendzConstants.COMMENTS_RECEIVED};
    ApiUtil.request(request);
  },
  componentWillReceiveProps: function (nextProps) {

    if (nextProps.type !== this.props.type ||
        nextProps.c_id != this.props.c_id) {
      request={url: 'api/comments',
               method: 'GET',
               data: {commentable_type: nextProps.type,
                      commentable_id: nextProps.c_id},
               constant: FriendzConstants.COMMENTS_RECEIVED};
      ApiUtil.request(request);
    }
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
                  wall={this.props.wall}
                  profileId={this.props.profileId}
                  />
              </li>)
            }.bind(this))}
          </ul>
      </div>
    )
  }
})
