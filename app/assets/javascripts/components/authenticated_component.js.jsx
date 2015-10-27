var AuthenticatedComponent = React.createClass({
  mixins: [ ReactRouter.History],
  statics: {willTransitionTo: function (nextState, replaceState) {
    
    if (!LoginStore.isLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }
  }},
  getInitialState: function () {
    return({userLoggedIn: LoginStore.isLoggedIn(),
           user: LoginStore.user(),
           jwt: LoginStore.jwt()});
  },
  componentDidMount: function () {
    LoginStore.addChangeListener(friendzDispatcher.LOGIN_USER, this.onChange);
  },
  componentWillUnmount() {
    LoginStore.removeChangeListener(friendzDispatcher.LOGIN_USER, this.onChange);
  },
  onChange: function () {
    this.setState({userLoggedIn: LoginStore.isLoggedIn(),
                   user: LoginStore.user(),
                   jwt: LoginStore.jwt()});
  },
  render() {
    return (
    <div
      user={this.state.user}
      jwt={this.state.jwt}
      userLoggedIn={this.state.userLoggedIn}>
      {this.props.children}
    </div>
    );
  }

})
