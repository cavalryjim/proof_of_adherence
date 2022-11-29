//
//  VLDOCRController.h
//  ValidicMobile
//
//  Created by Ameir Al-Zoubi on 7/27/15.
//  Copyright © 2015 Validic. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import "VLDPeripheral.h"

@class VLDOCRController, VLDRecord, VLDOCRPeripheral, VLDOCRResult;

extern NSString * _Nonnull const kVLDOCRMetadataFinalPreviewKey;
extern NSString * _Nonnull const kVLDOCRMetadataImageFrameKey;

/** The VLDOCRControllerDelegate protocol provides callbacks
 to show live OCR results and to provide the final record created 
 by the OCR process and the final image used to create the record.
 */
@protocol VLDOCRControllerDelegate <NSObject>

/** Callback giving live results for each camera frame processed by OCR.
 
 @param ocrController The VLDOCRController instance that processed the image.
 @param result A VLDOCRResult object that contains an output string 
 for display to the user so they can see the OCR being performed in 
 real time. It also contains the image that was processed as well as a
 set of glare areas for indicating to the user where glare is on the screen.
 */
- (void)ocrController:(VLDOCRController * _Nonnull)ocrController didProcessResult:(VLDOCRResult * _Nullable)result;

/** Callback passing back the VLDRecord object with the measurement data received from the OCR process. The 
 reading can then be presented to the user for verification and then should be submitted to the session for
 upload by calling [submitRecord:image:]([VLDSession submitRecord:image:]) on VLDSession or you can submit 
 a record without the image by calling [submitRecord:]([VLDSession submitRecord:]) on VLDSession.
 
 @param ocrController The VLDOCRController instance that processed the image.
 @param record The VLDRecord object with the measurement data received from the OCR process.
 @param image The final UIImage that was processed to produce the record.
 @param peripheral The peripheral that the readings came from.
 @param metadata A dictionary containing additional metadata from the OCR process. The dictionary
 should contain the final full screen camera preview processed by the OCR engine, identified with 
 the key ```kVLDOCRMetadataFinalPreviewKey```. The dictionary will also contain the frame of the 
 image inside the camera preview identified by the key ```kVLDOCRMetadataImageFrameKey```. 
 The coordinate space of this frame will be the screen's coordinate space.
 */
- (void)ocrController:(VLDOCRController * _Nonnull)ocrController didCompleteReading:(VLDRecord * _Nullable)record image:(UIImage * _Nullable)image forPeripheral:(VLDOCRPeripheral * _Nonnull)peripheral metadata:(NSDictionary * _Nonnull)metadata;

@end

/** VLDOCRController is the primary interface for getting records from a peripheral
 via OCR. The live results and final record are given to the VLDOCRController's delegate
 object (VLDOCRControllerDelegate).
 
 VLDOCRController is initialized with a VLDOCRPeripheral object. A VLDOCRPeripheral object can
 be obtained by calling [VLDOCRPeripheral supportedPeripherals].
 
 When an instance of VLDOCRController is initialized it will immediately
 turn on the camera for the current device. The camera preview can be accessed
 with the ```previewLayer``` property. VLDOCRController needs to be configured
 with the ```configureForPreviewLayerSize:``` method. You need to call this method
 when VLDOCRController is initialized and pass in the size of the preview layer 
 (generally the full size of the screen). 
 This will allow the library to set the ```overlayFrame``` property to the correct size.
 ```overlayFrame``` should then be used to set the frame of the ```overlayImage``` from
 the peripheral. This is required so that the user is able to position the camera so
 that the peripheral is in the proper place to be processed for OCR. Note: you will need
 to call ```configureForPreviewLayerSize:``` if the size of the preview layer changes, it 
 is recommended to call this method from the ```viewDidLayoutSubviews``` callback in your
 view controller.
 */
@interface VLDOCRController : NSObject

/** The object that acts as the delegate of the OCR controller.
 
 Must conform to VLDOCRControllerDelegate protocol. */
@property (nonatomic, weak, nullable) id<VLDOCRControllerDelegate> delegate;

/** A CALayer showing the live camera preview. 
 
 This should be displayed to
 the user with the peripheral's ```overlayImage``` displayed on top so that
 the user can correctly position the peripheral's screen within the camera. Note: 
 The view containing this CALayer should not contain any subviews. The overlayImage 
 should be a sibling view. */
@property (nonatomic, strong, nullable) AVCaptureVideoPreviewLayer *previewLayer;

/** A CGRect with the frame coordinates for the overlay image.
 
 Until ```configureForPreviewLayerSize:``` is called, this will
 contain the value CGRectZero. Be sure to use this value
 every time ```configureForPreviewLayerSize:``` is called. */
@property (nonatomic, assign) CGRect overlayFrame;

/** Initialize a VLDOCRController for the specified peripheral. 
 
 @param peripheral the VLDOCRPeripheral to perform OCR on. */
- (instancetype _Nullable)initWithOCRPeripheral:(VLDOCRPeripheral * _Nullable)peripheral NS_DESIGNATED_INITIALIZER;

/** Configures VLDOCRController for the size of the camera preview layer.
 This allows VLDOCRController to map the coordinate space of the camera to
 the coordinate space of the application interface and correctly process
 the portion of the image containing the peripheral screen and size the overlayFrame
 property.
 
 You need to call this method
 when VLDOCRController is initialized and pass in the size of the preview layer
(generally the full size of the screen). This
 will allow the library to set the ```overlayFrame``` property to the correct size.
 Note: you will need to call ```configureForPreviewLayerSize:``` if the size of 
 the preview layer changes, it is recommended to call this method from 
 the ```viewDidLayoutSubviews``` callback in your view controller. 
 
 @param size the size of the previewLayer in your view. */
- (void)configureForPreviewLayerSize:(CGSize)size;

@end
