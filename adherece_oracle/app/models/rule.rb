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

class Rule < ApplicationRecord
  belongs_to :patient, foreign_key: :patient_sfid, primary_key: :patient_sfid
  has_many :alerts, foreign_key: :rules_sfid, primary_key: :rules_sfid
  
end
