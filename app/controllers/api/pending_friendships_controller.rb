class Api::PendingFriendshipsController < ApplicationController

  def index
    @pending_friendships = current_user.pending_friendships.includes(:requester)

    requests = []

    @pending_friendships.each do |request|
      requests.push(
        {
          id: request.id,
          from_id: request.requester_id,
          to_id: request.accepter_id,
          request: request.requester.username
        }
      )
    end

    render json: requests.to_json
  end

  def create
    @pending_friendship = PendingFriendship.create(pending_friendship_params)

    if @pending_friendship.save
      render json: {}
    else
      render json: {status: 420}
    end
  end

  def destroy
    @pending_friendship = PendingFriendship.find(params[:id])
    PendingFriendship.destroy(@pending_friendship)

    render json: {}
  end


  private
  def pending_friendship_params
    params.require(:pending_friendship).permit(:requester_id, :accepter_id)
  end

end
