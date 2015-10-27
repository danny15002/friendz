var CommentBackup = React.createClass({
  getInitialState: function () {
    this.formText = "Reply"
    this.subText = "View Replies"
    return {formStyle: "none", subStyle: "none"}
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
               constant: FriendzConstants.COMMENT_LIKED}
    } else {
      var likeId = this.props.message.myLikeId;
      request={url: 'api/likes/' + likeId,
               method: 'DELETE',
               data: {},
               constant: FriendzConstants.COMMENT_UNLIKED}
    }
    ApiUtil.request(request);

  },

  handleReply: function () {
    if (this.state.formStyle === "none") {
      this.setState({formStyle: "" })
    }
    if (this.state.formStyle === "") {
      this.setState({formStyle: "none" })

    }
  },

  handleViewReplies: function () {
    if (this.state.subStyle === "none") {
      this.setState({subStyle:""})
      this.subText = "Hide Replies"
    }
    if (this.state.subStyle === "") {
      this.setState({subStyle: "none"})
      this.subText = "View Replies"
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

  render: function () {
    var message = this.props.message;
    var subComments=<div></div>;
    if (message.comments) {
      if (message.comments.length > 0) {
        subComments = this.subComments(message.comments, message.id);
      }
    }
    var form = <div></div>;
    if (this.props.level <= 2) {
      form = <CommentForm id={message.id} commentableType={message.type}/>
    }

    var picsize = 120
    if (this.props.level > 1) {
      picsize = 90;
    }

    return (
      <div className={this.props.className + " comment"}>
        <div className="main-comment">
          <ProfilePicture source={message.prof_pic} style={{height: picsize + "px", width: picsize + "px"}}/>

          <div style={{height: picsize + "px", width: "calc( 100% - " + picsize + "px )"}} className="comment-body">
            <div className={"comment-header"}>
              <div style={{float: "left"}}>{this.heading(message)}</div>
              <div style={{float: "right"}} className={"time"}>{message.created_at}</div>
            </div>
            <div style={{overflowY: "scroll", paddingTop: "5px", height: (picsize - 40) + "px"}}>
              {message.body}
            </div>
            <br></br>

            {this.commentMenu()}

          </div>
        </div>
        <div style={{display: this.state.subStyle}}>
          {subComments}
        </div>
        <div style={{display: this.state.formStyle}}>
          {form}
        </div>
      </div>
    )
  }
});

//
//
