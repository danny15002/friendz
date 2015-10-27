json.array! @messages do |message|
  json.id message.id
  json.from_id message.from_id
  json.to_id message.to_id
  json.body message.body
  json.author message.user_from.username
  json.recipient message.user_to.username
  json.created_at message.format_message_time


  if @public
    json.prof_pic message.user_from.profile_picture.pic_url
    json.likes message.number_likes
    json.liked message.is_liked?(@id)
    json.myLikeId message.users_like_id(@id)

    json.type "Message"
    json.comments []
  end
end
