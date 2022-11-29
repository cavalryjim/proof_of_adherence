class AddSerialNumberToUserDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :user_devices, :serial_number, :string
  end
end
