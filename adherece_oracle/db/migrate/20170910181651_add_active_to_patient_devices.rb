class AddActiveToPatientDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :patient_devices, :active, :boolean, default: true
  end
end
