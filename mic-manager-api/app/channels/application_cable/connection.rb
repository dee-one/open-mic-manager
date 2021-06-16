module ApplicationCable
  class Connection < ActionCable::Connection::Base
    #identified_by :current_user


    # def connect
    #  session = cookies.encrypted['_session']
    #  self.current_user = session['user_id'] if session.present?
    
    # end
  
  end
end
