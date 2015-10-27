var Login = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  statics: {willTransitionTo: function (nextState, replaceState) {
    if (LoginStore.isLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/');
    }
  }},
  getInitialState: function () {
    return {username: "", password: "", errors: ""};
  },
  componentDidMount: function () {
    LoginStore.addChangeListener(FriendzConstants.LOGIN_USER, this.transitionUser);
    LoginStore.addChangeListener(FriendzConstants.FAILED_LOGIN, this.handleError);
  },
  componentWillUnmount: function () {
    LoginStore.removeChangeListener(FriendzConstants.LOGIN_USER, this.transitionUser);
    LoginStore.removeChangeListener(FriendzConstants.FAILED_LOGIN, this.handleError);
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
  inputGuestInfo: function () {
    ApiUtil.login("guest", "password");
  },
  render() {
    return (
      <div>
        <div className={"top-excess"}></div>
        <div className={"credentials-form"} >
          <div className={"jumbotron"}><h1> Friendz! </h1></div>
          <h4> Go ahead and log in! Or <a href={"/#/signup"}>Sign Up.</a> </h4>
          <h4> You can also sign in as a <a onClick={this.inputGuestInfo}>Guest.</a> </h4>
          <h4 className={"errors"}> {this.state.errors} </h4>
          <form role={"form"} className={"form-group"}>
            <div className="input-group my-input" >
              <input type="text" className={"form-control"} valueLink={this.linkState('username')} placeholder={"Username"} />
              <input type="password" className={"form-control"} valueLink={this.linkState('password')} placeholder={"Password"} />
              <button type="submit" className={"form-control"} onClick={this.login}>Log In</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});
