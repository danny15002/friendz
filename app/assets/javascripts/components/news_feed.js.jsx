var NewsFeed = React.createClass({
  render: function () {
    return (
      <div className="news-feed">
        <PostStatusFormN className={""} userId={LoginStore.user().id}/>
        <FriendActivity />
      </div>
    )
  }
})
