class AddDateApplied < ActiveRecord::Migration[6.0]
  def change
    add_column :jobs, :dateApplied, :string
  end
end
