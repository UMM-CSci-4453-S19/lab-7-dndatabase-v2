mysql = require('mysql');
dbf = require('./gamemaster.dbf-setup.js');

var express = require('express'),
app = express(),
port = process.env.PORT || 1337;

app.use(express.static(__dirname + '/public'));
app.listen(port);

var getDBButtons = function(temp)
{
	console.log("We got here!");
	/*If connected, get the buttons
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
	*/
	
	var sql = "SELECT * FROM till_buttons";
	return dbf.query(mysql.format(sql));
	
}

var processDBButtons = function(rows)
{
	app.get("/buttons",function(req, res)
	{
	  res.send(rows);
	});
}

dbf = getDBButtons().then(processDBButtons);