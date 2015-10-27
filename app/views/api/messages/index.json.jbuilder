json.array! @messages do |message|
  json.id message.id
  json.from_id message.from_id
  json.to_id message.to_id
  json.body message.body
  json.author message.user_from.username
  json.recipient message.user_to.username
  json.created_at message.format_message_time



  json.prof_pic message.user_from.profile_picture.pic_url
  json.likes message.number_likes
  json.liked message.is_liked?(@id)
  json.myLikeId message.users_like_id(@id)

  json.type "Message"
  json.comments message.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.commentable_id comment.commentable_id
    json. commentable_type comment.commentable_type
    json.created_at comment.format_comment_time
    json.author comment.user.username
    json.prof_pic comment.user.profile_picture.pic_url
    json.likes comment.number_likes
    json.liked comment.is_liked?(@id)
    json.myLikeId comment.users_like_id(@id)


    json.type "Comment"

    json.comments comment.comments.reverse do |comment|
      json.id comment.id
      json.body comment.body
      json.commentable_id comment.commentable_id
      json. commentable_type comment.commentable_type
      json.created_at comment.format_comment_time
      json.author comment.user.username
      json.prof_pic comment.user.profile_picture.pic_url
      json.likes comment.number_likes
      json.liked comment.is_liked?(@id)
      json.myLikeId comment.users_like_id(@id)
      json.comments []

      json.type "Comment"
    end
  end
end
