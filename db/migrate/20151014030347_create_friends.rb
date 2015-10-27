class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.integer :requester_id, null: false
      t.integer :accepter_id, null: false

      t.timestamps null: false
    end

    add_index :friends, :requester_id
    add_index :friends, :accepter_id
  end
end
