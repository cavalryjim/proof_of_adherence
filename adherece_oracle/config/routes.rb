Rails.application.routes.draw do
  
  resources :photos
  #resources :meals
  #resources :readings
  resources :patients do
    resources :readings
    resources :patient_devices
    resources :meals
  end
  devise_for :users, path_prefix: 'he' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :users do
    resources :user_devices
  end
    
  resources :devices
  
  namespace :api, defaults: {format: :json} do
    namespace :he1 do 
      post 'registrations/register_user' => 'registrations#register_user'
      #post 'registrations/hc-create-patient' => 'registrations#hc_create_patient'
      #resources :devices, only: [:index] 
      resources :patient_devices, only: [:index]
      resources :readings do
        post :batch_create, on: :collection
      end
      resources :meals do
        resources :photos, only: [:index]
      end
      resources :photos
    end
  end
  
  root 'users#home'
end
