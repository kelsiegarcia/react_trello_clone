class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.belongs_to :list, index: true, foreign_key: true
      t.string :name

      t.timestamps null: false
    end
  end
end
