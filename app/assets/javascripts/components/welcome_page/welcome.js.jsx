var WelcomePage = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  statics: {willTransitionTo: function (nextState, replaceState) {
    if (LoginStore.isLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/');
    }
  }},
  getInitialState: function () {
    return {
      username: "",
      password: "",
      signupUsername: "",
      signupPassword: "",
      confirm_password: "",
      errors: ""};
  },
  componentDidMount: function () {
    LoginStore.addChangeListener(FriendzConstants.LOGIN_USER, this.transitionUser);
    LoginStore.addChangeListener(FriendzConstants.FAILED_LOGIN, this.handleError);
    LoginStore.addChangeListener(FriendzConstants.SIGNUP_USER, this.transitionUser);
    LoginStore.addChangeListener(FriendzConstants.FAILED_SIGNUP, this.handleError);
  },
  componentWillUnmount: function () {
    LoginStore.removeChangeListener(FriendzConstants.LOGIN_USER, this.transitionUser);
    LoginStore.removeChangeListener(FriendzConstants.FAILED_LOGIN, this.handleError);
    LoginStore.removeChangeListener(FriendzConstants.SIGNUP_USER, this.transitionUser);
    LoginStore.removeChangeListener(FriendzConstants.FAILED_SIGNUP, this.handleError);
  },
  transitionUser: function () {
    this.history.pushState(null, "/");
  },
  handleError: function () {
    this.setState({errors: LoginStore.getError()});
  },
  login: function (event) {
    event.preventDefault();
    ApiUtil.login(this.state.username, this.state.password);
  },

  signup: function () {
    event.preventDefault();
    ApiUtil.signup({username: this.state.signupUsername,
                    password: this.state.signupPassword,
                    password_confirmation: this.state.confirmPassword});

  },

  inputGuestInfo: function () {
    ApiUtil.login("guest", "password");
  },

  render: function () {
    return (
      <div className={"welcome"}>
        <div className={"top-container"}>
          <div className={"top-bar"}>
            <h1 className={"friendz"}> Friendz </h1>
            <div className={"login"} style={{float: "right"}}>
              <input type="text" valueLink={this.linkState('username')} placeholder={"Username"} />
              <input type="password" valueLink={this.linkState('password')} placeholder={"Password"} />
              <button style={{color: "black"}} type="submit" onClick={this.login}>Log In</button>
            </div>
          </div>
        </div>

        <div className={"main"}>

          <div className={"info"}>
            <h2> See what the buzz is about. </h2>
            <h2> Start connecting now. </h2>
            <h3> <span className={"glyphicon glyphicon-picture"}></span> Upload photos </h3>
            <h3> <span className={"glyphicon glyphicon-send"}></span> Share your thoughts </h3>
            <h3> <span className={"glyphicon glyphicon-user"}></span> Find friends </h3>
            <h3> <span className={"glyphicon glyphicon-calendar"}></span> Plan Events </h3>
          </div>

          <div className={"signup"}>
            <div style={{width: "330px", margin: "auto"}}>
              <h1 style={{textAlign: "center"}}> Sign Up </h1>
              <h1>
                <a style={{display: "inline-block", cursor: "pointer"}}onClick={this.inputGuestInfo}>
                 Or sign in as Guest.
                </a>
              </h1>
            </div>
            <h2 style={{display: "block", textAlign: "center"}}> It will always be free </h2>
            <br></br>
            <input type="text" valueLink={this.linkState('signupUsername')} placeholder={"Username"} />
            <br></br><br></br>
            <input type="password" valueLink={this.linkState('signupPassword')} placeholder={"Password"} />
            <br></br><br></br>
            <input type="password" valueLink={this.linkState('confirmPassword')} placeholder={"Confirm Password"} />
            <br></br><br></br>
            <button type="submit" onClick={this.signup}>Sign Up</button>
          </div>

        </div>
      </div>
    )
  }
})
