cordova.define("cordova-plugin-health.health", function(require, exports, module) {
var exec = require('cordova/exec');

var Health = function () {
  this.name = 'health';
};

var dataTypes = [];
dataTypes['steps'] = 'HKQuantityTypeIdentifierStepCount';
dataTypes['distance'] = 'HKQuantityTypeIdentifierDistanceWalkingRunning'; // and HKQuantityTypeIdentifierDistanceCycling
dataTypes['calories'] = 'HKQuantityTypeIdentifierActiveEnergyBurned'; // and HKQuantityTypeIdentifierBasalEnergyBurned
dataTypes['calories.active'] = 'HKQuantityTypeIdentifierActiveEnergyBurned';
dataTypes['calories.basal'] = 'HKQuantityTypeIdentifierBasalEnergyBurned';
dataTypes['height'] = 'HKQuantityTypeIdentifierHeight';
dataTypes['weight'] = 'HKQuantityTypeIdentifierBodyMass';
dataTypes['heart_rate'] = 'HKQuantityTypeIdentifierHeartRate';
dataTypes['fat_percentage'] = 'HKQuantityTypeIdentifierBodyFatPercentage';
dataTypes['activity'] = 'HKWorkoutTypeIdentifier'; // and HKCategoryTypeIdentifierSleepAnalysis
dataTypes['nutrition'] = 'HKCorrelationTypeIdentifierFood';
dataTypes['nutrition.calories'] = 'HKQuantityTypeIdentifierDietaryEnergyConsumed';
dataTypes['nutrition.fat.total'] = 'HKQuantityTypeIdentifierDietaryFatTotal';
dataTypes['nutrition.fat.saturated'] = 'HKQuantityTypeIdentifierDietaryFatSaturated';
dataTypes['nutrition.fat.polyunsaturated'] = 'HKQuantityTypeIdentifierDietaryFatPolyunsaturated';
dataTypes['nutrition.fat.monounsaturated'] = 'HKQuantityTypeIdentifierDietaryFatMonounsaturated';
dataTypes['nutrition.cholesterol'] = 'HKQuantityTypeIdentifierDietaryCholesterol';
dataTypes['nutrition.sodium'] = 'HKQuantityTypeIdentifierDietarySodium';
dataTypes['nutrition.potassium'] = 'HKQuantityTypeIdentifierDietaryPotassium';
dataTypes['nutrition.carbs.total'] = 'HKQuantityTypeIdentifierDietaryCarbohydrates';
dataTypes['nutrition.dietary_fiber'] = 'HKQuantityTypeIdentifierDietaryFiber';
dataTypes['nutrition.sugar'] = 'HKQuantityTypeIdentifierDietarySugar';
dataTypes['nutrition.protein'] = 'HKQuantityTypeIdentifierDietaryProtein';
dataTypes['nutrition.vitamin_a'] = 'HKQuantityTypeIdentifierDietaryVitaminA';
dataTypes['nutrition.vitamin_c'] = 'HKQuantityTypeIdentifierDietaryVitaminC';
dataTypes['nutrition.calcium'] = 'HKQuantityTypeIdentifierDietaryCalcium';
dataTypes['nutrition.iron'] = 'HKQuantityTypeIdentifierDietaryIron';
dataTypes['nutrition.water'] = 'HKQuantityTypeIdentifierDietaryWater';
dataTypes['nutrition.caffeine'] = 'HKQuantityTypeIdentifierDietaryCaffeine';

var units = [];
units['steps'] = 'count';
units['distance'] = 'm';
units['calories'] = 'kcal';
units['calories.active'] = 'kcal';
units['calories.basal'] = 'kcal';
units['height'] = 'm';
units['weight'] = 'kg';
units['heart_rate'] = 'count/min';
units['fat_percentage'] = '%';
units['nutrition'] = 'nutrition';
units['nutrition.calories'] = 'kcal';
units['nutrition.fat.total'] = 'g';
units['nutrition.fat.saturated'] = 'g';
units['nutrition.fat.polyunsaturated'] = 'g';
units['nutrition.fat.monounsaturated'] = 'g';
units['nutrition.cholesterol'] = 'mg';
units['nutrition.sodium'] = 'mg';
units['nutrition.potassium'] = 'mg';
units['nutrition.carbs.total'] = 'g';
units['nutrition.dietary_fiber'] = 'g';
units['nutrition.sugar'] = 'g';
units['nutrition.protein'] = 'g';
units['nutrition.vitamin_a'] = 'mcg';
units['nutrition.vitamin_c'] = 'mg';
units['nutrition.calcium'] = 'mg';
units['nutrition.iron'] = 'mg';
units['nutrition.water'] = 'ml';
units['nutrition.caffeine'] = 'g';

Health.prototype.isAvailable = function (success, error) {
  window.plugins.healthkit.available(success, error);
};

var getHKDataTypes = function (dtArr) {
  var HKDataTypes = [];
  for (var i = 0; i < dtArr.length; i++) {
    if ((dtArr[i] !== 'gender') && (dtArr[i] !== 'date_of_birth')) { // ignore gender and DOB
      if (dtArr[i] === 'nutrition') {
        // add all nutrition stuff
        for (var dataType in dataTypes) {
          if (dataType.startsWith('nutrition.')) HKDataTypes.push(dataTypes[dataType]);
        }
      } else if (dataTypes[dtArr[i]]) {
        HKDataTypes.push(dataTypes[dtArr[i]]);
        if (dtArr[i] === 'distance') HKDataTypes.push('HKQuantityTypeIdentifierDistanceCycling');
        if (dtArr[i] === 'activity') HKDataTypes.push('HKCategoryTypeIdentifierSleepAnalysis');
        if (dtArr[i] === 'calories') HKDataTypes.push('HKQuantityTypeIdentifierBasalEnergyBurned');
      } else {
        // return the not found dataType instead of array
        return dtArr[i];
      }
    }
  }
  return HKDataTypes;
};

var getReadWriteTypes = function (dts, success, error) {
  var readTypes = [];
  var writeTypes = [];
  for (var i = 0; i < dts.length; i++) {
    var HKDataTypes = [];
    if (typeof dts[i] === 'string') {
      HKDataTypes = getHKDataTypes([dts[i]]);
      if (Array.isArray(HKDataTypes)) {
        readTypes = readTypes.concat(HKDataTypes);
        writeTypes = writeTypes.concat(HKDataTypes);
      } else {
        error('unknown data type - ' + HKDataTypes);
        return;
      }
    } else {
      if (dts[i]['read']) {
        HKDataTypes = getHKDataTypes(dts[i]['read']);
        if (Array.isArray(HKDataTypes)) {
          readTypes = readTypes.concat(HKDataTypes);
        } else {
          error('unknown read data type - ' + HKDataTypes);
          return;
        }
      }
      if (dts[i]['write']) {
        HKDataTypes = getHKDataTypes(dts[i]['write']);
        if (Array.isArray(HKDataTypes)) {
          writeTypes = writeTypes.concat(HKDataTypes);
        } else {
          error('unknown write data type - ' + HKDataTypes);
          return;
        }
      }
    }
  }
  success(dedupe(readTypes), dedupe(writeTypes));
};

var dedupe = function (arr) {
  return arr.filter(function (el, i, arr) {
    return arr.indexOf(el) === i;
  });
};

Health.prototype.requestAuthorization = function (dts, onSuccess, onError) {
  getReadWriteTypes(dts, function (readTypes, writeTypes) {
    window.plugins.healthkit.requestAuthorization({
      'readTypes': readTypes,
      'writeTypes': writeTypes
    }, onSuccess, onError);
  }, onError);
};

Health.prototype.isAuthorized = function (dts, onSuccess, onError) {
  getReadWriteTypes(dts, function (readTypes, writeTypes) {
    var HKDataTypes = dedupe(readTypes.concat(writeTypes));
    var check = function () {
      if (HKDataTypes.length > 0) {
        var dt = HKDataTypes.shift();
        window.plugins.healthkit.checkAuthStatus({
          type: dt
        }, function (auth) {
          if (auth === 'authorized') check();
          else onSuccess(false);
        }, onError);
      } else onSuccess(true);
    };
    check();
  }, onError);
};

Health.prototype.query = function (opts, onSuccess, onError) {
  var startD = opts.startDate;
  var endD = opts.endDate;

  if (opts.dataType === 'gender') {
    window.plugins.healthkit.readGender(function (data) {
      var res = [];
      res[0] = {
        startDate: startD,
        endDate: endD,
        value: data,
        sourceName: 'Health',
        sourceBundleId: 'com.apple.Health'
      };
      onSuccess(res);
    }, onError);
  } else if (opts.dataType === 'date_of_birth') {
    window.plugins.healthkit.readDateOfBirth(function (data) {
      data.startDate = startD;
      data.endDate = endD;
      var res = [];
      var date = new Date(data);
      res[0] = {
        startDate: opts.startDate,
        endDate: opts.endDate,
        value: {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()},
        sourceName: 'Health',
        sourceBundleId: 'com.apple.Health'
      };
      onSuccess(res);
    }, onError);
  } else if (opts.dataType === 'activity') {
    // opts is not really used, the plugin just returns ALL workouts
    window.plugins.healthkit.findWorkouts(opts, function (data) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var res = {};
        res.startDate = new Date(data[i].startDate);
        res.endDate = new Date(data[i].endDate);
        // filter the results based on the dates
        if ((res.startDate >= opts.startDate) && (res.endDate <= opts.endDate)) {
          res.value = data[i].activityType;
          res.unit = 'activityType';
          res.calories = parseInt(data[i].energy.slice(0, -2)); // remove the ending J
          res.distance = parseInt(data[i].distance);
          res.sourceName = data[i].sourceName;
          res.sourceBundleId = data[i].sourceBundleId;
          result.push(res);
        }
      }
      // get sleep analysis also
      opts.sampleType = 'HKCategoryTypeIdentifierSleepAnalysis';
      window.plugins.healthkit.querySampleType(opts, function (data) {
        for (var i = 0; i < data.length; i++) {
          var res = {};
          res.startDate = new Date(data[i].startDate);
          res.endDate = new Date(data[i].endDate);
          if (data[i].value == 0) res.value = 'sleep.awake';
          else res.value = 'sleep';
          res.unit = 'activityType';
          res.sourceName = data[i].sourceName;
          res.sourceBundleId = data[i].sourceBundleId;
          result.push(res);
        }
        onSuccess(result);
      }, onError);
    }, onError);
  } else if (opts.dataType === 'nutrition') {
    var result = [];
    window.plugins.healthkit.queryCorrelationType({
      startDate: opts.startDate,
      endDate: opts.endDate,
      correlationType: 'HKCorrelationTypeIdentifierFood',
      units: ['g', 'ml', 'kcal']
    }, function (data) {
      for (var i = 0; i < data.length; i++) {
        result.push(prepareNutrition(data[i]));
      }
      onSuccess(result);
    }, onError);
  } else if (dataTypes[opts.dataType]) {
    opts.sampleType = dataTypes[opts.dataType];
    if (units[opts.dataType]) {
      opts.unit = units[opts.dataType];
    }
    window.plugins.healthkit.querySampleType(opts, function (data) {
      var result = [];
      var convertSamples = function (samples) {
        for (var i = 0; i < samples.length; i++) {
          var res = {};
          res.startDate = new Date(samples[i].startDate);
          res.endDate = new Date(samples[i].endDate);
          res.value = samples[i].quantity;
          if (data[i].unit) res.unit = samples[i].unit;
          else if (opts.unit) res.unit = opts.unit;
          res.sourceName = samples[i].sourceName;
          res.sourceBundleId = samples[i].sourceBundleId;
          result.push(res);
        }
      };
      convertSamples(data);
      if (opts.dataType === 'distance') { // in the case of the distance, add the cycling distances
        opts.sampleType = 'HKQuantityTypeIdentifierDistanceCycling';
        // re-assign start and end times (because the plugin modifies them later)
        opts.startDate = startD;
        opts.endDate = endD;
        window.plugins.healthkit.querySampleType(opts, function (data) {
          convertSamples(data);
          onSuccess(result);
        }, onError);
      } else if (opts.dataType === 'calories') { // in the case of the calories, add the basal
        opts.sampleType = 'HKQuantityTypeIdentifierBasalEnergyBurned';
        opts.startDate = startD;
        opts.endDate = endD;
        window.plugins.healthkit.querySampleType(opts, function (data) {
          convertSamples(data);
          onSuccess(result);
        }, onError);
      } else onSuccess(result);
    }, onError); // first call to querySampleType
  } else {
    onError('unknown data type ' + opts.dataType);
  }
};

