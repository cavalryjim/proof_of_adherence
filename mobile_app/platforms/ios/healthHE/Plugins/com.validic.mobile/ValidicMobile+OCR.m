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
//  ValidicMobile+OCR.m
//  Validic Mobile
//
//  Created by David Melgar on 6/16/16.
//
//

#import "ValidicMobile+OCR.h"

@implementation ValidicMobile(OCR)


- (void)OCR_getSupportedPeripherals:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSMutableArray *responseArray = [NSMutableArray array];
        
        // Populate a dictionary with all the supported peripherals
        for (VLDOCRPeripheral *peripheral in [VLDOCRPeripheral supportedPeripherals]) {
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
- (void)OCR_getPeripheralsOfType:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSMutableArray *responseArray = [NSMutableArray array];
        
        NSNumber *type = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
        // Populate a dictionary with all the supported peripherals
        if (type) {
            for (VLDPeripheral *peripheral in [VLDOCRPeripheral peripheralsOfType:[type intValue]]) {
                NSDictionary *pDictionary = [peripheral JSONObject];
                [responseArray addObject:pDictionary];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                         messageAsDictionary:@{kType: type, kPeripherals: responseArray}];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                         messageAsDictionary:@{kError:@"Invalid type"}];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

- (void)OCR_getPeripheral:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSNumber *peripheralID = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
        if (peripheralID) {
            VLDPeripheral *peripheral = [VLDOCRPeripheral peripheralForID:[peripheralID intValue]];
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

- (void)OCR_read:(CDVInvokedUrlCommand *)command {
    NSLog(@"OCR_read");
    NSNumber *peripheralID = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
    if (peripheralID) {
        VLDBluetoothPeripheral *peripheral = [VLDBluetoothPeripheral peripheralForID:[peripheralID intValue]];
        if (peripheral) {
            self.ocrCallbackId = command.callbackId;
            self.ocrController = [[VLDOCRViewController alloc] initWithOCRPeripheralID:[peripheralID intValue]];
            self.ocrController.delegate = self;
            [[[UIApplication sharedApplication].delegate.window rootViewController] presentViewController:self.ocrController animated:YES completion:nil];
        } else {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                                 messageAsDictionary:@{kPeripheralID: peripheralID, kError:@"Peripheral not found"}]
                                        callbackId:command.callbackId];
        }
    } else {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                             messageAsDictionary:@{kPeripheralID: peripheralID, kError:@"PeripheralID not provided"}]
                                    callbackId:command.callbackId];
    }
}
@end


@implementation ValidicMobile(OCRViewDelegate)
- (void)ocrViewController:(VLDOCRViewController *)viewController didCompleteReading:(VLDRecord *)record image:(UIImage *)image metadata:(NSDictionary *)metadata {
    
    NSDictionary *rDict = [self dictionaryFromRecord:record];
    NSString *base64Image = [UIImagePNGRepresentation(image) base64EncodedStringWithOptions:0];
    NSDictionary *resultDictionary = @{ kPeripheralID:@(record.peripheral.peripheralID), kRecord: rDict, kImage: base64Image};
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultDictionary] callbackId:self.ocrCallbackId];
    [self endOCRSession];
}
- (void)ocrViewControllerDidCancel:(VLDOCRViewController *)viewController {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary: @{kError: @"Cancelled"}] callbackId:self.ocrCallbackId];
    [self endOCRSession];
}
- (void)ocrViewControllerWasDeniedCameraAuthorization:(VLDOCRViewController *)viewController {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary: @{kError: @"Camera not accessible"}] callbackId:self.ocrCallbackId];
    [self endOCRSession];
}

- (void)endOCRSession {
    [self.ocrController dismissViewControllerAnimated:YES completion:nil];
    self.ocrCallbackId = nil;
    self.ocrController = nil;
}

@end