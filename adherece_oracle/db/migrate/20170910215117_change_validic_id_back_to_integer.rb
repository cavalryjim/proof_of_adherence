class ChangeValidicIdBackToInteger < ActiveRecord::Migration[5.0]
  def change
    # JDavis: removed the previous migration so this migration is not needed.
    # JDavis: validic_id was, is, and always should be an integer.
    #change_column :devices, :validic_id, "USING validic_id::integer"
    #Device.where(validic_id: '').update_all(validic_id: '0')
    #change_column :devices, :validic_id, 'integer USING CAST(validic_id AS integer)'
  end
end
