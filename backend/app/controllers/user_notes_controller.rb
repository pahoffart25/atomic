class UserNotesController < ApplicationController

  def index 
    # notes = UserNote.all 
    # render json: notes
    user = User.find(params[:id])
    notes = user.user_notes 
    render json: notes
  end

  def create 
    note = UserNote.create(strong_params)
    render json: note
  end

  def update 
    note = UserNote.find(params[:id])
    # user = note.user_id
    note.update(strong_params)
    render json: note
  end

  def destroy
    note = UserNote.find(params[:id])
    user = User.find(note.user_id)
    note.destroy()
    remainingNotes = user.user_notes
    render json: remainingNotes
  end

  private 

  def strong_params 
    params.require(:user_note).permit(:title, :content, :category, :user_id)
  end

end
