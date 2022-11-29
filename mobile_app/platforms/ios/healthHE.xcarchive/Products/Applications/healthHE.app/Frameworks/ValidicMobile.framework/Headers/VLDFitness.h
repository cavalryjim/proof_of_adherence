//
//  VLDFitnessEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** Fitness records return data for activities that are undertaken with the express purpose of exercising. These activities have a defined duration (time, distance, elevation, etc.). */

@interface VLDFitness : VLDRecord

/** Type of fitness activity: Walking, Running, Swimming, etc. */
@property (nonatomic, copy, nullable) NSString *type;

/** Subjective intensity with which an activity was performed. Examples are: low, medium, high. Returned as provided by source */
@property (nonatomic, copy, nullable) NSString *intensity;

/** Timestamp of when fitness activity started in ISO08601 format */
@property (nonatomic, strong, nullable) NSDate *startTime;

/** Distance in meters */
@property (nonatomic, strong, nullable) NSNumber *distance;

/** Duration of fitness activity in seconds */
@property (nonatomic, strong, nullable) NSNumber *duration;

/** Calories burned during fitness activity */
@property (nonatomic, strong, nullable) NSNumber *calories;

@end
