class Api::LikesController < ApplicationController

  def create
    p params
    @like = Like.create(like_params)

    if @like.save
      render json: {}
    else
      render json: "failed"
    end
  end

  def destroy
    @like = Like.find(params[:id])
    Like.destroy(@like)

    render json: {}
  end

  private
  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :user_id)
  end

  end
