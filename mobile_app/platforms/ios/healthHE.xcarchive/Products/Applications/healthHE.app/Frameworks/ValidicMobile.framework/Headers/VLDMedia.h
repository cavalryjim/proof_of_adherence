//
//  VLDMedia.h
//  ValidicMobile
//
//  Created by David Melgar on 1/22/16.
//  Copyright © 2016 Validic. All rights reserved.
//

#import "VLDModel.h"

/** Contains the ID and URL of an uploaded media record. */
@interface VLDMedia : VLDModel

/** ID of the media. */
@property (nonatomic, copy, nullable) NSString *mediaID;

/** URL string from for the media resource. */
@property (nonatomic, copy, nullable) NSString *mediaURL;

/** The media URL combined with the authentication token from the current session. */
- (NSURL * _Nullable)authenticatedURL;

@end
