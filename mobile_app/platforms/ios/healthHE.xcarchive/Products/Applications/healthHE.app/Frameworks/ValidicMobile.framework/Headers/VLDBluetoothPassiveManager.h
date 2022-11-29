//
//  VLDBluetoothPassiveManager.h
//  ValidicMobile
//
//  Created by David Melgar on 8/16/16.
//  Copyright © 2016 Validic. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import "VLDBluetoothPeripheralControllerDelegate.h"

@class VLDBluetoothPeripheralController;
@class VLDBluetoothPeripheral;
@class VLDBluetoothController;

/**
 ## Notifications ##
 When VLDBluetoothPassiveManager attempts to read from peripherals notifications are sent. To listen for these
 notifications add an observer to the NSNotificationCenter with one of the following constants.
 The userInfo dictionary for the notifications will contain a key, ```peripheralID```.
 The didRead notification will pass as the object, an array of VLDRecords read from the peripheral.
 The didFail notification will pass the NSError object as the object in the notification. */
extern NSString * _Nonnull const kVLDBluetoothPassiveDidReadNotification;
extern NSString * _Nonnull const kVLDBluetoothPassiveDidFailNotification;
extern NSString * _Nonnull const kVLDBluetoothPassiveIsReadyToReadNotification;

/** VLDBluetoothPassiveManager manages reading Bluetooth peripherals passively without explicit
 user interaction. Passive read occurs if the application is in the foreground or background.
 If the application is no longer in the background but has been terminated by iOS, the application
 will be started if one of the peripherals being passively read is discovered. Apps using the 
 passive manager function must have been started at least once since the phone booted.
 
 There are situations where passive Bluetooth reading is stopped and requires the app to be relaunched. These situations include:
 
 - When the user explicitly kills the app by swiping up on the app switcher view, the app will not be restarted by iOS when a peripheral is discovered.
 - If the iOS device is rebooted, state restoration is no longer in effect and iOS will not automatically restart the app when a peripheral is discovered. The app needs to be run at least once after reboot. When the app is launched the passive manager remembers what peripherals if any where being passively read and restarts the capability.
 
 Passive Bluetooth reading has some additional considerations due to the behavior of the iOS Bluetooth stack and background support.
 
 - When scanning for peripherals in the background, iOS reduces the frequency and duration of the time the phone listens for devices. This may cause some peripherals to not be discovered in the background. This varies by phone model and peripheral. Generally older phone models are more likely to miss discovery of a peripheral.
 - Nonim pulse oximeter, ChoiceMMed pulseOx and ChoiceMMed scale are not usually detectable when in the background.
 - The Pyle thermometer is sometimes not discovered on older phone models when in the background.
 - iOS has additional heuristics to determine scanning frequency which may not be documented. If multiple apps on the phone are performing background scanning, scanning may become more infrequent.
 - To prevent repeated attempted reads from a device for one actual reading, the passive manager waits after a successful read until the device stops broadcasting, then waits an additional few seconds before acknowledging the device again. If attempting multiple readings in quick succession, the second reading may not be read. Instead the user should wait until the device powers off and then wait an additional 15 seconds or longer before attempting another reading.
 */
@interface VLDBluetoothPassiveManager : NSObject

/**  Returns the VLDBluetoothPassiveManager singleton
 and should be the only way it is accessed. */
+ (instancetype _Nonnull)sharedInstance;

/** The app delegate applicationDidFinishLaunching must call this method to support
 passive bluetooth reading when launched for state restoration.
 */
- (void)restoreState;

/** Convenience method to set peripheral IDs based on peripherals.
 @param peripherals Array of VLDBluetoothPeripheral to passively read. Passing an empty array stops passive bluetooth reading.
 */
- (void)setPeripherals:(nullable NSArray <VLDBluetoothPeripheral *>*) peripherals;


/** Setting this property turns on passive bluetooth reading of those peripherals. 
 Setting this property to an empty array or nil stops passive bluetooth reading.
 */
@property (nonatomic, strong, nullable) NSArray <NSNumber *>* peripheralIDs;

@end
