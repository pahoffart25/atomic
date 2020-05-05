class ApplicationController < ActionController::API
  
  before_action :require_login
  skip_before_action :require_login, only: :app_stats

  def encode_token(payload)
      JWT.encode(payload, 'my_secret')
  end

  def auth_header
      request.headers['Authorization']
  end

  def decoded_token
      if auth_header
          token = auth_header.split(' ')[1]
          begin
              JWT.decode(token, 'my_secret', true, algorithm: 'HS256')
          rescue JWT::DecodeError
              []
          end
      end
  end

  def session_user
      decoded_hash = decoded_token
      if !decoded_hash.empty? 
          puts decoded_hash.class
          user_id = decoded_hash[0]['user_id']
          @user = User.find_by(id: user_id)
          user = {name: @user.username, id: @user.id}
      else
          nil 
      end
  end

  def logged_in?
      !!session_user
  end

  def require_login
   render json: {message: 'Please Login'}, status: :unauthorized unless logged_in?
  end

  def app_stats
    stats = [
      {name: "Users registered", value: User.all.count},
      {name: "Job Postings saved", value: Job.all.count},
      {name: "Tasks assigned", value: JobTask.all.count + UserTask.all.count},
      {name: "Notes Created", value: Note.all.count + UserNote.all.count}
    ]
    render json: stats
  end
end
