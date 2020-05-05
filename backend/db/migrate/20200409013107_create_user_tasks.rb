class CreateUserTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :user_tasks do |t|
      t.string :item
      t.boolean :closed
      t.timestamps

      t.integer :user_id
    end
  end
end
