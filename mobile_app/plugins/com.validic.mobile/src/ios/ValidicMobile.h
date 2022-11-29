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
//  ValidicMobile.h
//  Validic Mobile 
//
//  Created by David Melgar on 6/15/16.
//
//

#import <Cordova/CDV.h>
#import <ValidicMobile/ValidicMobile.h>

// Constants to define values used in response dictionaries
static NSString * const kPeripheral = @"peripheral";
static NSString * const kPeripherals = @"peripherals";
static NSString * const kError = @"error";
static NSString * const kRecord = @"record";
static NSString * const kRecords = @"records";
static NSString * const kEvent = @"event";
static NSString * const kPayload = @"payload";
static NSString * const kImage = @"image";

// Echo parameters
static NSString * const kPeripheralID = @"peripheralID";
static NSString * const kPeripheralIDs = @"peripheralIDs";
static NSString * const kType = @"type";

@interface ValidicMobile : CDVPlugin 

- (NSDictionary *)dictionaryFromRecord:(VLDModel *)record;
- (VLDModel *)recordFromDictionary:(NSDictionary *)dictionary;

@property (nonatomic, strong) VLDOCRViewController *ocrController;
@property (nonatomic, strong) VLDBluetoothPeripheralController *bleController;
@property (nonatomic, strong) NSString *bleCallbackId;
@property (nonatomic, strong) NSString *blePassiveCallbackId;
@property (nonatomic, strong) NSString *ocrCallbackId;
@property (nonatomic, strong) NSString *sessionCallbackId;
@property (nonatomic, strong) NSString *hkCallbackID;
@property (nonatomic) BOOL bleShouldSubmitReadings;

@end


@interface VLDModel ()
- (NSDictionary *)JSONObject;
+ (instancetype)modelFromJSONObject:(NSDictionary *)JSONObject;

@end
