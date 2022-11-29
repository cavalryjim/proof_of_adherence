# == Schema Information
#
# Table name: patient_devices
#
#  id            :integer          not null, primary key
#  patient_id    :integer
#  device_id     :integer
#  serial_number :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  mac_address   :string
#  active        :boolean          default(TRUE)
#  patient_sfid  :string
#  device_sfid   :string
#

require 'test_helper'

class PatientDeviceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
