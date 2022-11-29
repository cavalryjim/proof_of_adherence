class CreateAlerts < ActiveRecord::Migration[5.0]
  def change
    create_table :alerts do |t|
      t.string  :rules_sfid
      t.string  :patient_sfid
      t.string  :method #(text, push, email, etc)
      t.boolean :delivered
      t.string  :title
      t.string  :message
      
      t.timestamps
    end
  end
end
