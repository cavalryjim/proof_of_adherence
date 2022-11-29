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

class Patient < ApplicationRecord
  has_secure_token :auth_token
  has_many  :patient_devices, foreign_key: :patient_sfid, primary_key: :patient_sfid
  has_many  :devices, through: :patient_devices
  has_many  :readings
  has_many :rules, foreign_key: :patient_sfid, primary_key: :patient_sfid
  has_many :alerts, foreign_key: :patient_sfid, primary_key: :patient_sfid
  has_many  :meals
  has_many  :photos
  
  after_create :provision_patient
  #after_create :ensure_patient_sfid
  
  def to_s
    name
  end
  
  def name
    email || id
  end
  
  def phone
    # JDavis: decrypting the phone will look something like this:
    # AESCrypt.decrypt(encrypted_phone, Base64.decode64(encrypted_key) + ENV["SYSTEM_CRYPTO_KEY"])
  end
  
  def ensure_patient_sfid
    if Rails.env == 'development'
      self.update_attribute(:patient_sfid, self.id) unless self.patient_sfid.exists?
    end
  end
  
  def capture_device_uuid(device_uuid)
    # JDavis: this only captures the device token of the first device used.
    #  Might need to capture all the devices.....
    self.update_attribute(:device_uuid, device_uuid) # unless (self.device_uuid == device_uuid)
  end
  
  def batch_create_readings(readings)
    # puts readings
    all_synched = true
    readings.each do |reading|
      new_reading = self.readings.new
      new_reading.value1 = reading[:value1]
      new_reading.value2 = reading[:value2]
      new_reading.value3 = reading[:value3]
      new_reading.value4 = reading[:value4]
      new_reading.value_str = reading[:value_str]
      new_reading.device_date = reading[:date]
      new_reading.peripheral_type = reading[:type]
      new_reading.patient_sfid = self.patient_sfid
      new_reading_saved = new_reading.save
      puts "This is the bad reading " + reading unless new_reading_saved
      all_synched = new_reading_saved unless !all_synched
    end
    #puts complete
    return all_synched
  end
  
  def provision_patient
    self.regenerate_auth_token unless self.auth_token.present?
    self.ensure_patient_sfid if Rails.env == 'development'
    return if self.validic_id.present? && self.validic_token.present?
    validic = Validic::Client.new
    begin
      if Rails.env == 'development'
        results = validic.provision_user(uid: "dev" + self.healthcloud_id)
      else
        results = validic.provision_user(uid: self.healthcloud_id)
      end
    rescue
      results = nil
    end
    
    if results.present?
      self.validic_id = results._id
      self.validic_token = results.access_token
    end
    
    save
  end
  
  protected
  
  def set_registration_code
    self.registration_code = generate_code
  end

  def generate_code
    alphabet = ('A'..'Z').to_a
    loop do
      code = 6.times.map { alphabet.sample }.join
      # token = SecureRandom.hex(10)
      break code unless Patient.where(registration_code: code).exists?
    end
  end
end
