class AddRulesSfidToRules < ActiveRecord::Migration[5.0]
  def change
    add_column :rules, :rules_sfid, :string unless column_exists? :rules, :rules_sfid
  end
end
