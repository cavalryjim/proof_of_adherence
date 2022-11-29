//
//  VLDHealthKitSubscription.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 8/3/15.
//  Copyright © 2015 Validic. All rights reserved.
//

#import "VLDModel.h"
#import "VLDRecord.h"
#import <HealthKit/HealthKit.h>

@class HKSampleType, HKUnit;

/** Convenience subscription sets that provide a useful set of related sample types.
 Sample types not present in VLDHealthKitSubscriptionSet can be manually specified. */

typedef NS_ENUM(NSUInteger, VLDHealthKitSubscriptionSet) {
    
    /** Includes Flights Climbed, Active Energy Burned, Distance Walking, Step Count, and Basal Energy Burned.
     in iOS 9 and later this will also include Apple Stand Hours (from the Apple Watch). */
    VLDHealthKitSubscriptionSetRoutine,

    /** Blood Glucose sample type. */
    VLDHealthKitSubscriptionSetDiabetes,
    
    /** Includes Body Mass (weight), Height, Body Fat Percentage, Lean Body Mass, and Body Mass Index. */
    VLDHealthKitSubscriptionSetWeight,
    
    /** Includes Workout, Nike Fuel, and Cycling Distance. */
    VLDHealthKitSubscriptionSetFitness,
    
    /** Sleep Analysis sample type, this is the total number of sleep seconds in the "Asleep" Sleep State. */
    VLDHealthKitSubscriptionSetSleep,
    
    /** Includes Calcium, Carbohydrates, Cholesterol, Fiber, Iron, Potassium, Protein, Saturated Fat, Sodium, Sugar, Total Fat,
     and Energy Consumed. in iOS 9 and later this will also include Dietary Water. */
    VLDHealthKitSubscriptionSetBasicNutrition,
    
    /** Includes Sexual Activity, Cervical Mucus Quality, Intermenstrual Bleeding, Menstrual Flow, Ovulation Test Result,
     and BasalBodyTemperature. These sample types are only available in iOS 9 and later. */
    VLDHealthKitSubscriptionSetReproductiveHealth,
    
    /** Systolic and Diastolic Blood sample types. */
    VLDHealthKitSubscriptionSetBloodPressure
};

/** Specifies sets of information to collect via historical fetch.  */
typedef NS_ENUM(NSUInteger, VLDHealthKitHistoricalSet) {
    /** Indicates a historical set that generates routine records */
    VLDHealthKitHistoricalSetRoutine,
    /** Indicates a historical set that generates fitness records */
    VLDHealthKitHistoricalSetFitness
};

/** VLDHealthKitSubscription objects are used to specify
 what type of records to create from HealthKit data. They
 do this by containing a static mapping of VLDRecordType 
 to HKSampleType objects. */
@interface VLDHealthKitSubscription : VLDModel

/** Returns the VLDRecordType for a particular HKSampleType. 
 
 @param sampleType An HKSampleType to get the corresponding record type for.
 */
+ (VLDRecordType)recordTypeForSampleType:(HKSampleType *)sampleType;

/** Returns a list of HKSampleType objects that are mapped to a particular VLDRecordType value. 
 This method is deprecated. Please use sampleTypesForSubscriptionSet. 
 
 @param recordType A value of VLDRecordType to get sample types for.
 */
+ (NSSet<__kindof HKSampleType*> *)sampleTypesForRecordType:(VLDRecordType)recordType __deprecated;

/** Returns the HKUnit used to get the quantity for a sample. 
 
 @param type the type identifier for an HKSampleType. */
+ (HKUnit *)unitForQuantityTypeIdentifier:(NSString *)type;

/** Returns a string value that describes the Workout Activity. 
 
 @param type the HKWorkoutActivityType to get the name for. */
+ (NSString *)workoutActivityForType:(HKWorkoutActivityType)type;

/** This returns an array of HKSampleTypes that are mapped to a VLDHealthKitSubscriptionSet value. 
 
 @param subscriptionSet A value of VLDHealthKitSubscriptionSet to get sample types for.
 */
+ (NSArray<__kindof HKSampleType*> *)sampleTypesForSubscriptionSet:(VLDHealthKitSubscriptionSet)subscriptionSet;

@end
