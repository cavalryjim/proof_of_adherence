class RenamePhotoUserIdToPatientId < ActiveRecord::Migration[5.0]
  def change
    rename_column :photos, :user_id, :patient_id
  end
end
