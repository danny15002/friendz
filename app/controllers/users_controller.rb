class UsersController < ApplicationController

  def index
    @users = User.all.limit(100)
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params) # need username and password.

    if @user.save
      log_in!(@user)
      payload = {id: current_user.id, username: current_user.username, prof_pic: current_user.profile_picture}
      token = JWT.encode payload, nil, 'none'

      Friendship.create(
        friend_id: 1000,
        user_id: current_user.id
      )

      Message.create(
        from_id: 1000,
        to_id: current_user.id,
        body: "Welcome to Friendz! Feel free to look around. Search for users in the search bar to add friends.",
        public: true
      )

      ProfilePicture.create(
        user_id: current_user.id,
        picture_id: 128
      )
      render json: {id_token: token}
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: {error: flash.now[:errors]}, status: 422
    end
  end

  def show

    user = User.where(id: params[:id]).first
    friendship = user.friendship_status(current_user)
    user = {
      id: user.id,
      username: user.username,
      profPic: user.profile_picture.pic_url,
      friendship: friendship[:are_friends],
      friendship_id: friendship[:friendship_id] }


    render json: user.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :password, :password_confirmation)
    end
end
