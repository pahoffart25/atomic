Rails.application.routes.draw do
  resources :user_tasks
  resources :job_tasks
  resources :notes
  resources :resumes
  resources :jobs
  resources :users
  resources :user_notes

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/users/:id/jobs", to: "jobs#index"
  get "/users/:id/notes", to: "user_notes#index"
  get "/users/:id/tasks", to: "user_tasks#index"
  get '/stats', to: "application#app_stats"
  

  post "/login", to: "auth#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"

end
