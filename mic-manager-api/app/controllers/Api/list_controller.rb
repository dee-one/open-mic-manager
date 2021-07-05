class Api::ListController < ApplicationController





def index 
  list = User.where(on_list: true).order(position: :asc)
  
  render json: ListSerializer.new(list)
  
end

 def create
  @users = User.where(signed_up: true)
  list_params.each_with_index do |user,index|
    p index
    attributes = user[:attributes]
    user[:attributes][:on_list] = true

    user[:attributes][:position] = index

    user = @users.find_by(id: attributes[:id])
    
    user.update!(attributes)
    
  end
   
  list = User.where(on_list: true).order(position: :asc)
  render json: ListSerializer.new(list), status: 200

 end

#  def password=(password)
    # self.password_digest = BCrypt::Password.create(password)
#  end

#  def is_password?(password)
    # BCrypt::Password.new(self.password_digest).is_password?(password)
  # end

  def update_onstage_peformer_id
    previously_onstage = current_peformer
    if previously_onstage 
      previously_onstage.update(on_stage: false)
    end
    currently_onstage = User.find_by(id: params[:on_stage_id])
   if currently_onstage.update(on_stage:true)
      render json: {status: 200}
   end
    
  end





private

def list_params 
 params.require(:list).map do |controller_instance|

 controller_instance.permit(attributes: [
     :id,
     :first_name,
     :last_name,
     :set_duration,
     :set_complete,
     :on_list,
     :position
    ]
     )
 end
     
end




end
