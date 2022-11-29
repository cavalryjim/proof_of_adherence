# == Schema Information
#
# Table name: photos
#
#  id           :integer          not null, primary key
#  meal_id      :integer
#  patient_id   :integer
#  caption      :string
#  image_uid    :string
#  image_name   :string
#  external_url :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Photo < ApplicationRecord
  dragonfly_accessor :image
  
  belongs_to :meal
  belongs_to :patient
  
  validates_presence_of :meal_id
  validates_presence_of :patient_id
  validates_size_of :image, maximum: 2048.kilobytes
  validates_property :format, of: :image, in: ['jpeg', 'jpg', 'png', 'gif']
  
  dragonfly_accessor :image do
    storage_options do |attachment|
      { path: "#{Rails.env}/images/patient_#{patient_id}/#{Time.now.to_i}_#{rand(36**5).to_s(36)}_#{image_name}" }
    end
    
    after_assign do |pic|
      pic.convert! '-auto-orient' # JDavis: properly orient the picture
      self.image = pic.thumb('600x600>', 'format' => 'jpg') # JDavis: resize the picture to 600x600
    end
  end
  
  def image_url
    image.url
  end
  
  def s3_url
    image.remote_url.sub("http://", "https://")
  end
end
