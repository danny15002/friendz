# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  creator_id  :integer          not null
#  title       :string           not null
#  description :string
#  date        :date             not null
#  location    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Event < ActiveRecord::Base
  belongs_to(
    :creator,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: "User",
    dependent: :destroy
  )
end
