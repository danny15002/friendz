class Api::PicturesController < ApplicationController

  def index
    if params[:id]
      # @pictures = User.find(params[:id]).pictures.includes(:comments)
      @pictures = Picture.all.where(user_id: params[:id]).includes(:comments)
    else
      # @pictures = current_user.pictures.includes(:comments)
      @pictures = Picture.all.where(user_id: current_user.id).includes(:comments)
    end

    pictures = []
    @id = current_user.id

    @pictures.each do |picture|
      pictures.push(
      {
        id: picture.id,
        pic_url: picture.pic_url,

        comments: picture.comments.map {|comment| {
          id: comment.id,
          author: comment.user.username,
          profPic: comment.user.profile_picture.pic_url,
          body: comment.body,
          likes: comment.likes.length,
          liked: comment.likes.any? {|like| like.user_id == @id}, # TODO: can check this if there is a my like id instead
          myLikeId: comment.users_like_id(@id),
          type: "Comment",
          createdAt: comment.format_comment_time,
          comments: comment.comments.length
          }}
        })
    end

    render json: pictures
  end

  def create
    p params
    @picture = Picture.create(picture_params)

    if @picture.save
      @pictures = Picture.where(user_id: params[:picture][:user_id]).includes(comments: [user: [:picture, :profile_picture]])
      pictures = []
      @pictures.each do |picture|
        pictures.push(
        {
          id: picture.id,
          pic_url: picture.pic_url,

          comments: picture.comments.map {|comment| {
            id: comment.id,
            author: comment.user.username,
            profPic: comment.user.profile_picture.pic_url,
            body: comment.body,
            likes: comment.likes.length,
            liked: comment.likes.any? {|like| like.user_id == @id}, # TODO: can check this if there is a my like id instead
            myLikeId: comment.users_like_id(@id),
            type: "Comment",
            createdAt: comment.format_comment_time,
            comments: comment.comments.length
            }}
          })
      end

      render json: pictures.to_json
    else
      render json: "failed"
    end

  end

  private
  def picture_params
    params.require(:picture).permit(:user_id, :pic_url)
  end
end
