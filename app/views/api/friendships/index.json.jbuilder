json.array! @friends do |friend|

  json.id friend.id
  json.user friend.user.username
  json.user_id friend.user.id
  json.friend friend.friend.username
  json.friend_id friend.friend.id

end
