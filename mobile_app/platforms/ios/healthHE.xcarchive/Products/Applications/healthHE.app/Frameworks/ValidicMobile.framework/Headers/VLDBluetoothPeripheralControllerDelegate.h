//
//  VLDBluetoothPeripheralControllerDelegate.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 7/7/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

@class VLDBluetoothPeripheral;
@class VLDBluetoothPeripheralController;
@class VLDRecord;

/** The VLDBluetoothPeripheralControllerDelegate protocol provides callbacks
to indicate the status of a [pairPeripheral:]([VLDBluetoothPeripheralController pairPeripheral:]) or [readFromPeripheral:]([VLDBluetoothPeripheralController readFromPeripheral:])
operation. When performing a [readFromPeripheral:]([VLDBluetoothPeripheralController readFromPeripheral:]) operation you should
listen for the bluetoothPeripheralController:isReadyToReadFromPeripheral: callback
and then display to the user the [readingInstructions]([VLDBluetoothPeripheral readingInstructions]) from the
VLDBluetoothPeripheral object.
*/
@protocol VLDBluetoothPeripheralControllerDelegate <NSObject>

@optional

/** @name Pairing Peripheral */

/** Callback once a peripheral has been successfully found and paired if needed 
 
 @param controller The VLDBluetoothPeripheralController instance that was doing the pairing
 @param peripheral The bluetooth peripheral that was being paired
 */
- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller didPairPeripheral:(VLDBluetoothPeripheral *)peripheral;

/** Callback if the peripheral was unable to be paired, or if the [pairPeripheral:]([VLDBluetoothPeripheralController pairPeripheral:]) operation was cancelled
 
 @param controller The VLDBluetoothPeripheralController instance that was doing the pairing
 @param peripheral The bluetooth peripheral that was being paired
 @param error An NSError object with a code from the values in VLDBluetoothErrorCode indicating the type of error that occured
 */
- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller didNotPairPeripheral:(VLDBluetoothPeripheral *)peripheral error:(NSError *)error;

/** @name Reading From Peripheral */

/** Callback indicating that the user can now begin taking a measurement with the peripheral
 
 @param controller The VLDBluetoothPeripheralController instance that is taking a reading
 @param peripheral The bluetooth peripheral that is being read from
 */
- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller isReadyToReadFromPeripheral:(VLDBluetoothPeripheral *)peripheral;

/** Callback passing back the VLDRecord objects with the measurement data received from the peripheral and asking if they should be submitted to Validic 
 
 @param controller The VLDBluetoothPeripheralController instance that took the readings
 @param records An array of records containing the readings received from the peripheral. Most peripherals will return a single reading, some may return more.
 @param peripheral The bluetooth peripheral that the readings came from
 */
- (BOOL)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller shouldSubmitReadings:(NSArray<__kindof VLDRecord*> *)records fromPeripheral:(VLDBluetoothPeripheral *)peripheral;

/** Callback indicating that the [readFromPeripheral:]([VLDBluetoothPeripheralController readFromPeripheral:]) operation was cancelled
 
 @param controller The VLDBluetoothPeripheralController instance that was taking a reading
 @param peripheral The bluetooth peripheral that was being read from
*/
- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller didCancelReadingForPeripheral:(VLDBluetoothPeripheral *)peripheral;

/** Callback indicating attempt to get a reading from the peripheral failed
 
 @param controller The VLDBluetoothPeripheralController instance that was taking a reading
 @param peripheral The bluetooth peripheral that was being read from
 @param error An NSError object with a code from the values in VLDBluetoothErrorCode indicating the type of error that occured
 */
- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller readingFailedForPeripheral:(VLDBluetoothPeripheral *)peripheral error:(NSError *)error;

@end
