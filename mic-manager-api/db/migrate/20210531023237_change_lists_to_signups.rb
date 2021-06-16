class ChangeListsToSignups < ActiveRecord::Migration[5.2]
  def change
    rename_table :lists, :signups
  end
end
