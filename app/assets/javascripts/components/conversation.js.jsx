var Conversation = React.createClass( {
  getInitialState: function () {
    return {messages: []}
  },
  componentDidMount: function () {
    MessageStore.addChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.addChangeListener(FriendzConstants.MESSAGE_SENT, this.getMessages);
    var id = this.props.params.userId;
    ApiUtil.request({url: "api/messages/" + id, data: {user_id: id, public: false}, constant: FriendzConstants.MESSAGES_RECEIVED});

  },
  componentWillUnmount: function () {
    MessageStore.removeChangeListener(FriendzConstants.MESSAGES_RECEIVED, this.getMessages);
    MessageStore.removeChangeListener(FriendzConstants.MESSAGE_SENT, this.getMessages);
  },
  componentWillReceiveProps: function (nextProps) {
    var id = parseInt(nextProps.params.userId)
    ApiUtil.request({url: "api/messages/" + id, data: {user_id: id, public: false}, constant: FriendzConstants.MESSAGES_RECEIVED});
  },
  getMessages: function () {
    this.setState({messages: MessageStore.getMessages()})
  },
  render: function () {
    if (MessageStore.getMessages().length === 0) {
      return (
        <div className={"conversation"}>
          <div> No messages here. Why dont you send a Message to {this.props.name}!</div>
        </div>
      )
    }
    return (
      <div className={"conversation"}>
        <ul>
          {this.state.messages.map( function (message, idx) {
            var style = {color: "#88000"}
            if (message.author === LoginStore.user().username)
            {
              style = {color: "white", background: "#880000"};
            }

            return (
              <li style={style} key={message.id} className={"private message"}>
                <div>
                  <div className={"author"}>
                    {message.author} <span className={"glyphicon glyphicon-triangle-right"}></span> {message.recipient}
                  </div>
                  <div className={"msg-created"}>{message.created_at}</div>
                </div>
                <br></br>
                <br></br>
                <p className={"msg-body"}>{message.body}</p>
              </li>
            )
          }.bind(this))}
        </ul>
      </div>
    )
  }
})
