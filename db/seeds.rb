# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding begins here..."

2.times do |i|
    Manager.create(name:Faker::Name.name, email:Faker::Internet.email, password:"password", bookshop_name:Faker::Company.name, bookshop_items_alert_limit:100)
    3.times do
        Item.create(manager_id: i+1, name_or_title:Faker::Book.title , manufacturer_or_author:Faker::Name.name, price_per_item:100, qty: 50, total_sold:20, img_url:"https://imgs.search.brave.com/-3so_tuy758YDi5kUvlE0_KhlxiIcYHNBmCHkZKU1ZY/rs:fit:329:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/UFNoWmhvbTFTMlQx/MjVqRXdRb1lBQUFB/QSZwaWQ9QXBp")
    end
    2.times do |j|
        Employee.create(name:Faker::Name.name, manager_id: i+1, email:Faker::Internet.email, password:"password")
        2.times do |k|
            SalesTransaction.create(amount: 1000, recieved: 1000,change:0, employee_id:j+1+(i*2))
            2.times do
                Sale.create( sales_transaction_id: k+1+j*2+((i*2)*2), item_id: rand(((i*3)+1)..((i+1)*3)), item_price_at_sale: rand(300..500), qty: 2)
            end
        end
    end
end

puts "... Seeding ends here"