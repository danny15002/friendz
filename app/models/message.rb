# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  from_id    :integer          not null
#  to_id      :integer          not null
#  body       :text             not null
#  public     :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ActiveRecord::Base
  belongs_to(
    :user_to,
    primary_key: :id,
    foreign_key: :to_id,
    class_name: "User"
  )

  belongs_to(
    :user_from,
    primary_key: :id,
    foreign_key: :from_id,
    class_name: "User"
  )

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

  def self.get_wall_posts(id)
    messages = Message.connection.select_all("
      SELECT
        messages.id,
        authors.username AS author, recipients.username AS recipient,
        pictures.pic_url as \"profPic\",
        messages.body,
        COUNT( DISTINCT likes.id) AS likes,
        CASE WHEN likes.id IS NULL THEN FALSE ELSE TRUE END AS liked,
        CASE WHEN likes.user_id = #{id} THEN likes.id ELSE NULL END AS \"myLikeId\",
        'Message' AS type,
        messages.created_at AS \"createdAt\",
        COUNT(comments.id) AS comments
      FROM
        messages
      LEFT OUTER JOIN
        comments ON messages.id = comments.commentable_id
      LEFT OUTER JOIN
        likes ON  messages.id = likes.likeable_id
      JOIN
        users authors ON messages.from_id = authors.id
      JOIN
        users recipients ON messages.to_id = recipients.id
      JOIN
        profile_pictures ON profile_pictures.user_id = authors.id
      JOIN
        pictures ON profile_pictures.picture_id = pictures.id
      WHERE
        (likes.likeable_type = 'Message' OR likes.likeable_type IS NULL) AND
        (comments.commentable_type = 'Message' OR comments.commentable_type IS NULL) AND
        (comments.commentable_type = 'Message' OR
        comments.commentable_type IS NULL) AND
        (recipients.id = #{id} OR authors.id = #{id}) AND
        messages.public = true
      GROUP BY
        messages.id, likes.id, authors.username, recipients.username,
        pictures.pic_url, comments.commentable_type
      ORDER BY
        messages.created_at DESC
    ")
  end

  def self.get_newsfeed(id)
    messages = Message.connection.select_all("
      SELECT
        messages.id,
        authors.username AS author, recipients.username AS recipient,
        pictures.pic_url as \"profPic\",
        messages.body,
        COUNT( DISTINCT likes.id) AS likes,
        CASE WHEN likes.id IS NULL THEN FALSE ELSE TRUE END AS liked,
        CASE WHEN likes.user_id = #{id} THEN likes.id ELSE NULL END AS \"myLikeId\",
        'Message' AS type,
        messages.created_at AS \"createdAt\",
        COUNT(comments.id) AS comments
      FROM
        messages
      LEFT OUTER JOIN
        comments ON messages.id = comments.commentable_id
      LEFT OUTER JOIN
        likes ON  messages.id = likes.likeable_id
      JOIN
        users authors ON messages.from_id = authors.id
      JOIN
        users recipients ON messages.to_id = recipients.id
      JOIN
        profile_pictures ON profile_pictures.user_id = authors.id
      JOIN
        pictures ON profile_pictures.picture_id = pictures.id
      WHERE
        (likes.likeable_type = 'Message' OR likes.likeable_type IS NULL) AND
        (comments.commentable_type = 'Message' OR comments.commentable_type IS NULL) AND
        (comments.commentable_type = 'Message' OR
        comments.commentable_type IS NULL) AND
        messages.public = true AND
        (recipients.id = #{id} OR authors.id = #{id} OR
        (recipients.id IN (
          SELECT
            friendships.friend_id
          FROM
            users
          LEFT OUTER JOIN
            friendships ON friendships.user_id = users.id
          WHERE
            users.id = #{id}
        ) AND
        authors.id IN (
          SELECT
            friendships.friend_id
          FROM
            users
          LEFT OUTER JOIN
            friendships ON friendships.user_id = users.id
          WHERE
            users.id = #{id}
        )))
      GROUP BY
        messages.id, likes.id, authors.username, recipients.username,
        pictures.pic_url, comments.commentable_type
      ORDER BY
        messages.created_at DESC
    ")
  end

  def self.get_private_conversation(current_user_id, friend_id)
    messages = Message.connection.select_all("
      SELECT
        messages.id,
        authors.id As from_id,
        recipients.id AS to_id,
        authors.username AS author,
        recipients.username AS recipient,
        pictures.pic_url as \"profPic\",
        messages.body,
        messages.created_at AS \"createdAt\"
      FROM
        messages
      JOIN
        users authors ON messages.from_id = authors.id
      JOIN
        users recipients ON messages.to_id = recipients.id
      JOIN
        profile_pictures ON profile_pictures.user_id = authors.id
      JOIN
        pictures ON profile_pictures.picture_id = pictures.id
      WHERE
        (recipients.id = #{current_user_id} AND authors.id = #{friend_id}) OR
        (authors.id = #{current_user_id} AND recipients.id = #{friend_id})
      ORDER BY
        messages.created_at DESC
    ")
  end

  def format_message_time
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
