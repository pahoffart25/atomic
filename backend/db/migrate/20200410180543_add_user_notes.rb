class AddUserNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :user_notes do |t|
      t.string :title
      t.string :content
      t.string :category # "event" "lead" "company"
      # t.timestamps
      t.integer :user_id
    end
  end
end
