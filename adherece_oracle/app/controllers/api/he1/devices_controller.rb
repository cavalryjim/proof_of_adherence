class Api::He1::DevicesController < Api::He1::BaseController

  # GET /devices
  # GET /devices.json
  def index
    @patient_devices = @patient.patient_devices
    render json: @patient_devices
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_device
      @device = Device.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def device_params
      params.require(:device).permit(:name, :vendor, :vendor_number, :cost)
    end
end
