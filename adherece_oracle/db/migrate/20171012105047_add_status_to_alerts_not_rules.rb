class AddStatusToAlertsNotRules < ActiveRecord::Migration[5.0]
  def change
    add_column :alerts, :status, :string unless column_exists? :alerts, :status
  end
end
