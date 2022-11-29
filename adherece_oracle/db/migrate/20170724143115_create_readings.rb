class CreateReadings < ActiveRecord::Migration[5.0]
  def change
    create_table :readings do |t|
      t.integer  :value1
      t.integer  :value2
      t.integer  :value3
      t.integer  :value4
      t.string   :value_str
      t.string   :peripheral_type
      t.datetime :device_date
      t.integer  :patient_id
      t.integer  :device_id
      t.timestamps
    end
  end
end
