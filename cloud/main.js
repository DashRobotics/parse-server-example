const ParameterType = {
  'STRING': 'string',
  'NUMBER':  'number',
  'STRING_ARRAY':  'stringArray'
};


const robots = {
  'KG2RobotModel': [
    {
      parameter: 'uuid',
      type: ParameterType.STRING,
      canBeUndefined: false,
      canBeNull: false,
      maxStringLength: 100
    },
    {
      parameter: 'iconName',
      type: ParameterType.STRING,
      canBeUndefined: false,
      canBeNull: false,
      maxStringLength: 100,
      whitelist: [
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
      ]
    },
    {
      parameter: 'name',
      type: ParameterType.STRING,
      canBeUndefined: false,
      canBeNull: false,
      maxStringLength: 100,
      whitelist: [
        "Atlasar™",
        "Bokken™",
        "Carus™",
        "Lina™",
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
      ]
    },
    {
      parameter: 'buildStep',
      type: ParameterType.NUMBER,
      canBeUndefined: true,
      canBeNull: true,
      minValue: 0,
      maxValue: 1000
    },
    {
      parameter: 'drivingDistance',
      type: ParameterType.NUMBER,
      canBeUndefined: true,
      canBeNull: false,
      minValue: 0,
      maxValue: 3456000000,
      minValueChange: 0,
      maxValueChange: 345600
    },
    {
      parameter: 'drivingTime',
      type: ParameterType.NUMBER,
      canBeUndefined: true,
      canBeNull: false,
      minValue: 0,
      maxValue: 864000000,
      minValueChange: 0,
      maxValueChange: 86400
    },
    {
      parameter: 'program',
      type: ParameterType.STRING_ARRAY,
      canBeUndefined: true,
      canBeNull: false,
      maxArrayLength: 100,
      maxStringLength: 100,
      whitelist: [
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
      ]
    },
    {
      parameter: 'achievements',
      type: ParameterType.STRING_ARRAY,
      canBeUndefined: true,
      canBeNull: false,
      maxArrayLength: 100,
      maxStringLength: 100,
      whitelist: [
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
      ]
    }
  ],
  'KJWRobotModel': [
    {
      parameter: 'uuid',
      type: ParameterType.STRING,
      canBeUndefined: false,
      canBeNull: false,
      maxStringLength: 100
    },
    {
      parameter: 'iconName',
      type: ParameterType.STRING,
      canBeUndefined: false,
      canBeNull: false,
      maxStringLength: 100,
      whitelist: [
        "blue",
        "indo"
      ]
    },
    {
      parameter: 'name',
      type: ParameterType.STRING,
      canBeUndefined: false,
      canBeNull: false,
      maxStringLength: 100,
      whitelist: [
        "Blue™",
        "Indoraptor™",
        "Blue",
        "Indoraptor"
      ]
    },
    {
      parameter: 'buildStep',
      type: ParameterType.NUMBER,
      canBeUndefined: true,
      canBeNull: true,
      minValue: 0,
      maxValue: 1000
    },
    {
      parameter: 'drivingDistance',
      type: ParameterType.NUMBER,
      canBeUndefined: true,
      canBeNull: false,
      minValue: 0,
      maxValue: 3456000000,
      minValueChange: 0,
      maxValueChange: 345600
    },
    {
      parameter: 'drivingTime',
      type: ParameterType.NUMBER,
      canBeUndefined: true,
      canBeNull: false,
      minValue: 0,
      maxValue: 864000000,
      minValueChange: 0,
      maxValueChange: 86400
    },
    {
      parameter: 'program',
      type: ParameterType.STRING_ARRAY,
      canBeUndefined: true,
      canBeNull: false,
      maxArrayLength: 100,
      maxStringLength: 100,
      whitelist: [
        "none"
      ]
    },
    {
      parameter: 'challenge1Program',
      type: ParameterType.STRING_ARRAY,
      canBeUndefined: true,
      canBeNull: false,
      maxArrayLength: 100,
      maxStringLength: 100,
      whitelist: [
        "run_forward",
        "run_forward_slow",
        "run_backward",
        "run_backward_slow",
        "run_left",
        "run_right",
        "swivel_left",
        "swivel_right",
        "swivel_forward",
        "lights_red",
        "lights_blue",
        "lights_green",
        "lights_yellow",
        "lights_purple",
        "lights_white",
        "lights_off",
        "play_dance_music",
        "play_dance_music1",
        "play_dance_music2",
        "play_dance_music3",
        "play_attack1",
        "play_attack2",
        "play_growl",
        "play_bark"
      ]
    },
    {
      parameter: 'challenge2Program',
      type: ParameterType.STRING_ARRAY,
      canBeUndefined: true,
      canBeNull: false,
      maxArrayLength: 100,
      maxStringLength: 100,
      whitelist: [
        "run_forward",
        "run_forward_slow",
        "run_backward",
        "run_backward_slow",
        "run_left",
        "run_right",
        "swivel_left",
        "swivel_right",
        "swivel_forward",
        "lights_red",
        "lights_blue",
        "lights_green",
        "lights_yellow",
        "lights_purple",
        "lights_white",
        "lights_off",
        "play_dance_music",
        "play_dance_music1",
        "play_dance_music2",
        "play_dance_music3",
        "play_attack1",
        "play_attack2",
        "play_growl",
        "play_bark"
      ]
    },
    {
      parameter: 'achievements',
      type: ParameterType.STRING_ARRAY,
      canBeUndefined: true,
      canBeNull: false,
      maxArrayLength: 100,
      maxStringLength: 100,
      whitelist: [
        "charge-challenge-unlocked",
        "dance-challenge-unlocked",
        "sneak-challenge-unlocked",
        "speed-challenge-unlocked"
      ]
    }
  ]
};


