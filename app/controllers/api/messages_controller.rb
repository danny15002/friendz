class Api::MessagesController < ApplicationController

  def index

    id = current_user.id
    messages = Message.get_newsfeed(id)

    render json: messages
  end

  def show
    id = current_user.id

    if params[:public] == 'true' # getting all messages to and from params[:id]
      messages = Message.get_wall_posts(id, params[:id])
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
      if params[:wall]
        messages = Message.get_wall_posts(id, params[:message][:to_id])
      else
        messages = Message.get_newsfeed(id)
      end

      render json: messages
    else
      render json: "failed"
    end
  end

  def destroy
    message = Message.where(id: params[:id]).first
    Message.destroy(message.id)

    id = current_user.id
    if params[:wall]
      messages = Message.get_wall_posts(id, message.to_id)
    else
      messages = Message.get_newsfeed(id)
    end

    render json: messages
  end
  private
  def message_params
    params.require(:message).permit(:to_id, :from_id, :body, :public)
  end
end
