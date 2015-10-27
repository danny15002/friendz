var EventList = React.createClass({
  getInitialState: function () {
    return {myEvents: EventStore.myEvents()}
  },
  componentDidMount: function () {
    EventStore.addChangeListener(FriendzConstants.EVENTS_RECEIVED, this.getEvents);
    ApiUtil.fetchEvents();
  },
  componentWillUnmount: function () {
    EventStore.removeChangeListener(FriendzConstants.EVENTS_RECEIVED, this.getEvents);
  },
  getEvents: function () {
    this.setState({myEvents: EventStore.myEvents()})
  },
  mixins: [ReactRouter.History],

  handleClick: function (event) {
    var selected = $(event.target).context.id;
    this.history.pushState(null,"Events/"+ selected)
  },

  myEventList: function () {
    return (
      <div className={"my-events"}>
        <h2 style={{textAlign: "center"}}>MY EVENTS</h2>
        <br></br>
        {EventStore.userEvents().map(function (event) {
          return (
            <div className={"my-event"} key={event.id}>
              <a href={"#/Events/" + event.id}>
                <div style={{paddingLeft: "5px", float: "left", fontSize: "20px"}}>
                  {event.title}
                </div>
              </a>
              <div style={{paddingRight: "5px", float: "right", fontSize: "20px"}}>
                {event.date}
              </div>
            </div>
          )
        })}
      </div>
    )
  },

  render: function () {
    return (
      <div className={"Events"}>
        <div onClick={this.handleClick} className="bar user-list">
          <div id={"new"} className={"nav nav-friend"}>Create Event</div>
          {this.state.myEvents.map(function (event){
            return (
              <div id={event.id} key={event.id} selected={false} className={"nav nav-friend"}>
                {event.title}
              </div>
            )
          })}

        </div>
        {this.props.children || this.myEventList()}
      </div>
    );
  }
});
