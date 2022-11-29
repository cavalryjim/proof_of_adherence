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

#import <Cordova/CDV.h>
#import <ValidicMobile/ValidicMobile.h>
#import "ValidicMobile.h"
#import "ValidicMobile+BLE.h"

// Constants for value of recordType key in JSON indicating record type
static NSString * const kVLDRecordTypeBiometrics = @"biometrics";
static NSString * const kVLDRecordTypeDiabetes   = @"diabetes";
static NSString * const kVLDRecordTypeWeight     = @"weight";
static NSString * const kVLDRecordTypeRoutine    = @"routine";
static NSString * const kVLDRecordTypeNutrition  = @"nutrition";
static NSString * const kVLDRecordTypeFitness    = @"fitness";
static NSString * const kVLDRecordTypeSleep      = @"sleep";

static NSString * const kVLDRecordTypeKey        = @"recordType";

static NSString * const kVLDPeripheralIDKey      = @"peripheralID";

@implementation ValidicMobile

/** Cordova plugin initialization method
 */
- (void)pluginInitialize {
    NSLog(@"PluginInitialize");
    self.bleShouldSubmitReadings = NO;
    
    // Initialize Healthkit if available
    if ([HKHealthStore isHealthDataAvailable]) {
        [[VLDHealthKitManager sharedInstance] observeCurrentSubscriptions];
    }
    
    // Initialize passive bluetooth
    if ([VLDSession libraryHasFeature:VLDLibraryFeatureBluetooth]) {
        [[VLDBluetoothPassiveManager sharedInstance] restoreState];
    }
    
    // Subscribe to notifications
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(recordUploadSuccess:) name:kVLDRecordSubmittedNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(recordUploadFail:) name:kVLDRecordSubmissionFailedNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(recordUploadSuccess:) name:kVLDRecordImageSubmittedNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(recordUploadFail:) name:kVLDRecordImageSubmissionFailedNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(hkRecordsProcessed:) name: kVLDHealthKitRecordsProcessedNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(passiveDidRead:) name:kVLDBluetoothPassiveDidReadNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(passiveDidFail:) name:kVLDBluetoothPassiveDidFailNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(passiveIsReadyToRead:) name:kVLDBluetoothPassiveIsReadyToReadNotification object:nil];
}

- (VLDBluetoothPeripheralController *)bleController {
    if (!_bleController) {
        _bleController = [[VLDBluetoothPeripheralController alloc] init];
        _bleController.delegate = self;
    }
    return _bleController;
}

- (void)hkRecordsProcessed:(NSNotification *)notification {
    // Invoke the callback passing back information
    if (!self.hkCallbackID) {
        return;
    }
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                            messageAsDictionary:@{kEvent: @"validicOnHealthKitRecordsProcessed",
                                                                  kPayload: notification.userInfo}];
    [result setKeepCallback:@YES];
    [self.commandDelegate sendPluginResult:result callbackId:self.hkCallbackID];
}

- (void)recordUploadSuccess:(NSNotification *)notification {
    if (!self.sessionCallbackId) {
        return;
    }
    CDVPluginResult *result;
    if (notification.object && [notification.object isKindOfClass:[VLDRecord class]]) {
        VLDRecord *record = (VLDRecord *)notification.object;
        if (record) {
            NSDictionary *response = @{kEvent: @"validicOnRecordSubmitted",
                                       kPayload: @{kRecord: [record JSONObject]}
                                       };
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            [result setKeepCallback:@YES];
            [self.commandDelegate sendPluginResult:result callbackId:self.sessionCallbackId];
            return;
        }
    }
    
    // Shouldn't happen. Would like to report
    NSDictionary *response = @{kEvent: @"validicOnRecordSubmitted",
                               kPayload: @{kError: @"Record missing from notification"}
                               };
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
    [result setKeepCallback:@YES];
    [self.commandDelegate sendPluginResult:result callbackId:self.sessionCallbackId];
}

- (void)recordUploadFail:(NSNotification *)notification {
    if (!self.sessionCallbackId) {
        return;
    }
    CDVPluginResult *result;
    if (notification.object && [notification.object isKindOfClass:[VLDRecord class]]) {
        VLDRecord *record = (VLDRecord *)notification.object;
        if (record) {
            NSDictionary *response = @{kEvent: @"validicOnRecordSubmitFailed",
                                       kPayload: @{kRecord: [record JSONObject]}
                                       };
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
            [result setKeepCallback:@YES];
            [self.commandDelegate sendPluginResult:result callbackId:self.sessionCallbackId];
            return;
        }
    }
    // Shouldn't happen. Would like to report
    NSDictionary *response = @{kEvent: @"validicOnRecordSubmitFailed",
                               kPayload: @{kError: @"Record missing from notification"}
                               };
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
    [result setKeepCallback:@YES];
    [self.commandDelegate sendPluginResult:result callbackId:self.sessionCallbackId];
}

- (void)passiveDidRead:(NSNotification *)notification {
    if (!self.blePassiveCallbackId) {
        return;
    }
    CDVPluginResult *result;
    NSNumber *peripheralID = [notification.userInfo objectForKey:kVLDPeripheralIDKey];
    if (peripheralID && notification.object && [notification.object isKindOfClass:[NSArray class]]) {
        
        NSArray *records = (NSArray *)notification.object;
        if (records) {
            NSMutableArray *jsonObjects = [NSMutableArray array];
            for (VLDRecord *record in records) {
                [jsonObjects addObject:[record JSONObject]];
            }
            NSDictionary *response = @{kEvent: @"validicOnBluetoothPassiveDidRead",
                                       kPayload: @{kVLDPeripheralIDKey:peripheralID,
                                                   kRecords: jsonObjects}
                                       };
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            [result setKeepCallback:@YES];
            [self.commandDelegate sendPluginResult:result callbackId:self.blePassiveCallbackId];
            return;
        }
    }
    
    // Shouldn't happen. Would like to report
    NSDictionary *response = @{kEvent: @"validicOnBluetoothPassiveDidRead",
                               kPayload: @{kError: @"Records missing from notification"}
                               };
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
    [result setKeepCallback:@YES];
    [self.commandDelegate sendPluginResult:result callbackId:self.blePassiveCallbackId];
}

