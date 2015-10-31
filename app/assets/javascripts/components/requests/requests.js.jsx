var Requests = React.createClass({
  getInitialState: function () {
    return {requestList: AlertStore.getMyRequests()}
  },
  componentDidMount: function ()
  {
    AlertStore.addChangeListener(FriendzConstants.SET_REQUESTS, this.setRequests)
    AlertStore.addChangeListener(FriendzConstants.FETCH_REQUESTS, this.fetchRequests)

    var request = {
      url: "api/pending_friendships",
      method: "GET",
      data: {},
      constant: FriendzConstants.SET_REQUESTS
    }
    ApiUtil.request(request);
  },
  componentWillUnmount: function () {
    AlertStore.removeChangeListener(FriendzConstants.SET_REQUESTS, this.setRequests);
    AlertStore.removeChangeListener(FriendzConstants.FETCH_REQUESTS, this.fetchRequests);
  },
  fetchRequests: function () {
    var request = {
      url: "api/pending_friendships",
      method: "GET",
      data: {},
      constant: FriendzConstants.SET_REQUESTS
    }
    ApiUtil.request(request);
  },
  setRequests: function () {
    this.setState({requestList: AlertStore.getMyRequests()})
  },
  render: function () {
    if (this.state.requestList.length === 0) {
      return (
        <div className="requests">
          <div>
            <h1>Friendship Requests</h1>
            <br/>
            <span style={{paddingLeft: "40px"}}> No Requests at this time. </span>
          </div>


        </div>
      )
    }

    return (
      <div className="requests">
        <div>
          <h1>Friendship Requests</h1>
        </div>

        <div>
          <ul>
            {this.state.requestList.map(function (request) {
              return (
                <li>
                  <Request request={request} />
                </li>
              )
            })}
          </ul>
        </div>

      </div>
    )
  }
});
