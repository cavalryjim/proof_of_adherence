class AddEncryptedKeyAndPhoneToPatient < ActiveRecord::Migration[5.0]
  def change
    # encrypted_key & encrypted_phone
    add_column :patients, :encrypted_key, :string unless column_exists? :patients, :encrypted_key
    add_column :patients, :encrypted_phone, :string unless column_exists? :patients, :encrypted_phone
  end
end
