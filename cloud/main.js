
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
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
