
var SignUp = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  statics: {willTransitionTo: function (nextState, replaceState) {
    if (LoginStore.isLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/');
    }
  }},
  getInitialState: function () {
    return {username: "", password: "",confirm_password: "", errors: ""};
  },
  componentDidMount: function () {
    LoginStore.addChangeListener(FriendzConstants.SIGNUP_USER, this.transitionUser);
    LoginStore.addChangeListener(FriendzConstants.FAILED_SIGNUP, this.handleError);
  },
  componentWillUnmount: function () {
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
    ApiUtil.signup({username: this.state.username,
                    password: this.state.password,
                    password_confirmation: this.state.confirmPassword});
  },
  render() {
    return (
      <div>
        <div className={"top-excess"}></div>
        <div className={"credentials-form"} >
          <div className={"jumbotron"}><h1> Friendz! </h1></div>
          <h4> Go ahead and sign up! Or <a href={"/#/login"}>Log In.</a> </h4>

          <h4 className={"errors"}> {this.state.errors} </h4>
          <form role={"form"} className={"form-group"}>
            <div className="input-group my-input" >
              <input type="text" className={"form-control"} valueLink={this.linkState('username')} placeholder={"Username"} />
              <input type="password" className={"form-control"} valueLink={this.linkState('password')} placeholder={"Password"} />
              <input type="password" className={"form-control"} valueLink={this.linkState('confirmPassword')} placeholder={"Confirm Password"} />
              <button type="submit" className={"form-control"} onClick={this.login}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

});
