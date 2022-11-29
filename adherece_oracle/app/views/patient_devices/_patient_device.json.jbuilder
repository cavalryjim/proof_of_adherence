json.extract! patient_device, :id, :patient_id, :device_id, :created_at, :updated_at
json.url patient_device_url(patient_device, format: :json)
