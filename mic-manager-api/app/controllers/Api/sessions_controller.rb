class Api::SessionsController < ApplicationController

def create 
 
  user = User.find_by_credentials(session_params[:username],session_params[:password])
  p 'in action'
  if user
    p 'successfull'
    session[:user_id] = user.id
    render json: {status: 200,logged_in: true,currentUser: UserSerializer.new(user)}
  
 
 else
    render json: { status: 401 }
 end
end








def generate_token
  form_authenticity_token
end










def destroy
logout!
 render json: { status: 200, logged_out: true }
end

 private
 
 def session_params
   params.require(:session).permit(:username,:password)
 end






end
