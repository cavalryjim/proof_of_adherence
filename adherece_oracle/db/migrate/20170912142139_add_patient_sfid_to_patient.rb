class AddPatientSfidToPatient < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :patient_sfid, :string unless column_exists? :patients, :patient_sfid
  end
end
