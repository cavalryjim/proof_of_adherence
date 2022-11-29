//
//  VLDBluetoothPeripheralController.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 6/3/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "VLDBluetoothPeripheralControllerDelegate.h"

extern NSString * const kVLDBluetoothErrorDomain;

/** Possible error codes that can be returned to the 
    VLDBluetoothPeripheralControllerDelegate */
typedef NS_ENUM(NSUInteger, VLDBluetoothErrorCode) {
    
    /** Indicates an error occurred in the Bluetooth communication stack */
    VLDBluetoothErrorCodeCommunicationFailure,
    
    /** Indicates that a connection was unable to be established or was lost */
    VLDBluetoothErrorCodeConnectionFailure,
    
    /** Indicates that the peripheral was not paired */
    VLDBluetoothErrorCodePairingFailure,
    
    /** Indicates that Bluetooth is turned off or not available */
    VLDBluetoothErrorCodeBluetoothTurnedOff,
    
    /** Indicates that no valid reading was received */
    VLDBluetoothErrorCodeNoReading,
    
    /** Indicates that there is no user set in the shared session instance */
    VLDBluetoothErrorCodeNoUser,

    /** Indicates that a timeout occurred while attempting to connect to the peripheral */
    VLDBluetoothErrorCodeConnectionTimeout,

    /** Indicates that a timeout occurred while attempting to read from the peripheral */
    VLDBluetoothErrorCodeReadingTimeout,
};

/** VLDBluetoothPeripheralController is the primary interface for detecting
and reading from Bluetooth peripherals. All peripheral updates are given to
the peripheral controller's delegate object (VLDBluetoothPeripheralControllerDelegate).
 
The peripheral controller only performs one operation at a time. Any current operations
must finish or be cancelled before a new operation can be started. The two possible
operations are pairPeripheral: and readFromPeripheral:.
 
If the VLDBluetoothPeripheral has ```requiresPairing``` set to true, then you must first
call pairPeripheral: to ensure that we are able to communicate with the peripheral and
to do any necessary pairing. When you call pairPeripheral:, you should then present
to the user the [instructions]([VLDBluetoothPeripheral instructions]) of the VLDBluetoothPeripheral. When the
```bluetoothPeripheralController:didPairPeripheral:``` callback is called, you can assume
all pairing has been done and it is now safe to call readFromPeripheral:.
 
To get a reading from a peripheral, call readFromPeripheral: and pass in the
VLDBluetoothPeripheral object that you want to take a reading from. The reading
operation will have multiple callbacks at different stages that are reported
to the VLDBluetoothPeripheralControllerDelegate. When the VLDRecord object
is returned via callback, it is also simultaneously uploaded to Validic. Do
not submit these records to Validic as they have already been submitted.
*/
@interface VLDBluetoothPeripheralController : NSObject

/** The object that acts as the delegate of the peripheral controller.
 
Must conform to VLDBluetoothPeripheralControllerDelegate protocol. */
@property (nonatomic, weak) id<VLDBluetoothPeripheralControllerDelegate>delegate;

/** Pairs a Bluetooth peripheral.
 
 Returns NO if the controller is already pairing or reading from a peripheral.
 
 Returns YES if the controller is available.
 
 @param peripheral the peripheral to pair with. */
- (BOOL)pairPeripheral:(VLDBluetoothPeripheral *)peripheral;

/** Reads from a Bluetooth peripheral
 
Returns NO if the controller is already pairing or reading from a peripheral
 
Returns YES if the controller is available 
 
 @param peripheral the peripheral to read from. */
- (BOOL)readFromPeripheral:(VLDBluetoothPeripheral *)peripheral;

/** Cancels all Bluetooth operations and disconnects from any connected 
peripherals
 
A new read or pair operation cannot begin until the current
operation is finished or cancelled. */
- (void)cancel;

/** Determines if a read or pair operation is currently in progress

If an operation is in progress, it will need to be cancelled
before a new operation can be started. */
- (BOOL)operationInProgress;

@end
