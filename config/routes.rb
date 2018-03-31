Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
  resources :movies, only: %i(create show index update destroy), defaults: { format: :json }
  post 'search', to: 'movies#search'
end
