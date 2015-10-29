class Api::CommentsController < ApplicationController

  def index
    @id = current_user.id
    @c_id = params[:commentable_id]
    @type = params[:commentable_type]
    @comments = Comment.all.where(commentable_type: @type,
                                  commentable_id: @c_id).includes(user: [:pictures, :profile_picture])


    response = {
      commentableId: @c_id,
      type: @type,
      comments: @comments.map {|comment| {
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
        }}}

    render json: response
  end

  def create
    p params
    @comment = Comment.create(comment_params)

    if @comment.save
      render json: @comment
    else
      render json: "failed"
    end
  end

  def destroy
    Comment.where(id: params[:id]).destroy_all
    render json: {}
  end

  private
  def comment_params
    params.require(:comment).permit(:body,
                                    :commentable_id,
                                    :commentable_type,
                                    :user_id)
  end

  end
