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
//  ValidicMobile+Session.h
//  Validic Mobile
//
//  Created by David Melgar on 6/16/16.
//
//

#import <ValidicMobile/ValidicMobile.h>
#import "ValidicMobile.h"

@interface ValidicMobile (Session)
- (void)startSession:(CDVInvokedUrlCommand *)command;
- (void)endSession:(CDVInvokedUrlCommand *)command;
- (void)submitRecord:(CDVInvokedUrlCommand *)command;
- (void)submitRecords:(CDVInvokedUrlCommand *)command;
- (void)isSessionActive:(CDVInvokedUrlCommand *)command;
- (void)getVersion:(CDVInvokedUrlCommand *)command;
- (void)setSessionListener:(CDVInvokedUrlCommand *)command;
@end
