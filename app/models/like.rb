# == Schema Information
#
# Table name: likes
#
#  id            :integer          not null, primary key
#  likeable_id   :integer          not null
#  likeable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer          not null
#

class Like < ActiveRecord::Base
  belongs_to :likeable, polymorphic: true
  belongs_to :user
  validates :likeable_id, :likeable_type, :user_id, presence: true

end
