var FriendActivity = React.createClass( {
  getInitialState: function () {
    return {messages: MessageStore.getMessages()};
  },
  componentDidMount: function () {

    MessageStore.addChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.addChangeListener(FriendzConstants.WALL_POST_CREATED, this.ifWallPostsChange); // TODO: combine created and liked listeners into 1
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
    MessageStore.removeChangeListener(FriendzConstants.WALL_POST_CREATED, this.ifWallPostsChange);
    MessageStore.removeChangeListener(FriendzConstants.WALL_POST_LIKE, this.ifWallPostsChange);
    MessageStore.removeChangeListener(FriendzConstants.NEED_COMMENTS_ON_OUTER, this.ifCommentsChange);
  },
  getMessages: function () {
    this.setState({messages: MessageStore.getMessages()});
  },
  ifWallPostsChange: function () {
    this.setState({messages: MessageStore.getMessages()});
  },
  ifCommentsChange: function () {

  },

  render: function () {
    return (
      <div className="friend-activity">
        <MainCommentList messages={this.state.messages} />
      </div>
    )
  }
})
