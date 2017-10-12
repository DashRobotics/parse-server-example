
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.beforeFind('KG2RobotModel', function(req) {
    let isMaster = req.master;  // if the query is run with masterKey
    if (!isMaster) {
        let query = req.query;  // the Parse.Query
        query.limit(1);
        let where = query._where;
        console.log(where);
        console.log(typeof where);
        console.log(where.uuid);
        if ( typeof where.uuid == 'undefined' ) {
            console.log('NO uuid')
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
