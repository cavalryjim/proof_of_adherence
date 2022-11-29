//
//  VLDRoutineEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** 
 * Activities that occur regularly throughout the day, without the specific goal of exercise, for example calories burned and consumed, steps taken, stairs climbed.
 * These activities are aggregate throughout the day. 
 */
@interface VLDRoutine : VLDRecord

/** Number of steps taken during routine */
@property (nonatomic, strong, nullable) NSNumber *steps;

/** The value of the measured quantity in meters */
@property (nonatomic, strong, nullable) NSNumber *distance;

/** The value of the measured quantity */
@property (nonatomic, strong, nullable) NSNumber *floors;

/** Elevation climbed in meters */
@property (nonatomic, strong, nullable) NSNumber *elevation;

/** Calories burned during fitness activity */
@property (nonatomic, strong, nullable) NSNumber *caloriesBurned;

@end
