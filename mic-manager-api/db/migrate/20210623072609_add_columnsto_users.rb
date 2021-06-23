class AddColumnstoUsers < ActiveRecord::Migration[6.1]
  def change
     add_column :users, :set_duration, :integer
     add_column :users, :on_list, :boolean, default: false
     add_column :users, :set_complete, :boolean, default: false
  end
end
