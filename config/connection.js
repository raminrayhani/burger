/* The connection to the database and export and used by the ORM */
var mysql = require("mysql");

var source = {
	
	localhost: {
		port: 3306,
		host: "localhost",
		user: "root",
		password: "ramin62",
		database: 'burger_db'
	},
	jawsDB: {
		port: 3306,
		host: '',
		user: '',
		password: '',
		database: ''
	}

}

var connection = mysql.createConnection( source.jawsDB );

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('Databased connected as id: ' + connection.threadId);
});

module.exports = connection;