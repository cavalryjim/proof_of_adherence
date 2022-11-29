class Api::He1::ReadingsController < Api::He1::BaseController
  
  # GET /readings.json
  # def index
  #   @readings = @patient.readings
  #   render json: @readings
  # end
  
  # POST /devices.json
  def create
    @reading = @patient.readings.new(reading_params)

    respond_to do |format|
      if @reading.save
        format.json { render json: @reading, status: :created }
        #format.json { render :show, status: :created, location: @reading }
      else
        format.json { render json: @reading.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def batch_create
    #puts params[:readings]
    #readings = params[:readings].to_h
    
    if @patient.batch_create_readings(params[:readings])
      render json: {success: true, update_devices: @patient.update_devices}, status: :created
    else
      render json: {success: false}, status: :internal_server_error
    end
  end

  
  private
    
    def reading_params
      params.require(:reading).permit(:readings, :value1, :value2, :value3, :value4, :value_str, 
                      :date, :type, :synched, :patient_sfid)
    end
end