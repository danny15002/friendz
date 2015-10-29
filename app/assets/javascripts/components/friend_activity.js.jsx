var FriendActivity = React.createClass( {
  getInitialState: function () {
    return {messages: MessageStore.getMessages()};
  },
  componentDidMount: function () {

    MessageStore.addChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.addChangeListener(FriendzConstants.WALL_POST_CREATED, this.ifWallPostsChange);
    MessageStore.addChangeListener(FriendzConstants.WALL_POST_LIKE, this.ifWallPostsChange);
    MessageStore.addChangeListener(FriendzConstants.NEED_COMMENTS_ON_OUTER, this.ifCommentsChange);
    request = {url: "api/messages",
               method: "GET",
               data: {public: true},
               constant: FriendzConstants.MESSAGES_RECEIVED};
    ApiUtil.request(request)
  },
  componentWillUnmount: function () {
    MessageStore.removeChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.removeChangeListener(FriendzConstants.STATUS_POSTED, this.ifWallPostsChange);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_LIKED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_UNLIKED, this.fetchMessages);
  },
  getMessages: function () {
    this.setState({messages: MessageStore.getMessages()});
  },
  ifWallPostsChange: function () {
    this.setState({messages: MessageStore.getMessages()});
  },
  ifCommentsChange: function () {

  }

  render: function () {
    return (
      <div className="friend-activity">
        <MainCommentList messages={this.state.messages} />
      </div>
    )
  }
})
