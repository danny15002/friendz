var UserFriendsList = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {friends: UserStore.currentFriends()}
  },
  componentDidMount: function () {
    UserStore.addChangeListener(FriendzConstants.FRIENDS_RECEIVED, this.getFriends);
    ApiUtil.fetch({url: "api/friendships",
                   data: {id: LoginStore.user().id},
                   constant: FriendzConstants.FRIENDS_RECEIVED});
  },
  componentWillUnmount: function () {
    UserStore.removeChangeListener(FriendzConstants.FRIENDS_RECEIVED, this.getFriends);
  },
  getFriends: function () {
    this.setState({friends: UserStore.currentFriends()})
  },

  handleClick: function (event) {
    // console.log($(event.target).context.id);
    var selected = $(event.target).context.id;
    if (selected === undefined) {
      selected = LoginStore.user().id
    }
    this.history.pushState(null,"Messages/"+ selected)
  },
  welcome: function () {
    return (
      <div className={"inbox-welcome"}>
        <pre>
        {"Hello, " + LoginStore.user().username + ". Welcome to Your Inbox.\n"}
        {"Select a user to see your conversations." }
        </pre>
      </div>
    )
  },

  render: function () {

    return (
      <div>
        <div onClick={this.handleClick} className="bar user-list">
          {this.state.friends.map(function (friend){
            return (
              <div id={friend.friend_id} key={friend.id} selected={false} className={"nav nav-friend"}>
                {friend.friend}
              </div>
            )
          })}
        </div>
        {this.props.children || this.welcome()}
      </div>
    );
  }
});
