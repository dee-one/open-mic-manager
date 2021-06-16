class UserSerializer
  include JSONAPI::Serializer
  
  
  attributes :id,:first_name, :last_name,:points, :first_timer,:headliner_or_feature,:employee,:admin
end
