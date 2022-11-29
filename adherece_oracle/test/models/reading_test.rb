# == Schema Information
#
# Table name: readings
#
#  id              :integer          not null, primary key
#  value1          :decimal(8, 3)
#  value2          :decimal(8, 3)
#  value3          :decimal(8, 3)
#  value4          :decimal(8, 3)
#  value_str       :string
#  peripheral_type :string
#  device_date     :datetime
#  patient_id      :integer
#  device_id       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  patient_sfid    :string
#  device_sfid     :string
#

require 'test_helper'

class ReadingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
