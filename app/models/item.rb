class Item < ApplicationRecord
    belongs_to :manager
    has_many :sales
    has_many :salesTransactions, through: :sales
    validates :name_or_title, presence: true
    validates :manufacturer_or_author, presence: true
    validates :price_per_item, presence: true
end
