//
//  VLDBiometricsEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** Biometric Measurements are comprised of a user’s biometric health data such as blood pressure, cholesterol, heart rate, and blood and hormone levels. */
@interface VLDBiometrics : VLDRecord

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *bloodCalcium;

/** The value of the measured quantity in µg/L */
@property (nonatomic, strong, nullable) NSNumber *bloodChromium;

/** The value of the measured quantity in ng/mL */
@property (nonatomic, strong, nullable) NSNumber *bloodFolicAcid;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *bloodMagnesium;

/** The value of the measured quantity in mEq/L */
@property (nonatomic, strong, nullable) NSNumber *bloodPotassium;

/** The value of the measured quantity in mEq/L */
@property (nonatomic, strong, nullable) NSNumber *bloodSodium;

/** The value of the measured quantity in pg/mL */
@property (nonatomic, strong, nullable) NSNumber *bloodVitaminB12;

/** The value of the measured quantity in µg/dL */
@property (nonatomic, strong, nullable) NSNumber *bloodZinc;

/** The value of the measured quantity in U/L */
@property (nonatomic, strong, nullable) NSNumber *creatineKinase;

/** The value of the measured quantity in mg/L */
@property (nonatomic, strong, nullable) NSNumber *crp;

/** The value of the measured quantity in mmHg */
@property (nonatomic, strong, nullable) NSNumber *diastolic;

/** The value of the measured quantity in ng/mL */
@property (nonatomic, strong, nullable) NSNumber *ferritin;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *hdl;

/** The value of the measured quantity in mg/L */
@property (nonatomic, strong, nullable) NSNumber *hscrp;

/** The value of the measured quantity in pg/mL */
@property (nonatomic, strong, nullable) NSNumber *il6;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *ldl;

/** The value of the measured quantity in bpm */
@property (nonatomic, strong, nullable) NSNumber *restingHeartrate;

/** The value of the measured quantity in mmHg */
@property (nonatomic, strong, nullable) NSNumber *systolic;

/** The value of the measured quantity in ng/dL */
@property (nonatomic, strong, nullable) NSNumber *testosterone;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *totalCholesterol;

/** The value of the measured quantity in mIU/L */
@property (nonatomic, strong, nullable) NSNumber *tsh;

/** The value of the measured quantity in mg/dL */
@property (nonatomic, strong, nullable) NSNumber *uricAcid;

/** The value of the measured quantity in ng/mL */
@property (nonatomic, strong, nullable) NSNumber *vitaminD;

/** The value of the measured quantity in cells/µL */
@property (nonatomic, strong, nullable) NSNumber *whiteCellCount;

/** The value of the measured quantity in % */
@property (nonatomic, strong, nullable) NSNumber *spo2;

/** The value of the measured quantity in Celsius */
@property (nonatomic, strong, nullable) NSNumber *temperature;

/** The temperature value of the record converted into the specified unit 
 
 @param unit the temperature unit to retrieve the temperature value in. */
- (NSNumber * _Nullable)temperatureWithUnit:(VLDTemperatureUnit)unit;

/** Set the temperature value of the record after converting from the specified unit to degrees Celsius 
 
 @param temperature the temperature value to store in the record.
 @param unit the temperature unit that the accompanying temperature value is currently in. */
- (void)setTemperature:(NSNumber * _Nonnull)temperature withUnit:(VLDTemperatureUnit)unit;

/** Minimum heart rate over a time period */
- (NSNumber * _Nullable)minHeartRate;

/** Maximum heart rate over a time period */
- (NSNumber * _Nullable)maxHeartRate;

/** Average heart rate average over a time period */
- (NSNumber * _Nullable)averageHeartRate;

/** Median heart rate over a time period */
- (NSNumber * _Nullable)medianHeartRate;

@end
