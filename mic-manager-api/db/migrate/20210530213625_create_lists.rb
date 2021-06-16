class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.integer :user_id
      t.integer :set_duration, null: false
      t.time :start_time
      
      t.timestamps
    end
  end
end
