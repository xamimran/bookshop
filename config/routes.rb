Rails.application.routes.draw do
  resources :sales_transactions
  resources :items
  resources :employees
  resources :managers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  post "/login", to: "jwt#create"
  delete "/logout", to: "jwt#destroy"
  post "/signup", to: "managers#create"
  delete "/me", to: "managers#destroy"
  get "/me", to: "application#show_user"
  patch "/me", to: "managers#update"


end
