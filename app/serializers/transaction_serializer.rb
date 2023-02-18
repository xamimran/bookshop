class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :amount, :recieved, :change
end
