class Sale < ApplicationRecord
    belongs_to :item
    delegate :salesTransaction, to: :item
end