Health.prototype.queryAggregated = function (opts, onSuccess, onError) {
  if ((opts.dataType !== 'steps') && (opts.dataType !== 'distance') &&
  (opts.dataType !== 'calories') && (opts.dataType !== 'calories.active') &&
  (opts.dataType !== 'calories.basal') && (opts.dataType !== 'activity') &&
  (!opts.dataType.startsWith('nutrition'))) {
    // unsupported datatype
    onError('Datatype ' + opts.dataType + ' not supported in queryAggregated');
    return;
  }
  var startD = opts.startDate;
  var endD = opts.endDate;
  opts.sampleType = dataTypes[opts.dataType];
  if (units[opts.dataType]) opts.unit = units[opts.dataType];
  if (opts.bucket) {
    // ----- with buckets
    opts.aggregation = opts.bucket;
    if (opts.dataType === 'activity') {
      // query and manually aggregate
      navigator.health.query(opts, function (data) {
        onSuccess(bucketize(data, opts.bucket, startD, endD, 'activitySummary', mergeActivitySamples));
      }, onError);
    } else if (opts.dataType === 'nutrition') {
      // query and manually aggregate
      navigator.health.query(opts, function (data) {
        onSuccess(bucketize(data, opts.bucket, startD, endD, 'nutrition', mergeNutritionSamples));
      }, onError);
    } else {
      window.plugins.healthkit.querySampleTypeAggregated(opts, function (value) {
        if (opts.dataType === 'distance') {
          // add cycled distance
          var rundists = value;
          opts.sampleType = 'HKQuantityTypeIdentifierDistanceCycling';
          opts.startDate = startD;
          opts.endDate = endD;
          window.plugins.healthkit.querySampleTypeAggregated(opts, function (dists) {
            onSuccess(prepareResults(rundists, opts.unit, dists));
          }, onError);
        } else if (opts.dataType === 'calories') {
          // add basal calories
          var activecals = value;
          opts.sampleType = 'HKQuantityTypeIdentifierBasalEnergyBurned';
          opts.startDate = startD;
          opts.endDate = endD;
          window.plugins.healthkit.querySampleTypeAggregated(opts, function (cals) {
            onSuccess(prepareResults(activecals, opts.unit, cals));
          }, onError);
        } else {
          //simply refactor the result and send it
          onSuccess(prepareResults(value, opts.unit));
        }
      }, onError);
    }
  } else {
    // ---- no bucketing, just sum
    if (opts.dataType === 'activity') {
      navigator.health.query(opts, function (data) {
        // manually aggregate by activity
        onSuccess(aggregateIntoResult(data, 'activitySummary', mergeActivitySamples));
      }, onError);
    } else if (opts.dataType === 'nutrition') {
      // manually aggregate by nutrition
      navigator.health.query(opts, function (data) {
        onSuccess(aggregateIntoResult(data, 'nutrition', mergeNutritionSamples));
      }, onError);
    } else {
      window.plugins.healthkit.sumQuantityType(opts, function (value) {
        if (opts.dataType === 'distance') {
          // add cycled distance
          var dist = value;
          opts.sampleType = 'HKQuantityTypeIdentifierDistanceCycling';
          opts.startDate = startD;
          opts.endDate = endD;
          window.plugins.healthkit.sumQuantityType(opts, function (value) {
            onSuccess({
              startDate: startD,
              endDate: endD,
              value: value + dist,
              unit: opts.unit
            });
          }, onError);
        } else if (opts.dataType === 'calories') {
          // add basal calories
          var activecals = value;
          opts.sampleType = 'HKQuantityTypeIdentifierBasalEnergyBurned';
          opts.startDate = startD;
          opts.endDate = endD;
          window.plugins.healthkit.sumQuantityType(opts, function (basalcals) {
            onSuccess({
              startDate: startD,
              endDate: endD,
              value: basalcals + activecals,
              unit: opts.unit
            });
          }, onError);
        } else {
          onSuccess({
            startDate: startD,
            endDate: endD,
            value: value,
            unit: opts.unit
          });
        }
      }, onError);
    }
  }
};

