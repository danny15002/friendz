class FixProfilePic < ActiveRecord::Migration
  def change
    change_column :profile_pictures, :picture_id, :integer, unique: false
  end
end
