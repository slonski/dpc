class CreateShapes < ActiveRecord::Migration
  def change
    create_table :shapes do |t|
      t.string :name
      t.timestamps
    end
  end
end
