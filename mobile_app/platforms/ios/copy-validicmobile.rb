#!/usr/bin/env ruby

require 'fileutils'

framework = ENV["SRCROOT"] + "/ValidicMobile.framework"
frameworks_folder = ENV["CONFIGURATION_BUILD_DIR"] + "/" + ENV["FRAMEWORKS_FOLDER_PATH"]
framework_path = frameworks_folder + "/ValidicMobile.framework"
file_path = framework_path + "/ValidicMobile"

FileUtils.mkdir_p frameworks_folder

if Dir.exists?(framework_path)
	FileUtils.remove_dir framework_path
end

FileUtils.copy_entry framework, framework_path, preserve = true

archs = ENV["VALID_ARCHS"].split(" ")

if !archs.include?('i386')
	puts "Removing i386 slice"
	`lipo -remove i386 "#{file_path}" -output "#{file_path}"`
end

if !archs.include?('x86_64')
	puts "Removing x86 slice"
	`lipo -remove x86_64 "#{file_path}" -output "#{file_path}"`
end

if ENV["EXPANDED_CODE_SIGN_IDENTITY"]
	puts "Signing binary as " + ENV["EXPANDED_CODE_SIGN_IDENTITY"]
	`codesign --force --sign "#{ENV["EXPANDED_CODE_SIGN_IDENTITY"]}" --preserve-metadata=identifier,entitlements "#{framework_path}"`
end
