var express=require('express'),
app = express(),
port = process.env.PORT || 1337;

//Connect to the DB
var credentials = require('./credentials.json');
var mysql=require("mysql");
credentials.host="ids";
credentials.database = "dndatabase";
var connection = mysql.createConnection(credentials);

//Attempt to connect
connection.connect(function(err){
  if(err){
    console.log("Problems with MySQL: "+err);
  } else {
    console.log("Connected to Database.");
  }
});

//If connected, get the buttons
connection.query('SELECT * FROM till_buttons;',function(err,rows,fields){
  if(err){
    console.log('Error looking up databases', err);
  } else {
    console.log('Returned values were ',rows);
}
});
connection.end()
console.log("All done now.");


// Make query to server to get all the buttons as JSON objects
// buttonID, x, y, width, label, invId
var buttons;


app.use(express.static(__dirname + '/public'));
app.get("/buttons",function(req,res){
  res.send(buttons);
});

app.listen(port);
