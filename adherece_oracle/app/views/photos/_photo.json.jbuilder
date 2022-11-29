json.extract! photo, :id, :meal_id, :user_id, :caption, :image_uid, :image_name, :external_url, :created_at, :updated_at
json.url photo_url(photo, format: :json)
