class PatientDevicesController < ApplicationController
  before_action :set_patient_device, only: [:show, :edit, :update, :destroy]
  before_action :set_patient, only: [:index, :new, :create, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /patient_devices
  # GET /patient_devices.json
  def index
    #@patient_devices = PatientDevice.all
    @patient_devices = @patient.patient_devices
  end

  # GET /patient_devices/1
  # GET /patient_devices/1.json
  def show
  end

  # GET /patient_devices/new
  def new
    #@patient_device = PatientDevice.new
    @patient_device = @patient.patient_devices.new
  end

  # GET /patient_devices/1/edit
  def edit
  end

  # POST /patient_devices
  # POST /patient_devices.json
  def create
    #@patient_device = PatientDevice.new(patient_device_params)
    @patient_device = @patient.patient_devices.new(patient_device_params)

    respond_to do |format|
      if @patient_device.save
        format.html { redirect_to patient_patient_devices_path(@patient), notice: 'Patient device was successfully created.' }
        format.json { render :show, status: :created, location: @patient_device }
      else
        format.html { render :new }
        format.json { render json: @patient_device.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patient_devices/1
  # PATCH/PUT /patient_devices/1.json
  def update
    respond_to do |format|
      if @patient_device.update(patient_device_params)
        format.html { redirect_to patient_patient_devices_path(@patient), notice: 'Device was successfully updated.' }
        format.json { render :show, status: :ok, location: @patient_device }
      else
        format.html { render :edit }
        format.json { render json: @patient_device.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patient_devices/1
  # DELETE /patient_devices/1.json
  def destroy
    @patient_device.destroy
    respond_to do |format|
      format.html { redirect_to patient_patient_devices_path(@patient), notice: 'Device was successfully removed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient_device
      @patient_device = PatientDevice.find(params[:id])
    end
    
    def set_patient
      @patient = Patient.find(params[:patient_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def patient_device_params
      params.require(:patient_device).permit(:patient_id, :device_id, :serial_number, :mac_address, :active)
    end

end
