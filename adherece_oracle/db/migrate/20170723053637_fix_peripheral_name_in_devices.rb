class FixPeripheralNameInDevices < ActiveRecord::Migration[5.0]
  def change
    rename_column :devices, :peripherial_type, :peripheral_type
  end
end
