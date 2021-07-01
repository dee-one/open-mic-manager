class ListSerializer
  include JSONAPI::Serializer
  
  attributes :id,:set_duration, :set_complete, :first_name, :last_name,:position

 
end
