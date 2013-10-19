var http = require("http");
var req = require("./request-handler");
var url = require("url");


var requestListener = function (request, response) {
  // console.log("Serving request type " + request.method + " for url " + request.url);
  var path = url.parse(request.url).pathname;

  var routes = {
    '/classes/messages/': function(){req.handleRequest(request, response);},
    '/' : function(){ req.loadFile(response, __dirname + '/client/index.html', 'text/html');},
    '/styles/styles.css' : function(){ req.loadFile(response, __dirname + '/client/styles/styles.css', 'text/css');},
    // '/bower_components/jquery/jquery.min.js' : function(){ req.loadFile(response, '../client/client/bower_components/jquery/jquery.min.js', 'text/javascript');},
    // '/bower_components/underscore/underscore-min.js' : function(){ req.loadFile(response, '../client/client/bower_components/underscore/underscore-min.js', 'text/javascript');},
    '/scripts/config.js' : function(){ req.loadFile(response, __dirname + '/client/scripts/config.js', 'text/javascript');},
    '/scripts/app.js' : function(){ req.loadFile(response, __dirname + '/client/scripts/app.js', 'text/javascript');}
  };

  if(!routes[path]){
    req.sendResponse(response, null, 404);
  }else{
    routes[path]();
  }
};

var port = 8080;

var ip = "127.0.0.1";

//  Pre-load the saved messages
req.loadMessages();

//  Start the HTTP server
var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);