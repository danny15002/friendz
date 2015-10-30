class Api::CommentsController < ApplicationController

  def index
    id = current_user.id
    response = {}
    response[:commentableId] = params[:commentable_id]
    response[:type] = params[:commentable_type]
    response[:comments] = Comment.get_comments(params[:commentable_id], id)

    render json: response
  end

  def create
    p params
    @comment = Comment.create(comment_params)
    id = current_user.id

    if @comment.save
      if @comment.commentable_type == 'Message'
        response = Message.get_newsfeed(id)
      end
      render json: response
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
