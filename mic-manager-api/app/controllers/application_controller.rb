class ApplicationController < ActionController::Base

     before_action :cors_set_access_control_headers
     before_action :set_csrf_cookie
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection
  
    protect_from_forgery with: :exception 
		
    def cookie 
      #p cookies
     # render json: cookies["CSRF-TOKEN"]
     "ok"
    end




def current_user
  @current_user ||= User.find_by(id: session[:user_id])
end




def logged_in?
   
  if current_user 
   render json: {
    loggedIn: true,
    user: UserSerializer.new(@current_user)
  }
 else 
  
  render json: {
   loggedIn: false
   
 }

 end
end


def login!(user)
  session[:sesion_token] = user.session_token
end

def logout!
  session[:user_id] = nil
end

helper_method :current_user


def cors_preflight_check
  if request.method == 'OPTIONS'
    cors_set_access_control_headers
    render text: '', content_type: 'text/plain'
  end
end

protected

def cors_set_access_control_headers
  #maybe check on the line below this and uncomment it ? or maybe not
    #response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token, Auth-Token, Email, X-User-Token, X-User-Email'
  response.headers['Access-Control-Max-Age'] = '1728000'
end



		
    private 
		
    def set_csrf_cookie
       cookies["CSRF-TOKEN"] = {
            value: form_authenticity_token,
            domain: :all 
        }
    end





end
