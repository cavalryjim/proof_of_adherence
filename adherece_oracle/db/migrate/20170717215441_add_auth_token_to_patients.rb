class AddAuthTokenToPatients < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :auth_token, :string
    add_index :patients, :auth_token, unique: true
  end
end
