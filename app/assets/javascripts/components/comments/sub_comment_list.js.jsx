var SubCommentList = React.createClass({
    // TODO: move comment created listeners from comment to here

  render: function () {
    var replyFunction = "";
    if (this.props.replyFunction) {
      replyFunction = this.props.replyFunction
    }
    return(
      <div className={"comment-list"}>
          <ul>
            {this.props.comments.map(function (comment) {
              return (<li>
                <Comment
                  className={""}
                  key={comment.id}
                  message={comment}
                  level={this.props.level}
                  replyFunction={replyFunction}
                  />
              </li>)
            }.bind(this))}
          </ul>
      </div>
    )
  }
})
