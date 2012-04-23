class CreateCuts < ActiveRecord::Migration
  def change
    create_table :cuts do |t|
      t.string :grade

      t.timestamps
    end
  end
end
