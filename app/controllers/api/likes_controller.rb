class Api::LikesController < ApplicationController

  def create
    p params
    @like = Like.create(like_params)

    if @like.save
      id = current_user.id
      response = {}

      if @like.likeable_type == 'Message'
        if params[:wall] == 'true'
          response = Message.get_wall_posts(id, params[:profile_id])
        else
          response = Message.get_newsfeed(id)
        end
      end
      if @like.likeable_type == 'Comment'
        # find all [subcomments] of the [comment that was commented on]'s [parent]
        # in other words find all the siblings of the comment being commented on
        commented_on = Comment.get_siblings(params[:like][:likeable_id])

        response[:commentableId] = commented_on["commentable_id"]
        response[:type] = commented_on["commentable_type"]
        response[:comments] = Comment.get_comments(
          commented_on["commentable_id"],
          commented_on["commentable_type"],
          id)
      end

      render json: response
    else
      render json: "failed"
    end
  end

  def destroy
    like = Like.find(params[:id])
    Like.destroy(like.id)

    id = current_user.id
    response = {}

    if like.likeable_type == 'Message'
      if params[:wall] == 'true'
        response = Message.get_wall_posts(id, params[:profile_id])
      else
        response = Message.get_newsfeed(id)
      end
    end
    if like.likeable_type == 'Comment'
      # find all [subcomments] of the [comment that was commented on]'s [parent]
      # in other words find all the siblings of the comment being commented on
      commented_on = Comment.get_siblings(like.likeable_id)

      response[:commentableId] = commented_on["commentable_id"]
      response[:type] = commented_on["commentable_type"]
      response[:comments] = Comment.get_comments(
        commented_on["commentable_id"],
        commented_on["commentable_type"],
        id)
    end

    render json: response
  end

  private
  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :user_id)
  end

end
