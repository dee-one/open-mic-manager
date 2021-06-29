class User < ApplicationRecord

 attr_accessor :password, :password_confirmation 





 validates :password_digest, presence: { message: 'Password can\'t be blank' },
 unless: Proc.new {|user|  !user.admin  }

  validates :password, length: { minimum: 6, allow_nil: true },
  unless: Proc.new {|user|  !user.admin  }



validates :first_name, :last_name, :email, :phone_number, presence: true,
   unless: Proc.new {|user|  user.admin  }


validates :email, uniqueness: true

#commented out to prevent another Admin account being created

def password=(password)
   @password = password
   self.password_digest = BCrypt::Password.create(password)
end


 def is_password?(password)
  BCrypt::Password.new(self.password_digest).is_password?(password)
 end

  def self.find_by_credentials(username, password)
  user = User.find_by(username: username)
   return nil if user.nil?
  user.is_password?(password) ? user : nil 
 end


end



