var mysql = require('mysql'),
    server = require('../basic-server'),
    handler = require('../request-handler'),
    url = require('url');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "plantlife",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

module.exports.insert = function(data){

  var parsedData = JSON.parse(data);

  var query = "INSERT INTO messages (content, date, room, user)\
                             VALUES (" + "'" + parsedData.text + "'" + ", "
                                       + "CURRENT_TIMESTAMP" + ","
                                       + "'" + parsedData.roomname + "'" + ", "
                                       + "'" + parsedData.username + "'" + ");";

  dbConnection.query(query, function(err, rows, fields) {
    if(err) throw (err);
  });

};

module.exports.retrieve = function(callback) {

  var messages;

  var query = "SELECT * FROM messages";

  dbConnection.query(query, function(err, rows, fields) {

    if (err) throw err;

    callback(rows);

  });

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