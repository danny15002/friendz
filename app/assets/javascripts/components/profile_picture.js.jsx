var ProfilePicture = React.createClass({

  render: function () {
    return (
      <div
        style={{
          background: "url(" + this.props.source + ") 50% 50%",
          height: this.props.style.height,
          width: this.props.style.width,
          float: "left"}}>

      </div>
    )
  }
})

// <img className={"prof-pic"}
//   src={this.props.source}
//   alt={"profile picture"}
//   style={this.props.style}
//   />
