class Api::He1::PatientDevicesController < Api::He1::BaseController

  # GET /patient_devices.json
  def index
    @patient_devices = @patient.patient_devices.order("id")
    @patient.update_attribute(:update_devices, false)
    render json: @patient_devices
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_device
      @patient_device = PatientDevice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def device_params
      params.require(:patient_device).permit(:id, :patient_id, :device_id, :serial_number, :mac_address)
    end
end