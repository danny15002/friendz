class Api::EventsController < ApplicationController

  def index
    @events = current_user.friends_events
    @events += current_user.created_events

    render :index
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
