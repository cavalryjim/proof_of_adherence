class AddNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :encrypted_auth_token, :string
    add_column :users, :image, :string
    add_column :users, :phone, :string
    add_column :users, :active, :boolean
    add_column :users, :primary_device_token, :string
    add_column :users, :address1, :string
    add_column :users, :address2, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip, :string
    add_column :users, :parish, :string
    add_column :users, :username, :string
        
  end
end
