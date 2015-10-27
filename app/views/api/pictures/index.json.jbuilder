json.array! @pictures do |picture|
  json.username picture.user.username
  json.pic_url picture.pic_url
  json.id picture.id
  json.user_id picture.user.id

  json.comments picture.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.commentable_id comment.commentable_id
    json. commentable_type comment.commentable_type
    json.created_at comment.format_comment_time
    json.author comment.user.username
    json.profPic comment.user.profile_picture.pic_url
    json.type "Comment"

    json.comments comment.comments do |comment|
      json.id comment.id
      json.body comment.body
      json.commentable_id comment.commentable_id
      json. commentable_type comment.commentable_type
      json.created_at comment.format_comment_time
      json.author comment.user.username
      json.profPic comment.user.profile_picture.pic_url

      json.type "Comment"
    end

  end
end
