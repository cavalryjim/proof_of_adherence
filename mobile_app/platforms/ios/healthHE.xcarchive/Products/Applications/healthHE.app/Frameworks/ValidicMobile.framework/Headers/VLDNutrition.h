//
//  VLDNutritionEndpointModel.h
//  ValidicMobile
//
//  Created by Ralph Jazer Rebong on 5/12/15.
//  Copyright (c) 2015 Validic. All rights reserved.
//

#import "VLDRecord.h"

/** Activities related to calorie intake and consumption and nutritional information (such as fat, protein, carbohydrates, sodium, etc.). */
@interface VLDNutrition : VLDRecord

/** Calories consumed per food intake */
@property (nonatomic, strong, nullable) NSNumber *calories;

/** Grams of carbohydrates consumed */
@property (nonatomic, strong, nullable) NSNumber *carbohydrates;

/** Grams of fat consumed */
@property (nonatomic, strong, nullable) NSNumber *fat;

/** Grams of fiber consumed */
@property (nonatomic, strong, nullable) NSNumber *fiber;

/** Grams of protein consumed */
@property (nonatomic, strong, nullable) NSNumber *protein;

/** Grams of sodium consumed */
@property (nonatomic, strong, nullable) NSNumber *sodium;

/** Grams of water consumed */
@property (nonatomic, strong, nullable) NSNumber *water;

/** Meal consumed: Breakfast, Lunch, or Dinner */
@property (nonatomic, copy, nullable) NSString *meal;

@end
