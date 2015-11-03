class Api::ProfilePicturesController < ApplicationController

  def update
    id = current_user.id
    @pic = ProfilePicture.where(user_id: id).first
    if @pic.update_attributes(profile_picture_params)
      payload = {id: current_user.id, username: current_user.username, profPic: current_user.profile_picture.pic_url}
      token = JWT.encode payload, nil, 'none'
      render json: {id_token: token}
    else
      render json: {}
    end
  end


  private
  def profile_picture_params
    params.require(:profile_picture).permit(:picture_id, :user_id)
  end
end
