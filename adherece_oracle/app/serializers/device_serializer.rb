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

class DeviceSerializer < ActiveModel::Serializer
  attributes :id, :name, :manufacturer, :model, :validic_id, :image_url, :peripheral_type
  
  
end
