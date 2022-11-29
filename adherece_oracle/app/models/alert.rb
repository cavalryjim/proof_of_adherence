# == Schema Information
#
# Table name: alerts
#
#  id           :integer          not null, primary key
#  rules_sfid   :string
#  patient_sfid :string
#  method       :string
#  delivered    :boolean
#  title        :string
#  message      :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  status       :string
#

class Alert < ApplicationRecord
  belongs_to :patient, foreign_key: :patient_sfid, primary_key: :patient_sfid
  belongs_to :rule, foreign_key: :rules_sfid, primary_key: :rules_sfid
  
end
