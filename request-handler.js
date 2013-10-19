var fs = require('fs'),
    db = require('./sql/persistent_server');


var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

// No longer needed now that we have database
// var messages = [];

var extend = function(obj, source) {
  for (var prop in source) {
    obj[prop] = source[prop];
  }
  return obj;
};

//refactor to load messages from database rather than from messages.txt
module.exports.loadMessages = loadMessages = function(){
    // messages = fs.readFileSync('./messages.txt', 'utf8');
    // messages = messages || '[]';
    // messages = JSON.parse(messages);
};

module.exports.loadFile = loadFile = function(response, fileName, contentType){
  fs.readFile(fileName, function (err, data) {
    if (err) throw err;
    var newHeaders = {};
    extend(newHeaders, headers);
    newHeaders['Content-Type'] = contentType;
    response.writeHeader(200, newHeaders);
    response.write(data);
    response.end();
  });
};

module.exports.sendResponse = sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(response){

  db.retrieve();

  // sendResponse(response, messages, 200);
};

var storeData = function(request, response){
  var data = "";

  request.on('data', function(chunk){
    data += chunk;
  });

  request.on('end', function(){
    // Now calling a method from persistent_server instead of pushing to messages
    // messages.push(JSON.parse(data));
    // fs.writeFileSync('./messages.txt', JSON.stringify(messages));

    db.insert(data);

  });

  // sendResponse(response, null, 201);
};

module.exports.handleRequest = handleRequest = function(request, response) {
  var httpVerb = {
    'GET': function() { collectData(response); },
    'POST': function() { storeData(request, response); },
    'OPTIONS': function() { sendResponse(response, null, 200); }
  };

  httpVerb[request.method]();
};