Health.prototype.store = function (data, onSuccess, onError) {
  if (data.dataType === 'gender') {
    onError('Gender is not writeable');
  } else if (data.dataType === 'date_of_birth') {
    onError('Date of birth is not writeable');
  } else if (data.dataType === 'activity') {
    // sleep activity, needs a different call than workout
    if ((data.value === 'sleep') ||
    (data.value === 'sleep.light') ||
    (data.value === 'sleep.deep') ||
    (data.value === 'sleep.rem')) {
      data.sampleType = 'HKCategoryTypeIdentifierSleepAnalysis';
      data.value = 'HKCategoryValueSleepAnalysisAsleep';
      window.plugins.healthkit.saveSample(data, onSuccess, onError);
    } else if (data.value === 'sleep.awake') {
      data.sampleType = 'HKCategoryTypeIdentifierSleepAnalysis';
      data.value = 'HKCategoryValueSleepAnalysisInBed';
      window.plugins.healthkit.saveSample(data, onSuccess, onError);
    } else {
      // some other kind of workout
      data.activityType = data.value;
      if (data.calories) {
        data.energy = data.calories;
        data.energyUnit = 'kcal';
      }
      if (data.distance) {
        data.distance = data.distance;
        data.distanceUnit = 'm';
      }
      window.plugins.healthkit.saveWorkout(data, onSuccess, onError);
    }
  } else if (data.dataType === 'nutrition') {
    data.correlationType = 'HKCorrelationTypeIdentifierFood';
    if (!data.metadata) data.metadata = {};
    if (data.value.item) data.metadata.HKFoodType = data.value.item;
    if (data.value.meal_type) data.metadata.HKFoodMeal = data.value.meal_type;
    data.samples = [];
    for (var nutrientName in data.value.nutrients) {
      var unit = units[nutrientName];
      var sampletype = dataTypes[nutrientName];
      if(! sampletype) {
        onError('Cannot recognise nutrition item ' + nutrientName);
        return;
      }
      var sample = {
        'startDate': data.startDate,
        'endDate': data.endDate,
        'sampleType': sampletype,
        'unit': unit,
        'amount': data.value.nutrients[nutrientName]
      };
      data.samples.push(sample)
    }
    window.plugins.healthkit.saveCorrelation(data, onSuccess, onError);
  } else if (dataTypes[data.dataType]) {
    // generic case
    data.sampleType = dataTypes[data.dataType];
    if ((data.dataType === 'distance') && data.cycling) {
      data.sampleType = 'HKQuantityTypeIdentifierDistanceCycling';
    }
    data.amount = data.value;
    if (units[data.dataType]) {
      data.unit = units[data.dataType];
    }
    window.plugins.healthkit.saveSample(data, onSuccess, onError);
  } else {
    onError('unknown data type ' + data.dataType);
  }
};


