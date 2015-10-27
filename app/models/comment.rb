# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :string           not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :integer          not null
#

class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :user

  has_many :comments, as: :commentable, dependent: :destroy
  validates :body, :commentable_id, :commentable_type, :user_id, presence: true

  has_many :likes, as: :likeable, dependent: :destroy

  def number_likes
    self.likes.length;
  end

  def is_liked?(id)
    return self.likes.any? do |like|
      like.user_id == id
    end
  end

  def users_like_id(id)

    # like = self.likes.where(user_id: id, likeable_id: self.id, likeable_type: self.class)

    like = self.likes.select {|like| like.likeable_type == self.class.to_s && like.user_id == id}

    if like.first.nil?
      return nil
    else
      return like.first.id
    end
  end
  def format_comment_time
    time = Time.now - created_at

    if time > 86400
      return "#{(time/86400).round} days ago"
    end
    if time > 3600
      return "#{(time/3600).round} hours ago"
    end
    if time > 60
      return "#{(time/60).round} minutes ago"
    end
    return "#{time.round} seconds ago"
  end
end
