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
//  ValidicMobile+Session.m
//  Validic Mobile
//
//  Created by David Melgar on 6/16/16.
//
//

#import "ValidicMobile+Session.h"

@implementation ValidicMobile(Session)
#pragma mark Session functions

/** Initial implementation. No error checking. Possible things to check -
 - Size of the array must be 3
 - Objects at each index must be string
 - Need to be able to perform the same logic as in the sample app, checking if there's already a user
 and only creating a new session if not.
 
 Work on pattern for checking arguments...
 */
- (void)startSession:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        NSString *userID = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
        NSString *orgID  = [command argumentAtIndex:1 withDefault:nil andClass:[NSString class]];
        NSString *accessToken = [command argumentAtIndex:2 withDefault:nil andClass:[NSString class]];
        if (userID && orgID && accessToken) {
            VLDUser *user = [[VLDUser alloc] initWithValidicUserID:userID organizationID:orgID accessToken:accessToken];
            [[VLDSession sharedInstance] startSessionWithUser:user];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{kError: @"Parameters missing"}];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });

}

- (void)endSession:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult;
    
    [[VLDSession sharedInstance] endSession];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)submitRecord:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSDictionary *recordDictionary = [command argumentAtIndex:0 withDefault:nil andClass:[NSDictionary class]];
        NSString *imageString = [command argumentAtIndex:1 withDefault:nil andClass:[NSString class]];
        UIImage *image;
        
        // Validate image
        if (imageString) {
            NSData *data = [[NSData alloc] initWithBase64EncodedString:imageString options:0];
            image = [UIImage imageWithData:data];
            if (!image) {
                // Error. Image string passed but could not be parsed
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsDictionary:@{kError: @"Invalid image. Record not submitted"}];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                return;
            }
        }

        // Process successful record & optional image
        if (recordDictionary) {
            VLDRecord *record = (VLDRecord *)[self recordFromDictionary:recordDictionary];
            if (record) {
                if (image) {
                    [[VLDSession sharedInstance] submitRecord:record image:image];
                } else {
                    [[VLDSession sharedInstance] submitRecord:record];
                }
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                return;
            }
        }
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{kError: @"Invalid record"}];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

- (void)submitRecords:(CDVInvokedUrlCommand *)command {
    dispatch_async(dispatch_get_main_queue(), ^{
        CDVPluginResult *pluginResult;
        
        NSMutableArray *records = [NSMutableArray array];
        NSArray *param = [command argumentAtIndex:0 withDefault:nil andClass:[NSArray class]];
        if (param) {
            for (NSDictionary *dict in param) {
                // VLDRecord *record = (VLDRecord *)[VLDRecord modelFromJSONObject:dict];
                VLDRecord *record = (VLDRecord *)[self recordFromDictionary:dict];
                if (record) {
                    [records addObject:record];
                } else {
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{kError: @"Invalid parameters"}];
                    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                }
            }
            [[VLDSession sharedInstance] submitRecords:records];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:@{kError: @"Invalid parameters"}];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    });
}

// Notification handling in base class
- (void)setSessionListener:(CDVInvokedUrlCommand *)command {
    self.sessionCallbackId = command.callbackId;
}

- (void)isSessionActive:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult;
    
    BOOL active = ([[VLDSession sharedInstance] user] != nil);
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"isActive":@(active)}];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getVersion:(CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult;
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"version":[VLDSession libraryVersion]}];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


@end
