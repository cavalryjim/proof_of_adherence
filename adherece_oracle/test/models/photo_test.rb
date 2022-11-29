# == Schema Information
#
# Table name: photos
#
#  id           :integer          not null, primary key
#  meal_id      :integer
#  patient_id   :integer
#  caption      :string
#  image_uid    :string
#  image_name   :string
#  external_url :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class PhotoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
