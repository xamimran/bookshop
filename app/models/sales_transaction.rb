class SalesTransaction < ApplicationRecord
    has_many :sales
    belongs_to :employee
    delegate :manager, to: :employee
end
