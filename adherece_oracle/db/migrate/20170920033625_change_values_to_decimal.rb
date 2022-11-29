class ChangeValuesToDecimal < ActiveRecord::Migration[5.0]
  def up
    change_column :readings, :value1, :decimal, precision: 8, scale: 3
    change_column :readings, :value2, :decimal, precision: 8, scale: 3
    change_column :readings, :value3, :decimal, precision: 8, scale: 3
    change_column :readings, :value4, :decimal, precision: 8, scale: 3
  end

  def down
    change_column :readings, :value1, :float
    change_column :readings, :value2, :float
    change_column :readings, :value3, :float
    change_column :readings, :value4, :float
  end
end
