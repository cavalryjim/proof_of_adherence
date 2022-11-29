class ChangeReadingsToFloat < ActiveRecord::Migration[5.0]
  def change
    change_column :readings, :value1, :float
    change_column :readings, :value2, :float
    change_column :readings, :value3, :float
    change_column :readings, :value4, :float
  end
end
