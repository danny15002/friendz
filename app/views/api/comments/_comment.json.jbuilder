json.extract!(comment, :id)
json.child_comments do
  json.array! comment.comments do |child_comment|
    json.partial! "api/comments/comment", comment: child_comment
  end
end
