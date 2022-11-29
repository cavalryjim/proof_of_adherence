# == Schema Information
#
# Table name: user_devices
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  device_id     :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  serial_number :string
#

class UserDevice < ApplicationRecord
  belongs_to :user
  belongs_to :device
  
  def name
    device.name
  end
  
  def model
    device.model
  end
  
end
