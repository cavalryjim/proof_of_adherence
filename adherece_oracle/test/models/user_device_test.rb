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

require 'test_helper'

class UserDeviceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
