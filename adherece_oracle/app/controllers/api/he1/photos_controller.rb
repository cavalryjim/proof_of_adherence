class Api::He1::PhotosController < Api::He1::BaseController
  before_action :set_photo, only: [:show, :edit, :update, :destroy]
  before_action :set_meal, only: [:index]
  # JDavis: need to set meail before [:index, :create, :update]
  
  # GET /photos.json
  def index
    @photos = @meal.photos

    render json: @photos
  end

  # GET /photos/1.json
  def show
  end

  # POST /photos.json
  def create
    photo = @patient.photos.new(image: params[:file], meal_id: params[:meal_id])
    #photo.user_id = @user.id
    if photo.save
      render json: { photo: @photo, status: :created }
    else
      render json: { error: @photo.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /photos/1.json
  def update
    if @photo.update(photo_params)
      render json: { photo: @photo, status: :ok }
    else
      render json: { error: @photo.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /photos/1.json
  def destroy
    @photo.destroy
    render json: { head: :no_content }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end
    
    def set_meal
      @meal = Meal.find(params[:meal_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def photo_params
      params.require(:photo).permit(:meal_id, :user_id, :caption, :image_uid, :image_name, :external_url, :image)
    end
end
