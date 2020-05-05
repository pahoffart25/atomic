class NotesController < ApplicationController

  def index
    notes = Note.all 
    render json: notes
  end

  def show
    note = Note.find(params[:id])
    render json: note
  end

  def update 
    note = Note.find(params[:id])
    note.update(strong_params)
    render json: note
  end

  def create 
    newNote = Note.create(strong_params)
    render json: newNote
  end

  def destroy 
    note = Note.find(params[:id])
    job = Job.find(note.job_id)
    note.destroy()
    remainingNotes = job.notes 
    render json: remainingNotes
  end

  private 

  def strong_params 
    params.require(:note).permit(:content, :job_id)
  end
end
