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

  # if all of the comments on a commentable_id are of type message it will exclude
  # that comment
  def self.get_comments(commentable_id, commentable_type, id)
    Comment.connection.select_all("
      SELECT
        comments.id,
        COALESCE(COUNT(CASE WHEN comments2.commentable_type = 'Comment' THEN comments2.id END), 0) AS comments,
        COUNT(likes) AS likes,
        comments.commentable_id,
        authors.username AS author,
        pictures.pic_url as \"profPic\",
        comments.body,
        COUNT( DISTINCT likes.id) AS likes,
        CASE WHEN likes.id IS NULL THEN FALSE ELSE TRUE END AS liked,
        CASE WHEN likes.user_id = #{id} THEN likes.id ELSE NULL END AS \"myLikeId\",
        'Comment' AS type,
        comments.created_at AS \"createdAt\"
      FROM
        comments
      LEFT OUTER JOIN
        comments comments2 ON comments.id = comments2.commentable_id
      LEFT OUTER JOIN
        likes ON  comments.id = likes.likeable_id
      JOIN
        users authors ON comments.user_id = authors.id
      JOIN
        profile_pictures ON profile_pictures.user_id = authors.id
      JOIN
        pictures ON profile_pictures.picture_id = pictures.id
      WHERE
        (comments.commentable_id = #{commentable_id} AND
         comments.commentable_type = '#{commentable_type}')
      GROUP BY
        comments.id, authors.username, pictures.pic_url, likes.id,
        comments2.commentable_type
      ORDER BY
        comments.created_at
    ")
  end

  def self.get_siblings(comment_id)
    commented_on = Comment.connection.select_all("
      SELECT
        commentable_id, commentable_type
      FROM
        comments
      WHERE
        id = #{comment_id}
    ").first
  end

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
