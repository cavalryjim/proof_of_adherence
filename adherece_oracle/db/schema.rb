# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180105181002) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.string   "rules_sfid"
    t.string   "patient_sfid"
    t.string   "method"
    t.boolean  "delivered"
    t.string   "title"
    t.string   "message"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "status"
  end

  create_table "devices", force: :cascade do |t|
    t.string   "name"
    t.string   "vendor"
    t.string   "vendor_number"
    t.decimal  "cost"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "validic_id"
    t.string   "manufacturer"
    t.string   "model"
    t.text     "pairing_instructions"
    t.text     "instructions"
    t.text     "reading_instructions"
    t.string   "image_url"
    t.string   "peripheral_type"
    t.string   "device_sfid"
  end

  create_table "meals", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.integer  "patient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "patient_devices", force: :cascade do |t|
    t.integer  "patient_id"
    t.integer  "device_id"
    t.string   "serial_number"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "mac_address"
    t.boolean  "active",        default: true
    t.string   "patient_sfid"
    t.string   "device_sfid"
  end

  create_table "patients", force: :cascade do |t|
    t.string   "email"
    t.boolean  "active"
    t.string   "registration_code"
    t.datetime "registered_at"
    t.string   "validic_id"
    t.string   "validic_token"
    t.datetime "validic_last_sync"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "auth_token"
    t.string   "device_uuid"
    t.string   "healthcloud_id"
    t.string   "patient_sfid"
    t.boolean  "update_devices",    default: true
    t.string   "encrypted_key"
    t.string   "encrypted_phone"
    t.index ["auth_token"], name: "index_patients_on_auth_token", unique: true, using: :btree
  end

  create_table "photos", force: :cascade do |t|
    t.integer  "meal_id"
    t.integer  "patient_id"
    t.string   "caption"
    t.string   "image_uid"
    t.string   "image_name"
    t.string   "external_url"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "readings", force: :cascade do |t|
    t.decimal  "value1",          precision: 8, scale: 3
    t.decimal  "value2",          precision: 8, scale: 3
    t.decimal  "value3",          precision: 8, scale: 3
    t.decimal  "value4",          precision: 8, scale: 3
    t.string   "value_str"
    t.string   "peripheral_type"
    t.datetime "device_date"
    t.integer  "patient_id"
    t.integer  "device_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "patient_sfid"
    t.string   "device_sfid"
  end

  create_table "rules", force: :cascade do |t|
    t.boolean  "duration"
    t.string   "field_api_name"
    t.string   "field_name"
    t.boolean  "reading_changed"
    t.string   "operator_type"
    t.string   "patient_sfid"
    t.string   "peripheral_type"
    t.float    "time_periods"
    t.string   "time_units"
    t.string   "value"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "rules_sfid"
    t.string   "status"
  end

  create_table "user_devices", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "device_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "serial_number"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "encrypted_auth_token"
    t.string   "image"
    t.string   "phone"
    t.boolean  "active"
    t.string   "primary_device_token"
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "parish"
    t.string   "username"
    t.string   "registration_code"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["registration_code"], name: "index_users_on_registration_code", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree
  end

end
