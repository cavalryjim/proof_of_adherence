class AddTypeToDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :devices, :peripherial_type, :string
  end
end
