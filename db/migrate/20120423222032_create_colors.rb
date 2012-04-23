class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :grade

      t.timestamps
    end
  end
end
