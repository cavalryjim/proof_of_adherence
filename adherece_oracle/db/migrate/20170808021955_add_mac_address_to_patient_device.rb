class AddMacAddressToPatientDevice < ActiveRecord::Migration[5.0]
  def change
    add_column :patient_devices, :mac_address, :string
  end
end
