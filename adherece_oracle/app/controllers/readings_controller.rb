class ReadingsController < ApplicationController
  before_action :set_reading, only: [:show, :edit, :update, :destroy]
  before_action :set_patient, only: [:new, :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  # GET /readings
  # GET /readings.json
  def index
    @readings = Reading.all
  end

  # GET /readings/1
  # GET /readings/1.json
  def show
  end

  # GET /readings/new
  def new
    @reading = Reading.new
  end

  # GET /readings/1/edit
  def edit
  end

  # POST /readings
  # POST /readings.json
  def create
    @reading = Reading.new(reading_params)

    respond_to do |format|
      if @reading.save
        format.html { redirect_to @reading, notice: 'Reading was successfully created.' }
        format.json { render :show, status: :created, location: @reading }
      else
        format.html { render :new }
        format.json { render json: @reading.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /readings/1
  # PATCH/PUT /readings/1.json
  def update
    respond_to do |format|
      if @reading.update(reading_params)
        format.html { redirect_to edit_patient_reading_path(@patient, @reading), notice: 'Reading was successfully updated.' }
        format.json { render :show, status: :ok, location: @reading }
      else
        format.html { render :edit }
        format.json { render json: @reading.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /readings/1
  # DELETE /readings/1.json
  def destroy
    @reading.destroy
    respond_to do |format|
      format.html { redirect_to patient_url(@patient), notice: 'Reading was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reading
      @reading = Reading.find(params[:id])
    end
    
    def set_patient
      @patient = Patient.find(params[:patient_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reading_params
      params.fetch(:reading, {}).permit(:readings, :value1, :value2, :value3, :value4, :value_str, :date, :type, :synched)
    end
end
