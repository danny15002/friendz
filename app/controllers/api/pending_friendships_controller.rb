class Api::PendingFriendshipsController < ApplicationController

  def index
    @pending_friendships = current_user.pending_friendships.includes(:requester)
    render :index
  end

  def create
    @pending_friendship = PendingFriendship.create(pending_friendship_params)

    if @pending_friendship.save
      render json: {}
    else
      render json: {status: 420}
    end
  end

  private
  def pending_friendship_params
    params.require(:pending_friendship).permit(:requester_id, :accepter_id)
  end

end
