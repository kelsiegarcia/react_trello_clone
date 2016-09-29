Rails.application.routes.draw do
  # get 'items/index'

 root 'boards#index'

  resources :boards do
    resources :lists
  end
  
  resources :items

end
