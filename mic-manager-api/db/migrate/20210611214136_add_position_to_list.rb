class AddPositionToList < ActiveRecord::Migration[6.1]
  def change
     add_column :list, :position, :integer
     List.all.each {|signup| signup.update(position: signup.id) } 
      change_column_null :list, :position, false
  end
end
