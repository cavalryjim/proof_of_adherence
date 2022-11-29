//
//  VLDAPIClient.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 5/28/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import <Foundation/Foundation.h>

@class VLDUser;
@class VLDRecord;
@class VLDServerResponse;
@class VLDMedia;
@class UIImage;

extern NSString * const kVLDAPIErrorDomain;

/** Possible error codes that can be returned
 to the response block */
typedef NS_ENUM(NSUInteger, VLDAPIErrorCode) {
    /** Indicates some of the records in a postMultipleRecords:completion: call were invalid, the userInfo dictionary in the error will contain the invalid
     records in the ```errorRecords``` key. It is possible for some of the records to successfully post and still receive this error. */
    VLDAPIErrorCodeInvalidRecords,
    
    /** Indicates that the recordType for the record was invalid. */
    VLDAPIErrorCodeInvalidRecordType,
    
    /** Indicates that the recordID of a record was missing when attempting to update the record. */
    VLDAPIErrorCodeMissingRecordID,
    
    /** Indicates that the activityID of a record was missing when attempting to upsert the record. */
    VLDAPIErrorCodeMissingActivityID,
    
    /** Indicates an attempt to call an API method with a nil record. */
    VLDAPIErrorCodeMissingRecord,
    
    /** Indicates that the records given to postMultipleRecords:completion: were not all of the same recordType. */
    VLDAPIErrorCodeMismatchedRecordTypes
};

/** Callback block containing an array of VLDRecord objects and/or an NSError object. */
typedef void (^VLDMultiRecordResponseBlock)(NSArray *responseData, NSError *error);

/** Callback block containing a VLDRecord object or an NSError object. */
typedef void (^VLDRecordResponseBlock)(VLDRecord *responseRecord, NSError *error);

/** Callback block containing a VLDServerResponse object or an NSError object. */
typedef void (^VLDDeleteResponseBlock)(VLDServerResponse *deleteRecordResponse, NSError *error);

/** Callback block containing a VLDMedia object or an NSError object. */
typedef void (^VLDImageUploadResponseBlock)(VLDMedia *imageUploadResponse, NSError *error);

/** The API Client provides a convenient way to upload VLDRecord objects to
 Validic's servers. It handles creating proper URLs, constructing the
 request object and parsing the server response. */
@interface VLDAPIClient : NSObject

/** Initializes VLDAPIClient with a VLDUser 
 
 @param user A VLDUser to authenticate all network requests with.
 */
- (instancetype)initWithUser:(VLDUser *)user NS_DESIGNATED_INITIALIZER;

/** This method submits a record object to be written to the server.
 @param record A VLDRecord subclass object.
 @param completion A VLDRecordResponseBlock block that is called when the network
 request has completed containing either the updated VLDRecord object or an error.
 */
- (void)postRecord:(VLDRecord *)record completion:(VLDRecordResponseBlock)completion;

/** This method batch submits multiple record objects to be written to the server.
 @param records An array of VLDRecord subclass objects (all the same type).
 @param completion A VLDMultiRecordResponseBlock block that is called when the network
 request has completed containing the updated VLDRecord objects and/or an error.
 */
- (void)postMultipleRecords:(NSArray *)records completion:(VLDMultiRecordResponseBlock)completion;

/** This method updates an existing record object on the server.
 @param record A VLDRecord subclass object with updated values and the recordID and activityID of the record to update.
 @param completion A VLDRecordResponseBlock block that is called when the network
 request has completed containing either the updated VLDRecord object or an error.
 */
- (void)updateRecord:(VLDRecord *)record completion:(VLDRecordResponseBlock)completion;

/** This method deletes an existing record object on the server.
 @param record A VLDRecord subclass object with the recordID and activityID of the record to delete.
 @param completion A VLDDeleteResponseBlock block that is called when the network
 request has completed containing either the server response dictionary or an error.
 */
- (void)deleteRecord:(VLDRecord *)record completion:(VLDDeleteResponseBlock)completion;

/** This method uploads an image to be associated with a record object which already exists on the
 server.
 @param image A UIImage which contains the image data to upload.
 @param record A VLDRecord subclass object with the recordID and activityID of the record to associate with the image.
 @param completion A VLDImageUploadResponseBLock block that is called when the network
 request has completed containing either the server response dictionary or an error.
 */
- (void)uploadImage:(UIImage *)image forRecord:(VLDRecord *)record completion:(VLDImageUploadResponseBlock) completion;

/** This method upserts (update or insert) a record object on the server.
 @param record A VLDRecord subclass object with the activityID of the record to upsert.
 @param completion A VLDDeleteResponseBlock block that is called when the network
 request has completed containing either the server response dictionary or an error.
 */
- (void)upsertRecord:(VLDRecord *)record completion:(VLDRecordResponseBlock)completion;


@end
