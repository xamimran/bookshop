class SaleSerializer < ActiveModel::Serializer
  attributes :id, :sales_transaction_id, :item, :item_price_at_sale, :qty
end
