class CreateClarities < ActiveRecord::Migration
  def change
    create_table :clarities do |t|
      t.string :grade

      t.timestamps
    end
  end
end
