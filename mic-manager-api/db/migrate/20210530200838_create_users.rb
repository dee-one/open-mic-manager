class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :phone_number
      t.integer :points, null: false
      t.boolean :first_timer
      t.boolean :headliner_or_feature
      t.boolean :employee
      t.boolean :admin
      t.timestamps
    end
    add_index :users, :email
  end
end
