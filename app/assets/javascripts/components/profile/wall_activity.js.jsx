var WallActivity = React.createClass( {
  getInitialState: function () {
    return {messages: []}
  },
  componentDidMount: function () {
    MessageStore.addChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchMessages);
    MessageStore.addChangeListener(FriendzConstants.STATUS_POSTED, this.fetchMessages);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_LIKED, this.fetchMessages);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_UNLIKED, this.fetchMessages);

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
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.STATUS_POSTED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_LIKED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_UNLIKED, this.fetchMessages);

  },
  componentWillReceiveProps: function (nextProps) {
    var id = LoginStore.user().id
    if (nextProps.userId !== undefined) {
      id = parseInt(nextProps.userId);
    }
    ApiUtil.request({url: "api/messages/" + id, data: {public: true}, constant: FriendzConstants.MESSAGES_RECEIVED});

  },
  getMessages: function () {
    console.log("get messages")
    this.setState({messages: MessageStore.getMessages()})
  },
  fetchMessages: function () {
    var id;
    if (this.props.userId !== undefined) {
      id = parseInt(this.props.userId);
    } else {
      id = LoginStore.user().id
    }
    ApiUtil.request({url: "api/messages/" + id, data: {public: true}, constant: FriendzConstants.MESSAGES_RECEIVED});
  },
  render: function () {
    return (
      <div className="friend-activity">
        <MainCommentList messages={this.state.messages} />
      </div>
    )
  }
});