Health.prototype.delete = function (data, onSuccess, onError) {
  if (data.dataType === 'gender') {
    onError('Gender is not deletable');
  } else if (data.dataType === 'date_of_birth') {
    onError('Date of birth is not deletable');
  } else if ((data.dataType === 'activity') && (data.dataType.lastIndexOf('sleep', 0) === 0)) {
    data.sampleType = 'HKCategoryTypeIdentifierSleepAnalysis';
  } else if (data.dataType === 'activity') {
    data.sampleType = 'workoutType';
  } else if ((data.dataType === 'distance') && data.cycling) {
    data.sampleType = 'HKQuantityTypeIdentifierDistanceCycling';
  } else if (dataTypes[data.dataType]) {
    data.sampleType = dataTypes[data.dataType];
  } else {
    onError('unknown data type ' + data.dataType);
    return;
  }
  window.plugins.healthkit.deleteSamples(data, onSuccess, onError);
};

cordova.addConstructor(function () {
  navigator.health = new Health();
  return navigator.health;
});


// UTILITY functions

// converts from grams into another unit
// if the unit is not specified or is not weight, then the original quantity is returned
var convertFromGrams = function (toUnit, q) {
  if (toUnit === 'mcg') return q * 1000000;
  if (toUnit === 'mg') return q * 1000;
  if (toUnit === 'kg') return q / 1000;
  return q;
}

