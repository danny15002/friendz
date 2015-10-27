class AddToTables < ActiveRecord::Migration
  def change
    add_column :comments, :user_id, :integer, null: false
    add_column :likes, :user_id, :integer, null: false
  end
end
