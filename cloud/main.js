
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
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
      // uuid not specified or is part of a compound query: deny find
      throw new Parse.Error(101, 'uuid not specified');
    } else if (uuidType != 'string') {
      // uuid not a string or is not part of an exact match query: deny find
      throw new Parse.Error(102, 'uuid not a string');
    }
  }
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
