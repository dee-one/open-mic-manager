class Api::ListController < ApplicationController





def index 
  @list = List.all
  options = {include: [:user]}
  render json: ListSerializer.new(@list,options)
  
end

 def create
  @list_item = List.new(list_item_params)
   if @comic.save
    render json: {}, status: 200
   end

 end

#  def password=(password)
    # self.password_digest = BCrypt::Password.create(password)
#  end

#  def is_password?(password)
    # BCrypt::Password.new(self.password_digest).is_password?(password)
  # end






private

def list_item_params
  params.require(:list).permit(:user_id,:set_duration,:position,:start_time)
end


end
