// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

// source: https://github.com/parse-community/parse-server/issues/2412
var forceSSL = function (req, res, next) {
  // if the request arrives from the outside, and it was not received in https, and it's not a file request - block it
  if (req.headers['host'] != internalHostHeader && // this cond could also be tested if we require x-forwarded-proto to be defined - since on access from localhost it's not.  but this is more explicit 
      req.headers['x-forwarded-proto'] !== 'https' &&
      !req.path.startsWith(filePathPrefix)) {
    return res.status(403).send({message: 'SSL required'});
  }
  // otherwise, let it pass through
  return next();
};

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  publicServerURL: process.env.PUBLIC_SERVER_URL || '', 
  clientKey: process.env.CLIENT_KEY || '', //Add your client key here. Keep it secret!
  liveQuery: {
    classNames: ["Program"] // List of classes to support for query subscriptions
  },
  allowClientClassCreation: false
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// force SSL
app.use(forceSSL); 

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('There is nothing to see here.');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
