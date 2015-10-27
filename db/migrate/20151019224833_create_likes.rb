class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :likeable_id, null: false
      t.string :likeable_type, null: false

      t.timestamps null: false
    end

    add_index :likes, :likeable_id
  end
end
