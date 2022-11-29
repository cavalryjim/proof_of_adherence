class Api::He1::MealsController < Api::He1::BaseController
  before_action :set_meal, only: [:show, :update, :destroy]

  # GET /meals.json
  def index
    @meals = @patient.meals.order(created_at: :desc)
    #render json: {status: :success, @meals}
    render json: @meals
  end

  # GET /meals/1.json
  def show
  end

  # POST /meals.json
  def create
    @meal = @patient.meals.new(meal_params)

    if @meal.save
      render json: {status: :success, meal: @meal}
    else
      render json: {errors: @meal.errors, status: :unprocessable_entity}
    end
    
  end

  # PATCH/PUT /meals/1.json
  def update
    if @meal.update(meal_params)
      render json: { status: :success, meal: @meal }
    else
      render json: { error: @meal.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /meals/1.json
  def destroy
    @meal.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def meal_params
      params.require(:meal).permit(:title, :body, :patient_id)
    end
end
