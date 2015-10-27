json.array! @events do |event|
  json.creator event.creator.username
  json.id event.id
  json.title event.title
  json.description event.description
  json.date event.date
  json.location event.location
end
