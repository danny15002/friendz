var Comment = React.createClass({
  getInitialState: function () {
    this.formText = "Reply"
    this.subText = "(No Replies)"
    if ( parseInt(this.props.message.comments) > 0) {
      this.subText = "View Replies"
    }
    return {formShowing: false, subCommentsShowing: false}
  },
  componentWillReceiveProps: function (nextProps) {

    if (parseInt(nextProps.message.comments) === 0) {
      this.subText = "(No Replies)"
    } else {
      this.subText = this.state.subCommentsShowing ? "Hide Replies" : "View Replies"
    }
  },
  componentWillUpdate: function (nextProps, nextState) {
    // if (parseInt(nextProps.message.comments) === 0) {
    //   this.subText = "(No Replies)"
    // } else {
    //   this.subText = nextState.subCommentsShowing ? "Hide Replies" : "View Replies"
    // }
  },

  setSubComments: function () {
    this.setState({subComments: CommentStore.getComments(this.props.message.id, this.props.message.type)});
  },
  subComments: function (comments, key) {
    if (this.props.level === 2) {

      return (
       <SubCommentList
        key={key}
        level={this.props.level + 1}
        replyFunction={this.handleReply}
        type={this.props.message.type}
        c_id={this.props.message.id}
        wall={this.props.wall}
        profileId={this.props.profileId}
        />
      )
    }
    return (
      <SubCommentList
        key={key}
        level={this.props.level + 1}
        type={this.props.message.type}
        c_id={this.props.message.id}
        wall={this.props.wall}
        profileId={this.props.profileId}
        />
    )
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
    var liked = this.props.message.liked === 't';
    var constant = FriendzConstants.INNER_POST_CREATED_OR_CHANGED; // TODO: expects comments in the response
    if (this.props.message.type === "Message") {
      constant = FriendzConstants.WALL_POST_LIKE;
    }

    if (!liked) {
      var like = {
        likeable_id: this.props.message.id,
        likeable_type: this.props.message.type,
        user_id: LoginStore.user().id}

      request={url: 'api/likes',
               method: 'POST',
               data: {like: like, wall: this.props.wall, profile_id: this.props.profileId},
               constant: constant}

    } else {
      var likeId = this.props.message.myLikeId;
      request={url: 'api/likes/' + likeId,
               method: 'DELETE',
               data: {wall: this.props.wall, profile_id: this.props.profileId},
               constant: constant}
    }
    ApiUtil.request(request);

  },

  delete: function () {

    var constant = FriendzConstants.INNER_POST_CREATED_OR_CHANGED;
    if (this.props.message.type === "Message") {
      constant = FriendzConstants.WALL_POST_CREATED;
    }
    request={url: 'api/' + this.props.message.type.toLowerCase() + 's/' + this.props.message.id,
             method: 'DELETE',
             data: {wall: this.props.wall, profile_id: this.props.profileId},
            constant: constant};
    ApiUtil.request(request);
  },

  handleReply: function () {
    this.setState({formShowing: !this.state.formShowing})
  },

  clickViewReplies: function () {
    if (parseInt(this.props.message.comments) > 0 ) {
      if (!this.state.subCommentsShowing) {
        this.setState({subCommentsShowing: !this.state.subCommentsShowing});
        this.subText = "Hide Replies"
      } else if (this.state.subCommentsShowing) {
        this.setState({subCommentsShowing: !this.state.subCommentsShowing});
        this.subText = "View Replies"
      }
    }
  },

  commentMenu: function () {
    var likeOpt = "Like";
    var likes = "";

    if (this.props.message.liked === 't') {
      likeOpt = " UnLike"
    }

    if (parseInt(this.props.message.likes) === 1) {
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
          <div onClick={this.clickViewReplies}>
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
    var subComments = <div></div>
    // NOTE: With this logic the children of this comment need to be brought back
    //       every time this comment's children change
    if (this.state.subCommentsShowing) {
      var subComments = this.subComments(this.state.subComments, message.id);
    }


    var form = <div></div>;
    if (this.props.level <= 2) {
      form = <CommentForm
              message={message}
              id={message.id}
              commentableType={message.type}
              wall={this.props.wall}
              profileId={this.props.profileId}/>
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
              <div style={{float: "right"}} className={"time"}>{TimeToWords(message.createdAt)}</div>
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