// converts to grams from another unit
var convertToGrams = function (fromUnit, q) {
  if (fromUnit === 'mcg') return q / 1000000;
  if (fromUnit === 'mg') return q / 1000;
  if (fromUnit === 'kg') return q * 1000;
  return q;
}

// refactors the result of a query into returned type
var prepareResult = function (data, unit) {
  var res = {
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    value: data.quantity,
    unit: unit
  };
  if (data.sourceName) res.sourceName = data.sourceName;
  if (data.sourceBundleId) res.sourceBundleId = data.sourceBundleId;
  return res;
};

// refactors the result of a nutrition query into returned type
var prepareNutrition = function (data) {
  var res = {
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    value: {},
    unit: 'nutrition'
  };
  if (data.sourceName) res.sourceName = data.sourceName;
  if (data.sourceBundleId) res.sourceBundleId = data.sourceBundleId;
  if (data.metadata && data.metadata.HKFoodType) res.value.item = data.metadata.HKFoodType;
  if (data.metadata && data.metadata.HKFoodMeal) res.value.meal_type = data.metadata.HKFoodMeal;
  res.value.nutrients = {};
  for (var j = 0; j < data.samples.length; j++) {
    var sample = data.samples[j];
    for (var dataname in dataTypes) {
      if (dataTypes[dataname] === sample.sampleType) {
        res.value.nutrients[dataname] = convertFromGrams(units[dataname], sample.value);
        break;
      }
    }
  }
  return res;
};

