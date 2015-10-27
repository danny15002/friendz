Rails.application.routes.draw do
  resource :session, only: [:new, :create, :show, :destroy]
  resources :users, only: [:new, :create]
  resources :users, defaults: {format: :json}, only: [:index, :show]
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :messages, only: [:create, :index, :show, :destroy]
    resources :events, only: [:create, :index, :show, :destroy]
    resources :pictures, only: [:create, :index, :show, :destroy]
    resources :comments, only: [:create, :index, :show, :destroy]
    resources :friendships, only: [:index, :create, :destroy]
    resources :pending_friendships, only: [:index, :create, :destroy]
    resources :likes, only: [:create, :destroy]
  end

  get '*unmatched_route', to: 'application#not_found'
end
