class AddValidicToDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :devices, :validic_id, :integer
    add_column :devices, :manufacturer, :string
    add_column :devices, :model, :string
    add_column :devices, :pairing_instructions, :text
    add_column :devices, :instructions, :text
    add_column :devices, :reading_instructions, :text
    add_column :devices, :image_url, :string
  end
end
