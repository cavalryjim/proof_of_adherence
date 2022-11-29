//
//  VLDSession.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 5/22/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import <Foundation/Foundation.h>

@class VLDUser;
@class VLDRecord;
@class VLDSession;
@class UIImage;

extern NSString * const kVLDRecordSubmittedNotification;
extern NSString * const kVLDRecordSubmissionFailedNotification;
extern NSString * const kVLDRecordImageSubmittedNotification;
extern NSString * const kVLDRecordImageSubmissionFailedNotification;

extern NSString * const kVLDSessionErrorDomain;

/** Enum for checking what library features are available. */
typedef NS_ENUM(NSUInteger, VLDLibraryFeature) {
    
    /** Getting readings from Bluetooth peripherals. */
    VLDLibraryFeatureBluetooth,
    
    /** Getting readings from peripherals with VitalSnap's OCR. */
    VLDLibraryFeatureOCR,
    
    /** Getting readings from HealthKit. */
    VLDLibraryFeatureHealthKit
};

/** VLDSession stores a user, their current HealthKit subscriptions
 and all pending record uploads. This data is persisted between
 app launches but is deleted if endSession is called.
 
 VLDSession is a singleton object and must be accessed by its
 sharedInstance method. The different components of the Validic
 Mobile library rely on a valid user existing in the current
 VLDSession singleton object.
 
 ## Notifications ##
 When VLDSession uploads a record it will send an NSNotification. To listen for this
 notification add an observer to the NSNotificationCenter with the name ```kVLDRecordSubmittedNotification```.
 The ```object``` property of the notification will contain the VLDRecord object uploaded.
 
 If a 400 error is returned from the server, the record will be discarded and an NSNotification will be posted.
 To listen for this notification add an observer to the NSNotificationCenter with the name
 ```kVLDRecordSubmissionFailedNotification```. The ```object``` property of the notification 
 will contain the invalid VLDRecord object.
 The userInfo dictionary for this notification will contain one key, ```error``` with the NSError object
 for the failed upload.
 
 When an image is uploaded VLDSession will send out an NSNotification with the name ```kVLDRecordImageSubmittedNotification```.
 The ```object``` property of the notification will contain a ```VLDMedia``` instance. If the image
 fails to upload an NSNotification will be sent out with the name ```kVLDRecordImageSubmissionFailedNotification``` and the 
 ```object``` property of the notification will be the record object associated with the image and the ```userInfo``` dictionary
 will contain a value for the key ```error``` with the  NSError object describing the problem.
 */
 
@interface VLDSession : NSObject

/** The user for the current session. */
@property (nonatomic, readonly) VLDUser *user;

/** Version of the ValidicMobile library
 in a string comprised of three period-separated integers/ */
+ (NSString *)libraryVersion;

/** Indicates if the library supports the specified feature. 
 
 @param feature the library feature being checked for. */
+ (BOOL)libraryHasFeature:(VLDLibraryFeature)feature;

/** sharedInstance returns the VLDSession singleton
 and should be the only way VLDSession is accessed. */
+ (instancetype)sharedInstance;

/** Starts a new session with the specified user. Deletes existing session if present. 
 
 @param user the Validic user that owns the session data. */
- (void)startSessionWithUser:(VLDUser *)user;

/** Removes all locally stored session data. */
- (void)endSession;

/** Queues a VLDRecord for submission. 
 
 @param record the record to be submitted. */
- (void)submitRecord:(VLDRecord *)record;

/** Queues a VLDRecord with an image for submission.
 
 This method should be used to submit records created by 
 VLDOCRController along with the image processed. 
 
 @param record the record to be submitted.
 @param image the image associated with the record. */
- (void)submitRecord:(VLDRecord *)record image:(UIImage *)image;

/** Queues an array of VLDRecord objects for submission. This arrray may contain
 more than one type of VLDRecord subclass. 
 
 @param records the records to be submitted. */
- (void)submitRecords:(NSArray <__kindof VLDRecord*> *)records;

/** Calling this method will begin uploading all pending records.
 
 In most situations it is not necessary to call this method as the system will automatically
 attempt to process the queue at the correct times. */
- (void)processQueue;

@end
