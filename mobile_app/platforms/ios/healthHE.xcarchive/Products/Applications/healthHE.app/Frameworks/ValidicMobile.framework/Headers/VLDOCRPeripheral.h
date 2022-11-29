//
//  VLDOCRPeripheral.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 9/30/15.
//  Copyright © 2015 Validic. All rights reserved.
//

#import "VLDPeripheral.h"

@class UIImage;

/** The VLDOCRPeripheral class represents OCR peripheral models that
 can be scanned using VLDOCRPeripheralController. */
@interface VLDOCRPeripheral : VLDPeripheral

/** Returns the peripheral for the given ID.
 
 @param peripheralID the ID of the peripheral. */
+ (VLDOCRPeripheral * _Nullable)peripheralForID:(NSUInteger)peripheralID;

/** An overlay image showing the outline of the peripheral
 and its screen. This image should be displayed on top
 of the camera preview to assist users in performing OCR. */
- (UIImage * _Nullable)overlayImage;

@end
