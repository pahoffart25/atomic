class CreateJobTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :job_tasks do |t|
      t.string :item
      t.boolean :closed
      # t.timestamps

      t.integer :job_id
    end
  end
end
