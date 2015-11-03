# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151103100514) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "body",             null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "user_id",          null: false
  end

  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "creator_id",  null: false
    t.string   "title",       null: false
    t.string   "description"
    t.date     "date",        null: false
    t.string   "location"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "events", ["creator_id"], name: "index_events_on_creator_id", using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
  add_index "friendships", ["user_id"], name: "index_friendships_on_user_id", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "likeable_id",   null: false
    t.string   "likeable_type", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "user_id",       null: false
  end

  add_index "likes", ["likeable_id"], name: "index_likes_on_likeable_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "from_id",                    null: false
    t.integer  "to_id",                      null: false
    t.text     "body",                       null: false
    t.boolean  "public",     default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "messages", ["from_id"], name: "index_messages_on_from_id", using: :btree
  add_index "messages", ["to_id"], name: "index_messages_on_to_id", using: :btree

  create_table "pending_friendships", force: :cascade do |t|
    t.integer  "requester_id", null: false
    t.integer  "accepter_id",  null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "pending_friendships", ["accepter_id"], name: "index_pending_friendships_on_accepter_id", using: :btree
  add_index "pending_friendships", ["requester_id"], name: "index_pending_friendships_on_requester_id", using: :btree

  create_table "pictures", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "pic_url",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "pictures", ["user_id"], name: "index_pictures_on_user_id", using: :btree

  create_table "profile_pictures", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "picture_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "profile_pictures", ["picture_id"], name: "index_profile_pictures_on_picture_id", using: :btree
  add_index "profile_pictures", ["user_id"], name: "index_profile_pictures_on_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
