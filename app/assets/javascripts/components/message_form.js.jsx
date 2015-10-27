var MessageForm = React.createClass( {
  getInitialState: function () {
    return {recipientId: undefined, value: ""}
  },
  componentDidMount: function () {
    var userId = parseInt(this.props.params.userId)
    this.setState({recipientId: userId});
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  componentWillReceiveProps: function (nextProps) {
    var userId = parseInt(nextProps.params.userId)
    this.setState({recipientId: userId});
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  submitForm: function() {
    var from_id = LoginStore.user().id
    var message = {to_id: this.state.recipientId,
                 from_id: from_id,
                 body: this.state.value,
                 public: false};
    ApiUtil.createMessage(message);
    this.setState({value: ""})
  },

  render: function () {
    if (this.state.recipientId === undefined) {
      return <div></div>
    }

    var name = UserStore.getFriendById(this.state.recipientId).friend
    var value= this.state.value;
    return (
      <div className={"message-form"}>
        <Conversation params={this.props.params} name={name}/>

        <textarea
          onChange={this.handleChange}
          className={"message-text"}
          placeholder={"Type a message for " + name}
          value={value}>

        </textarea>
        <br></br>
        <br></br>
        <button className={"sendMessage"} onClick={this.submitForm}>Send</button>
      </div>)
  }
})
