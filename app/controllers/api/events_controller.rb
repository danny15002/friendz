class Api::EventsController < ApplicationController

  # def index
  #   @events = current_user.friends_events
  #   @events += current_user.created_events
  #
  #   render :index
  # end

  def index
    id = current_user.id

    response = Message.connection.select_all("
      SELECT
        friendships.friend_id
      FROM
        users
      LEFT OUTER JOIN
        friendships ON friendships.user_id = users.id
      WHERE
        users.id = #{id}
    ")
    render json: response
  end

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
