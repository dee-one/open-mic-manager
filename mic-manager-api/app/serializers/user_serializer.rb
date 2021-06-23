class UserSerializer
  include JSONAPI::Serializer
  
  
  attributes :id,:first_name, :last_name,:points, :first_timer,:headliner_or_feature,:employee,:admin,:on_list,:set_duration,:set_complete
end
