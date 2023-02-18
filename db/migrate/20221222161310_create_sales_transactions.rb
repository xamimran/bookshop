class CreateSalesTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :sales_transactions do |t|
      t.integer :amount
      t.integer :recieved
      t.integer :change
      t.integer :employee_id
      
      t.timestamps
    end
  end
end
