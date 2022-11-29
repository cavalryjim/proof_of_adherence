# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string
#  last_name              :string
#  encrypted_auth_token   :string
#  image                  :string
#  phone                  :string
#  active                 :boolean
#  primary_device_token   :string
#  address1               :string
#  address2               :string
#  city                   :string
#  state                  :string
#  zip                    :string
#  parish                 :string
#  username               :string
#  registration_code      :string
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable
         
 has_many  :user_devices
 has_many  :devices, through: :user_devices
 
 #before_create :set_registration_code # JDavis: not every user will need a registration_code.
 
 # attr_accessor :skip_password_validation
         
  def to_s
    name
  end

  def name
    if first_name.present? || last_name.present?
      first_name.to_s + ' ' + last_name.to_s
    else
      email
    end
  end
  
  def is_health_navigator?
    false
  end
  
  def is_admin?
    email.include? '@healthengagements.com'
  end
  
  # def provision_user_with_validic
  #   validic = Validic::Client.new
  #   results = validic.provision_user(uid: self.id.to_s)
  #   self.validic_id = results._id
  #   self.validic_token = results.access_token
  #   save
  # end
  
  # def create_registration_code
  #   set_registration_code
  # end
  
  protected
  
  # def password_required?
  #   return false if skip_password_validation
  #   super
  # end
  
  # def set_registration_code
  #   self.registration_code = generate_code
  # end
  #
  # def generate_code
  #   alphabet = ('A'..'Z').to_a
  #   loop do
  #     code = 5.times.map { alphabet.sample }.join
  #     # token = SecureRandom.hex(10)
  #     break code unless User.where(registration_code: code).exists?
  #   end
  # end
  
end
