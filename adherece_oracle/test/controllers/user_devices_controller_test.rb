require 'test_helper'

class UserDevicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_device = user_devices(:one)
  end

  test "should get index" do
    get user_devices_url
    assert_response :success
  end

  test "should get new" do
    get new_user_device_url
    assert_response :success
  end

  test "should create user_device" do
    assert_difference('UserDevice.count') do
      post user_devices_url, params: { user_device: { device_id: @user_device.device_id, user_id: @user_device.user_id } }
    end

    assert_redirected_to user_device_url(UserDevice.last)
  end

  test "should show user_device" do
    get user_device_url(@user_device)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_device_url(@user_device)
    assert_response :success
  end

  test "should update user_device" do
    patch user_device_url(@user_device), params: { user_device: { device_id: @user_device.device_id, user_id: @user_device.user_id } }
    assert_redirected_to user_device_url(@user_device)
  end

  test "should destroy user_device" do
    assert_difference('UserDevice.count', -1) do
      delete user_device_url(@user_device)
    end

    assert_redirected_to user_devices_url
  end
end
