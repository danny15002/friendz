var WallActivity = React.createClass( {
  getInitialState: function () {
    return {messages: []}
  },
  componentDidMount: function () {
    MessageStore.addChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.addChangeListener(FriendzConstants.WALL_POST_CREATED, this.ifWallPostsChange); // TODO: combine created and liked listeners into 1
    MessageStore.addChangeListener(FriendzConstants.WALL_POST_LIKE, this.ifWallPostsChange);
    MessageStore.addChangeListener(FriendzConstants.NEED_COMMENTS_ON_OUTER, this.ifCommentsChange);

    var id;
    if (this.props.userId !== undefined) {
      id = parseInt(this.props.userId);
    } else {
      id = LoginStore.user().id
    }
    ApiUtil.request({url: "api/messages/" + id, data: {public: true}, constant: FriendzConstants.MESSAGES_RECEIVED});

  },
  componentWillUnmount: function () {
    MessageStore.removeChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.removeChangeListener(FriendzConstants.WALL_POST_CREATED, this.ifWallPostsChange);
    MessageStore.removeChangeListener(FriendzConstants.WALL_POST_LIKE, this.ifWallPostsChange);
    MessageStore.removeChangeListener(FriendzConstants.NEED_COMMENTS_ON_OUTER, this.ifCommentsChange);
  },
  componentWillReceiveProps: function (nextProps) {
    var id = LoginStore.user().id
    if (nextProps.userId !== undefined) {
      id = parseInt(nextProps.userId);
    }
    ApiUtil.request({url: "api/messages/" + id, data: {public: true}, constant: FriendzConstants.MESSAGES_RECEIVED});

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
    var id;
    if (this.props.userId !== undefined) {
      id = parseInt(this.props.userId);
    } else {
      id = LoginStore.user().id
    }
    return (
      <div className="friend-activity">
        <MainCommentList messages={this.state.messages} wall={true} profileId={id}/>
      </div>
    )
  }
});
