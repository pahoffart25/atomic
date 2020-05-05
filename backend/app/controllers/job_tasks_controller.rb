class JobTasksController < ApplicationController

  def index
     tasks = JobTask.all 
     render json: tasks
  end

  def show 
    task = JobTask.find(params[:id])
    render json: task
  end

  def update
    task = JobTask.find(params[:id])
    task.update(strong_params)
    render json: task 
  end

  def create 
    newTask = JobTask.create(strong_params)
    render json: newTask
  end

  def destroy 
    task = JobTask.find(params[:id])
    job = Job.find(task.job_id)
    task.destroy()
    remainingTasks = job.job_tasks 
    render json: remainingTasks
  end

  private 
  
  def strong_params
    params.require(:job_task).permit(:item, :closed, :job_id)
  end

end
