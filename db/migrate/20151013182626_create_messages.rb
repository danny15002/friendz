class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :from_id, null: false
      t.integer :to_id, null: false
      t.text :body, null: false
      t.boolean :public, default: false

      t.timestamps null: false
    end

    add_index :messages, :from_id
    add_index :messages, :to_id
  end
end
