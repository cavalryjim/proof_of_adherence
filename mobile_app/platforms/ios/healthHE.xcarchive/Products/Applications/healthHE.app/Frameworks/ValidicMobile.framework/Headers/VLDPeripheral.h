//
//  VLDPeripheral.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 9/30/15.
//  Copyright © 2015 Validic. All rights reserved.
//

#import "VLDModel.h"

/** Enum value for the device type to assist with switch statements */
typedef NS_ENUM(NSUInteger, VLDPeripheralType) {
    
    /** Invalid device type */
    VLDPeripheralTypeNone,
    
    /** Thermometer device type */
    VLDPeripheralTypeThermometer,
    
    /** Blood Pressure Monitor device type */
    VLDPeripheralTypeBloodPressure,
    
    /** Heart Rate Monitor device type */
    VLDPeripheralTypeHeartRate,
    
    /** Glucose Meter device type */
    VLDPeripheralTypeGlucoseMeter,
    
    /** Weight scale device type */
    VLDPeripheralTypeWeightScale,
    
    /** Pulse Oximeter device type */
    VLDPeripheralTypePulseOximeter
};

/** The VLDPeripheral class is an abstract class. You should never instantiate a VLDPeripheral object directly.
 Instead, you always work with one of its concrete subclasses: VLDBluetoothPeripheral or VLDOCRPeripheral. */
@interface VLDPeripheral : VLDModel

/** A unique identifer for a particular peripheral model.
 
 Instead of storing an actual VLDPeripheral object for persistence,
 it is preferred to store the peripheralID  and then later
 retrieve the object using ```peripheralForID:``` with 
 VLDBluetoothPeripheral or VLDOCRPeripheral.*/
@property (nonatomic, assign) NSUInteger peripheralID;

/** The type of the peripheral, used to identify its function. */
@property (nonatomic, assign) VLDPeripheralType type;

/** Model number of the peripheral. */
@property (nonatomic, copy) NSString *model;

/** Manufacturer name of the peripheral. */
@property (nonatomic, copy) NSString *manufacturer;

/** URL for an image of the peripheral. */
@property (nonatomic, strong) NSURL *imageURL;

/** Indication if support for a peripheral has been
 discontinued. Peripherals are marked as disabled instead
 of removed so that historical records can continue
 to be associated with the peripheral that created them.
 
 If a peripheral is disabled, it should not be displayed
 to the user when selecting a new peripheral. */
@property (nonatomic, assign) BOOL disabled;

/** Name of the peripheral comprised of the the manufacturer name and model number. */
- (NSString *)name;

/** The mechanism used to connect to the peripheral, used to identify the VLDPeripheral subclass. */
+ (NSString *)connectionType;

/** Descriptive name for a type of peripheral.
 
 @param type A value of VLDPeripheralType to get the name for. */
+ (NSString *)nameForType:(VLDPeripheralType)type;

/** List of supported VLDPeripheral objects. */
+ (NSArray *)supportedPeripherals;

/** Returns array containing set of supported peripherals of specified type. 
 
 @param type A value of VLDPeripheralType to get the list of peripherals for. */
+ (NSArray *)peripheralsOfType:(VLDPeripheralType)type;

@end
