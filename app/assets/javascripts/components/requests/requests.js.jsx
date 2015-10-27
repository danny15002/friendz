var Requests = React.createClass({
  getInitialState: function () {
    return {requestList: AlertStore.getMyRequests()}
  },
  componentDidMount: function ()
  {
    AlertStore.addChangeListener(FriendzConstants.FETCH_REQUESTS, this.setRequests)
    var request = {
      url: "api/pending_friendships",
      method: "GET",
      data: {},
      constant: FriendzConstants.FETCH_REQUESTS
    }
    ApiUtil.request(request);
  },
  componentWillUnmount: function () {
    AlertStore.removeChangeListener(FriendzConstants.FETCH_REQUESTS, this.setRequests);
  },
  setRequests: function () {
    this.setState({requestList: AlertStore.getMyRequests()})
  },
  render: function () {
    return (
      <div>
        <div>
          <h1>Requests</h1>
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
