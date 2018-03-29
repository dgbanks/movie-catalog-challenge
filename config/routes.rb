Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "movies#index", defaults: { format: :json }
  resources :movies, only: %i(create show index update destroy), defaults: { format: :json }
end
