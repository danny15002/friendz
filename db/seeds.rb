# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(
  username: "guest",
  password: "password",
  password_confirmation: "password"
)


User.create(
  id: 1000,
  username: "FRIENDZ",
  password: "password",
  password_confirmation: "password"
)

Picture.create(
  user_id: 1000,
  pic_url: "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/384.png"
)

ProfilePicture.create(
  user_id: 1000,
  picture_id: 1000
)


25.times do
  User.create(
    username: Faker::Name.first_name,
    password: "password",
    password_confirmation: "password"
  )
end

300.times do
  Message.create(
    from_id: rand(1..26),
    to_id: rand(1..26),
    body: (Faker::Hacker.say_something_smart + " " + Faker::Hacker.say_something_smart)
  )
end

300.times do
  Message.create(
    from_id: rand(1..26),
    to_id: rand(1..26),
    body: (Faker::Hacker.say_something_smart + " " + Faker::Hacker.say_something_smart),
    public: true
  )
end


1000.times do
  Comment.create(
    body: Faker::Hacker.adjective,
    commentable_id: rand(301..600),
    commentable_type: "Message",
    user_id: rand(1..25)
  )
end

friendArray = [];

120.times do
  i = rand(1..25)
  j = rand(1..25)

  if i != j
    Friendship.create(user_id: i, friend_id: j)
    Friendship.create(user_id: j, friend_id: i)
  end
end

30.times do
  Event.create(
    creator_id: rand(1..25),
    title: Faker::Hacker.adjective + " " + Faker::Hacker.noun,
    description: Faker::Lorem.paragraph,
    date: Faker::Date.forward(60),
    location: Faker::Address.street_address
  )
end

base = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"

27.times do |i|
  num = sprintf '%03d', i + 1
  Picture.create(
    user_id: i,
    pic_url: base + num + ".png"
  )
end

100.times do
  user = rand(1..25)
  pic = rand(1..720)
  num = sprintf '%03d', pic
  Picture.create(
    user_id: user,
    pic_url: base + num + ".png"
  )
end

26.times do |i|
    ProfilePicture.create(
      user_id: i,
      picture_id: i
    )
end
