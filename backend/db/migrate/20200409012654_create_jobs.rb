class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.string :title 
      t.string :company
      t.string :status # "apply" "follow-up" "closed"
      t.boolean :interview
      t.string :location 
      t.string :url
      t.timestamps

      t.integer :user_id
    end
  end
end
