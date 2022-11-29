class AddDeviceUuidToPatients < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :device_uuid, :string
  end
end
