# == Schema Information
#
# Table name: meals
#
#  id         :integer          not null, primary key
#  title      :string
#  body       :text
#  patient_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Meal < ApplicationRecord
  belongs_to  :patient
  has_many    :photos
  
  def image
    if self.photos.present?
      self.photos.first.s3_url
    else
      false
    end
  end
end
