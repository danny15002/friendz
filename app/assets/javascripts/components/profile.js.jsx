var Profile = React.createClass ({
  mixins: [ReactRouter.History],
  getInitialState: function () {
    console.log("Profile props")
    console.log(this.props.params)
    return {id: this.props.params.userId, friends: [], user: {profPic: ""}}
  },
  componentDidMount: function () {
    LoginStore.addChangeListener(FriendzConstants.MY_FRIENDS_RECEIVED, this.getFriends);
    LoginStore.addChangeListener(FriendzConstants.FRIEND_DELETED, this.fetchFriends);
    LoginStore.addChangeListener(FriendzConstants.FRIEND_ADDED, this.fetchFriends);
    UserStore.addChangeListener(FriendzConstants.USER_RECEIVED, this.setUser);
    var id = this.props.params.userId
    if (id === undefined){
      id = LoginStore.user().id;
    } else {
      id = parseInt(id);
    }
    this.setState({id: id});
    ApiUtil.fetch({url: "users/" + id, data: {id: id}, constant: FriendzConstants.USER_RECEIVED})
    ApiUtil.fetch({url: "api/friendships", data: {}, constant: FriendzConstants.MY_FRIENDS_RECEIVED});
  },
  componentWillUnmount: function () {
    LoginStore.removeChangeListener(FriendzConstants.MY_FRIENDS_RECEIVED, this.getFriends);
    LoginStore.removeChangeListener(FriendzConstants.FRIEND_DELETED, this.fetchFriends);
    LoginStore.removeChangeListener(FriendzConstants.FRIEND_ADDED, this.fetchFriends);
    UserStore.removeChangeListener(FriendzConstants.USER_RECEIVED, this.setUser);
  },
  componentWillReceiveProps: function (nextProps) {
    var id = nextProps.params.userId;
    if (id === undefined){
      id = LoginStore.user().id;
    } else {
      id = parseInt(id);
    }
    console.log("profile props")
    this.setState({id: id});
    ApiUtil.fetchPictures(id);
    ApiUtil.fetch({url: "users/" + nextProps.params.userId, data: {id: nextProps.params.userId}, constant: FriendzConstants.USER_RECEIVED})
  },
  getFriends: function () {
    this.setState({friends: LoginStore.getMyFriends()})
    ApiUtil.fetch({url: "users/" + id, data: {id: id}, constant: FriendzConstants.USER_RECEIVED})
  },
  fetchFriends: function () {
    ApiUtil.fetch({url: "api/friendships", data: {}, constant: FriendzConstants.MY_FRIENDS_RECEIVED});
  },
  setUser: function () {
    this.setState({user: UserStore.getProfileUser()[0]})
  },
  friendText: function (id) {
    var text="";
    var request;

    if (this.state.user.id) {
      if (this.state.user.friendship === true) {
          text = "Unfriend";
          friendship_id = LoginStore.getFriendShipId(parseInt(id));
          request = {url: "api/friendships/" + friendship_id,
                     method: "DELETE",
                     data: {},
                     constant: FriendzConstants.FRIEND_DELETED};
      } else if (this.state.user.friendship === "pending") {
        text = "Pending"
      } else if (this.state.user.friendship === "own") {
        text = ""
      } else {
        text="Add Friend";
        request = {url: "api/pending_friendships/",
                   method: "POST",
                   data: {pending_friendship: {requester_id: LoginStore.user().id,
                                       accepter_id: id}},
                   constant: FriendzConstants.FRIEND_ADDED};
      }
    }

    return {text: text, request: request}
  },
  handleClick: function (request) {
    if (request === undefined) {
      return function () {};
    }
    return function () {
      ApiUtil.request(request);
    }
  },
  render: function () {
    var id;
    if (this.props.params.userId === undefined) {
      id = LoginStore.user().id;
      message_id = ""
    } else {
      id = this.props.params.userId
      message_id = id
    }

    var source = this.state.user.profPic

    var friendObject = this.friendText(id)
    var picsize = 200;

    return (
      <div className={"profile"}>
        <div style={{margin: "36px 36px"}}>
          <ProfilePicture source={source} style={{height: picsize + "px", width: picsize + "px"}}/>
          <PostStatusForm userId={this.state.id}/>
          <div className={"profile-menu"}>
            <a href={"#/User/" + id + "/Friends"} className={"Friends"}><div>Friends</div></a>
            <a href={"#/User/" + id + "/Pictures"} className={"Pictures"}><div>Pictures</div></a>
            <a href={"#/Messages/" + message_id} className={"Messages"}><div>Messages</div></a>
            <div onClick={this.handleClick(friendObject.request)}>
              {friendObject.text}
            </div>
          </div>
        </div>
        <WallActivity userId={this.state.id} />
      </div>
    )
  }
})
