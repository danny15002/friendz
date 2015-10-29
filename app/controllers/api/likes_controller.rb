class Api::LikesController < ApplicationController

  def create
    p params
    @like = Like.create(like_params)

    if @like.save
      messages = {}
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
    else
      render json: "failed"
    end
  end

  def destroy
    @like = Like.find(params[:id])
    Like.destroy(@like)

    messages = {}
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

  private
  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type, :user_id)
  end

end
