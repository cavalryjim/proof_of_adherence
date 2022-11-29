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

class Device < ApplicationRecord
  
  has_many  :patient_devices, foreign_key: :device_sfid, primary_key: :device_sfid
  has_many  :patients, through: :patient_devices
  
  after_create :ensure_device_sfid
  
  def full_name
    "#{manufacturer} #{model}"
  end
  
  def self.peripheral_types
    ['blood_pressure', 'fitness_tracker', 'gateway', 'glucose', 'heart_rate', 'pulse_oximeter', 'thermometer', 'weight']
  end
  
  def ensure_device_sfid
    if Rails.env == 'development'
      self.update_attribute(:device_sfid, self.id) unless self.device_sfid.exists?
    end
  end
  
end

    # none: 0,
    # thermometer: 1,
    # blood_pressure: 2,
    # heart_rate: 3,
    # glucose: 4,
    # weight: 5,
    # pulse_oximeter: 6
    # fitness_tracker: 
