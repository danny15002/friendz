class Api::LikesController < ApplicationController

  def create
    p params
    @like = Like.create(like_params)

    if @like.save
      id = current_user.id
      messages = Message.get_newsfeed(id)

      render json: messages
    else
      render json: "failed"
    end
  end

  def destroy
    @like = Like.find(params[:id])
    Like.destroy(@like.id)

    id = current_user.id
    messages = Message.get_newsfeed(id)

    render json: messages
  end

  private
  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :user_id)
  end

end
