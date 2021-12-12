class FirstMigration < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :uid, index: { unique: true }, null: false
      t.string :avatar, null: false

      t.timestamps
    end

    create_table :campaigns do |t|
      t.string :name, null: false
      t.string :description
    end

    create_table :players do |t|
      t.references :user, null: false, foreign_key: true, index: false
      t.references :campaign, null: false, foreign_key: true, index: false
      t.boolean :admin, null: false, default: false

      t.timestamps
    end

    add_index :players, [:campaign_id, :user_id], unique: true

    create_table :warbands do |t|
      t.references :player, null: false, foreign_key: true
      t.references :campaign, null: false, foreign_key: true

      t.string :school, null: false

      t.integer :level, null: false, default: 0, limit: 2
      t.integer :xp, null: false, default: 0, limit: 4
    end

    create_table :wizards do |t|
      t.references :user, null: false, foreign_key: true
      t.references :spell_school, null: false, foreign_key: true

      t.string :name, null: false
      t.string :school, null: false

      # False if dead
      t.boolean :alive, null: false, default: true
      # mage or apprentice
      t.string :status, null: false, default: 'mage'

      t.integer :move, null: false, default: 6, limit: 2
      t.integer :fight, null: false, default: 2, limit: 2
      t.integer :shoot, null: false, default: 0, limit: 2
      t.integer :armour, null: false, default: 10, limit: 2
      t.integer :will, null: false, default: 4, limit: 2
      t.integer :health, null: false, default: 14, limit: 2

      t.integer :xp, null: false, default: 0
      t.integer :level, null: false, default: 0

      t.timestamps

    end

    create_table :spell_schools do |t|
      t.string :name, null: false

      t.timestamps
    end

    create_table :spells do |t|
      t.references :spell_school, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps
    end

    create_table :spell_knowns do |t|
      t.references :wizard, null: false, foreign_key: true
      t.references :spell, null: false, foreign_key: true

      t.integer :learned, null: false, default: 0, limit: 2

      t.timestamps
    end

  end
end
