//
//  VLDHealthKitManager.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 8/3/15.
//  Copyright © 2015 Validic. All rights reserved.
//

#import <Foundation/Foundation.h>

@class VLDHealthKitManager;
@class HKSampleType;
@class VLDRecord;

extern NSString * _Nonnull const kVLDHealthKitRecordsProcessedNotification;

extern NSString * _Nonnull const kVLDHealthKitErrorDomain;

/** VLDHealthKitManager is the Validic Mobile interface
 for all HealthKit operations. VLDHealthKitManager is a singleton
 object that must be accessed through the sharedInstance method. Like
 the other components of the Validic Mobile library, VLDHealthKitManager
 requires a valid user session in the VLDSession singleton.
 
 VLDHealthKitManager can upload new records as they come in. Listening
 for new records is done by adding subscriptions for the desired
 sample types. This will automatically prompt the user for permission
 and setup background notifications for new data. 
 
 Background delivery will happen on an hourly basis if new data is available. This
 will result in the data being uploaded in the background throughout the day. 
 For background delivery to be successful you must call observeCurrentSubscriptions
 from your application delegate's application:didFinishLaunchingWithOptions: callback.
 
 ## Notifications ##
 When VLDHealthKitManager queues records for upload it will send an NSNotification. To listen for this
 notification add an observer to the NSNotificationCenter with the constant ```kVLDHealthKitRecordsProcessedNotification```.
 The userInfo dictionary for this notification will contain two keys, ```recordType``` and ```count```. recordType will contain
 an NSNumber representing the integer value of the VLDRecordType enum and count will contain the number of records that were
 processed.
 */
@interface VLDHealthKitManager : NSObject

/** sharedInstance returns the VLDHealthKitManager singleton
 and should be the only way VLDHealthKitManager is accessed. */
+ (instancetype _Nonnull)sharedInstance;

/** Requests permission for and begins listening to HealthKit data for the specified subscriptions.
 
 The added subscriptions are saved to the VLDSession object and persisted through the life of the session.
 The completion block is called once the permission screen has been dismissed or immediately if permission
 had been previously requested. 
 
 @param subscriptions An array of HKSampleType objects for VLDHealthKitManager to listen for and upload
 @param completion A completion block that gets called once authorization for access to the sample types is completed
 
 */
- (void)setSubscriptions:(NSArray<__kindof HKSampleType*> * _Nullable)subscriptions completion:(nullable void(^)())completion;

/** Returns the list of HKSampleTypes that are currently being listened for. */
- (NSArray<__kindof HKSampleType*> * _Nullable)subscriptions;

/** This restores the handlers for background delivery. This method must be called immediately when the app launches. */
- (void)observeCurrentSubscriptions;

/** Fetch historical records of the specified sets.
 
 @param historicalSets The historical sets are specified as an NSArray of
 NSNumbers wrapping VLDHealthKitHistoricalSet enum values. 
 Example: `@[@(VLDHealthKitHistoricalSetRoutine), @(VLDHealthKitHistoricalSetFitness)]`
 
 @param completion Completion block is passed a dictionary with the count of records processed keyed by VLDRecordType enum wrapped as NSNumber.
 If an errors occurs, an NSError object is provided.
 */
- (void)fetchHistoricalSets:(NSArray<__kindof NSNumber*> * _Nonnull)historicalSets completion:(nullable void(^)(NSDictionary * _Nullable results, NSError * _Nullable error))completion;

/** Queries HealthKit for the latest data. */
- (void)fetchLatestData;

@end
