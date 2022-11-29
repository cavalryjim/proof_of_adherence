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

class MealSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :patient_id, :image, :created_at
end
