# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  extend UsersHelper
  DEFAULT_PROFILE_PIC = "http://vectorlogofree.com/wp-content/uploads/2014/09/21426-instagram-logo-silhouette-icon-vector-icon-vector-eps.png"

  has_many(
    :received_messages,
    primary_key: :id,
    foreign_key: :to_id,
    class_name: "Message"
  )

  has_many(
    :sent_messages,
    primary_key: :id,
    foreign_key: :from_id,
    class_name: "Message"
  )

  has_many(
    :friendships,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "Friendship"
  )

  has_many :friends, through: :friendships, source: :friend

  has_many(
    :created_events,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: "Event"
  )

  has_many :friends_events, through: :friends, source: :created_events

  has_many :pictures

  has_many(
    :pending_friendships,
    primary_key: :id,
    foreign_key: :accepter_id,
    class_name: "PendingFriendship"
  )

  has_many(
    :pending_requests,
    primary_key: :id,
    foreign_key: :requester_id,
    class_name: "PendingFriendship"
  )

  has_one(
    :profile_pic,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "ProfilePicture"
  )

  has_one(:profile_picture, through: :profile_pic, source: :picture)

  has_many(:likes)

  def wall_posts(messages)
    posts = messages.select do |message|
      message.public == true && (message.to_id == self.id || message.from_id == self.id)
    end

    posts.sort { |x, y| x.created_at <=> y.created_at}
  end

  def get_statuses
    sent_messages.where("to_id = from_id")
  end

  def friendship_status(current_user)
    # true means friends, false means not friends, pending means there is a pending request
    if self.id == current_user.id
      return {are_friends: "own", friendship_id: nil}
    end

    id = self.id
    friend = current_user.friendships.where(user_id: current_user.id, friend_id: id)

    if friend.first
      return {are_friends: true, friendship_id: friend.first.id}
    else
      pending = current_user.pending_requests.where("accepter_id = #{id}")
      pending2 = current_user.pending_friendships.where("requester_id = #{id}")
      pending += pending2
      if pending.first
        return {are_friends: "pending", friendship_id: nil}
      else
        return {are_friends: false, friendship_id: nil}
      end
    end
  end

  attr_reader :password
  attr_reader :password_confirmation

  validates :username, uniqueness: true, presence: true
  validates :password_digest, presence: true
  validates :session_token, presence: true
  validates :password, confirmation: true, length: { minimum: 6, allow_nil: true}
  validates :password_confirmation, presence: {on: :create}

  after_initialize :ensure_session_token

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def password_confirmation=(password_confirmation)
    @password_confirmation = password_confirmation
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end
end
