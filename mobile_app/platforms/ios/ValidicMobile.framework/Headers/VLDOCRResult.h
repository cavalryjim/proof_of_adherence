//
//  VLDOCRResult.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 1/27/16.
//  Copyright © 2016 Validic. All rights reserved.
//

#import <Foundation/Foundation.h>

@class VLDGlareArea;
@class UIImage;

/** Live results from performing OCR. */
@interface VLDOCRResult : NSObject

/** A string with the live OCR results which can 
 be displayed to the user. This helps the user 
 identity if any characters are not being recognized. */
@property (nonatomic, copy) NSString *resultString;

/** The image that was processed and produced the 
 resultString. This can be useful for diagnostic
 purposes to ensure the correct portion of the camera
 preview is being processed for OCR. */
@property (nonatomic, strong) UIImage *image;

/** An array of VLDGlareArea objects. This can be used
 to indicate to the user where glare is being detected in
 the peripheral screen and obstructing the OCR process. */
@property (nonatomic, copy) NSArray<VLDGlareArea *> *glare;

@end
