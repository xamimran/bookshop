class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.integer :manager_id
      t.string :name_or_title
      t.string :img_url
      t.string :manufacturer_or_author
      t.integer :price_per_item, default: 0
      t.integer :qty, default: 0
      t.integer :total_sold, default: 0

      t.timestamps
    end
    add_column :items, :active, :boolean, default: true
  end
end
