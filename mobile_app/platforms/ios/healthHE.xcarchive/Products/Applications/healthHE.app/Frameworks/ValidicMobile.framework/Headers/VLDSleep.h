//
//  VLDSleepEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** Measurements related to the length of time spent in various sleep cycles, as well as number of times woken during the night. */
@interface VLDSleep : VLDRecord

/** Total number of sleep seconds */
@property (nonatomic, strong, nullable) NSNumber *totalSleep;

/** Seconds awake during recording */
@property (nonatomic, strong, nullable) NSNumber *awake;

/** Deep sleep in seconds */
@property (nonatomic, strong, nullable) NSNumber *deep;

/** Light sleep in seconds */
@property (nonatomic, strong, nullable) NSNumber *light;

/** Rapid eye movement in seconds */
@property (nonatomic, strong, nullable) NSNumber *rem;

/** Number of times woken during sleep recording */
@property (nonatomic, strong, nullable) NSNumber *timesWoken;

@end
