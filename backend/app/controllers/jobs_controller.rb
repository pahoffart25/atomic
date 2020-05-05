class JobsController < ApplicationController

  def index 
    user = User.find(params[:id])
    jobs = user.jobs 
    jobs.empty? ? jobs = false : jobs = jobs
    render json: jobs
  end

  def show 
    job = Job.find(params[:id])
    notes = job.notes 
    tasks = job.job_tasks
    render json: {notes: notes, tasks: tasks}
  end

  def update 
    job = Job.find(params[:id])
    job.update(strong_params)
    render json: job
    # # have a model method that checks to see if swith not applied follow-up 
    # # if true, date_appled = Date.today or something
    # job = Job.find(params[:id])
    # prevStatus = job.status
    # newStatus = strong_params.status
    # if prevStatus === "Not Applied" && newStatus === "follow-up"
    #   date_applied = Time.now.to_s.slice(0, 10)  #"2020-04-14" 
    # end
    # # but now what if the user wanted to select their own date 
    # job.update(strong_params)
    # render json: job
  end

  def create
    newJob = Job.create(strong_params)
    render json: newJob
  end

  def destroy 
    job = Job.find(params[:id])
    user = User.find(job.user_id)
    job.destroy()
    jobs = user.jobs 
    render json: jobs
  end

  private 

  def strong_params
    params.require(:job).permit(:title, :company, :status, :interview, :location, :url, :user_id, :dateApplied)
  end


end
