class Api::MessagesController < ApplicationController

  def index

    @id = current_user.id
    @messages = Message.where(public: true).
      where("to_id = #{@id} OR from_id = #{@id} OR (from_id IN (:network_ids) AND to_id IN (:network_ids))", network_ids: current_user.friend_ids).
      includes(:likes, :user_to, :comments, user_from: [:pictures, :profile_picture]).
      order(:created_at).reverse_order

    messages = []

    @messages.each do |message|
      messages.push(
        { id: message.id,
          author: message.user_from.username,
          recipient: message.user_to.username,
          profPic: message.user_from.profile_picture.pic_url,
          body: message.body,
          likes: message.likes.length,
          liked: message.likes.any? {|like| like.user_id == @id}, # TODO: can check this if there is a my like id instead
          myLikeId: message.users_like_id(@id),
          type: "Message",
          createdAt: message.format_message_time,
          comments: message.comments.length
          })
    end

    render json: messages
  end

  def show
    @id = current_user.id

    if params[:public] == 'true' # getting all messages to and from params[:id]
      @messages = Message.all.where(public: true).where("to_id = #{params[:id]} OR from_id = #{params[:id]}").includes(:comments, :likes, :user_to, user_from: [:pictures, :profile_picture]).order(:created_at).reverse_order
      @public = true
    elsif params[:public] == 'false'
      @messages = Message.all.where(public: false).where("(to_id = #{params[:user_id]} AND from_id = #{@id}) OR (to_id = #{@id} AND from_id = #{params[:user_id]})").includes(:user_to, :user_from).order(:created_at).reverse_order
    end
    ## TODO: Fix request for private messages
    messages = []

    if @public
      @messages.each do |message|
        messages.push(
          { id: message.id,
            author: message.user_from.username,
            recipient: message.user_to.username,
            profPic: message.user_from.profile_picture.pic_url,
            body: message.body,
            likes: message.likes.length,
            liked: message.likes.any? {|like| like.user_id == @id}, # TODO: can check this if there is a my like id instead
            myLikeId: message.users_like_id(@id),
            type: "Message",
            createdAt: message.format_message_time,
            comments: message.comments.length
            })
      end
    else
      @messages.each do |message|
        messages.push(
        { id: message.id,
          from_id: message.from_id,
          to_id: message.to_id,
          body: message.body,
          author: message.user_from.username,
          recipient: message.user_to.username,
          created_at: message.format_message_time})
      end
    end

    render json: messages
  end

  def create
    @message = Message.create(message_params)

    if @message.save
      # Message.activity(@message)
      render json: {} #must return an object for AJAX success callback to trigger
    else
      render json: "failed"
    end
  end

  def destroy
    Message.where(id: params[:id]).destroy_all
    render json: {}
  end
  private
  def message_params
    params.require(:message).permit(:to_id, :from_id, :body, :public)
  end
end
