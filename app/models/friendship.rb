# == Schema Information
#
# Table name: friendships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Friendship < ActiveRecord::Base
  validates :user_id, uniqueness: {scope: [:friend_id]}

  belongs_to(
    :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User"
  )

  belongs_to(
    :friend,
    primary_key: :id,
    foreign_key: :friend_id,
    class_name: "User"
  )

  def self.get_friends(id)

    response = Friendship.connection.select_all("
      SELECT
        friendships.id,
        users.username AS friend,
        friendships.friend_id,
        pictures.pic_url AS \"picUrl\"
      FROM
        friendships
      JOIN
        users ON users.id = friendships.friend_id
      JOIN
        profile_pictures ON profile_pictures.user_id = users.id
      JOIN
        pictures ON pictures.id = profile_pictures.picture_id
      WHERE
        friendships.user_id = #{id}
    ")
  end

end
