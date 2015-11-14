var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Redirect = ReactRouter.Redirect;
var Lifecycle = ReactRouter.Lifecycle;

var App = React.createClass({
  render: function () {
    return (
      <div >
        <AuthenticatedComponent>
          <TopBar />
          <div className={"container"}>
            <LeftBar />
            {this.props.children}
          </div>
        </AuthenticatedComponent>
      </div>)
  }
})


var routes = (
  <Router>
    <Route path="login" onEnter={WelcomePage.willTransitionTo} component={WelcomePage}/>
    <Route path="/" onEnter={AuthenticatedComponent.willTransitionTo} component={App}>
      <IndexRoute component={NewsFeed}/>
      <Route path="Messages" component={UserFriendsList}>
        <Route path=":userId" component={ MessageForm} />
      </Route>
      <Route path="Events" component={EventList}>
        <Route path="new" component={EventForm} />
        <Route path=":eventId" component={Event} />
      </Route>
      <Route path="Pictures" component={PictureViewer}/>
      <Route path="Profile" component={Profile}/>
      <Route path="Account" component={Account}/>
      <Route path="Friends" component={FriendList}/>
      <Route path="Requests" component={Requests} />
      <Route path="Notifications" component={Notifications}></Route>
      <Route path="User/:userId" component={Profile}/>
      <Route path="User/:userId/Friends" component={Friends}/>
      <Route path="User/:userId/Pictures" component={PictureViewer}/>
    </Route>
  </Router>
)

      // <Route path="Locations" component={Locations}/>

$(function () {
  React.render( routes, document.getElementById("application"));
});
