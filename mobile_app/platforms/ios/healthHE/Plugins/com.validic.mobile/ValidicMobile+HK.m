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
//  ValidicMobile+HK.m
//  Validic Mobile 
//
//  Created by David Melgar on 6/16/16.
//
//

#import <ValidicMobile/ValidicMobile.h>
#import "ValidicMobile+HK.h"

static NSString * const kSampleTypes        = @"sampleTypes";

static NSString * const kSampleTypeObjects  = @"sampleTypeObjects";
static NSString * const kUnknownIdentifiers = @"unknownIdentifiers";

@implementation ValidicMobile(HK)

- (void)setHealthKitSubscriptions:(CDVInvokedUrlCommand *)command {
    NSArray <NSString *>*identifiers = [command argumentAtIndex:0 withDefault:nil andClass:[NSArray class]];
    if (identifiers) {
        NSDictionary *result = [ValidicMobile sampleTypesFromIdentifiers:identifiers];
        NSArray <NSString *>*unknownIdentifiers = result[kUnknownIdentifiers];
        NSArray <HKSampleType *>*sampleTypes = result[kSampleTypeObjects];
        [[VLDHealthKitManager sharedInstance] setSubscriptions:sampleTypes completion:^{
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                                 messageAsDictionary:@{kUnknownIdentifiers: unknownIdentifiers}]
                                        callbackId:command.callbackId];
        }];
    } else {
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                             messageAsDictionary:@{kError: @"Invalid parameter"}]
                                    callbackId:command.callbackId];
    }
}

- (void)subscriptions:(CDVInvokedUrlCommand *)command {
    NSArray <NSString *>* identifiers =  [ValidicMobile identifersFromSampleTypes:[[VLDHealthKitManager sharedInstance] subscriptions]];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{ kSampleTypes: identifiers}] callbackId:command.callbackId];
}

- (void)isHealthKitAvailable:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                         messageAsDictionary:@{@"isAvailable":@([HKHealthStore isHealthDataAvailable])}]
                                callbackId:command.callbackId];
}
    
- (void)fetchHistoricalSets:(CDVInvokedUrlCommand *)command {
    BOOL validParams = YES;
    NSArray <NSNumber *>*identifiers = [command argumentAtIndex:0 withDefault:nil andClass:[NSArray class]];
    NSMutableArray *historicalSets = [NSMutableArray new];
    if (identifiers) {
        for (id identifier in identifiers) {
            if ([identifier isKindOfClass:[NSString class]]) {
                NSString *set = (NSString *)identifier;
                if ([set isEqualToString:@"routine"]) {
                    [historicalSets addObject: @(VLDHealthKitHistoricalSetRoutine)];
                } else if ([set isEqualToString:@"fitness"]) {
                    [historicalSets addObject:@(VLDHealthKitHistoricalSetFitness)];
                } else {
                    validParams = NO;
                    break;
                }
            } else {
                validParams = NO;
                break;
            }
        }
    } else {
        validParams = NO;
    }
    
    CDVPluginResult *pluginResult;
    if (validParams) {
        __block NSString *historicalCallbackId = command.callbackId;
        [[VLDHealthKitManager sharedInstance] fetchHistoricalSets:historicalSets completion:^(NSDictionary * _Nullable results, NSError * _Nullable error) {
            if (!historicalCallbackId) {
                return;
            }

            NSMutableDictionary *convertedResults = [NSMutableDictionary new];
            // Convert numberic keys to strings for JSON
            for (NSNumber *resultKey in [results allKeys]) {
                [convertedResults setObject:[results objectForKey:resultKey] forKey:resultKey.stringValue];
            }
            
            CDVPluginResult *result;
            if (error) {
                [convertedResults setObject:[error localizedDescription] forKey:kError];
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:convertedResults];
            } else {
                result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                       messageAsDictionary: convertedResults ];
            }
            [self.commandDelegate sendPluginResult:result callbackId:historicalCallbackId];
        }];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                     messageAsDictionary:@{kError:@"Invalid parameter"}];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}

