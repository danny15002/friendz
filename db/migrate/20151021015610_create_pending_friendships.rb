class CreatePendingFriendships < ActiveRecord::Migration
  def change
    create_table :pending_friendships do |t|
      t.integer :requester_id, null: false
      t.integer :accepter_id, null: false

      t.timestamps null: false
    end

    add_index :pending_friendships, :requester_id
    add_index :pending_friendships, :accepter_id
  end
end
