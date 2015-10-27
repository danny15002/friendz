# == Schema Information
#
# Table name: pending_friendships
#
#  id           :integer          not null, primary key
#  requester_id :integer          not null
#  accepter_id  :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class PendingFriendship < ActiveRecord::Base

  belongs_to(
    :requestee,
    primary_key: :id,
    foreign_key: :accepter_id,
    class_name: "User"
  )

  belongs_to(
    :requester,
    primary_key: :id,
    foreign_key: :requester_id,
    class_name: "User"
  )
end
