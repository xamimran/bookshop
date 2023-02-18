class Manager < ApplicationRecord
    has_secure_password
    has_many :items, dependent: :destroy
    has_many :sales, through: :items
    has_many :employees, dependent: :destroy
    has_many :salesTransactions, through: :employees
    validates :email, presence: true, uniqueness: true
    validates :bookshop_name, presence: true
    validates :bookshop_items_alert_limit, presence: true
end
