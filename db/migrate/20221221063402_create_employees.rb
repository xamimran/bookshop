class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.integer :manager_id
      t.string :name
      t.string :email
      t.string :password_digest

      t.timestamps 
    end
    add_column :employees, :active, :boolean, default: true
  end
end
