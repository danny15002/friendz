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

# base = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/"
# base = "file:///Users/SilverSurfer/Documents/stockPhotos/photo"
#
# 28.times do |i|
#   num = sprintf '%03d', ((i % 19) + 1)
#   Picture.create(
#     user_id: i,
#     pic_url: base + num + ".jpg"
#   )
# end

Picture.create(user_id: 1, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537517/photo019.jpg")
Picture.create(user_id: 2, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 3, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537511/photo017.jpg")
Picture.create(user_id: 4, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537509/photo016.jpg")
Picture.create(user_id: 5, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537506/photo015.jpg")
Picture.create(user_id: 6, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537500/photo013.jpg")
Picture.create(user_id: 7, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537492/photo012.jpg")
Picture.create(user_id: 8, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537486/photo010.jpg")
Picture.create(user_id: 9, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537481/photo009.jpg")
Picture.create(user_id: 10, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 11, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537479/photo008.jpg")
Picture.create(user_id: 12, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537470/photo005.jpg")
Picture.create(user_id: 13, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537468/photo004.jpg")
Picture.create(user_id: 14, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537465/photo003.jpg")
Picture.create(user_id: 15, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537463/photo002.jpg")
Picture.create(user_id: 16, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537472/photo006.jpg")
Picture.create(user_id: 17, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537460/photo001.jpg")
Picture.create(user_id: 18, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537463/photo002.jpg")
Picture.create(user_id: 19, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537465/photo003.jpg")
Picture.create(user_id: 21, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537460/photo001.jpg")
Picture.create(user_id: 22, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537468/photo004.jpg")
Picture.create(user_id: 23, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 24, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537492/photo012.jpg")
Picture.create(user_id: 25, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537489/photo011.jpg")
Picture.create(user_id: 26, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537472/photo006.jpg")
Picture.create(user_id: 27, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537476/photo007.jpg")
Picture.create(user_id: 1, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537517/photo019.jpg")
Picture.create(user_id: 2, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 3, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537511/photo017.jpg")
Picture.create(user_id: 4, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537509/photo016.jpg")
Picture.create(user_id: 5, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537506/photo015.jpg")
Picture.create(user_id: 6, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537500/photo013.jpg")
Picture.create(user_id: 7, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537492/photo012.jpg")
Picture.create(user_id: 8, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537486/photo010.jpg")
Picture.create(user_id: 9, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537481/photo009.jpg")
Picture.create(user_id: 10, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 11, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537479/photo008.jpg")
Picture.create(user_id: 12, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537470/photo005.jpg")
Picture.create(user_id: 13, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537468/photo004.jpg")
Picture.create(user_id: 14, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537465/photo003.jpg")
Picture.create(user_id: 15, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537463/photo002.jpg")
Picture.create(user_id: 16, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537472/photo006.jpg")
Picture.create(user_id: 17, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537460/photo001.jpg")
Picture.create(user_id: 18, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537463/photo002.jpg")
Picture.create(user_id: 19, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537465/photo003.jpg")
Picture.create(user_id: 21, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537460/photo001.jpg")
Picture.create(user_id: 22, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537468/photo004.jpg")
Picture.create(user_id: 23, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 24, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537492/photo012.jpg")
Picture.create(user_id: 25, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537489/photo011.jpg")
Picture.create(user_id: 26, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537472/photo006.jpg")
Picture.create(user_id: 27, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537476/photo007.jpg")
Picture.create(user_id: 1, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537517/photo019.jpg")
Picture.create(user_id: 2, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 3, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537511/photo017.jpg")
Picture.create(user_id: 4, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537509/photo016.jpg")
Picture.create(user_id: 5, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537506/photo015.jpg")
Picture.create(user_id: 6, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537500/photo013.jpg")
Picture.create(user_id: 7, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537492/photo012.jpg")
Picture.create(user_id: 8, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537486/photo010.jpg")
Picture.create(user_id: 9, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537481/photo009.jpg")
Picture.create(user_id: 10, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 11, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537479/photo008.jpg")
Picture.create(user_id: 12, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537470/photo005.jpg")
Picture.create(user_id: 13, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537468/photo004.jpg")
Picture.create(user_id: 14, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537465/photo003.jpg")
Picture.create(user_id: 15, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537463/photo002.jpg")
Picture.create(user_id: 16, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537472/photo006.jpg")
Picture.create(user_id: 17, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537460/photo001.jpg")
Picture.create(user_id: 18, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537463/photo002.jpg")
Picture.create(user_id: 19, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537465/photo003.jpg")
Picture.create(user_id: 21, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537460/photo001.jpg")
Picture.create(user_id: 22, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537468/photo004.jpg")
Picture.create(user_id: 23, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537513/photo018.jpg")
Picture.create(user_id: 24, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537492/photo012.jpg")
Picture.create(user_id: 25, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537489/photo011.jpg")
Picture.create(user_id: 26, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537472/photo006.jpg")
Picture.create(user_id: 27, pic_url: "http://res.cloudinary.com/danny15002/image/upload/v1446537476/photo007.jpg")

# 100.times do
#   user = rand(1..25)
#   pic = rand(1..720)
#   num = sprintf '%03d', pic
#   Picture.create(
#     user_id: user,
#     pic_url: base + num + ".png"
#   )
# end

26.times do |i|
    ProfilePicture.create(
      user_id: i + 1,
      picture_id: i + 1
    )
end
