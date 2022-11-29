class CreatePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :photos do |t|
      t.integer :meal_id
      t.integer :user_id
      t.string :caption
      t.string :image_uid
      t.string :image_name
      t.string :external_url

      t.timestamps
    end
  end
end
