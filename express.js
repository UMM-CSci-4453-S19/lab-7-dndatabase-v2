Promise = require('bluebird');
var express=require('express'),
app = express(),
port = process.env.PORT || 1337;

//Connect to the DB
var credentials = require('./credentials.json');
var mysql=require("mysql");
credentials.host="ids";
credentials.database = "dndatabase";
var connection = mysql.createConnection(credentials);
var buttons;


var connectToDatabase = function()
{

	return new Promise(function()
	{
		//Attempt to connect
		connection.connect(function(err)
		{	
		  if(err)
		{
		    console.log("Problems with MySQL: "+err);
		
		  } else {
		    console.log("Connected to Database.");
		  }
		});
	});
	
}

var getDBButtons = function(temp)
{
	console.log("We got here!");
	//If connected, get the buttons
	connection.query('SELECT * FROM till_buttons;',function(err,rows,fields){
	if(err){
		console.log('Error looking up databases', err);
	} else {
		console.log('Returned values were ',rows);
			connection.end()
			console.log("All done now.");
			return Promise.resolve(rows);
		}
	});
	
}

var processDBButtons = function(rows)
{
	var buttons = rows;
	app.use(express.static(__dirname + '/public'));
	app.get("/buttons",function(req,res){
	  res.send(buttons);
	});
}

var load = connectToDatabase().then(getDBButtons).then(processDBButtons).catch(function(err){console.log("Big oops", err)});

app.listen(port);

