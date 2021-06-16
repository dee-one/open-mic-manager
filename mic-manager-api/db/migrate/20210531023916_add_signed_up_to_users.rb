class AddSignedUpToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :signed_up, :boolean,default: false
  end
end
