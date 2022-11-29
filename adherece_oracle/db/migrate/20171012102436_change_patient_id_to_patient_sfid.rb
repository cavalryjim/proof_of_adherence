class ChangePatientIdToPatientSfid < ActiveRecord::Migration[5.0]
  def change
    rename_column :rules, :patient_id, :patient_sfid
  end
end
