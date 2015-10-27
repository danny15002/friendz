class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.integer :user_id, null: false
      t.string :pic_url, null: false

      t.timestamps null: false
    end

    add_index :pictures, :user_id
  end
end
