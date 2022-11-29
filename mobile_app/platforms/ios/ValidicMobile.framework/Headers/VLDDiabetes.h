//
//  VLDDiabetesEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** Represents when a reading was taken in relation to food consumption. */
typedef NS_ENUM(NSUInteger, VLDDiabetesMealRelationship) {
    
    /** Unknown relationship to meal. */
    VLDDiabetesMealRelationshipNone,
    
    /** Reading was taken before a meal was consumed. */
    VLDDiabetesMealRelationshipBefore,
    
    /** Reading was taken after a meal was consumed. */
    VLDDiabetesMealRelationshipAfter,
    
    /** Reading was taken at a "random" time in relation to a meal, meaning not immediately before or after eating. */
    VLDDiabetesMealRelationshipRandom,
    
    /** Reading was taken during a fasting period. */
    VLDDiabetesMealRelationshipFasting
};

/** Represents the condition the user was in when taking a reading. */
typedef NS_ENUM(NSUInteger, VLDDiabetesEvent) {
    
    /** No event data provided. */
    VLDDiabetesEventNoEvent = 0,
    
    /** Reading was taken while or immediately following exercise. */
    VLDDiabetesEventExercise = 3,
    
    /** Reading was taken while sick. */
    VLDDiabetesEventSick = 4,
    
    /** Reading was taken after taking medication. */
    VLDDiabetesEventMedication = 5,
    
    /** Other condition. */
    VLDDiabetesEventOther = 6
};

/** Represents whether a blood glucose reading was in the accepted
 range of values as indicated by the glucose meter. */
typedef NS_ENUM(NSUInteger, VLDDiabetesOutOfRange) {
    
    /** Reading was within the accepted range. */
    VLDDiabetesOutOfRangeInRange,
    
    /** Reading was above the accepted range. */
    VLDDiabetesOutOfRangeHigh,
    
    /** Reading was below the accepted range. */
    VLDDiabetesOutOfRangeLow
};

/** Diabetes Measurements are comprised of a user’s blood glucose and hormone levels related to diabetes treatment and management. */
@interface VLDDiabetes : VLDRecord

/** The value of the measured quantity in ng/mL */
@property (nonatomic, strong, nullable) NSNumber *cPeptide;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *fastingPlasmaGlucoseTest;

/** The value of the measured quantity in % */
@property (nonatomic, strong, nullable) NSNumber *hba1c;

/** The value of the measured quantity in U */
@property (nonatomic, strong, nullable) NSNumber *insulin;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *oralGlucoseToleranceTest;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *randomPlasmaGlucoseTest;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *triglyceride;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *bloodGlucose;

/** When the reading was taken in relation to food consumption */
@property (nonatomic, assign) VLDDiabetesMealRelationship relationshipToMeal;

/** Diabetes event associated with this reading */
- (VLDDiabetesEvent)diabetesEvent;

/** Indication if glucose reading reported out of range */
- (VLDDiabetesOutOfRange)outOfRange;

/** The glucose value of the record converted to the specified unit.
 
 @param unit the blood glucose unit to retrieve the blood glucose value in. */
- (NSNumber * _Nullable)bloodGlucoseWithUnit:(VLDGlucoseUnit)unit;

/** Set the glucose value of the record after converting from the specified unit to mg/dL.
 
 
 @param bloodGlucose the blood glucose value to store in the record.
 @param unit the blood glucose unit that the accompanying blood glucose value is currently in. */
- (void)setBloodGlucose:(NSNumber * _Nonnull)bloodGlucose withUnit:(VLDGlucoseUnit)unit;

/** Name for a meal relationship value. 
 
 @param mealRelationship The VLDDiabetesMealRelationship value to get the name for. */
+ (NSString * _Nonnull)nameForMealRelationship:(VLDDiabetesMealRelationship)mealRelationship;

@end
