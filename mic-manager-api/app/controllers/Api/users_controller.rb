class Api::UsersController < ApplicationController
  before_action :ensure_not_signed_up, only: [:create]
   
  # GET /users or /users.json
  def index
    @signed_up_users = User.where(signed_up: true)
    render json: UserSerializer.new(@signed_up_users)
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @comic = User.find_by(email: comic_params[:email])
    
    first_time_check = @comic ? false : true
  
     if !@comic
      new = true
      
      @comic = User.new(comic_params.merge({signed_up: true}))
      @comic.points += 100 
     end
    
    @comic.points += 25 
    @comic.signed_up = true 
    @comic.first_timer = first_time_check
     
     if @comic.save || !first_time_check
    
      session[:user_id] = @comic.id
      
       render json: {
     status: :created,
     logged_in: true,
     user:  UserSerializer.new(@comic),
     session: session
  
    }

      return
   
    
      else
        render json: {errors: @comic.errors, status: :unprocessable_entity}
      end
  
  end

  # PATCH/PUT /users/1 or /users/1.json
  
  private
    # Use callbacks to share common setup or constraints between actions.
   def ensure_not_signed_up
    
      @comic = User.find_by(email: comic_params[:email])
       return if !@comic
      
        if @comic.signed_up 
          session[:user_id] = @comic.id
    
         render json: {
             status: :created,
             logged_in: true,
            user:  UserSerializer.new(@comic),
            current_user: current_user
           
         }
       end
   end

    # Only allow a list of trusted parameters through.
    def comic_params
  
     params.require(:comic).permit(:first_name,:last_name,:email,:phone_number,:first_timer,:password)
   end

end
