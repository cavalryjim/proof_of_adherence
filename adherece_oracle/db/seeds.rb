# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Device.create([
  {name: 'Weight Scale', vendor: 'A&D', vendor_number: 'UA-352BLE', cost: 49.99},
  {name: 'Blood Pressure', vendor: 'A&D', vendor_number: 'UA-651BLE', cost: 49.99},
  {name: 'Pulse Ox', vendor: 'Nonin', vendor_number: '3230', cost: 169.00},
  {name: 'Glucometer', vendor: 'AccuCheck', vendor_number: 'Aviva Connect', cost: 24.99},
  {name: 'Fitness Tracker', vendor: 'Fitbit', vendor_number: 'Atlas HR', cost: 119.75},
  {name: 'Smartphone / Tablet', vendor: 'Alcatel', vendor_number: 'Ideal', cost: 45.00},
  {name: 'Sim Card', vendor: 'Twilio', vendor_number: 'Programmable Wireless', cost: 2.00}
])


#  name          :string
#  vendor        :string
#  vendor_number :string
#  cost          :decimal(, )