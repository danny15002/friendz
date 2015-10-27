var ProfilePicture = React.createClass({

  render: function () {
    return (
      <img className={"prof-pic"}
        src={this.props.source}
        alt={"profile picture"}
        style={this.props.style}/>
    )
  }
})
