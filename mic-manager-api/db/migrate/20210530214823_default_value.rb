class DefaultValue < ActiveRecord::Migration[5.2]
  def change
     change_column :users, :points, :integer, null: false, default: 0
     
  end
end
