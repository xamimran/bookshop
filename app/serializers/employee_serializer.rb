class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :manager_id, :name, :email, :active, :bookshop_name, :bookshop_items_alert_limit
  has_many :salesTransactions
  def bookshop_name
    self.object.manager.bookshop_name
  end
  def bookshop_items_alert_limit
    self.object.manager.bookshop_items_alert_limit
  end
end
