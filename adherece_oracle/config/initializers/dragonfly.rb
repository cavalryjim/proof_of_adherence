#require 'dragonfly'
require 'dragonfly/s3_data_store'

# Configure
Dragonfly.app.configure do
  plugin :imagemagick

  secret "9f888cc3250667034ab523ba304be57e4529003fd3a9e7d53065702cd1a784fa"

  url_format "/media/:job/:name"

  #datastore :file,
  #  root_path: Rails.root.join('public/system/dragonfly', Rails.env),
  #  server_root: Rails.root.join('public')
  datastore :s3,
    bucket_name: ENV["AWS_S3_HE_BUCKET"],
    access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware

# Add model functionality
ActiveSupport.on_load(:active_record) do
  extend Dragonfly::Model
  extend Dragonfly::Model::Validations
end
