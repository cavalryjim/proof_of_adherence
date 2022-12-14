//
//  VLDRecord.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 5/14/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDModel.h"

@class VLDPeripheral, VLDMedia;

/** Record types used to identify a VLDRecord object.*/
typedef NS_ENUM(NSUInteger, VLDRecordType) {
    
    /** Indicates that there is not a specified VLDRecord type*/
    VLDRecordTypeNone,
    
    /** Indicates a Biometrics VLDRecord Type*/
    VLDRecordTypeBiometrics,
    
    /** Indicates a Diabetes VLDRecord Type*/
    VLDRecordTypeDiabetes,
    
    /** Indicates a Weight VLDRecord Type*/
    VLDRecordTypeWeight,
    
    /** Indicates a Routine VLDRecord Type*/
    VLDRecordTypeRoutine,
    
    /** Indicates a Nutrition VLDRecord Type*/
    VLDRecordTypeNutrition,
    
    /** Indicates a Fitness VLDRecord Type*/
    VLDRecordTypeFitness,
    
    /** Indicates a Sleep VLDRecord Type*/
    VLDRecordTypeSleep
};

/** Units that can be used to represent temperature values. */
typedef NS_ENUM(NSUInteger, VLDTemperatureUnit) {
    /** Degrees Celsius */
    VLDTemperatureUnitCelsius,
    
    /** Degrees Fahrenheit */
    VLDTemperatureUnitFahrenheit,
};

/** Units that can be used to represent weight values. */
typedef NS_ENUM(NSUInteger, VLDWeightUnit) {
    /** The kilogram unit */
    VLDWeightUnitKilograms,
    
    /** The pounds unit */
    VLDWeightUnitPounds,
    
    /** The stones unit */
    VLDWeightUnitStones,
};

/** Units that can be used to represent blood glucose values. */
typedef NS_ENUM(NSUInteger, VLDGlucoseUnit) {
    /** Milligrams per Deciliter */
    VLDGlucoseUnitMGDL,
    
    /** Millimoles per Liter */
    VLDGlucoseUnitMMOLL,
};

/** Base class for all objects that represent health records. */
@interface VLDRecord : VLDModel

/** Timestamp for the measurement set */
@property (nonatomic, strong, nullable) NSDate *timestamp;

/** Timezone information for the measurement set formatted as +/-HH:MM */
@property (nonatomic, copy, nullable) NSString *utcOffset;

/** The short name of the Validic integration that created the record (validicmobile) */
@property (nonatomic, copy, nullable) NSString *source;

/** The display name of the Validic integration that created the record (ValidicMobile) */
@property (nonatomic, copy, nullable) NSString *sourceName;

/** The name of the peripheral manufacturer, for records sourced from HealthKit this will be 
 the name of the application that originally wrote the data to HealthKit. */
@property (nonatomic, copy, nullable) NSString *originalSource;

/** The name of the library technology used to create the record (eg "ValidicMobile Bluetooth", "ValidicMobile Apple Health") */
@property (nonatomic, copy, nullable) NSString *intermediarySource;

/** The model number of the peripheral, for records sourced from HealthKit this will be
 the bundle ID of the application that originally wrote the data to HealthKit. */
@property (nonatomic, copy, nullable) NSString *sourcePeripheral;

/** Date and time when the measurement set was last updated */
@property (nonatomic, strong, nullable) NSDate *lastUpdated;

/** Indicates the data you are receiving was generated using a device, opposed to being manually entered by a end user (Boolean value stored in an NSNumber) */
@property (nonatomic, strong, nullable) NSNumber *validated;

/** Unique identifier of the record */
@property (nonatomic, copy, nullable) NSString *recordID;

/** Expanded data of the endpoint */
@property (nonatomic, copy, nullable) NSDictionary *extras;

/** Unique ID generated by the orginal source */
@property (nonatomic, copy, nullable) NSString *activityID;

/** Uploaded images associated with the record */
@property (nonatomic, copy, nullable) NSArray<VLDMedia*> *media;

/** Associated peripheral used to generate record */
- (VLDPeripheral * _Nullable)peripheral;

/** Create a new record with source information for a peripheral.
 
 @param peripheral the peripheral to use for the record's source. */
+ (instancetype _Nonnull)newRecordFromPeripheral:(VLDPeripheral * _Nonnull)peripheral;

/** Initializes the appropriate VLDRecord subclass for the specified VLDRecordType.
 
 @param type the record type. */
+ (instancetype _Nonnull)newRecordWithType:(VLDRecordType)type;

/** Add a value to the expanded data of the record.
 
 @param value the value to store in the expanded data.
 @param key the key used to access the value in the expanded data. */
- (void)setExtraValue:(id _Nullable)value forKey:(NSString * _Nonnull)key;

/** Add media to the record.
 
 @param media the VLDMedia object to store in the record. */
- (void)addMedia:(VLDMedia * _Nonnull)media;

/** This method returns the Type of the record*/
- (VLDRecordType)recordType;

/** Record type name as a string.
 
 @param type the record type. */
+ (NSString * _Nonnull)nameForRecordType:(VLDRecordType)type;

/** Converts a weight value from the first specified weight unit to the second specified weight unit. 
 
 @param value the value being converted.
 @param from the initial unit of the value.
 @param to the unit the value will be converted to. */
+ (NSNumber * _Nonnull)convertWeightValue:(NSNumber * _Nonnull)value fromUnit:(VLDWeightUnit)from toUnit:(VLDWeightUnit)to;

/** Converts a temperature value from the first specified temperature unit to the second specified temperature unit. 
 
 @param value the value being converted.
 @param from the initial unit of the value.
 @param to the unit the value will be converted to. */
+ (NSNumber * _Nonnull)convertTemperatureValue:(NSNumber * _Nonnull)value fromUnit:(VLDTemperatureUnit)from toUnit:(VLDTemperatureUnit)to;

/** Converts a glucose value from the first specified glucose unit to the second specified glucose unit. 
 
 @param value the value being converted.
 @param from the initial unit of the value.
 @param to the unit the value will be converted to. */
+ (NSNumber * _Nonnull)convertGlucoseValue:(NSNumber * _Nonnull)value fromUnit:(VLDGlucoseUnit)from toUnit:(VLDGlucoseUnit)to;

/** Display string for a glucose unit.
 
 @param unit the glucose unit. */
+ (NSString * _Nonnull)unitStringForGlucoseUnit:(VLDGlucoseUnit)unit;

/** Display string for a weight unit. 
 
 @param unit the weight unit. */
+ (NSString * _Nonnull)unitStringForWeightUnit:(VLDWeightUnit)unit;

/** Display string for a temperature unit. 
 
 @param unit the temperature unit. */
+ (NSString * _Nonnull)unitStringForTemperatureUnit:(VLDTemperatureUnit)unit;

@end
