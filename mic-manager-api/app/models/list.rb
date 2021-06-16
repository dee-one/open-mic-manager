class List < ApplicationRecord
self.table_name = 'list'

    belongs_to :user
validates :user_id, :set_duration, :position, presence: true
validates :user_id, uniqueness: {message: "comic is already on list"}


end
     