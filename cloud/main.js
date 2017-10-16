
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.beforeFind('KG2RobotModel', function(req) {
    let isMaster = req.master;  // if the query is run with masterKey
    if (!isMaster) {
        let query = req.query;  // the Parse.Query
        query.limit(1);
        let uuidType = typeof query._where.uuid;
        if (uuidType == 'undefined') {
            // uuid not specified or is part of a compound query
            throw new Parse.Error(101, 'uuid not specified');
        } else if (uuidType != 'string') {
            // uuid not a string or is not part of an exact match query
            throw new Parse.Error(102, 'uuid not a string');
        }
    }
});


Parse.Cloud.beforeSave("KG2RobotModel", function(req, res) {
  // validation constraints
  const MIN_DRIVING_DISTANCE_INCREMENT = 0;
  const MAX_DRIVING_DISTANCE_INCREMENT = 1000000000;
  const MIN_DRIVING_TIME_INCREMENT = 0;
  const MAX_DRIVING_TIME_INCREMENT = 1000000000;
  const MAX_DRIVING_RATE = 10000;
  const MAX_NAME_LENGTH = 1000;
  const MAX_PROGRAM_INSTRUCTIONS = 1000;

  // white list for robot names
  const ALLOWABLE_NAMES = ["Alpha", "Beta", "Gamma", "Delta"];

  // white list for robot program instructions
  const ALLOWABLE_INSTRUCTIONS = ["lights_blue", "lights_green", "lights_purple", "lights_white"];

  let isMaster = req.master; // if the save is run with masterKey
  if (isMaster) {
    // allow save
    res.success();
    return;
  }

  let robotModel = req.object;
  let robotModelId = robotModel.id;

  let promise;
  if (typeof robotModelId == 'undefined') {
    // case if new RobotModel object was created
    promise = Promise.resolve(null);
  } else {
    // case if existing RobotModel object was updated
    // get before save RobotModel
    const query = new Parse.Query('KG2RobotModel');
    promise = query.get(robotModelId, {useMasterKey: true});
  }

  promise.then(function(prevRobotModel) {
    // get after save values
    let drivingDistance = robotModel.get("drivingDistance");
    if (typeof drivingDistance == 'undefined') {
      drivingDistance = 0;
    }
    let drivingTime = robotModel.get("drivingTime");
    if (typeof drivingTime == 'undefined') {
      drivingTime = 0;
    }

    // validate robot name
    let name = robotModel.get("name");
    if (typeof name != 'string') {
      return Promise.reject("name is not specified or not a string");
    } else if (name.length > MAX_NAME_LENGTH) {
      return Promise.reject("name exceeds character limit");
    } else if (ALLOWABLE_NAMES.indexOf(name) < 0) {
      return Promise.reject("name not found in ALLOWABLE_NAMES");
    }

    // validate robot program
    let program = robotModel.get("program");
    if (typeof program != 'undefined') {
      if (program.constructor !== Array) {
        return Promise.reject("program is not an array");
      }
      if (program.length > MAX_PROGRAM_INSTRUCTIONS) {
        return Promise.reject("program exceeds instruction limit");
      }

      // validate each robot program instruction
      let error = null;
      for (instruction of program) {
        if (typeof instruction != 'string') {
          error = "program instruction not a string";
          break;
        } else if (ALLOWABLE_INSTRUCTIONS.indexOf(instruction) < 0) {
          error = "program instruction not found in ALLOWABLE_INSTRUCTIONS";
          break;
        }
      }
      if (error != null) {
        return Promise.reject(error);
      }
    }
  }).then(function() {
    // allow save
    res.success();
  }, function(error) {
    // deny save
    res.error(error);
  });
});


Parse.Cloud.define("ios_install_count", function (request, response){
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query(Parse.Installation);
    query.equalTo("deviceType","ios");
    query.count({
        useMasterKey: true,
        success: function(count){
            response.success(count);
        },
        error: function(error){
            response.error(error);
        }
    });
});

Parse.Cloud.define("android_install_count", function (request, response){
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query("_Installation");
    query.equalTo("deviceType","android");
    query.count({
        useMasterKey: true,
        success: function(count){
            response.success(count);
        },
        error: function(error){
            response.error(error);
        }
    });
});
