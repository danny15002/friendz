class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :creator_id
      t.string :title, null: false
      t.string :description
      t.date :date, null: false
      t.string :location

      t.timestamps null: false
    end

    add_index :events, :creator_id
  end
end
