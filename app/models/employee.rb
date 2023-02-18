class Employee < ApplicationRecord
    has_secure_password
    belongs_to :manager
    has_many :salesTransactions
    has_many :sales, through: :salesTransactions
    validates :email, uniqueness: true
    validates :name, presence: true
end