function beforeFindValidator(req) {
  let isMaster = req.master; // if the query is run with masterKey
  if (!isMaster) {
    let query = req.query; // the Parse.Query

    // limit query to 1 result
    query.limit(1);
    
    // check for objectId
    let objectIdType = typeof query._where.objectId;
    if (objectIdType === 'string') {
      // great, let the GET through!
      
    } else {
      // validate uuid query constraint
      let uuidType = typeof query._where.uuid;
      if (uuidType === 'undefined') {
        // uuid not specified or is part of a compound query
        // deny find
        return new Parse.Error(101, 'uuid not specified');
      } else if (uuidType !== 'string') {
        // uuid not a string or is not part of an exact match query
        // deny find
        return new Parse.Error(102, 'uuid not a string');
      }
    }
  }

  return null;
}


function beforeSaveValidator(req) {
  let isMaster = req.master; // if the save is run with masterKey
  if (isMaster) {
    return null;
  }

  let robotData = req.object;
  let prevRobotData = req.original;
  let robotType = robotData.className;
  let validationParams = robots[robotType];

  try {
    validationParams.forEach(function(validationParam) {
      let key = validationParam.parameter;

      let value = robotData.get(key);

      if (typeof value === 'undefined') {
        if (!validationParam.canBeUndefined) {
          throw (key + " is undefined");
        }
      } else if (value === null) {
        if (!validationParam.canBeNull) {
          throw (key + " is null");
        }
      } else {
        switch (validationParam.type) {
          case ParameterType.STRING:
          if (typeof value !== 'string') {
            throw (key + " is not a string");
          }
          let maxStringLength = validationParam.maxStringLength;
          if (typeof maxStringLength !== 'undefined') {
            if (value.length > maxStringLength) {
              throw (key + " exceeds maxStringLength");
            }
          }
          let whitelist = validationParam.whitelist;
          if (typeof whitelist !== 'undefined') {
            if (whitelist.indexOf(value) < 0) {
              throw (key + " not in whitelist");
            }
          }
          break;

          case ParameterType.NUMBER:
          if (typeof value !== 'number') {
            throw (key + " is not a number");
          }
          let minValue = validationParam.minValue;
          if (typeof minValue !== 'undefined') {
            if (value < minValue) {
              throw (key + " below minValue");
            }
          }
          let maxValue = validationParam.maxValue;
          if (typeof maxValue !== 'undefined') {
            if (value > maxValue) {
              throw (key + " exceeds maxValue");
            }
          }
          let minValueChange = validationParam.minValueChange;
          let maxValueChange = validationParam.maxValueChange;
          if ((typeof minValueChange !== 'undefined') || (typeof maxValueChange !== 'undefined')) {
            let prevValue = (typeof prevRobotData === 'undefined') ? 0 : prevRobotData.get(key);
            let deltaValue = value - prevValue;
            if (typeof minValueChange !== 'undefined') {
              if (deltaValue < minValueChange) {
                throw (key + " change below minValueChange");
              }
            }
            if (typeof maxValueChange !== 'undefined') {
              if (deltaValue > maxValueChange) {
                throw (key + " change exceeds maxValueChange");
              }
            }
          }
          break;

          case ParameterType.STRING_ARRAY:
          if (value.constructor !== Array) {
            throw (key + " is not an array");
          }
          let minArrayLength = validationParam.minArrayLength;
          if (typeof minArrayLength !== 'undefined') {
            if (value.length < minArrayLength) {
              throw (key + " below minArrayLength");
            }
          }
          let maxArrayLength = validationParam.maxArrayLength;
          if (typeof maxArrayLength !== 'undefined') {
            if (value.length > maxArrayLength) {
              throw (key + " exceeds maxArrayLength");
            }
          }
          value.forEach(function(element) {
            if (typeof element !== 'string') {
              throw (key + " element is not a string");
            }
            let maxStringLength = validationParam.maxStringLength;
            if (typeof maxStringLength !== 'undefined') {
              if (element.length > maxStringLength) {
                throw (key + " element exceeds maxStringLength");
              }
            }
            let whitelist = validationParam.whitelist;
            if (typeof whitelist !== 'undefined') {
              if (whitelist.indexOf(element) < 0) {
                throw (key + " element not in whitelist");
              }
            }
          });
          break;
        }
      }
    });

    return null;
  }
  catch(error) {
    return robotType + ": " + error;
  }
}


Parse.Cloud.beforeFind('KG2RobotModel', function(req) {
  let error = beforeFindValidator(req);
  if (error !== null) {
    // deny find
    throw error;
  }
  // allow find
});


Parse.Cloud.beforeSave("KG2RobotModel", function(req, res) {
  let error = beforeSaveValidator(req);
  if (error == null) {
    // allow save
    res.success();
  } else {
    // deny save
    res.error(error);
  }
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


Parse.Cloud.beforeFind('KJWRobotModel', function(req) {
  let error = beforeFindValidator(req);
  if (error !== null) {
    // deny find
    throw error;
  }
  // allow find
});


Parse.Cloud.beforeSave("KJWRobotModel", function(req, res) {
  let error = beforeSaveValidator(req);
  if (error == null) {
    // allow save
    res.success();
  } else {
    // deny save
    res.error(error);
  }
});


Parse.Cloud.beforeDelete("KJWRobotModel", function(req, res) {
  let isMaster = req.master; // if the delete is run with masterKey
  if (isMaster) {
    // allow delete
    res.success();
  } else {
    // deny delete
    res.error("deletion requires masterKey");
  }
});
