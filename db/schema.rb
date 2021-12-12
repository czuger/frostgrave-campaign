# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_05_193846) do

  create_table "campaigns", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
  end

  create_table "players", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "campaign_id", null: false
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["campaign_id", "user_id"], name: "index_players_on_campaign_id_and_user_id", unique: true
  end

  create_table "spell_knowns", force: :cascade do |t|
    t.integer "wizard_id", null: false
    t.integer "spell_id", null: false
    t.integer "level", limit: 2, default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spell_id"], name: "index_spell_knowns_on_spell_id"
    t.index ["wizard_id"], name: "index_spell_knowns_on_wizard_id"
  end

  create_table "spell_schools", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "spells", force: :cascade do |t|
    t.integer "spell_school_id", null: false
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spell_school_id"], name: "index_spells_on_spell_school_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "uid", null: false
    t.string "avatar", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  create_table "warbands", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "campaign_id", null: false
    t.string "school", null: false
    t.integer "level", limit: 2, default: 0, null: false
    t.integer "xp", limit: 4, default: 0, null: false
    t.index ["campaign_id"], name: "index_warbands_on_campaign_id"
    t.index ["player_id"], name: "index_warbands_on_player_id"
  end

  create_table "wizards", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "spell_school_id", null: false
    t.string "name", null: false
    t.boolean "alive", default: true, null: false
    t.string "status", default: "mage", null: false
    t.integer "move", limit: 2, default: 6, null: false
    t.integer "fight", limit: 2, default: 2, null: false
    t.integer "shoot", limit: 2, default: 0, null: false
    t.integer "armour", limit: 2, default: 10, null: false
    t.integer "will", limit: 2, default: 4, null: false
    t.integer "health", limit: 2, default: 14, null: false
    t.integer "xp", default: 0, null: false
    t.integer "level", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spell_school_id"], name: "index_wizards_on_spell_school_id"
    t.index ["user_id"], name: "index_wizards_on_user_id"
  end

  add_foreign_key "players", "campaigns"
  add_foreign_key "players", "users"
  add_foreign_key "spell_knowns", "spells"
  add_foreign_key "spell_knowns", "wizards"
  add_foreign_key "spells", "spell_schools"
  add_foreign_key "warbands", "campaigns"
  add_foreign_key "warbands", "players"
  add_foreign_key "wizards", "spell_schools"
  add_foreign_key "wizards", "users"
end
