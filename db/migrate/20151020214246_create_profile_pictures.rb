class CreateProfilePictures < ActiveRecord::Migration
  def change
    create_table :profile_pictures do |t|
      t.integer :user_id, null: false
      t.integer :picture_id, null: false

      t.timestamps null: false
    end

    add_index :profile_pictures, :user_id, unique: true
    add_index :profile_pictures, :picture_id, unique: true
  end
end
