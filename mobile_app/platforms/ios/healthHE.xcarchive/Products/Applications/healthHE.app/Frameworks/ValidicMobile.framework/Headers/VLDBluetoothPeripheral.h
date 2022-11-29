//
//  VLDBluetoothPeripheral.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 6/3/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDPeripheral.h"

/** The VLDBluetoothPeripheral class represents Bluetooth peripheral models that
can be discovered or read from by VLDBluetoothPeripheralController. */
@interface VLDBluetoothPeripheral : VLDPeripheral

/** Indicates if a peripheral model requires a Bluetooth
 pairing before it can be used. If a peripheral requires pairing,
 you must first call [pairPeripheral:]([VLDBluetoothPeripheralController pairPeripheral:])
 on VLDBluetoothPeripheralController at least once
 before calling [readFromPeripheral:]([VLDBluetoothPeripheralController readFromPeripheral:])
 on VLDBluetoothPeripheralController. */
@property (nonatomic, assign) BOOL requiresPairing;

/** Text to be presented to the user when 
 [readFromPeripheral:]([VLDBluetoothPeripheralController readFromPeripheral:])
 is called on VLDBluetoothPeripheralController. */
@property (nonatomic, copy, nullable) NSString *instructions;

/** Text to be presented to the user when the
 [isReadyToReadFromPeripheral:]([VLDBluetoothPeripheralControllerDelegate bluetoothPeripheralController:isReadyToReadFromPeripheral:]) callback is 
 sent to the VLDBluetoothPeripheralControllerDelegate. */
@property (nonatomic, copy, nullable) NSString *readingInstructions;

/** Text to be presented to the user when [pairPeripheral:]([VLDBluetoothPeripheralController pairPeripheral:]) 
 is called on VLDBluetoothPeripheralController
 and VLDBluetoothPeripheral property requiresPairing is TRUE */
@property (nonatomic, copy, nullable) NSString *pairingInstructions;

/** A version string (e.g. 1.4.2) indicating which version of the
 library supports this peripheral model */
@property (nonatomic, copy, nullable) NSString *version;

/** Returns the peripheral for the given ID 
 
 @param peripheralID the ID of the peripheral to retrieve. */
+ (VLDBluetoothPeripheral * _Nullable)peripheralForID:(NSUInteger)peripheralID;
@end
