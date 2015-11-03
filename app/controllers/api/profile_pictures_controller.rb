class Api::ProfilePicturesController < ApplicationController

  def update
    id = current_user.id
    @pic = ProfilePicture.where(user_id: id).first
    if @pic.update_attributes(profile_picture_params)
      render json: {}
    else
      render json: {}
    end
  end


  private
  def profile_picture_params
    params.require(:profile_picture).permit(:picture_id, :user_id)
  end
end
