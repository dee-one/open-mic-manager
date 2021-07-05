class AddonStagetoUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :on_stage, :boolean
  end
end
