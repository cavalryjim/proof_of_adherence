class Api::He1::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_patient
  APP_UUID = '38739BAE-66D6-4AA5-B4DE-8D44A92641C6'
  APP_HCID = '208712fe-87a4-11e7-bb31-be2e44b06b34'
  
  
  # def not_authorized
  #   render file: 'users/not_authorized.json.erb'
  # end

  def handle_exception_in_api_request
    render json: {success: false}, status: :internal_server_error
  end

  private
  
  def authenticate_patient
    # @patient = Patient.last
    patient = Patient.find_by_id(request.headers["x-he-id"])
    
    # JDavis: checking the auth_token and device_uuid
    # JDavis: taking this out for the companion app - && (patient.device_uuid == request.headers["x-device-uuid"]
    if patient.present? && Devise.secure_compare(patient.auth_token, request.headers["x-auth-token"]) 
      @patient = patient
    else
      handle_exception_in_api_request
    end
  end
  
end