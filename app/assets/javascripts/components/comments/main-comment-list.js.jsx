var MainCommentList = React.createClass ({

  render: function () {
    return (
      <div>
        <ul>
          {this.props.messages.map(function (message) {
            return <Comment
              level={1} key={message.id}
              message={message}
              wall={this.props.wall}
              profileId={this.props.profileId} />
          }.bind(this))}
        </ul>
      </div>
    )
  }

});
