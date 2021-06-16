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

ActiveRecord::Schema.define(version: 2021_06_11_214136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "list", force: :cascade do |t|
    t.integer "user_id"
    t.integer "set_duration", null: false
    t.time "start_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "phone_number"
    t.integer "points", default: 0, null: false
    t.boolean "first_timer"
    t.boolean "headliner_or_feature"
    t.boolean "employee"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "signed_up", default: false
    t.string "password_digest"
    t.string "username"
    t.index ["email"], name: "index_users_on_email"
  end

end
