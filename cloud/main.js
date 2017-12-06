
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


Parse.Cloud.beforeFind('KG2RobotModel', function(req) {
  let isMaster = req.master; // if the query is run with masterKey
  if (!isMaster) {
    let query = req.query; // the Parse.Query

    // limit query to 1 result
    query.limit(1);

    // validate uuid query constraint
    let uuidType = typeof query._where.uuid;
    if (uuidType == 'undefined') {
      // uuid not specified or is part of a compound query
      // deny find
      throw new Parse.Error(101, 'uuid not specified');
    } else if (uuidType != 'string') {
      // uuid not a string or is not part of an exact match query
      // deny find
      throw new Parse.Error(102, 'uuid not a string');
    }
  }
  // allow find
});


Parse.Cloud.beforeSave("KG2RobotModel", function(req, res) {
  // validation constraints
  const MAX_UUID_LENGTH = 100;
  const MAX_ICON_NAME_LENGTH = 100;
  const MIN_DRIVING_DISTANCE_INCREMENT = 0;
  const MAX_DRIVING_DISTANCE_INCREMENT = 345600;
  const MIN_DRIVING_TIME_INCREMENT = 0;
  const MAX_DRIVING_TIME_INCREMENT = 86400;
  const MAX_DRIVING_RATE = 4;
  const MAX_NAME_LENGTH = 100;
  const MAX_PROGRAM_INSTRUCTION_LENGTH = 100;
  const MAX_PROGRAM_INSTRUCTIONS = 100;
  const MAX_ACHIEVEMENT_LENGTH = 100;
  const MAX_ACHIEVEMENTS = 100;
  const MIN_BUILD_STEP = 0;
  const MAX_BUILD_STEP = 1000;

  // white list for robot names
  const ALLOWABLE_NAMES = [
    "Atlasar™",
    "Bokken™",
    "Carus™",
    "Lina",
    "Manchu™",
    "Mantix™",
    "Musubi™",
    "Scarrax™",
    "Terrix™",
    "Vypod™",
    "Bitey",
    "Boomer",
    "Buggy McBugface",
    "Butterscotch",
    "Cupcake",
    "Dr. Bug",
    "Duke",
    "Fido",
    "Fluffy",
    "Frumblebug",
    "Katy",
    "Lucy",
    "Miss Buggy",
    "Princess",
    "Rex",
    "Shtompling",
    "Speedi",
    "Spot",
    "Stabby",
    "Tweedle",
    "Zippy"
  ];

  // white list for robot program instructions
  const ALLOWABLE_INSTRUCTIONS = [
    "run_forward",
    "run_forward_slow",
    "run_backward",
    "run_backward_slow",
    "run_left",
    "run_right",
    "run_spin_left",
    "run_spin_right",
    "lights_red",
    "lights_blue",
    "lights_green",
    "lights_purple",
    "lights_white",
    "lights_off",
    "play_dance_music",
    "play_laser",
    "play_bell",
    "play_whistle"
  ];

  // white list for robot icon names
  const ALLOWABLE_ICON_NAMES = [
    "atlasar",
    "bokken",
    "carus",
    "lina-r",
    "lina-l",
    "manchu",
    "mantix",
    "musubi",
    "scarrax",
    "terrix",
    "vypod",
    "new-robot"
  ];

  // white list for robot achievements
  const ALLOWABLE_ACHIEVEMENTS = [
    "first-run",
    "ran-197-feet",
    "ran-300-feet",
    "ran-455-feet",
    "ran-750-feet",
    "ran-1092-feet",
    "ran-1454-feet",
    "ran-1788-feet",
    "ran-5280-feet",
    "ran-10-minutes",
    "ran-30-minutes",
    "ran-60-minutes"
  ];

  let original = req.original;
  //console.log(original.id);
  //console.log(original.get("buildStep"));

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
    const query = new Parse.Query("KG2RobotModel");
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

    if (prevRobotModel == null) {
      // case if new RobotModel object was created
      if (drivingDistance != 0) {
        return Promise.reject("RobotModel object created with nonzero drivingDistance");
      }

      if (drivingTime != 0) {
        return Promise.reject("RobotModel object created with nonzero drivingTime");
      }
    } else {
      // case if existing RobotModel object was updated
      // get before save values
      let prevDrivingDistance = prevRobotModel.get("drivingDistance");
      if (typeof prevDrivingDistance == 'undefined') {
        prevDrivingDistance = 0;
      }
      let prevDrivingTime = prevRobotModel.get("drivingTime");
      if (typeof prevDrivingTime == 'undefined') {
        prevDrivingTime = 0;
      }

      // validate drivingDistance increment
      let deltaDrivingDistance = drivingDistance - prevDrivingDistance;
      if (deltaDrivingDistance < MIN_DRIVING_DISTANCE_INCREMENT) {
        return Promise.reject("delta drivingDistance below minimum");
      } else if (deltaDrivingDistance > MAX_DRIVING_DISTANCE_INCREMENT) {
        return Promise.reject("delta drivingDistance exceeds maximum");
      }

      // validate drivingTime increment
      let deltaDrivingTime = drivingTime - prevDrivingTime;
      if (deltaDrivingTime < MIN_DRIVING_TIME_INCREMENT) {
        return Promise.reject("delta drivingTime below minimum");
      } else if (deltaDrivingTime > MAX_DRIVING_TIME_INCREMENT) {
        return Promise.reject("delta drivingTime exceeds maximum");
      }

      // validate drivingRate for increment
      if (deltaDrivingTime > 0) {
        let drivingRate = deltaDrivingDistance / deltaDrivingTime;
        if (drivingRate > MAX_DRIVING_RATE) {
          return Promise.reject("drivingRate exceeds maximum");
        }
      } else if (deltaDrivingDistance > 0) {
        return Promise.reject("drivingRate exceeds maximum");
      }
    }

    // validate robot uuid
    let uuid = robotModel.get("uuid");
    if (typeof uuid != 'string') {
      return Promise.reject("uuid is not specified or not a string");
    } else if (uuid.length > MAX_UUID_LENGTH) {
      return Promise.reject("uuid exceeds character limit");
    }

    // validate robot iconName
    let iconName = robotModel.get("iconName");
    if (typeof iconName != 'string') {
      return Promise.reject("iconName is not specified or not a string");
    } else if (iconName.length > MAX_ICON_NAME_LENGTH) {
      return Promise.reject("iconName exceeds character limit");
    } else if (ALLOWABLE_ICON_NAMES.indexOf(iconName) < 0) {
      return Promise.reject("iconName not found in ALLOWABLE_ICON_NAMES");
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

    // validate robot buildStep
    let buildStep = robotModel.get("buildStep");
    if ((typeof buildStep != 'undefined') && (buildStep != null)) {
      if (typeof buildStep != 'number') {
        return Promise.reject("buildStep is not a number");
      } else if (buildStep < MIN_BUILD_STEP) {
        return Promise.reject("buildStep below minimum");
      } else if (buildStep > MAX_BUILD_STEP) {
        return Promise.reject("buildStep exceeds maximum");
      }
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
        } else if (instruction.length > MAX_PROGRAM_INSTRUCTION_LENGTH) {
          error = "program instruction exceeds character limit";
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

    // validate robot achievements
    let achievements = robotModel.get("achievements");
    if (typeof achievements != 'undefined') {
      if (achievements.constructor !== Array) {
        return Promise.reject("achievements is not an array");
      }
      if (achievements.length > MAX_ACHIEVEMENTS) {
        return Promise.reject("achievements count exceeds limit");
      }

      // validate each robot achievement
      let error = null;
      for (achievement of achievements) {
        if (typeof achievement != 'string') {
          error = "achievement not a string";
          break;
        } else if (achievement.length > MAX_ACHIEVEMENT_LENGTH) {
          error = "achievement exceeds character limit";
          break;
        } else if (ALLOWABLE_ACHIEVEMENTS.indexOf(achievement) < 0) {
          error = "achievement not found in ALLOWABLE_ACHIEVEMENTS";
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


Parse.Cloud.beforeDelete("KG2RobotModel", function(req, res) {
  let isMaster = req.master; // if the delete is run with masterKey
  if (isMaster) {
    // allow delete
    res.success();
  } else {
    // deny delete
    res.error("deletion requires masterKey");
  }
});
