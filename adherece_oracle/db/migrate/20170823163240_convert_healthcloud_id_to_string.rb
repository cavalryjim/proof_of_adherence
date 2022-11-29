class ConvertHealthcloudIdToString < ActiveRecord::Migration[5.0]
  def change
    change_column :patients, :healthcloud_id, :string
  end
end
