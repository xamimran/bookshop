class ManagerSerializer < ActiveModel::Serializer
  attributes :name, :email, :bookshop_name, :bookshop_items_alert_limit
  has_many :employees
end
