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

class PatientDeviceSerializer < ActiveModel::Serializer
  attributes :id, :name, :manufacturer, :model, :serial_number, :mac_address, 
             :validic_id, :image_url, :peripheral_type, :active
  
end
