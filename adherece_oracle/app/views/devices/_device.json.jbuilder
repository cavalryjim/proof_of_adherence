json.extract! device, :id, :name, :vendor, :vendor_number, :cost, :created_at, :updated_at
json.url device_url(device, format: :json)
