Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]
   
    mount ActionCable.server => '/cable'
     root to: "application#cookie"
    
    namespace :api, defaults: { format: :json } do
    resources :users 
    resource :session, only: [:create,:destroy]
    resources :list, only: [:index,:create]
     put 'list/update_onstage_id', to: 'list#update_onstage_peformer_id'
     get 'list/currentlyPeformingIndex', to: 'list#onstage_index'
    get :logged_in, to: "sessions#logged_in?"
    
   

    end
end
