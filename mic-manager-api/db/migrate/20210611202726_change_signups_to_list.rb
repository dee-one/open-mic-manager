class ChangeSignupsToList < ActiveRecord::Migration[6.1]
  def change
    rename_table :signups,:list
  end
end
