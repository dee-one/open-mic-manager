class Api::ListController < ApplicationController





def index 
  list = User.where(on_list: true)
  
  render json: ListSerializer.new(list)
  
end

 def create
  
  list_params.each do |user|
    attributes = user[:attributes]
    user[:attributes][:on_list] = true
    user = User.find_by(id: attributes[:id])
    
    user.update!(attributes)
    
  end
   
   
    render json: {}, status: 200
  

 end

#  def password=(password)
    # self.password_digest = BCrypt::Password.create(password)
#  end

#  def is_password?(password)
    # BCrypt::Password.new(self.password_digest).is_password?(password)
  # end






private

def list_params 
 params.require(:list).map do |controller_instance|

 controller_instance.permit(attributes: [
     :id,
     :first_name,
     :last_name,
     :set_duration,
     :set_complete,
     :on_list]
     )
 end
     
end




end
