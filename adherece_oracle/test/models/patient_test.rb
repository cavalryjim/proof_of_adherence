# == Schema Information
#
# Table name: patients
#
#  id                :integer          not null, primary key
#  email             :string
#  active            :boolean
#  registration_code :string
#  registered_at     :datetime
#  validic_id        :string
#  validic_token     :string
#  validic_last_sync :datetime
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  auth_token        :string
#  device_uuid       :string
#  healthcloud_id    :string
#  patient_sfid      :string
#  update_devices    :boolean          default(TRUE)
#  encrypted_key     :string
#  encrypted_phone   :string
#

require 'test_helper'

class PatientTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
