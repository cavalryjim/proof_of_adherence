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

class PatientDevice < ApplicationRecord
  belongs_to :patient, foreign_key: :patient_sfid, primary_key: :patient_sfid
  belongs_to :device, foreign_key: :device_sfid, primary_key: :device_sfid
  
  def name
    device.name
  end
  
  def manufacturer
    device.manufacturer
  end
  
  def model
    device.model
  end
  
  def validic_id
    device.validic_id
  end
  
  def image_url
    device.image_url
  end
  
  def peripheral_type
    device.peripheral_type
  end
  
end