- (void)passiveDidFail:(NSNotification *)notification {
    if (!self.blePassiveCallbackId) {
        return;
    }
    CDVPluginResult *result;
    NSNumber *peripheralID = [notification.userInfo objectForKey:kVLDPeripheralIDKey];
    if (peripheralID && notification.object && [notification.object isKindOfClass:[NSError class]]) {
        NSError *error = (NSError *)notification.object;
        if (error) {
            NSDictionary *response = @{kEvent: @"validicOnBluetoothPassiveDidFail",
                                       kPayload: @{kVLDPeripheralIDKey: peripheralID,
                                                   @"error": [error localizedDescription]}
                                       };
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
            [result setKeepCallback:@YES];
            [self.commandDelegate sendPluginResult:result callbackId:self.blePassiveCallbackId];
            return;
        }
    }
    // Shouldn't happen. Would like to report
    NSDictionary *response = @{kEvent: @"validicOnBluetoothPassiveDidFail",
                               kPayload: @{kError: @"Information missing from notification"}
                               };
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
    [result setKeepCallback:@YES];
    [self.commandDelegate sendPluginResult:result callbackId:self.blePassiveCallbackId];
}

- (void)passiveIsReadyToRead:(NSNotification *)notification {
    if (!self.blePassiveCallbackId) {
        return;
    }
    CDVPluginResult *result;
    NSNumber *peripheralID = [notification.userInfo objectForKey:kVLDPeripheralIDKey];
    if (peripheralID) {
        NSDictionary *response = @{kEvent: @"validicOnBluetoothPassiveIsReadyToRead",
                                   kPayload: @{kVLDPeripheralIDKey: peripheralID}
                                   };
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
        [result setKeepCallback:@YES];
        [self.commandDelegate sendPluginResult:result callbackId:self.blePassiveCallbackId];
        return;
    }
    // Shouldn't happen. Would like to report
    NSDictionary *response = @{kEvent: @"validicOnBluetoothPassiveIsReadyToRead",
                               kPayload: @{kError: @"Information missing from notification"}
                               };
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:response];
    [result setKeepCallback:@YES];
    [self.commandDelegate sendPluginResult:result callbackId:self.blePassiveCallbackId];
}


#pragma mark Healthkit

- (void)isHealthkitAvailable:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[HKHealthStore isHealthDataAvailable]] callbackId:command.callbackId];
}

#pragma mark Private functions
//-------------------------------------------------------------------
// Private functions
// Dictionary

/**
 If unknown record type, returns nil dictionary
 */
- (NSDictionary *)dictionaryFromRecord:(VLDModel *)record {
    NSMutableDictionary *result = nil;
    if (record) {
        result = [[record JSONObject] mutableCopy];
        if ([record isKindOfClass:[VLDBiometrics class]]) {
            [result setValue:kVLDRecordTypeBiometrics forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDWeight class]]) {
            [result setValue:kVLDRecordTypeWeight forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDBiometrics class]]) {
            [result setValue:kVLDRecordTypeBiometrics forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDSleep class]]) {
            [result setValue:kVLDRecordTypeSleep forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDFitness class]]) {
            [result setValue:kVLDRecordTypeFitness forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDRoutine class]]) {
            [result setValue:kVLDRecordTypeRoutine forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDDiabetes class]]) {
            [result setValue:kVLDRecordTypeDiabetes forKey:kVLDRecordTypeKey];
        } else if ([record isKindOfClass:[VLDNutrition class]]) {
            [result setValue:kVLDRecordTypeNutrition forKey:kVLDRecordTypeKey];
        }
    }
    return result;
}

/** Possible validation
 - Record type field exists
 - Record type field is one of the valid values
 - Fields in dictionary are appropriate to the record for deserialization. This is vague
    and hard to determine. May be sufficient to check a few fields that should be required
    and non-nil, ie activityID, timestamp.
 */
- (VLDModel *)recordFromDictionary:(NSDictionary *)dictionary {
    VLDModel *result;
    NSString *recordType = [dictionary objectForKey:kVLDRecordTypeKey];
    if (!recordType) {
        return nil;
    }
    if ([recordType isEqualToString:kVLDRecordTypeWeight]) {
        result = [VLDWeight modelFromJSONObject:dictionary];
    } else if ([recordType isEqualToString:kVLDRecordTypeBiometrics]) {
        result = [VLDBiometrics modelFromJSONObject:dictionary];
    } else if ([recordType isEqualToString:kVLDRecordTypeSleep]) {
        result = [VLDSleep modelFromJSONObject:dictionary];
    } else if ([recordType isEqualToString:kVLDRecordTypeFitness]) {
        result = [VLDFitness modelFromJSONObject:dictionary];
    } else if ([recordType isEqualToString:kVLDRecordTypeRoutine]) {
        result = [VLDRoutine modelFromJSONObject:dictionary];
    } else if ([recordType isEqualToString:kVLDRecordTypeDiabetes]) {
        result = [VLDDiabetes modelFromJSONObject:dictionary];
    } else if ([recordType isEqualToString:kVLDRecordTypeNutrition]) {
        result = [VLDNutrition modelFromJSONObject:dictionary];
    }
    return result;
}

@end
