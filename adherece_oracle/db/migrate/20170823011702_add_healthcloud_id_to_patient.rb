class AddHealthcloudIdToPatient < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :healthcloud_id, :integer
  end
end
