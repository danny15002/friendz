var LeftBar = React.createClass ({
  mixins: [ReactRouter.History],
  render: function () {
    return (
      <div className={"bar left-bar"}>
        <a href={"#/Messages"}>
          <div className={"nav nav-messages"}>
            <span className={"glyphicon glyphicon-envelope"}></span> Messages
          </div>
        </a>
        <a href={"#/Events"}>
          <div className={"nav nav-events"}>
            <span className={"glyphicon glyphicon-calendar"}></span> Events
          </div>
        </a>
        <a href={"#/Pictures"}>
          <div className={"nav nav-pictures"}>
            <span className={"glyphicon glyphicon-picture"}></span> Pictures
          </div>
        </a>
        <a href={"#/Locations"}>
          <div className={"nav nav-locations"}>
            <span className={"glyphicon glyphicon-globe"}></span> Locations
          </div>
        </a>
        <a href={"#/Requests"}>
          <div className={"nav nav-requests"}>
            <span className={"glyphicon glyphicon-user"}></span><span className={"glyphicon glyphicon-user"}></span> Friend Requests
          </div>
        </a>
        <a href={"#/Notifications"}>
          <div className={"nav nav-notifications"}>
            <span className={"glyphicon glyphicon-flag"}></span> Notifications
          </div>
        </a>
      </div>
    )
  }
})

var TopBar = React.createClass ({
  mixins: [ReactRouter.History],
  componentDidMount: function () {
    LoginStore.addChangeListener(FriendzConstants.LOGOUT, this.logoutUser);
  },
  componentWillUnmount: function () {
    LoginStore.removeChangeListener(FriendzConstants.LOGOUT, this.logoutUser);
  },
  logoutUser: function () {
    this.history.pushState(null, "/login")
  },
  handleClick: function (event) {
    ApiUtil.logout();
  },

  render: function () {
    return (
      <div className={"top-excess"}>
        <div className={"bar top-bar"}>
          <OmniSearch />
          <a href={"#/"} className={"nav-messages"}><div className="top-menu-div"><span className={"glyphicon glyphicon-home"}></span> Home</div></a>
          <a href={"#/Profile"} className={"nav-events"}><div className="top-menu-div"><span className={"glyphicon glyphicon-user"}></span> Profile</div></a>
          <a href={"#/Account"} className={"nav-pictures"}><div className="top-menu-div"><span className={"glyphicon glyphicon-th"}></span> Account</div></a>
          <a onClick={this.handleClick} className={"nav-logout"}><div className="top-menu-div"><span className={"glyphicon glyphicon-off"}></span> Logout</div></a>
        </div>
      </div>
    )
  }
})
