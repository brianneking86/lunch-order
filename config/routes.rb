Rails.application.routes.draw do
  mount API::Base => '/api'

  root 'home#index'
end