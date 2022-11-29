class AddStatusToAlerts < ActiveRecord::Migration[5.0]
  def change
    add_column :rules, :status, :string unless column_exists? :rules, :status
  end
end
