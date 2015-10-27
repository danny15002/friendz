class RenameFriendshipColumns < ActiveRecord::Migration
  def change
    rename_column :friendships, :requester_id, :user_id
    rename_column :friendships, :accepter_id, :friend_id
  end
end
