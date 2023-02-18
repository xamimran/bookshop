class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name_or_title, :img_url, :manufacturer_or_author, :price_per_item, :qty, :total_sold, :active
end
