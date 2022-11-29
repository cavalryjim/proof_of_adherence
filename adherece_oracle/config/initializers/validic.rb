require 'validic'

# config/initializers/validic.rb
Validic.configure do |config|
  config.api_url          = 'https://api.validic.com'
  config.api_version      = 'v1'
  config.access_token     = '1472f65102134e0f07dadfb3facf73c85ca7c1f44e3a5ee1b34a21464303db72'
  config.organization_id  = '59442282ff9d93000900024a'
end

# JDavis: !important. need to move these to environmental variables....
# Validic Credentials:
# Org ID: 59442282ff9d93000900024a
# Org Access Token: 1472f65102134e0f07dadfb3facf73c85ca7c1f44e3a5ee1b34a21464303db72