class Api::SessionsController < ApplicationController

def create 
 
  user = User.find_by_credentials(session_params[:username],session_params[:password])
  
  if user
    session[:user_id] = user.id
    render json: {
     status: :created,
     logged_in: true,
     user: user
    }
  
 
 else
    render json: { status: 401 }
 end
end

def logout
    logout!
    render json: { status: 200, logged_out: true }
end






def generate_token
  form_authenticity_token
end










def destroy
 logout!
  #maybe send logout info as JSON response
end

 private
 
 def session_params
   params.require(:session).permit(:username,:password)
 end






end
