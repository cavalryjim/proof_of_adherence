json.extract! meal, :id, :title, :body, :patient_id, :created_at, :updated_at
json.url meal_url(meal, format: :json)
