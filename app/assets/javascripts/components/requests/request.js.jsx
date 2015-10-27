var Request = React.createClass({

  acceptRequest: function () {

    var request1 = {
      url: "api/friendships",
      method: "POST",
      data: {friendship: {user_id: this.props.request.to_id, friend_id: this.props.request.from_id}},
      constant: "FRIEND"
    }

    var request2 = {
      url: "api/pending_friendships/" + this.props.request.id,
      method: "DELETE",
      data: {},
      constant: FriendzConstants.FETCH_REQUESTS
    }

    ApiUtil.request(request1);
    ApiUtil.request(request2);
  },

  render: function () {
    return (
      <div onClick={this.acceptRequest} className={"request"}>
        New friend request from {this.props.request.request}, click to accept
      </div>
    )
  }
})
