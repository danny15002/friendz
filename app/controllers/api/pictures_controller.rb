class Api::PicturesController < ApplicationController

  def index
    if params[:id]
      # @pictures = User.find(params[:id]).pictures.includes(:comments)
      @pictures = Picture.all.where(user_id: params[:id]).includes(:comments)
    else
      # @pictures = current_user.pictures.includes(:comments)
      @pictures = Picture.all.where(user_id: current_user.id).includes(:comments)
    end
    
    render :index
  end

  def create
    p params
    @picture = Picture.create(picture_params)

    if @picture.save
      render json: {}
    else
      render json: "failed"
    end

  end

  private
  def picture_params
    params.require(:picture).permit(:user_id, :pic_url)
  end
end
