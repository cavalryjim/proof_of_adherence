class CreatePatientDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :patient_devices do |t|
      t.integer :patient_id
      t.integer :device_id
      t.string  :serial_number
      
      t.timestamps
    end
  end
end
