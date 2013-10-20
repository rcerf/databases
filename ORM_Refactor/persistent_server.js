var mysql = require('mysql'),
    server = require('./basic-server'),
    handler = require('./request-handler'),
    url = require('url'),
    Sequelize = require('sequelize');

var sequelize = new Sequelize('chat', 'root', 'plantlife');

var Message = sequelize.define('ormMessages', {
  text: Sequelize.STRING,
  date:    Sequelize.DATE,
  roomname:    Sequelize.STRING,
  username:    Sequelize.STRING
});

Message.sync();

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
  var newMessage = Message.build(parsedData);
  newMessage.save();
};

module.exports.retrieve = function(callback) {

  Message.findAll().success(function(messages) {
    callback(messages);
  });


  // var query = "SELECT * FROM messages";
  // dbConnection.query(query, function(err, rows, fields) {
  //   if (err) throw err;
  //   callback(rows);
  // });
};