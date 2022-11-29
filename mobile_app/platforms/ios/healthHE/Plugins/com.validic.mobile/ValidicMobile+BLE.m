// This file is part of the Validic Mobile library Cordova plugin Version 1.3.0
//
// Copyright 2016 Motivation Science Inc., All Rights Reserved
// This software is supplied to you by Motivation Science, Inc. (operating as "Validic") under terms of your
// contract with Validic.  This software may not be shared or redistributed, in part or as a whole, except
// as explicitly stated by contract with Validic.  This software is provided by Validic on an "as is" basis.  
// Validic makes no warranties, express or implied, including without limitation the implied warranties of 
// non-infringement, merchantability and fitness for a particular purpose, regarding this Validic software 
// or its use and operation alone or in combination with your products.  In no event shall Validic be liable 
// for any special, indirect, incidental or consequential damages (including, but not limited to, procurement 
// of substitute goods for services; loss of use, data or profits; or business interruption) arising in any 
// way out of the use, reproduction, modification and/or distribution of the Validic software, however caused 
// and whether under theory of contract, tort (including negligence), strict liability or otherwise, even if 
// Validic has been advised of the possibility of such damage. 
//
//  ValidicMobile+ValidicMobile_BLE.m
//  Validic Mobile 
//
//  Created by David Melgar on 6/15/16.
//
//

#import "ValidicMobile+BLE.h"
#import "ValidicMobile.h"
#import <ValidicMobile/ValidicMobile.h>
#import "ValidicMobile.h"

@implementation ValidicMobile (BLE)


#pragma mark Bluetooth functions

/**
 Response: Array of dictionaries
 ## dictionaryModel method is not public. Either expose it here in a category or in the library
 */
- (void)BLE_getSupportedPeripherals:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSMutableArray *responseArray = [NSMutableArray array];
        
        // Populate a dictionary with all the supported peripherals
        for (VLDBluetoothPeripheral *peripheral in [VLDBluetoothPeripheral supportedPeripherals]) {
            NSDictionary *pDictionary = [peripheral JSONObject];
            [responseArray addObject:pDictionary];
        }
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{kPeripherals: responseArray}];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

/** Type is an INT with the following values
 0 VLDPeripheralTypeNone,
 1 VLDPeripheralTypeThermometer,
 2 VLDPeripheralTypeBloodPressure,
 3 VLDPeripheralTypeHeartRate,
 4 VLDPeripheralTypeGlucoseMeter,
 5 VLDPeripheralTypeWeightScale,
 6 VLDPeripheralTypePulseOximeter
 */
- (void)BLE_getPeripheralsOfType:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSMutableArray *responseArray = [NSMutableArray array];
        
        NSNumber *type = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
        // Populate a dictionary with all the supported peripherals
        if (type) {
            for (VLDBluetoothPeripheral *peripheral in [VLDBluetoothPeripheral peripheralsOfType:[type intValue]]) {
                NSDictionary *pDictionary = [peripheral JSONObject];
                [responseArray addObject:pDictionary];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                         messageAsDictionary:@{kType: type, kPeripherals: responseArray}];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsDictionary:@{kError:@"Invalid parameter"}];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

- (void)BLE_getPeripheral:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSNumber *peripheralID = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
        if (peripheralID) {
            VLDPeripheral *peripheral = [VLDBluetoothPeripheral peripheralForID:[peripheralID intValue]];
            if (peripheral) {
                NSDictionary *response = [peripheral JSONObject];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                             messageAsDictionary:@{kPeripheral: response}];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsDictionary:@{kPeripheralID: peripheralID, kError:@"Peripheral not found"}];
            }
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsDictionary:@{kError:@"Invalid peripheralID"}];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

- (void)BLE_pair:(CDVInvokedUrlCommand *)command {
    
    /* General flow. Creates a bluetooth controller which is stored as an ivar.
     Asks it to pair.
     Registers as a delegate
     Has methods for delegate callbacks
     Needs to manage lifecycle according to some rule. What is pair request while already
     pairing or reading something else. Which one has priority. Could cancel the previous
     one and start new, or may be cleaner is to return an error and not allow it.
     How is an error message relayed?
     */
    
    // Provide the peripheral ID
    NSNumber *peripheralID = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
    if (peripheralID) {
        VLDBluetoothPeripheral *peripheral = [VLDBluetoothPeripheral peripheralForID:[peripheralID intValue]];
        if (peripheral) {
            self.bleCallbackId = command.callbackId;
            [self.bleController pairPeripheral:peripheral];
        } else {
            [self respondWithEvent:@"validicOnPairFailed"
                           payload:@{kPeripheralID: peripheralID}
                             error:@"Peripheral not found"
                        callbackId:command.callbackId
                         isSuccess:NO];
        }
    } else {
        [self respondWithEvent:@"validicOnPairFailed"
                       payload:@{kPeripheralID: peripheralID}
                         error:@"Invalid parameter"
                    callbackId:command.callbackId
                     isSuccess:NO];
    }
}

- (void)BLE_read:(CDVInvokedUrlCommand *)command {
    NSLog(@"BLE_read");
    NSNumber *peripheralID = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
    if (peripheralID) {
        VLDBluetoothPeripheral *peripheral = [VLDBluetoothPeripheral peripheralForID:[peripheralID intValue]];
        if (peripheral) {
            self.bleCallbackId = command.callbackId;
            [self.bleController readFromPeripheral:peripheral];
        } else {
            [self respondWithEvent:@"validicOnReadFailed"
                           payload:@{kPeripheralID: peripheralID}
                             error:@"Peripheral not found"
                        callbackId:command.callbackId
                         isSuccess:NO];
        }
    } else {
        [self respondWithEvent:@"validicOnReadFailed"
                       payload:@{kPeripheralID: peripheralID}
                         error:@"Invalid parameter"
                    callbackId:command.callbackId
                     isSuccess:NO];
    }
}

