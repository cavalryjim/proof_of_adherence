class AddDeviceSfidToDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :devices, :device_sfid, :string unless column_exists? :devices, :device_sfid
  end
end
