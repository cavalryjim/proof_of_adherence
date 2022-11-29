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

class Reading < ApplicationRecord
  # JDavis: todo - would like to know what device took this reading.
  belongs_to :patient
  
  before_create :ensure_patient_sfid
  
  def ensure_patient_sfid
    self.patient_sfid = patient.patient_sfid unless self.patient_sfid.present?
  end
  
end
