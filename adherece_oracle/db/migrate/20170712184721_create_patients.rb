class CreatePatients < ActiveRecord::Migration[5.0]
  def change
    create_table :patients do |t|
      t.string   :email
      t.boolean  :active
      t.string   :registration_code
      t.datetime :registered_at
      t.string   :validic_id
      t.string   :validic_token
      t.datetime :validic_last_sync
      t.timestamps
    end
  end
end
