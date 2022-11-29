# == Schema Information
#
# Table name: devices
#
#  id                   :integer          not null, primary key
#  name                 :string
#  vendor               :string
#  vendor_number        :string
#  cost                 :decimal(, )
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  validic_id           :integer
#  manufacturer         :string
#  model                :string
#  pairing_instructions :text
#  instructions         :text
#  reading_instructions :text
#  image_url            :string
#  peripheral_type      :string
#  device_sfid          :string
#

require 'test_helper'

class DeviceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
