json.array! @pending_friendships do |request|
  json.request request.requester.username
end
