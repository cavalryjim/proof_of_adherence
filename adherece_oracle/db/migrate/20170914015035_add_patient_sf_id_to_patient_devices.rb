class AddPatientSfIdToPatientDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :patient_devices, :patient_sfid, :string unless column_exists? :patient_devices, :patient_sfid
    add_column :patient_devices, :device_sfid, :string unless column_exists? :patient_devices, :device_sfid
  end
end
