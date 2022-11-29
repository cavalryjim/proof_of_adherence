class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.string :name
      t.string :vendor
      t.string :vendor_number
      t.decimal :cost

      t.timestamps
    end
  end
end
