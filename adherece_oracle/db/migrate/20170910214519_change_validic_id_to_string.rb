class ChangeValidicIdToString < ActiveRecord::Migration[5.0]
  def change
    # JDavis: should never have been converted to a string.
    # JDavis: this migration is not needed.
    #change_column :devices, :validic_id, :string
  end
end
