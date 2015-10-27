var Event = React.createClass({
  getInitialState: function () {
    displayEvent = {title: "", description: "", date: "", location: ""}
    return {displayEvent: displayEvent}
  },
  componentDidMount: function () {
    this.setState({displayEvent: EventStore.findById(parseInt(this.props.params.eventId))});
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({displayEvent: EventStore.findById(parseInt(nextProps.params.eventId))});
  },
  render: function () {
    return (
      <div className={"event-detail"}>
        <h2> {(this.state.displayEvent.title).toUpperCase()} </h2>
        <br></br>
        <h3> <strong>Hosted by:</strong> {this.state.displayEvent.creator}</h3>
        <br></br>
        <p> <strong>Date:</strong> {this.state.displayEvent.date}</p>
        <br></br>
        <p> <strong>Address/Location:</strong> {this.state.displayEvent.location}</p>
        <br></br>
        <p> {this.state.displayEvent.description}</p>
      </div>
    )
  }
})
