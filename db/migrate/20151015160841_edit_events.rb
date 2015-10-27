class EditEvents < ActiveRecord::Migration
  def change

    change_column :events, :creator_id, :integer, null: false
  end
end
