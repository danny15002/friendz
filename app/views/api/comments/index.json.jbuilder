json.commentableId @id
json.commentableType @type
json.comments @comments do |comment|
  json.id comment.id
  json.author comment.user.username
  json.profPic comment.user.profile_picture.pic_url
  json.body comment.body
  json.createdAt comment.format_comment_time
end
