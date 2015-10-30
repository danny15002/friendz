class Api::MessagesController < ApplicationController

  def index

    id = current_user.id
    messages = Message.get_newsfeed(id)

    render json: messages
  end

  def show
    id = current_user.id

    if params[:public] == 'true' # getting all messages to and from params[:id]
      messages = Message.get_wall_posts(params[:id])
    elsif params[:public] == 'false'
      messages = Message.get_private_conversation(id, params[:user_id])
    end

    render json: messages
  end

  def create
    @message = Message.create(message_params)

    if @message.save
      # Message.activity(@message)
      id = current_user.id
      messages = Message.get_newsfeed(id)
      # messages = Message.get_wall_posts(params[:id])

      render json: messages
    else
      render json: "failed"
    end
  end

  def destroy
    is_public = Message.where(id: params[:id]).first.public
    Message.where(id: params[:id]).destroy_all

    id = current_user.id
    messages = Message.get_newsfeed(id)

    render json: messages
  end
  private
  def message_params
    params.require(:message).permit(:to_id, :from_id, :body, :public)
  end
end
