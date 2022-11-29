class AddSfidsToReadings < ActiveRecord::Migration[5.0]
  def change
    add_column :readings, :patient_sfid, :string unless column_exists? :readings, :patient_sfid
    add_column :readings, :device_sfid, :string unless column_exists? :readings, :device_sfid
  end
end
