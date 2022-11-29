class AddUpdateDevicesToPatient < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :update_devices, :boolean, default: true unless column_exists? :patients, :update_devices
  end
end
