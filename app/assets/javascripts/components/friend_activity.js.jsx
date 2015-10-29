var FriendActivity = React.createClass( {
  getInitialState: function () {
    return {messages: []}
  },
  componentDidMount: function () {

    MessageStore.addChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.addChangeListener(FriendzConstants.STATUS_POSTED, this.fetchMessages);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchMessages);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_LIKED, this.fetchMessages);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_UNLIKED, this.fetchMessages);
    request = {url: "api/messages",
               method: "GET",
               data: {public: true},
               constant: FriendzConstants.MESSAGES_RECEIVED};
    ApiUtil.request(request)
  },
  componentWillUnmount: function () {
    MessageStore.removeChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.removeChangeListener(FriendzConstants.STATUS_POSTED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_CREATED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_LIKED, this.fetchMessages);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_UNLIKED, this.fetchMessages);
  },
  getMessages: function () {
    this.setState({messages: MessageStore.getMessages()})
  },
  fetchMessages: function () {
    request = {url: "api/messages/",
               method: "GET",
               data: {public: true},
               constant: FriendzConstants.MESSAGES_RECEIVED};
    ApiUtil.request(request);
  },

  render: function () {
    return (
      <div className="friend-activity">
        <MainCommentList messages={this.state.messages} />
      </div>
    )
  }
})
