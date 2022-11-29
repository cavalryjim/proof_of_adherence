class CreateRules < ActiveRecord::Migration[5.0]
  def change
    unless table_exists? :rules
      create_table :rules do |t|
        t.boolean :duration
        t.string  :field_api_name
        t.string  :field_name
        t.boolean :reading_changed
        t.string  :operator_type
        t.string  :patient_id
        t.string  :peripheral_type
        t.float   :time_periods
        t.string  :time_units
        t.string  :value
      
        t.timestamps
      end
    end
  end
end
