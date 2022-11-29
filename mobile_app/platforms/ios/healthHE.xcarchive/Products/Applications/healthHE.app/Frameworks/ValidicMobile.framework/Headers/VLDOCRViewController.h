//
//  VLDOCRViewController.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 5/19/16.
//  Copyright © 2016 Validic. All rights reserved.
//

#import <UIKit/UIKit.h>

@class VLDOCRViewController, VLDRecord;

/** The VLDOCRViewControllerDelegate protocol provides callbacks
 for when the user has finished with the VLDOCRViewController.
 */
@protocol VLDOCRViewControllerDelegate <NSObject>

/** The user pressed the cancel button.
 
 @param viewController the instance of the view controller where the cancel occurred. */
- (void)ocrViewControllerDidCancel:(VLDOCRViewController * _Nonnull)viewController;

/** The user did not grant access to the camera so OCR can't be performed.
 
 @param viewController the instance of the view controller where the action occurred. */
- (void)ocrViewControllerWasDeniedCameraAuthorization:(VLDOCRViewController * _Nonnull)viewController;

/** The OCR reading was successful.
 
 @param viewController the VLDOCRViewController that got the reading, passed back to simplify dismissal.
 @param record the reading that was just taken.
 @param image the final image of the screen used to determine the reading.
 @param metadata A dictionary containing additional metadata from the OCR process. The dictionary
 should contain the final full screen camera preview processed by the OCR engine, identified with
 the key ```kVLDOCRMetadataFinalPreviewKey```. The dictionary will also contain the frame of the
 image inside the camera preview identified by the key ```kVLDOCRMetadataImageFrameKey```.
 The coordinate space of this frame will be the screen's coordinate space. */
- (void)ocrViewController:(VLDOCRViewController * _Nonnull)viewController didCompleteReading:(VLDRecord * _Nullable)record image:(UIImage * _Nullable)image metadata:(NSDictionary *  _Nullable)metadata;

@end

/** The VLDOCRViewController is the VLDOCRController fully implemented
 in a view controller with the peripheral overlay and display of partial
 results.
 */
@interface VLDOCRViewController : UIViewController

/** The object that acts as the delegate of the OCR view controller.
 
 Must conform to VLDOCRViewControllerDelegate protocol. */
@property (nonatomic, weak, nullable) id<VLDOCRViewControllerDelegate> delegate;

/** Initializes VLDOCRViewController with a specific peripheral.
 
 @param peripheralID the ID of the peripheral to perform OCR on. */
- (instancetype _Nullable)initWithOCRPeripheralID:(NSUInteger)peripheralID NS_DESIGNATED_INITIALIZER;

@end