- (void)fetchLatestData:(CDVInvokedUrlCommand *)command {
    [[VLDHealthKitManager sharedInstance] fetchLatestData];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

- (void)sampleTypesForSubscriptionSet:(CDVInvokedUrlCommand *)command {
    NSNumber *subscriptionSet = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
    if (subscriptionSet) {
        if ([subscriptionSet intValue] <= VLDHealthKitSubscriptionSetBloodPressure) {
            NSArray <HKSampleType *>*sampleTypes = [VLDHealthKitSubscription sampleTypesForSubscriptionSet:[subscriptionSet intValue]];
            NSArray <NSString *>*result = [ValidicMobile identifersFromSampleTypes:sampleTypes];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                                 messageAsDictionary:@{ kSampleTypes:result }]
                                        callbackId:command.callbackId];
        }
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid parameter"]
                                callbackId:command.callbackId];
}

- (void)sampleTypesForRecordType:(CDVInvokedUrlCommand *)command {
    NSNumber *recordType = [command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]];
    if (recordType) {
        if ([recordType intValue] <= VLDRecordTypeSleep) {
            NSSet <HKSampleType *>*sampleTypes = [VLDHealthKitSubscription sampleTypesForRecordType:[recordType intValue]];
            NSArray <NSString *>*result = [ValidicMobile identifersFromSampleTypes:[sampleTypes allObjects]];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                                 messageAsDictionary:@{ kSampleTypes:result }]
                                        callbackId:command.callbackId];
        }
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                             messageAsString:@"Invalid parameter"]
                                callbackId:command.callbackId];
}

- (void)isSHealthAvailable:(CDVInvokedUrlCommand *)command {
    [self.commandDelegate sendPluginResult: [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                          messageAsDictionary:@{@"isAvailable":@NO}]
                                callbackId:command.callbackId];
}

- (void)setHealthKitListener:(CDVInvokedUrlCommand *)command {
    self.hkCallbackID = command.callbackId;
}


#pragma mark Private methods

+ (NSArray <NSString *>*)identifersFromSampleTypes:(NSArray <HKSampleType *>*)types {
    NSMutableArray <NSString *>*result = [NSMutableArray array];
    for (HKSampleType *type in types) {
        NSString *identifier = [self identifierForSampleType:type];
        if (identifier) {
            [result addObject:identifier];
        }
    }
    return result;
}

// Dictionary response keys, 'sampleTypes' for sample type objects, 'unknownIdentifiers' for those that cannot be found
+ (NSDictionary <NSString *, NSArray *>*)sampleTypesFromIdentifiers:(NSArray <NSString *>*)identifiers {
    NSMutableArray <HKSampleType *>*result = [NSMutableArray array];
    NSMutableArray <NSString *> *unknown = [NSMutableArray array];
    for (NSString *identifier in identifiers) {
        HKSampleType *sampleType = [self sampleTypeForIdentifier:identifier];
        if (sampleType) {
            [result addObject:sampleType];
        } else {
            [unknown addObject:identifier];
        }
    }
    return @{kSampleTypeObjects: result, kUnknownIdentifiers: unknown};
}

+ (NSString *)identifierForSampleType:(HKSampleType *)type {
    return type.identifier;
}

+ (HKSampleType *)sampleTypeForIdentifier:(NSString *)identifier {
    HKSampleType *result;
    result = [HKSampleType quantityTypeForIdentifier:identifier];
    if (!result) {
        result = [HKSampleType categoryTypeForIdentifier:identifier];
        if (!result) {
            result = [HKSampleType correlationTypeForIdentifier:identifier];
            if (!result) {
                if ([identifier isEqualToString:HKWorkoutTypeIdentifier]) {
                    result = [HKSampleType workoutType];
                }
            }
        }
    }
    return result;
}

@end
