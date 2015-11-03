class FixProfilePicIndex < ActiveRecord::Migration
  def change
    remove_index :profile_pictures, :picture_id
    add_index :profile_pictures, :picture_id
  end
end
