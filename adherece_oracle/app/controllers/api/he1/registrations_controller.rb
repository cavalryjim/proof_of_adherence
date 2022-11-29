class Api::He1::RegistrationsController < Api::He1::BaseController
  skip_before_action :authenticate_patient
  before_action :verify_app_uuid, only: [:register_user]
  #before_action :verify_app_sfid, only: [:hc_create_patient]
  #before_action :sanitize_page_params, only: [:hc_create_patient]
  respond_to :json
  
  # def new
  #   #@patient = Patient.find_by_registration_code(request.headers["HE-Registration-Code"])
  #   @patient = Patient.last
  #
  #   respond_to do |format|
  #     format.json { render json: @patient }
  #   end
  # end
  
  def register_user
    # JDavis: need to find the patient with the reg_code.  
    @patient = Patient.where(registration_code: params[:reg_code]).first
    
    # JDavis: Need to confirm it is an authorized device.
    # JDavis: Should capture multiple device_uuids.
    # @patient.capture_device_uuid(request.headers["x-device-uuid"]) unless @patient.device_uuid.present?
    
    # JDavis: not sure about checking the device_uuid
    if @patient # && @patient.device_uuid.present? && (@patient.device_uuid == request.headers["x-device-uuid"])
      @patient.provision_patient 
      render json: {status: :success, user: @patient}, status: :ok 
    else
      puts "api registration_controller register_user perhaps the device_uuid does not match"
      handle_exception_in_api_request
    end
  end
  
  # def hc_create_patient
  #   @patient = Patient.new(patient_params)
  #   if @patient.save && @patient.provision_patient
  #     render json: @patient, status: :created
  #   else
  #     handle_exception_in_api_request
  #     #render json: @patient.errors, status: :unprocessable_entity
  #   end
  # end
  
  
  private
  
  def verify_app_sfid
    handle_exception_in_api_request unless (request.headers["x-app-hcid"] == APP_HCID)
  end
  
  def verify_app_uuid
    handle_exception_in_api_request unless (request.headers["x-app-uuid"] == APP_UUID)
  end
  
  #def sanitize_page_params
  #  params[:healthcloud_id] = params[:healthcloud_id].to_i
  #end
  
  def patient_params
    params.fetch(:patient, {}).permit(:email, :active, :registration_code, :healthcloud_id)
  end
  
end