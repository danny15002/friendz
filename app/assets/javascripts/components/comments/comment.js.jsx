var Comment = React.createClass({
  getInitialState: function () {
    this.formText = "Reply"
    this.subText = "(No Replies)"
    if ( this.props.message.comments > 0) {
      this.subText = "View Replies"
    }
    return {formShowing: false, subCommentsShowing: false, subComments: []}
  },
  componentDidMount: function () {
    COMMENT_CONSTANT = FriendzConstants.COMMENT_CREATED + "_ON_" + this.props.message.type + this.props.message.id;
    CommentStore.addChangeListener(FriendzConstants.COMMENTS_RECEIVED, this.setSubComments);
    MessageStore.addChangeListener(COMMENT_CONSTANT, this.fetchSubComments);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchSubComments);

  },
  componentWillUnmount: function () {
    COMMENT_CONSTANT = FriendzConstants.COMMENT_CREATED + "_ON_" + this.props.message.type + this.props.message.id;
    CommentStore.removeChangeListener(FriendzConstants.COMMENTS_RECEIVED, this.setSubComments);
    MessageStore.removeChangeListener(COMMENT_CONSTANT, this.fetchSubComments);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchSubComments);

  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.message.comments === 0) {
      this.subText = "(No Replies)"
    } else {
      this.subText = this.state.subCommentsShowing ? "Hide Replies" : "View Replies"
    }
  },

  setSubComments: function () {
    this.setState({subComments: CommentStore.getComments(this.props.message.id, this.props.message.type)});
  },

  fetchSubComments: function () {

    request={url: 'api/comments',
             method: 'GET',
             data: {commentable_type: this.props.message.type,
                    commentable_id: this.props.message.id},
             constant: FriendzConstants.COMMENTS_RECEIVED};
    ApiUtil.request(request);
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.message.comments.length === 0) {
      this.subText = "(No Replies)"
    }
    if (nextProps.message.comments.length > 0) {
      this.subText = "View Replies"
    }
  },
  subComments: function (comments, key) {
    if (this.props.level === 2) {

      return (
       <SubCommentList
        key={key}
        comments={comments}
        level={this.props.level + 1}
        replyFunction={this.handleReply}
        />
      )
    }
    return <SubCommentList key={key} comments={comments} level={this.props.level + 1} />
  },
  heading: function (message) {
    var heading = (
      <div className={"author"}>
        {message.author}
      </div>
    );

    if (message.recipient && (message.recipient !== message.author)) {
      heading = (
        <div className={"author"}>
          {message.author} <span style={{color: "red"}} className={"glyphicon glyphicon-triangle-right"}></span> {message.recipient}
        </div>
      );
    }

    return heading;
  },
  handleLike: function () {
    var liked = this.props.message.liked;
    if (!liked) {
      request={url: 'api/likes',
               method: 'POST',
               data: {like: {likeable_id: this.props.message.id, likeable_type: this.props.message.type, user_id: LoginStore.user().id}},
               constant: FriendzConstants.COMMENT_CREATED}

    } else {
      var likeId = this.props.message.myLikeId;
      request={url: 'api/likes/' + likeId,
               method: 'DELETE',
               data: {},
               constant: FriendzConstants.COMMENT_CREATED}
    }
    ApiUtil.request(request);

  },


  delete: function () {

    request={url: 'api/' + this.props.message.type.toLowerCase() + 's/' + this.props.message.id,
             method: 'DELETE',
             data: {},
            constant: FriendzConstants.COMMENT_CREATED};
    ApiUtil.request(request);
  },

  handleReply: function () {
    this.setState({formShowing: !this.state.formShowing})
  },

  handleViewReplies: function () {
    if (this.props.message.comments > 0 ) {
      if (!this.state.subCommentsShowing) {
        this.setState({subCommentsShowing: !this.state.subCommentsShowing});
        request={url: 'api/comments',
                 method: 'GET',
                 data: {commentable_type: this.props.message.type,
                        commentable_id: this.props.message.id},
                 constant: FriendzConstants.COMMENTS_RECEIVED};
        ApiUtil.request(request);
        this.subText = "Hide Replies"
      }
      if (this.state.subCommentsShowing) {
        this.setState({subCommentsShowing: !this.state.subCommentsShowing});
        this.subText = "View Replies"
      }
    }
  },

  commentMenu: function () {
    var likeOpt = "Like";
    var likes = "";

    if (this.props.message.liked) {
      likeOpt = " UnLike"
    }

    if (this.props.message.likes === 1) {
      likes = this.props.message.likes + " Like"
    } else if (this.props.message.likes > 1) {
      likes = this.props.message.likes + " Likes"
    }

    if (this.props.level <=2 ) {
      return (
        <div className={"comment-menu"}>
          <div onClick={this.handleLike} style={{paddingRight: "5px"}}>
            <span className={"glyphicon glyphicon-thumbs-up"}></span> {likeOpt}
          </div>
          <div onClick={this.handleReply} style={{paddingRight: "5px"}}>
            <span className={"glyphicon glyphicon-share-alt"}></span> {this.formText}
          </div>
          <div onClick={this.handleViewReplies}>
            {this.subText}
          </div>
          <div style={{float: "right"}}>
            {likes}
          </div>
        </div>
      )
    }

    return (
      <div className={"comment-menu"}>
        <div onClick={this.handleLike} style={{paddingRight: "5px"}}>
          <span className={"glyphicon glyphicon-thumbs-up"}></span> {likeOpt}
        </div>
        <div onClick={this.props.replyFunction} style={{paddingRight: "5px"}}>
          {this.formText}
        </div>
        <div style={{float: "right"}}>
          {likes}
        </div>
      </div>
    )


  },

  canDelete: function () {
    if (this.props.message.author === LoginStore.user().username)  {
      return (
        <div onClick={this.delete} className={"trashcan"}>
          <span className={"glyphicon glyphicon-trash"}></span>
        </div>
      )
    } else {
      return <div></div>
    }
  },

  render: function () {

    var message = this.props.message;
    var subComments=<div></div>;

    if (this.state.subComments.length > 0 && this.state.subCommentsShowing) {
      subComments = this.subComments(this.state.subComments, message.id);
    }

    var form = <div></div>;
    if (this.props.level <= 2) {
      form = <CommentForm message={message} id={message.id} commentableType={message.type}/>
    }

    var picsize = 120
    if (this.props.level > 1) {
      picsize = 90;
    }

    var trashcanDiv = this.canDelete();

    return (
      <div className={this.props.className + " comment"}>
        <div className="main-comment">
          <ProfilePicture source={message.profPic} style={{height: picsize + "px", width: picsize + "px"}}/>

          <div style={{height: picsize + "px", width: "calc( 100% - " + picsize + "px )"}} className="comment-body">
            <div className={"comment-header"}>
              <div style={{float: "left"}}>{this.heading(message)}</div>
              <div style={{float: "right"}} className={"time"}>{message.createdAt}</div>
            </div>
            <div style={{overflowY: "scroll", paddingTop: "5px", height: (picsize - 40) + "px"}}>
              {message.body}
            </div>

            <br></br>

            {this.commentMenu()}
          </div>
          {trashcanDiv}
        </div>
        <div style={{display: this.state.subCommentsShowing ? "" : "none"}}>
          {subComments}
        </div>
        <div style={{display: this.state.formShowing ? "" : "none"}}>
          {form}
        </div>
      </div>
    )
  }
});

//
//
