class Api::CommentsController < ApplicationController

  def index
    id = current_user.id
    response = {}
    response[:commentableId] = params[:commentable_id]
    response[:type] = params[:commentable_type]
    response[:comments] = Comment.get_comments(params[:commentable_id], params[:commentable_type], id)

    render json: response
  end

  def create
    p params
    @comment = Comment.create(comment_params)
    id = current_user.id
    response = {}

    if @comment.save
      if @comment.commentable_type == 'Message'
        response = Message.get_newsfeed(id)
      end
      if @comment.commentable_type == 'Comment'
        # find all [subcomments] of the [comment that was commented on]'s [parent]
        # in other words find all the siblings of the comment being commented on
        commented_on = Comment.get_siblings(params[:comment][:commentable_id])

        response[:commentableId] = commented_on["commentable_id"]
        response[:type] = commented_on["commentable_type"]
        response[:comments] = Comment.get_comments(
          commented_on["commentable_id"],
          commented_on["commentable_type"],
          id)
      end
      # Find all the subcomments of the comment being commented on
      if @comment.commentable_type == 'Comment'
        response[:subcomments] = Comment.get_comments(
          params[:comment][:commentable_id],
          params[:comment][:commentable_type],
          id)
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
