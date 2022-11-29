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

class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :meal_id, :patient_id, :caption, :image_uid, :image_name, :s3_url,
    :created_at, :updated_at
    #:w400_thumb_url, :w150_thumb_url
    
  # def w400_thumb_url
  #   object.image.thumb('400x260#').url
  # end
  #
  # def w150_thumb_url
  #   object.image.thumb('150x150#').url
  # end
end
