
if @profile
  json.array! @user do |user|

    json.id user.id
    json.name user.username
    json.profPic user.profile_picture.pic_url
    json.friendship user.friendship_status(@current_user)

  end
else

  json.array! @user do |user|

    json.id user.id
    json.name user.username
    json.profPic user.profile_picture.pic_url
    json.friendship user.friendship_status(@current_user)
  end
end
