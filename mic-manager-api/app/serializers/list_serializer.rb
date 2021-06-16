class ListSerializer
  include JSONAPI::Serializer
  
  attributes :id,:set_duration, :start_time

  belongs_to :user, serializer: UserSerializer

  collection_attr = [:user]

   collection_attr.each do |attr|
    attribute attr, if: Proc.new {|user,params|
     params && !params[:collection]
   }
   end
end
