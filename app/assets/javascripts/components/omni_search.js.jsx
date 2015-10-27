var OmniSearch = React.createClass({
  getInitialState: function () {
    return {value: "", users: [], matches: []}
  },
  componentDidMount: function () {
    UserStore.addChangeListener(FriendzConstants.USERS_RECEIVED, this.getUsers);
    ApiUtil.fetch({url: "users", data: {all: true}, constant: FriendzConstants.USERS_RECEIVED});
    // window.addEventListener('mousedown', this.hide);
  },
  componentWillUnmount: function () {
    UserStore.removeChangeListener(FriendzConstants.USERS_RECEIVED, this.getUsers);
    // window.removeEventListener('mousedown', this.hide);
  },
  getUsers: function () {
    this.setState({users: UserStore.getUsers()})
  },
  handleChange: function (event) {
    this.matchUsers(event.target.value);
  },
  matchUsers: function (value) {
    var matches = [];
    var name;

    if (this.state.users.length > 0 && value.length > 0) {
      for (var i = 0; i < this.state.users.length; i++) {
        name = this.state.users[i].name.toLowerCase();
        if (name.indexOf(value) !== -1) {
          matches.push(this.state.users[i])
        }
      }
    }
    this.setState({matches: matches, value :event.target.value})
  },
  hide: function () {
    this.matchUsers("");
  },
  listen: function () {
    window.addEventListener('mousedown', this.hide);
  },
  stopListening: function () {
    window.removeEventListener('mousedown', this.hide);
  },
  render: function () {
    var display = "none";
    if (this.state.matches.length > 0) {
      display = "";
    }
    var href = "";

    return (
      <div onMouseEnter={this.stopListening} onMouseLeave={this.listen} className={"nav-search"}>
        <input type={"text"}
               placeholder={"Find a Friend"}
               value={this.state.value}
               onChange={this.handleChange}/>
             <div style={{display: display}} className={"search-list"}>
          <ul>
            {this.state.matches.map(function (match) {
              href = "#/User/" + match.id
              return (
                 <li className={"search-result"}><a href={href}>{match.name}</a></li>
              )
            }.bind(this))}
          </ul>
        </div>
      </div>

    )
  }
})