- (void)BLE_cancel:(CDVInvokedUrlCommand *)command {
    self.bleCallbackId = command.callbackId;
    [self.bleController cancel];
    // Response from delegate
}

- (void)BLE_inProgress:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                         messageAsDictionary:@{@"inProgress": [NSNumber numberWithBool:[self.bleController operationInProgress]]}]
                                callbackId:command.callbackId];
}

- (void)BLE_setPassiveReadPeripheralIDs:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL validParams = YES;
        NSArray <NSNumber *>*identifiers = [command argumentAtIndex:0];
        if (identifiers) {
            if ([identifiers isKindOfClass:[NSArray class]]) {
                for (id identifier in identifiers) {
                    if (![identifier isKindOfClass:[NSNumber class]]) {
                        validParams = NO;
                        break;
                    }
                }
            } else {
                validParams = NO;
            }
        }
        
        CDVPluginResult *pluginResult;
        if (validParams) {
            [VLDBluetoothPassiveManager sharedInstance].peripheralIDs = identifiers;
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsDictionary:@{kError:@"Invalid parameter"}];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

- (void)BLE_getPassiveReadPeripheralIDs:(CDVInvokedUrlCommand *)command {
    NSArray <NSNumber *>* identifiers = [VLDBluetoothPassiveManager sharedInstance].peripheralIDs;
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{ kPeripheralIDs: identifiers}] callbackId:command.callbackId];
}

// Notification handling in base class
- (void)BLE_setBluetoothPassiveListener:(CDVInvokedUrlCommand *)command {
    self.blePassiveCallbackId = command.callbackId;
}

// Internal method
- (void)respondWithEvent:(NSString *)event payload:(NSDictionary *)payload error:(NSString *)errorString callbackId:(NSString *)callbackId isSuccess:(BOOL)isSuccess {
    NSMutableDictionary *responsePayload;
    if (payload) {
        responsePayload = [payload mutableCopy];
    } else {
        responsePayload = [NSMutableDictionary dictionary];
    }
    if (errorString) {
        [responsePayload setValue:errorString forKey:kEvent];
    }
    NSDictionary *response = @{kEvent: event, kPayload: responsePayload};
    
    CDVPluginResult *result;
    if (isSuccess) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
        [result setKeepCallback:@YES];
        [self.commandDelegate sendPluginResult:result callbackId:callbackId];
    } else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
        [result setKeepCallback:@YES];
        [self.commandDelegate sendPluginResult:result callbackId:callbackId];
    }
}

@end


@implementation ValidicMobile (BLEDelegate)

- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller didPairPeripheral:(VLDBluetoothPeripheral *)peripheral {
    NSLog(@"didPair");
    if (self.bleCallbackId) {
        [self respondWithEvent:@"validicOnPairSuccessful"
                       payload:@{kPeripheralID: @(peripheral.peripheralID)}
                         error:nil
                    callbackId:self.bleCallbackId
                     isSuccess:YES];
        self.bleCallbackId = nil;
    }
}

- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller didNotPairPeripheral:(VLDBluetoothPeripheral *)peripheral error:(NSError *)error {
    NSLog(@"didNotPair");
    if (self.bleCallbackId) {
        [self respondWithEvent:@"validicOnPairingFailed"
                       payload:@{kPeripheralID: @(peripheral.peripheralID)}
                         error:[error localizedDescription]
                    callbackId:self.bleCallbackId
                        isSuccess:NO];
    }
}

- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller isReadyToReadFromPeripheral:(VLDBluetoothPeripheral *)peripheral {
    NSLog(@"isReadyToReadFromPeripheral");
    if (self.bleCallbackId) {
        [self respondWithEvent:@"validicOnReadyToRead"
                       payload:@{kPeripheralID: @(peripheral.peripheralID)}
                         error:nil
                    callbackId:self.bleCallbackId
                     isSuccess:YES];
    }
}

- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller didCancelReadingForPeripheral:(VLDBluetoothPeripheral *)peripheral {
    NSLog(@"didCancel");
    if (self.bleCallbackId) {
        [self respondWithEvent:@"validicOnReadCancelled"
                       payload:@{kPeripheralID: @(peripheral.peripheralID)}
                         error:nil
                    callbackId:self.bleCallbackId
                     isSuccess:YES];
    }
}

- (void)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller readingFailedForPeripheral:(VLDBluetoothPeripheral *)peripheral error:(NSError *)error {
    NSLog(@"readingFailed");
    if (self.bleCallbackId) {
        [self respondWithEvent:@"validicOnReadFailed"
                       payload:@{kPeripheralID: @(peripheral.peripheralID)}
                         error:[error localizedDescription]
                    callbackId:self.bleCallbackId
                     isSuccess:NO];
    }
}

- (BOOL)bluetoothPeripheralController:(VLDBluetoothPeripheralController *)controller shouldSubmitReadings:(NSArray<__kindof VLDRecord *> *)records fromPeripheral:(VLDBluetoothPeripheral *)peripheral {
    // Received records, serialize them and return it to the Cordova app
    
    NSLog(@"shouldSubmitReadings");
    NSMutableArray *responseArray = [NSMutableArray array];
    for (VLDRecord *record in records) {
        NSDictionary *pDictionary = [self dictionaryFromRecord:record];
        [responseArray addObject:pDictionary];
    }
    [self respondWithEvent:@"validicOnReadSuccessful"
                   payload:@{kRecords: responseArray}
                     error:nil
                callbackId:self.bleCallbackId
                 isSuccess:YES];
    
    return self.bleShouldSubmitReadings;
}

@end
