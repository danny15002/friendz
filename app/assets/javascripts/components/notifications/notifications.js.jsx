var Notifications = React.createClass({
  getInitialState: function () {
    return {notifications: []};
  },
  render: function () {
    if (this.state.notifications.length === 0) {
      return (
        <div className="requests">
          <div>
            <h1>Friend Activity</h1>
            <br/>
            <span style={{paddingLeft: "40px"}}> No new activity at this time. </span>
          </div>


        </div>
      )
    }

    return (
      <div className="requests">
        <div>
          <h1>Friend Activity</h1>
        </div>

        <div>
          <ul>
            {this.state.notifications.map(function (notification) {
              return (
                <li>
                  <Notification request={notification} />
                </li>
              )
            })}
          </ul>
        </div>

      </div>
    )
  }
})
