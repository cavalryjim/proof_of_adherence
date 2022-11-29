//
//  VLDServerResponse.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 6/25/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDModel.h"

/** VLDServerResponse class contains the code, messages and errors returned by the server along with the Activity ID of the submitted record*/
@interface VLDServerResponse : VLDModel

/** Code returned from the server*/
@property (nonatomic, strong) NSNumber *code;

/** Message returned from the server*/
@property (nonatomic, copy) NSString *message;

/** Errors returned from the server*/
@property (nonatomic, copy) NSString *errors;

/** Activity ID of the submitted record*/
@property (nonatomic, copy) NSString *activityID;

@end
