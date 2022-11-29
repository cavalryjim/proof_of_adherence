class CreateUserDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :user_devices do |t|
      t.integer :user_id
      t.integer :device_id

      t.timestamps
    end
  end
end
