var Friends = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {friends: UserStore.currentFriends()}
  },
  componentDidMount: function () {
    UserStore.addChangeListener(FriendzConstants.FRIENDS_RECEIVED, this.getFriends);
    ApiUtil.fetch({url: "api/friendships",
                   data: {id: this.props.params.userId},
                   constant: FriendzConstants.FRIENDS_RECEIVED});
  },
  componentWillUnmount: function () {
    UserStore.removeChangeListener(FriendzConstants.FRIENDS_RECEIVED, this.getFriends);
  },
  // componentWillReceiveProps: function (nextProps) {
  //   UserStore.addChangeListener(FriendzConstants.FRIENDS_RECEIVED, this.getFriends);
  //   ApiUtil.fetch({url: "api/friendships",
  //                  data: {id: this.props.params.userId},
  //                  constant: FriendzConstants.FRIENDS_RECEIVED});
  // },
  getFriends: function () {
    this.setState({friends: UserStore.currentFriends()})
  },

  handleClick: function (event) {
    // console.log($(event.target).context.id);
    var selected = $(event.target).context.id;
    if (selected === undefined) {
      selected = LoginStore.user().id
    }
    this.history.pushState(null,"User/"+ selected)
  },

  render: function () {

    return (
      <div>
        <div style={{marginTop: "20px", padding: "10px"}} onClick={this.handleClick} className="friends">
          <h1 style={{paddingLeft: '10px'}}> Friends </h1>
          {this.state.friends.map(function (friend){
            return (
              <div
                id={friend.friend_id}
                key={friend.id}
                selected={false}
                className={"friendbox"}
                style={{margin: "10px", float: "left", height: "100", width: "200"}}>
                <ProfilePicture source={friend.picUrl} style={{height: "100px", width: "100px"}} />
                <div>{friend.friend}</div>
              </div>
            )
          })}
        </div>
        {this.props.childrens}
      </div>
    );
  }
});
