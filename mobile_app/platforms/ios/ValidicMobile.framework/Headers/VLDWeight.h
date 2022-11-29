//
//  VLDWeightEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** Measurements associated with a user’s weight and body mass. */
@interface VLDWeight : VLDRecord

/** The value of the measured quantity in kg */
@property (nonatomic, strong, nullable) NSNumber *weight;

/** The value of the measured quantity in cm */
@property (nonatomic, strong, nullable) NSNumber *height;

/** The value of the measured quantity in kg */
@property (nonatomic, strong, nullable) NSNumber *freeMass;

/** The value of the measured quantity */
@property (nonatomic, strong, nullable) NSNumber *fatPercent;

/** The value of the measured quantity in kg */
@property (nonatomic, strong, nullable) NSNumber *massWeight;

/** The value of the measured quantity */
@property (nonatomic, strong, nullable) NSNumber *bmi;

/** The weight value of the record converted to the specified unit.
 
 @param unit the weight unit to retrieve the weight value in. */
- (NSNumber * _Nullable)weightWithUnit:(VLDWeightUnit)unit;

/** Set the weight value of the record after converting from the specified unit to kg.
 
 @param weight the weight value to store in the record.
 @param unit the weight unit that the accompanying weight value is currently in. */
- (void)setWeight:(NSNumber * _Nonnull)weight withUnit:(VLDWeightUnit)unit;

@end
