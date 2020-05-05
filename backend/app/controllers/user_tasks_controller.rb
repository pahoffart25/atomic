class UserTasksController < ApplicationController

  def index 
    user = User.find(params[:id])
    tasks = user.user_tasks
    render json: tasks
  end

  def create 
    task = UserTask.create(strong_params)
    render json: task 
  end

  def update 
    task = UserTask.find(params[:id])
    task.update(strong_params)
    render json: task 
  end

  def destroy
    task = UserTask.find(params[:id])
    user = User.find(task.user_id)
    task.destroy()
    tasks = user.user_tasks
    render json: tasks
  end

  private 

  def strong_params
    params.require(:user_task).permit(:item, :closed, :user_id)
  end

end
