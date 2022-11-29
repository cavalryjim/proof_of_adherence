# == Schema Information
#
# Table name: alerts
#
#  id           :integer          not null, primary key
#  rules_sfid   :string
#  patient_sfid :string
#  method       :string
#  delivered    :boolean
#  title        :string
#  message      :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  status       :string
#

require 'test_helper'

class AlertTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
