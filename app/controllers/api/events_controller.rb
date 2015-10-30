class Api::EventsController < ApplicationController

  def index
    @events = current_user.friends_events
    @events += current_user.created_events

    render :index
  end


  # def index
  #   id = current_user.id
  #
  # end

  def create
    p params
    @event = Event.create(event_params)

    if @event.save
      render json: {}
    else
      render json: "failed"
    end
  end

  private
  def event_params
    params.require(:event).permit(:creator_id, :title, :description, :date, :location)
  end

  end


  # SELECT
  #   comments.id, COUNT(comments2) AS comments, COUNT(likes) AS likes,
  #   authors.username AS author,
  #   pictures.pic_url as \"profPic\",
  #   comments.body,
  #   CASE WHEN likes.id IS NULL THEN FALSE ELSE TRUE END AS liked,
  #   CASE WHEN likes.user_id = #{id} THEN likes.id ELSE NULL END AS \"myLikeId\",
  #   'Comment' AS type,
  #   comments.created_at AS \"createdAt\"
  # FROM
  #   comments
  # LEFT OUTER JOIN
  #   comments comments2 ON comments.id = comments2.commentable_id
  # LEFT OUTER JOIN
  #   likes ON  comments.id = likes.likeable_id
  # JOIN
  #   users authors ON comments.user_id = authors.id
  # JOIN
  #   profile_pictures ON profile_pictures.user_id = authors.id
  # JOIN
  #   pictures ON profile_pictures.picture_id = pictures.id
  # WHERE
  #   (comments2.commentable_type = 'Comment' OR comments2.commentable_id IS NULL) AND
  #   (likes.likeable_type = 'Comment' OR likes.likeable_id IS NULL) AND
  #   comments.commentable_type = '#{params[:commentable_type]}' AND
  #   comments.commentable_id = '#{params[:commentable_id]}'
  # GROUP BY
  #   comments.id, authors.id, pictures.pic_url, likes.id
  # ORDER BY
  #   comments.created_at DESC


  # SELECT
  #   comments.id, COUNT(comments2) AS comments, COUNT(likes) AS likes
  # FROM
  #   comments
  # LEFT OUTER JOIN
  #   comments comments2 ON comments.id = comments2.commentable_id
  # LEFT OUTER JOIN
  #   likes ON  comments.id = likes.likeable_id
  # WHERE
  #   (comments2.commentable_type = 'Comment' OR comments2.commentable_id IS NULL) AND
  #   (likes.likeable_type = 'Comment' OR likes.likeable_id IS NULL)
  # GROUP BY
  #   comments.id
  # ORDER BY
  #   comments.created_at DESC
