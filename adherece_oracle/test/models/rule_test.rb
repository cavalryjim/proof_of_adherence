# == Schema Information
#
# Table name: rules
#
#  id              :integer          not null, primary key
#  duration        :boolean
#  field_api_name  :string
#  field_name      :string
#  reading_changed :boolean
#  operator_type   :string
#  patient_sfid    :string
#  peripheral_type :string
#  time_periods    :float
#  time_units      :string
#  value           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  rules_sfid      :string
#  status          :string
#

require 'test_helper'

class RuleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