// merges activity (workout) samples
// fromObj is formatted as returned by query
var mergeActivitySamples = function (fromObj, intoObj) {
  if (!intoObj.value) intoObj.value = {};
  var dur = (fromObj.endDate - fromObj.startDate);
  var dist = fromObj.distance;
  var cals = fromObj.calories;
  if (intoObj.value[fromObj.value]) {
    intoObj.value[fromObj.value].duration += dur;
    intoObj.value[fromObj.value].distance += dist;
    intoObj.value[fromObj.value].calories += cals;
  } else {
    intoObj.value[fromObj.value] = {
      duration: dur,
      distance: dist,
      calories: cals
    };
  }
};

// merges nutrition samples
var mergeNutritionSamples = function (fromObj, intoObj) {
  if (!intoObj.value) intoObj.value = {};
  for (var dataname in fromObj.value.nutrients) {
    if (!intoObj.value[dataname]) intoObj.value[dataname] = fromObj.value.nutrients[dataname];
    else intoObj.value[dataname] += fromObj.value.nutrients[dataname];
  }
};

// aggregates the results into one
var aggregateIntoResult = function (data, unit, merge) {
  var res = {
    startDate: new Date(new Date().getTime() + 10 * 365 * 24 * 60 * 60 * 1000), // big date
    endDate: new Date(new Date().getTime() - 10 * 365 * 24 * 60 * 60 * 1000), // small date
    value: {},
    unit: unit
  };

  for (var i = 0; i < data.length; i++) {
    if (data[i].endDate > res.endDate) res.endDate = data[i].endDate;
    if (data[i].startDate < res.startDate) res.startDate = data[i].startDate;
    merge(data[i], res);
  }
  return res;
};

// takes the result of a query (data) and transforms them, also merges with (unprocessed) results of another query
var prepareResults = function (data, unit, mergeWith) {
  var retval = [];
  for (var i = 0; i < data.length; i++) {
    var retsample = prepareResult(data[i], unit);
    if (mergeWith) { // merge with existing array returned by a query
      for (var j = 0; j < mergeWith.length; j++) {
        // we expect the buckets to have the same start and end dates
        var mergeSample = prepareResult(mergeWith[j], unit);
        if (retsample.startDate.getTime() === mergeSample.startDate.getTime()) {
          retsample.value += mergeSample.value;
        }
      }
    }
    retval.push(retsample);
  }
  return retval;
};

// takes the results of a query (data) and merges it into a bucketized result (returned)
var bucketize = function (data, bucket, startD, endD, unit, merge) {
  var retval = [];
  // create buckets
  var sd;
  if (bucket === 'hour') {
    sd = new Date(startD.getFullYear(), startD.getMonth(), startD.getDate(), startD.getHours());
  } else if (bucket === 'day') {
    sd = new Date(startD.getFullYear(), startD.getMonth(), startD.getDate());
  } else if (bucket === 'week') {
    sd = new Date(startD.getTime());
    sd.setDate(startD.getDate() - (startD.getDay() === 0 ? 6 : startD.getDay() - 1)); // last monday
  } else if (bucket === 'month') {
    sd = new Date(startD.getFullYear(), startD.getMonth());
  } else if (bucket === 'year') {
    sd = new Date(startD.getFullYear());
  } else {
    throw 'Bucket not recognised ' + bucket;
  }
  while (sd <= endD) {
    var ed;
    if (bucket === 'hour') {
      ed = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate(), sd.getHours() + 1);
    } else if (bucket === 'day') {
      ed = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate() + 1);
    } else if (bucket === 'week') {
      ed = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate() + 7);
    } else if (bucket === 'month') {
      ed = new Date(sd.getFullYear(), sd.getMonth() + 1);
    } else if (bucket === 'year') {
      ed = new Date(sd.getFullYear() + 1);
    }
    retval.push({
      startDate: sd,
      endDate: ed,
      value: {},
      unit: unit
    });
    sd = ed;
  }
  for (var i = 0; i < data.length; i++) {
    // select the bucket
    for (var j = 0; j < retval.length; j++) {
      if ((data[i].endDate <= retval[j].endDate) && (data[i].startDate >= retval[j].startDate)) {
        merge(data[i], retval[j]);
      }
    }
  }
  return retval;
};

});
