class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.string :title
      t.text :body
      t.integer :patient_id

      t.timestamps
    end
  end
end
