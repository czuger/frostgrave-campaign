class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :uid, index: { unique: true }, null: false
      t.string :avatar, null: false

      t.timestamps
    end
  end
end
