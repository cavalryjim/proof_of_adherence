//
//  VLDGlareArea.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 1/19/16.
//  Copyright © 2016 Validic. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreGraphics/CoreGraphics.h>

/** VLDGlareArea contains the coordinates that make up a region
 of glare detected in an image by the OCR process. */
@interface VLDGlareArea : NSObject

/** A general location of where the glare is located. This point
 is in the coordinate space of the screen. */
@property (nonatomic, assign) CGPoint location;

/** The bounding coordinates of the glare region. Points
 are stored as NSValue objects containing CGPoint structures.
 All points are in the coordinate space of the screen. */
@property (nonatomic, copy, nullable) NSArray<NSValue *> *outerPoints;

/** A UIBezierPath constructed using the outerPoints. */
- (UIBezierPath * _Nonnull)bezierPath;

@end
